// router는 많은 route를 모아놓은 파일이다.
import express from "express";
import {
  changePassword,
  editProfile,
  users,
  usersDetail,
} from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.usersDetail, usersDetail);

export default userRouter;
