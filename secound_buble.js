//투명 rgba(255, 0, 0, 0)
//이벤트 onkeypress="onenterkey(event)"
let word = [
  "가지", "가나", "가변", "가난", "나라", "나주", "노가리",
  "누구", "누수", "노드", "내 것", "년도", "노상", "다람쥐",
  "다리미", "다짐", "도구", "도리", "두루미", "도넛", "도굴",
  "도주", "대추", "대리", "디지털", "드잡이", "드럼", "드림", "뒤주", "대구"
];

let score = 0;
setInterval(addbox, 3000);

function randomNumber(min, max) {
  let re = Math.floor(Math.random() * (max - min + 1) + min);
  return re;
}

function addbox() {
  let num = randomNumber(0,27);
  let texts = word[num];
  let body = document.querySelector("body");
  let newnav = document.createElement("div");
  let a = randomNumber(0, 255);
  let b = randomNumber(0, 255);
  let c = randomNumber(0, 255);

  newnav.style.backgroundColor = 'rgba(' + a + ',' + b + ',' + c + ')';
  newnav.style.color = 'rgba(' + (255 - a) + ',' + (255 - b) + ',' + (255 - c) + ')';
  newnav.style.top = window.innerHeight - 60;
  newnav.innerText = texts;

  newnav.setAttribute("id", "box");
  newnav.setAttribute("class", "buble");
  newnav.addEventListener("click", setmax);
  newnav.click();
  newnav.removeEventListener("click", setmax);
  newnav.click();
  body.appendChild(newnav);
};

function setmax() {
  let box = this;
  let maxX = window.innerWidth - 60;
  let maxY = 0;
  //console.log(maxX);
  //console.log(maxY);
  clearInterval(ani_1);
  ani_1(box, maxX, maxY);
}

function ani_1(box, maxX, maxY) {
  let posX = randomNumber(60, window.innerWidth - 60);
  let posY = window.innerHeight - 60;
  let rendom = Math.random();
  //let mox;
  let moy;

  //clearInterval(mox);
  //mox = setInterval(frame1,15);
  clearInterval(moy);
  moy = setInterval(frame2, 15);

  function clear() {
    //clearInterval(mox);
    clearInterval(moy);
    clearTimeout();
    box.style.backgroundColor = 'rgba(255, 0, 0, 0)';
    setTimeout(() => box.remove(), 3000);

    score = score + Math.floor(rendom * 100);
    let now = document.getElementById("nowscore");
    now.innerText = Math.floor(rendom * 100);
    let s = document.getElementById("score");
    s.innerText = score;
  }

  function frame2() {
    if (posY == window.innerHeight - 60) {
      box.style.left = posX + "px";
      box.addEventListener("click", clear);
      rendom = (rendom * window.innerWidth * 0.0025);
      //console.log(Math.floor(rendom * 100));
    }

    if (posY <= maxY) {
      box.style.top = 0 + "px";
      clearInterval(moy);
      //setTimeout(() => clearInterval(mox), (rendom * 1000 * 3));
      setTimeout(() => removbox(box), (rendom * 1000 * 2));
    } else {
      posY = posY - rendom;
      box.style.top = (posY) + "px";
    }
  }

  function frame1() {
    if (posX >= maxX) {
      box.style.left = maxX + "px";
      clearInterval(mox);
      setTimeout(() => clearInterval(moy), (rendom * 1000 * 5));
      setTimeout(() => removbox(box, 1), (rendom * 1000 * 5));
    } else {
      posX = posX + (posY * 0.001) + 0.4;
      box.style.left = posX + "px";
    }
  }
}

function removbox(box) {
  let rendom = Math.random();
  let txt = box.textContent;
  //console.log(box);
  setTimeout(() => addbox(txt), (rendom * 800));
  box.remove();
}

function onenterkey(event) {
  if (event.keyCode == 13) {
    let txt = document.getElementById("intext").value;
    checkbox(txt);
  }
}

function checkbox(texts) {
  let x = document.getElementsByClassName("buble");
  let y = x.length;
  let i = 0;

  for (i = 0; i < y; i++) {
    if (texts === document.getElementsByClassName('buble')[i].textContent) {
      //console.log(document.getElementsByClassName('buble')[i].textContent);
      let del = document.getElementsByClassName('buble')[i];
      del.click();
      let input = document.getElementById("intext");
      input.value = "";
      break;
    }
  }
}

