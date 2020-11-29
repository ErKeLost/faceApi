const video = document.querySelector('video')
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/weights'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/weights'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/weights'),
  faceapi.nets.faceExpressionNet.loadFromUri('/weights'),
  faceapi.nets.ageGenderNet.loadFromUri('/weights')
]).then(startVideo)
function startVideo(){
  navigator.getUserMedia(
    {video:{}},
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}
// startVideo()
video.addEventListener('play',() => {
  const  canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = {width:video.width,height:video.height}
  faceapi.matchDimensions(canvas,displaySize)
  setInterval(async() => {
    const detections = await faceapi.detectAllFaces(video,
      new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender()
      const resizedDetections = faceapi.resizeResults(detections,displaySize)
      canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
      faceapi.draw.drawDetections(canvas,resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas,resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas,resizedDetections)
      resizedDetections.forEach(result => {
        const { age, gender, genderProbability } = result;
        // if(gender = 'male'){
        //   gender.innerText = "男性"
        // }
        new faceapi.draw.DrawTextField(
          [
            `年龄：${Math.round(age)}岁`,
            `性别: ${gender} （male为男性，female为女性）`
          ],
          result.detection.box.bottomRight
        ).draw(canvas);
        })  
  },100)
})

// const canvas = faceapi.createCanvasFromMedia(video);
//   document.body.append(canvas);
//   const displaySize = { width: video.width, height: video.height };
//   faceapi.matchDimensions(canvas, displaySize);
//   setInterval(async () => {
//     const predictions = await faceapi
//       .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//       .withFaceLandmarks()
//       .withFaceExpressions()
//       .withAgeAndGender();
 
//     const resizedDetections = faceapi.resizeResults(predictions, displaySize);
//     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//     faceapi.draw.drawDetections(canvas, resizedDetections);
//     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//     faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//     resizedDetections.forEach(result => {
//       const { age, gender, genderProbability } = result;
//       new faceapi.draw.DrawTextField(
//         [
//           `${faceapi.round(age, 0)} years`,
//           `${gender} (${faceapi.round(genderProbability)})`
//         ],
//         result.detection.box.bottomRight
//       ).draw(canvas);

// // *********************

// // const video = document.getElementById('video');
 
// // Promise.all([
// //   faceapi.nets.tinyFaceDetector.loadFromUri('/weights'),
// //   faceapi.nets.faceLandmark68Net.loadFromUri('/weights'),
// //   faceapi.nets.faceRecognitionNet.loadFromUri('/weights'),
// //   faceapi.nets.faceExpressionNet.loadFromUri('/weights'),
// //   faceapi.nets.ageGenderNet.loadFromUri('/weights')
// // ]).then(startVideo);
 
// // function startVideo() {
  
// //   navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  
// //   if (navigator.getUserMedia) {
// //    navigator.getUserMedia({  video: true },
// //       function(stream) {
// //          var video = document.querySelector('video');
// //          video.srcObject = stream;
// //          video.onloadedmetadata = function(e) {
// //            video.play();
// //          };
// //       },
// //       function(err) {
// //          console.log(err.name);
// //       }
// //    );
// // } else {
// //    document.body.innerText ="getUserMedia not supported";
// //    console.log("getUserMedia not supported");
// //   }
// // }
 
// // video.addEventListener('play', () => {
// //   const canvas = faceapi.createCanvasFromMedia(video);
// //   document.body.append(canvas);
// //   const displaySize = { width: video.width, height: video.height };
// //   faceapi.matchDimensions(canvas, displaySize);
// //   setInterval(async () => {
// //     const predictions = await faceapi
// //       .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
// //       .withFaceLandmarks()
// //       .withFaceExpressions()
// //       .withAgeAndGender();
 
// //     const resizedDetections = faceapi.resizeResults(predictions, displaySize);
// //     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
// //     faceapi.draw.drawDetections(canvas, resizedDetections);
// //     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
// //     faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
// //     resizedDetections.forEach(result => {
// //       const { age, gender, genderProbability } = result;
// //       new faceapi.draw.DrawTextField(
// //         [
// //           `${faceapi.round(age, 0)} years`,
// //           `${gender} (${faceapi.round(genderProbability)})`
// //         ],
// //         result.detection.box.bottomRight
// //       ).draw(canvas);
// //     });
// //   }, 100)
// // })
