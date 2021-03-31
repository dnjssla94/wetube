import helmet from "helmet";
import bodyParser from "body-parser";
import coockieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import { localMiddleWare } from "./middleWare";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use(coockieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localMiddleWare);

// get이 아닌 use를 써준다. 누군가 /routes.home 경로로 접속하면
//globalRouter 라우터를 모두 사용하겠다는것.
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
