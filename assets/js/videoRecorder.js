const { set } = require("mongoose");

const recorderContainer = document.getElementById("jsRecorderContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecoder;

const handleVideoData = (event) => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recordedd.webm";
  document.body.appendChild(link);
  link.click();

  console.log("요기!!!!");
};
const stopRecording = () => {
  videoRecoder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerText = "Start Start Start Start Recording";
  recordBtn.innerHTML = "Start Recording";
};

const startRecording = () => {
  console.log(streamObject);
  videoRecoder = new MediaRecorder(streamObject);
  videoRecoder.start();
  videoRecoder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
  //setTimeout(() => videoRecoder.stop(), 5000);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    // console.log(stream);
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    streamObject = stream;
    recordBtn.innerHTML = "Stop Recording";
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "😢Can't record video";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}
