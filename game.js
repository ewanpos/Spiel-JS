let spieler = document.querySelector(".player");
let spielfeld = document.querySelector(".playground");
//Position vom Spieler
spieler.style.left = "150px";
spieler.style.top = "750px";
//Timer
let timer = new Timer(100);
let timerplayer = new Timer(100);
let timer100 = new Timer(120);

let positionBottom = false;
let positiontop = true;
let movePlayer = false;
let backgroundPosition = 0;
let punkteAnzeige = document.querySelector(".punkte");
punkteAnzeige.textContent = "100";
let score = 0;
const audio = new Audio("sounds/synthwav2.wav");
//loop
function loop() {
  //Punktanzeige
  audio.play();
  if (timer100.ready()) {
    punkteAnzeige.textContent = parseInt(punkteAnzeige.textContent) - 1;
  }
  //Player bewegen
  if (keyboardOnce(32) && !movePlayer) {
    movePlayer = true;
    if (positionBottom) {
      positionBottom = false;
    } else {
      positionBottom = true;
    }
  }
  //Player bewegt sich
  if (timerplayer && movePlayer) {
    if (positionBottom) {
      if (parseInt(spieler.style.top) > 50) {
        spieler.style.top = parseInt(spieler.style.top) - 8 + "px";
      } else {
        movePlayer = false;
      }
    } else {
      if (parseInt(spieler.style.top) < 750) {
        spieler.style.top = parseInt(spieler.style.top) + 8 + "px";
      } else {
        movePlayer = false;
      }
    }
  }
  //Objekte werden erstellt
  if (timer.ready()) {
    if (positionBottom) {
      let h = document.createElement("img");
      h.src = "/Textures/object.png";
      h.className = "steinbottom";
      h.style.top = "50px";
      h.style.left = 800 + Math.floor(Math.random() * 500) + "%";
      spielfeld.appendChild(h);
    } else if (positiontop) {
      let h = document.createElement("img");
      h.src = "/Textures/object.png";
      h.className = "steintop";
      h.style.bottom = "118px";
      h.style.left = 800 + Math.floor(Math.random() * 500) + "%";
      spielfeld.appendChild(h);
    }
  }
  //Objekte bewegen sich
  let steinetop = document.querySelectorAll(".steintop");
  for (let steintop of steinetop) {
    steintop.style.left = parseInt(steintop.style.left) - 5 + "px";
    if (parseInt(steintop.style.top) > 400) {
      steintop.parentNode.removeChild(steintop);
    }
  }
  let steinebottom = document.querySelectorAll(".steinbottom");
  for (let steinbottom of steinebottom) {
    steinbottom.style.left = parseInt(steinbottom.style.left) - 5 + "px";
    if (parseInt(steinbottom.style.bottom) > 400) {
      steinbottom.parentNode.removeChild(steinbottom);
    }
  }
  //Background bewegt sich
  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;
  window.requestAnimationFrame(loop);
  //Kollision
  if (anyCollision(spieler, steinetop)) {
    location.replace("/gameover.html");
    punkteAnzeige.textContent = "100";
  }
  if (anyCollision(spieler, steinebottom)) {
    location.replace("/gameover.html");
    punkteAnzeige.textContent = "100";
  }
  //Gewinnen
  if (parseInt(punkteAnzeige.textContent) == 0) {
    location.replace("/gewinner.html");
    punkteAnzeige.textContent = "100";
  }
}

window.requestAnimationFrame(loop);
