import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return token;
};

export const authToken = (req, res, next) => {
  const cookieName = process.env.COOKIE_NAME;

  const authCookie = req.cookies[cookieName];

  if (!authCookie) {
    return res.status(401).send({
      error: "Not Auth",
    });
  }

  jwt.verify(authCookie, process.env.JWT_SECRET, (error, credentials) => {
    if (error) {
      console.log(error);
      return res.status(403).send({
        error: "Not Authorized from JWT",
      });
    }

    req.user = credentials.user;

    next();
  });
};

export const cookieExtractor = (req) => {
  const token =
    req && req.cookies ? req.cookies[process.env.COOKIE_NAME] : null;

  return token;
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next();
      if (!user) return res.status(400).render("error", { error: info });

      req.user = user;

      next();
    })(req, res, next);
  };
};

export const passportCallHome = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next();
      if (!user) return res.render("login");

      req.user = user;

      next();
    })(req, res, next);
  };
};

export const authPolicies = (policieOne, policieTwo) => (req, res, next) => {
  const role = req.user.role;

  if (typeof policieOne === "undefined") {
    policieOne = policieTwo;
    policieTwo = null;
  }

  if (role !== policieOne && role !== policieTwo) {
    return res.status(403).send({
      error: "Not Authorized from Policies",
    });
  }

  next();
};