//render 이라는 함수가 views 폴더에서 파일명이 home이고 확장자가 Pug인 템플릿파일을 찾은후에 보여줄것.
export const home = (req, res) => res.render("home", { pageTitle: "Home" });
export const search = (req, res) => {
  //const searchingBy = req.query.term;
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy });
};

export const videos = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
