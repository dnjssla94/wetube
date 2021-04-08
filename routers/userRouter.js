// router는 많은 route를 모아놓은 파일이다.
import express from "express";
import {
  changePassword,
  editProfile,
  userDetail,
} from "../controllers/userController";
import { onlyPrivate } from "../middleWare";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
