// router는 많은 route를 모아놓은 파일이다.
import express from "express";
import {
  postAddComment,
  postRegisterView,
} from "../controllers/videoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;
