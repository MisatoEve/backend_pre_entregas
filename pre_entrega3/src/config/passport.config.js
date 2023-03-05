//▼LOGICA PARA PASSPORT JWT, LOCAL Y GITHUB
import passport from "passport";
import passportJwt from "passport-jwt";
import passportLocal from "passport-local";
import UserService from "../users/services/users.services.js";
import { cookieExtractor } from "../utils/jwt.js";
import dotenv from "dotenv";
import userModel from "../models/users.model.js";
dotenv.config();

const JwtStrategy = passportJwt.Strategy;
const JwtExtractor = passportJwt.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;
const { registerUser, loginUser } = UserService;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      (req, username, password, done) => registerUser(req, username, password, done)
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      (username, password, done) => loginUser(username, password, done)
    )
  );

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: JwtExtractor.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          console.log(jwt_payload);

          return done(null, jwt_payload);
        } catch (error) {
          console.log(error);

          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);

    done(null, user);
  });
};

export default initializePassport;
