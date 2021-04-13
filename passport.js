import passport from "passport";
import GithubStrategy from "passport-github";
//import FacebookStrategy from "passport-facebook";
import {
  //facebookLoginCallback,
  githubLoginCallback,
} from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

//createStrategy()는 passport-local-mongoose가 제공하는 편리한 지름길이다.
passport.use(User.createStrategy());
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FB_ID,
//       clientSecret: process.env.FB_SECRET,
//       callbackURL: `http://localhost:4000${routes.facebookCallback}`,
//     },
//     facebookLoginCallback
//   )
// );

// passport.serializeUser(User.serializeUser()); //User,serializeUser()도 마찬가지. (이 단축키? 쓰면 쿠키엔 userId만 담게됨.)
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
