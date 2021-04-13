// router는 많은 route를 모아놓은 파일이다.
import express from "express";
import {
  getChangePassword,
  getEditProfile,
  postChangePassword,
  postEditProfile,
  userDetail,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middleWare";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
