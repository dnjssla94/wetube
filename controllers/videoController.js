//
import routes from "../routes";

//render 이라는 함수가 views 폴더에서 파일명이 home이고 확장자가 Pug인 템플릿파일을 찾은후에 보여줄것.
export const home = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });
export const search = (req, res) => {
  //const searchingBy = req.query.term; 는 아래와 같다.
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// export const videos = (req, res) =>
//   res.render("videos", { pageTitle: "Videos" });
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = (req, res) => {
  // { file, title, description } = req.body는 아래와 같다.
  const {
    body: { file, title, description },
  } = req;
  // To do : upload and save video
  res.redirect(routes.videoDetail(342081));
};

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
