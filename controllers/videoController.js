import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

//render 이라는 함수가 views 폴더에서 파일명이 home이고 확장자가 Pug인 템플릿파일을 찾은후에 보여줄것.
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); //await부분이 끝나기 전까지 render되지않도록 기다리게함.
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  //const searchingBy = req.query.term; 는 아래와 같다.
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    }); //regular expression(정규표현식) 사용
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// export const videos = (req, res) =>
//   res.render("videos", { pageTitle: "Videos" });
export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments"); //populate():전체 객체를 가져오는 함수.
    const commentList = await Comment.find().populate("creator");
    //console.log("here v detail", video);
    res.render("videoDetail", { pageTitle: video.title, video, commentList });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  // { file, title, description } = req.body는 아래와 같다.
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user._id,
  });
  //console.log(newVideo);
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id.toString()) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id.toString()) {
      throw Error();
    } else {
      await Video.findByIdAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
//  res.render("deleteVideo", { pageTitle: "Delete Video" });

//Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
    res.end();
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    console.log("user: ");
    console.log(user.id);
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    console.log("video id: ");
    console.log(req.params.id);
    console.log("__user: ");
    console.log(newComment);
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    console.log("Posting Comment Error");
    res.status(400);
  } finally {
    res.redirect(routes.videoDetail(req.params.id));
    res.end();
  }
};
