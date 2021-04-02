// export const videos = [
//   {
//     id: 342081,
//     title: "test data111",
//     description: "This is something",
//     views: 24,
//     videoFile:
//       "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
//     creator: {
//       id: 13534,
//       name: "Shinwon",
//       email: "dnjssla94@naver.com",
//     },
//   },
//   {
//     id: 22222,
//     title: "test data222",
//     description: "This is something222",
//     views: 24,
//     videoFile:
//       "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
//     creator: {
//       id: 3333,
//       name: "Shinwon",
//       email: "dnjssla94@naver.com",
//     },
//   },
//   {
//     id: 6666,
//     title: "test data33",
//     description: "This is something333",
//     views: 24,
//     videoFile:
//       "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
//     creator: {
//       id: 13534,
//       name: "Shinwon",
//       email: "dnjssla94@naver.com",
//     },
//   },
//   {
//     id: 44444,
//     title: "test data44",
//     description: "This is something444ss",
//     views: 24,
//     videoFile:
//       "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
//     creator: {
//       id: 13534,
//       name: "Shinwon",
//       email: "dnjssla94@naver.com",
//     },
//   },
// ];
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017.we-tuble", {
  useNewUrlParser: true,
  useFindAndModify: false,
  //useUnifiedTopology: true,
});

const db = mongoose.connection;
const handleOpen = () => console.log("✅connected to DB");
const handleError = (error) => console.log(`❌Error connected to DB: ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
