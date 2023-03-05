import userModel from "../../models/users.model.js";
import { generateToken } from "../../utils/jwt.js";

class UserServices {
  finAll = async () => {
    try {
      const users = await userModel.find().lean().exec();

      return users;
    } catch (error) {
      console.log(error);
    }
  };

  findUser = async (email) => {
    try {
      const user = await userModel.findOne({ email }).lean().exec();

      return user;
    } catch (error) {
      console.log(error);
    }
  };

  registerUser = async (req, username, password, done) => {
    try {
      const user = await this.findUser(username);

      if (user) {
        return done(null, false);
      }

      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        password: await userModel.encryptPassword(password),
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
      const user = await this.findUser(username);

      if (!user) {
        console.log("User Not Found");

        return done(null, user);
      }

      const verifyPassword = await userModel.comparePassword(
        password,
        user.password
      );

      if (!verifyPassword) {
        console.log("Incorrect Password");

        return done(null, false);
      }

      const token = generateToken(user);

      user.token = token;

      return done(null, user);
    } catch (error) {
      console.log(error);

      return done(error);
    }
  };

  logoutUser = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
}

const UserService = new UserServices();

export default UserService;
