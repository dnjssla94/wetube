import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
  console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // To Do: Register User, Log user in
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

//===============================github로그인

export const githubLogin = passport.authenticate("github");

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(accessToken, refreshToken, profile, cb);
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatarUrl;
      user.name = name;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    //console.log("hahagogogogo");
    return cb(error);
  }
};
//=============facebookLogin==================

// export const facebookLogin = passport.authenticate("facebook");

// export const facebookLoginCallback = (
//   accessToken,
//   refreshToken,
//   profile,
//   cb
// ) => {
//   console.log(accessToken, refreshToken, profile, cb);
// };
// export const postfacebookLogin = (req, res) => {
//   res.redirect(routes.home);
// };

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    user: { _id: id },
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      console.log("not same");
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    const user = await User.findById(req.user._id);
    //console.log(req.user);
    await user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
    res.redirect(`/users${routes.changePassword}`);
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    console.log(req.params);
    const user = await User.findById(id).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};
