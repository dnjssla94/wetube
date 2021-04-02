import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  // "mongodb://127.0.0.1:27017.we-tuble",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    // useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
const handleOpen = () => console.log("✅connected to DB");
const handleError = (error) => console.log(`❌Error connected to DB: ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
