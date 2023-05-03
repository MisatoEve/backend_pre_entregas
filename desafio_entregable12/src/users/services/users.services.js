import { CartServices } from "../../carts/services/carts.services.js";
import { ERRORS_ENUM } from "../../consts/ERRORS.js";
import CustomError from "../../errors/customError.js";
import tokenModel from "../../models/token.model.js";
import userModel from "../../models/users.model.js";
import sendMail from "../../nodemailer.js";
import { generateCode } from "../../utils.js";
import { generateToken } from "../../utils/jwt.js";
import UserDto from "../dto/user.dto.js";

class UserServices {
  finAll = async () => {
    try {
      const users = await userModel.find().lean().exec();

      const mapedUser = users.map((user) => new UserDto(user));

      return mapedUser;
    } catch (error) {
      console.log(error);
    }
  };

  findUser = async (email) => {
    try {
      const result = await userModel.findOne({ email }).lean().exec();

      if (!result) {
        CustomError.createError({
          message: ERRORS_ENUM["USER NOT FOUND"],
        });
      }

      const user = new UserDto(result);

      return user;
    } catch (error) {
      console.log(error);
    }
  };

  registerUser = async (req, username, password, done) => {
    try {
      const user = await userModel.findOne({ email: username }).lean().exec();

      if (user) {
        return done(null, false);
      }

      if (
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.email ||
        !req.body.age ||
        !password
      ) {
        return done(null, false);
      }

      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        password: await userModel.encryptPassword(password),
        cart: await CartServices.createCart(),
      };

      const createNewUser = await userModel.create(newUser);

      return done(null, createNewUser);
    } catch (error) {
      console.log(error);

      return done(error);
    }
  };

  loginUser = async (username, password, done) => {
    try {
      const user = await userModel.findOne({ email: username }).lean().exec();

      if (!user) {
        console.log("User Not Found");

        return done(null, false);
      }

      const verifyPassword = await userModel.comparePassword(
        password,
        user.password
      );

      if (!verifyPassword) {
        console.log("Incorrect Password");

        return done(null, false);
      }

      const dtoUser = new UserDto(user);

      const token = generateToken(dtoUser);

      dtoUser.token = token;

      return done(null, dtoUser);
    } catch (error) {
      console.log(error);

      return done(error);
    }
  };

  changeRole = async (uid) => {
    try {
      const user = await this.findUserById(uid);

      if (!user) {
        CustomError.createError({
          message: ERRORS_ENUM["USER NOT FOUND"],
        });
      }

      console.log(user);

      const result = await userModel.updateOne(
        { _id: uid },
        { role: user.role === "USER" ? "PREMIUM" : "USER" }
      );

      if (!result) return false;

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  sendRestoreMail = async (email) => {
    try {
      const user = await this.findUser(email);

      if (!user) {
        CustomError.createError({
          message: "User with given email doesn't exist",
        });
      }

      let token = await tokenModel.findOne({ userId: user._id });

      if (!token) {
        token = await new tokenModel({
          userId: user._id,
          token: generateCode(),
        }).save();
      }

      const link = `${process.env.BASE_URL}/restoreForm/${user._id}/${token.token}`;

      await sendMail.send(user.email, "Password reset", link);

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  restorePassword = async (uid, password, token) => {
    try {
      const user = await this.findUserById(uid);

      if (!user) {
        CustomError.createError({
          message: ERRORS_ENUM["USER NOT FOUND"],
        });

        return;
      }

      const userToken = await this.findUserToken(uid);

      if (!userToken) {
        CustomError.createError({
          message: "Invalid or expired token",
        });

        return;
      }

      const verifyPassword = await userModel.comparePassword(
        password,
        user.password
      );

      if (verifyPassword) {
        CustomError.createError({
          message: "Can not use the last password, must be a new one",
        });

        return;
      }

      const result = await userModel.updateOne(
        { _id: uid },
        { password: await userModel.encryptPassword(password) }
      );

      if (!result) {
        return false;
      }

      await userToken.delete();

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  findUserById = async (uid) => {
    try {
      const user = await userModel.findById({ _id: uid }).lean().exec();

      if (!user) {
        CustomError.createError({
          message: ERRORS_ENUM["USER NOT FOUND"],
        });
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  };

  findUserToken = async (uid, token) => {
    try {
      const userToken = await tokenModel.findOne({ userId: uid });

      return userToken;
    } catch (error) {
      console.log(error);
    }
  };
}

const UserService = new UserServices();

export default UserService;