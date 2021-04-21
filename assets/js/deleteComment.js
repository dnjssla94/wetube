import axios from "axios";

const deleteComment = document.getElementById("jsDeleteComment");
const deleteCommentBtn = document.getElementById("jsDeleteCommentBtn");

// const increaseNumber = () => {
//   commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
// };

// const addComment = (comment) => {
//   const li = document.createElement("li");
//   const span = document.createElement("span");
//   span.innerHTML = comment;
//   li.appendChild(span);
//   commentList.prepend(li);
//   increaseNumber();
// };

// const sendComment = async (comment) => {
//   const videoId = window.location.href.split("videos/")[1];
//   const response = await axios({
//     url: `/api/${videoId}/comment`,
//     method: "POST",
//     data: { comment },
//   });
//   if (response.status === 200) {
//     addComment(comment);
//   }
// };

// const deleteCommentBtn = (event) => {
//   event.preventDefault(); // 새로고침되는것을 막는다.
//   const response = await axios({
//     url: `/api/${videoId}/comment`,
//     method: "GET",
//     data: { comment },
//   });
// };

const handleClick = (event) => {
  event.preventDefault();
  const commentElementBtn = deleteComment.querySelector("#jsDeleteCommentBtn");
  const parent = commentElementBtn.parentNode;
  parent.parentNode.removeChild(parent);
};

function init() {
  deleteComment.addEventListener("click", handleClick);
}

if (deleteCommentBtn) {
  init();
}
