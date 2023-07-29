import passport from "passport";
import passportFacebook from "passport-facebook";
import User from "../../models/user.model";
import { transErrors, transSuccess } from "../../../lang/vi";

const FacebookStrategy = passportFacebook.Strategy;

const fbAppId = process.env.FB_APP_ID;
const fbAppSecret = process.env.FB_APP_SECRET;
const fbCallbackUrl = process.env.FB_CALLBACK_URL;

/**
 * Valid user account type: facebook
 */

const initPassportFacebook = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: fbAppId,
        clientSecret: fbAppSecret,
        callbackURL: fbCallbackUrl,
        passReqToCallback: true,
        profileFields: ["email", "gender", "displayName"],
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findByFacebookUid(profile.id);
          if (user) {
            return done(
              null,
              user,
              req.flash("success", transSuccess.loginSuccess(user.username))
            );
          }

          console.log(profile);
          const newUserItem = {
            username: profile.displayName,
            gender: profile.gender,
            local: { isActive: true },
            facebook: {
              uid: profile.id,
              token: accessToken,
              email: profile.emails[0].value,
            },
          };

          const newUser = await User.createNew(newUserItem);

          return done(
            null,
            newUser,
            req.flash("success", transSuccess.loginSuccess(newUser.username))
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
    console.log(user);
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

module.exports = initPassportFacebook;
