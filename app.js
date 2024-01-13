// app.js

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("capture");
const ctx = canvas.getContext("2d");
const body = document.body;
const heading = document.getElementById("heading");

body.addEventListener("click", () => {
  body.style.backgroundColor = "black";
  heading.innerText = "YOUR PHONE HAS BEEN HACKED :)";
  heading.style.color = "green";
});

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error("Error accessing the camera:", err);
  });

captureButton.addEventListener("click", () => {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL("image/png");
  //   console.log(imageData);

  fetch("http://localhost:8084/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageData }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error during fetch:", error);
    });
});
