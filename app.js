import helmet from "helmet";
//import bodyParser from "body-parser";
import coockieParser from "cookie-parser";
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localMiddleWare, uploadVideoMiddleware } from "./middleWare";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import "./passport";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); ///uploads로 접근하면 uplaod파일로 보낸다.
app.use("/static", express.static("static")); ///uploads로 접근하면 uplaod파일로 보낸다.
app.use(coockieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.RANDOM_KEY,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleWare);
app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org"
  );
  return next();
});

// get이 아닌 use를 써준다. 누군가 /routes.home 경로로 접속하면
//globalRouter 라우터를 모두 사용하겠다는것.
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
