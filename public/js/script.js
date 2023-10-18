let startBtn = document.querySelector("#start");
let pauseBtn = document.querySelector("#pause");
let stopBtn = document.querySelector("#reset");
let recordBtn = document.querySelector("#record");

let hours = document.querySelector("#hours");
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds");
let secTenth = document.querySelector("#secTenth");

let timer = new easytimer.Timer();

timer.addEventListener("secondTenthsUpdated", () => {
  const obj = timer.getTimeValues();

  hours.innerText = obj.hours.toString().padStart(2, "0");
  minutes.innerText = obj.minutes.toString().padStart(2, "0");
  seconds.innerText = obj.seconds.toString().padStart(2, "0");
  secTenth.innerText = obj.secondTenths.toString().padStart(2, "0");
});

function recordTime() {
  let time = timer.getTimeValues(hours, minutes);
  return time;
}

function insertTime() {
  let duration = document.getElementById("duration");
  let time = recordTime();

  duration.value = time;
}

startBtn.addEventListener("click", () => {
  timer.start({
    precision: "secondTenths",
  });
});
pauseBtn.addEventListener("click", () => {
  timer.pause();
});
stopBtn.addEventListener("click", () => {
  timer.stop();
});
recordBtn.addEventListener("click", () => {
  insertTime();
});
