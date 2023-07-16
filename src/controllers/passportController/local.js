import passport from "passport";
import passportLocal from "passport-local";
import User from "../../models/user.model";
import { transErrors, transSuccess } from "../../../lang/vi";

const LocalStrategy = passportLocal.Strategy;

/**
 * Valid user account type: local
 */

const initPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, pasaword, done) => {
        try {
          const user = await User.findByEmail(email);
          if (!user) {
            return done(
              null,
              false,
              req.flash("errors", transErrors.login_failed)
            );
          }
          if (!user.local.isActive) {
            return done(
              null,
              false,
              req.flash("errors", transErrors.account_not_active)
            );
          }

          const checkPassword = await user.comparePassword(pasaword);
          if (!checkPassword) {
            return done(
              null,
              false,
              req.flash("errors", transErrors.login_failed)
            );
          }

          return done(
            null,
            user,
            req.flash("success", transSuccess.loginSuccess(user.username))
          );
        } catch (error) {
          console.log(error);
          return done(
            null,
            false,
            req.flash("errors", transErrors.server_error)
          );
        }
      }
    )
  );

  //   Save userId to session passport
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((userId, done) => {
    // Retrieve the userId returned from the serializeUser function.
    User.findUserById(userId)
      .then((user) => {
        return done(null, user);
      })
      .catch((error) => {
        return done(error, null);
      });
  });
};

module.exports = initPassportLocal;
