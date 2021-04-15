const recorderContainer = document.getElementById("jsRecorderContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;

const handleVideoData = (event) => {
  console.log("what event");
  console.log(event);
};

const startRecording = () => {
  console.log(streamObject);
  const videoRecoder = new MediaRecorder(streamObject);
  videoRecoder.start();
  videoRecoder.ondataavailable("dataavailable", handleVideoData);
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
    recordBtn.removeEventListener("click", startRecording);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}
