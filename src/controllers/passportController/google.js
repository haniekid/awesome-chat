import passport from "passport";
import passportGoogle from "passport-google-oauth";
import User from "../../models/user.model";
import { transErrors, transSuccess } from "../../../lang/vi";

const GoogleStrategy = passportGoogle.OAuth2Strategy;

// const ggAppId = process.env.GG_APP_ID;
// const ggAppSecret = process.env.GG_APP_SECRET;
// const ggCallbackUrl = process.env.GG_CALLBACK_URL;

const ggAppId =
  "1090674128684-mbqb4am914kde7adlj8cpv2s3hil901p.apps.googleusercontent.com";
const ggAppSecret = "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";
const ggCallbackUrl = "https://localhost:8080/auth/google/callback";

/**
 * Valid user account type: google
 */

const initPassportGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: ggAppId,
        clientSecret: ggAppSecret,
        callbackURL: ggCallbackUrl,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findByGoogleUid(profile.id);
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
            google: {
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

module.exports = initPassportGoogle;
