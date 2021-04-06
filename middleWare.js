import routes from "./routes";
var multer = require("multer");

var multerVideo = multer({ dest: "uploads/videos/" });

export const localMiddleWare = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
