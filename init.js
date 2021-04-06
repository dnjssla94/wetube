import "./db";
import app from "./app";
import dotenv from "dotenv";
import "./models/Video";
import "./models/Comment";
dotenv.config();

const PORT = process.env.PORT || 4000; //.env 파일엔 콜론을 써주면 안된다.
const handleListening = () =>
  console.log(`😊Listening on https://localhost:${PORT}`);

app.listen(PORT, handleListening);
