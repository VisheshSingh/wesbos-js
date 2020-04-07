const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');
const SIZE = 10;
const faceDetector = new FaceDetector();
// console.log(video, canvas, faceCanvas, faceDetector);

async function populateVideo() {
  const streamVideo = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  video.srcObject = streamVideo;
  await video.play();

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(video);
  // console.log(faces.length);
  faces.forEach(drawFace);
  faces.forEach(censor);
  requestAnimationFrame(detect);
}

function drawFace(face) {
  const { width, height, top, left } = face.boundingBox;
  //   console.log({ width, height, top, left });
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#ffc600';
  ctx.lineWidth = 2;
  ctx.strokeRect(left, top, width, height);
}

function censor({ boundingBox: face }) {
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  faceCtx.drawImage(
    // 5 source args
    video, // where does the face come from ?
    face.x, // where should we start source pulling from ?
    face.y,
    face.width,
    face.height,
    // 4 draw args
    face.x, // where should we start drawing x and y
    face.y,
    SIZE,
    SIZE
  );

  // draw the small face back on but scale it up
  faceCtx.drawImage(
    // 5 source args
    video, // where does the face come from ?
    face.x, // where should we start source pulling from ?
    face.y,
    SIZE,
    SIZE,
    // 4 draw args
    face.x, // where should we start drawing x and y
    face.y,
    face.width,
    face.height
  );
}
populateVideo().then(detect);
