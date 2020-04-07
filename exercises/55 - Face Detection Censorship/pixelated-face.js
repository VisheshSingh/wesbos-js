const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = canvas.getContext('2d');

const faceDetector = new FaceDetector();
// console.log(video, canvas, faceCanvas, faceDetector);

async function populateVideo() {
  const streamVideo = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  video.srcObject = streamVideo;
  await video.play();
}

populateVideo();
