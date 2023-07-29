import User from "../models/user.model";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import { transErrors, transSuccess, transMail } from "../../lang/vi";
import sendMail from "../config/mailer";

const saltRounds = 7; // muối

const register = (email, password, gender, protocol, host) => {
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
    console.log(user);

    // send mail
    const linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;
    sendMail(email, transMail.subject, transMail.template(linkVerify))
      .then((success) => {
        resolve(transSuccess.userCreated(user.local.email));
      })
      .catch(async (error) => {
        // remove user
        await User.removeById(user._id);
        console.log(error);
        reject(transMail.send_failed);
      });
  });
};

const verifyAccount = (token) => {
  return new Promise(async (resolve, reject) => {
    const userByToken = await User.findByToken(token);
    if (!userByToken) {
      return reject(transErrors.token_undefined);
    }

    await User.verify(token);
    resolve(transSuccess.account_actived);
  });
};

module.exports = {
  register,
  verifyAccount,
};
