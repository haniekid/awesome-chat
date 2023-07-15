import User from "../models/user.model";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import { transErrors, transSuccess } from "../../lang/vi";

const saltRounds = 7; // muối

const register = (email, password, gender) => {
  return new Promise(async (resolve, reject) => {
    const userByEmail = await User.findByEmail(email);
    if (userByEmail) {
      if (userByEmail.deletedAt !== null) {
        return reject(transErrors.account_removed);
      }
      if (!userByEmail.local.isActive) {
        return reject(transErrors.account_not_active);
      }
      return reject(transErrors.account_in_use);
    }
    const salt = bcrypt.genSaltSync(saltRounds);

    const userInfo = {
      username: email.split("@")[0],
      gender,
      local: {
        email: email,
        password: bcrypt.hashSync(password, salt),
        verifyToken: uuidv4(),
      },
    };

    const user = await User.createNew(userInfo);
    resolve(transSuccess.userCreated(user.local.email));
  });
};

module.exports = {
  register,
};
