"use strict";

/* =========================
   Storage keys
========================= */
const K_WEEK = "uniweek_selectedWeek";
const K_CLASSES = "uniweek_classes";
const K_WISH_HISTORY = "uniweek_wishHistory10";
const K_WISH_LASTMAP = "uniweek_wishLastMap";
const K_QUIZ_LEVEL = "uniweek_quizLevel";
const quizHistKey = (level) => `uniweek_quizHistory8_${level}`;

/* =========================
   DOM helpers
========================= */
const $ = (id) => document.getElementById(id);

const tabSchedule = $("tabSchedule");
const tabWishes = $("tabWishes");
const tabSettings = $("tabSettings");

const screenSchedule = $("screenSchedule");
const screenWishes = $("screenWishes");
const screenSettings = $("screenSettings");

const weekOddBtn = $("weekOddBtn");
const weekEvenBtn = $("weekEvenBtn");

const todayLabel = $("todayLabel");
const todayList = $("todayList");
const weekGrid = $("weekGrid");

const newWishBtn = $("newWishBtn");
const wishBox = $("wishBox");

const addClassBtn = $("addClassBtn");
const csvInput = $("csvInput");
const clearScheduleBtn = $("clearScheduleBtn");

const classDialog = $("classDialog");
const classForm = $("classForm");

const memoryGridEl = $("memoryGrid");
const memoryStatus = $("memoryStatus");
const memoryStartBtn = $("memoryStartBtn");
const memoryResetBtn = $("memoryResetBtn");
const memoryLevelLabel = $("memoryLevelLabel");

const quizScore = $("quizScore");
const quizQuestion = $("quizQuestion");
const quizOptions = $("quizOptions");
const quizNextBtn = $("quizNextBtn");
const quizResetBtn = $("quizResetBtn");
const quizFeedback = $("quizFeedback");
const quizEasyBtn = $("quizEasyBtn");
const quizMedBtn = $("quizMedBtn");
const quizHardBtn = $("quizHardBtn");

const celebrate = $("celebrate");
const celebrateParticles = $("celebrateParticles");
const celebrateTitle = $("celebrateTitle");
const celebrateSub = $("celebrateSub");

/* =========================
   Wishes
========================= */
const BASE_WISHES = [
  "Доброе утро, Алина 💗 Ты справишься со всем сегодня.",
  "Пусть день будет мягким и спокойным 🌸",
  "Ты умная и сильная. Я верю в тебя 💗",
  "Если станет трудно — просто вспомни: ты не одна 💗",
  "Пусть пары пройдут легко ✨",
  "Я рядом мыслями 💞",
  "Ты моя гордость 💗",
  "Сегодня всё получится 🌷",
  "Ты прекрасная 🥰",
  "Дыши глубже — ты уже молодец 💗"
];

const PRAISES = [
  { t:"Ты моя умничка 💗🥰", s:"Так держать! ✨" },
  { t:"Вау! Ты супер 💖", s:"Я тобой горжусь 😍" },
  { t:"Браво! 💗", s:"Ты отлично справляешься 🌸" },
  { t:"Ты космос ⭐️", s:"Продолжай 🚀" },
  { t:"Молодец! 💞", s:"Ещё один шаг вперёд ✨" }
];

/* =========================
   Helpers
========================= */
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function isoDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function daysBetween(a,b){
  const da=new Date(a).getTime();
  const db=new Date(b).getTime();
  return Math.floor((db-da)/(1000*60*60*24));
}
function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
function rand(min,max){ return Math.random()*(max-min)+min; }

/* =========================
   Wishes (anti-repeat)
========================= */
function pickWishSmart(){
  const history=loadJSON(K_WISH_HISTORY,[]);
  const lastMap=loadJSON(K_WISH_LASTMAP,{});
  const today=isoDate();
  const inLast10=new Set(history);

  let pool=BASE_WISHES.filter(w=>{
    if(inLast10.has(w))return false;
    const last=lastMap[w];
    if(!last)return true;
    return daysBetween(last,today)>=3;
  });

  if(!pool.length) pool=BASE_WISHES.slice();
  return pool[Math.floor(Math.random()*pool.length)];
}
function setNewWish(){
  const w=pickWishSmart();
  wishBox.textContent=w;

  const today=isoDate();
  const history=loadJSON(K_WISH_HISTORY,[]);
  const lastMap=loadJSON(K_WISH_LASTMAP,{});

  history.unshift(w);
  saveJSON(K_WISH_HISTORY,history.slice(0,10));
  lastMap[w]=today;
  saveJSON(K_WISH_LASTMAP,lastMap);
}

/* =========================
   Celebration (FIXED)
========================= */
let celebrateTimer=null;

function showCelebrate(ms=1100){
  return new Promise(resolve=>{
    const pick=PRAISES[Math.floor(Math.random()*PRAISES.length)];
    celebrateTitle.textContent=pick.t;
    celebrateSub.textContent=pick.s;

    celebrateParticles.innerHTML="";
    celebrate.classList.remove("hidden");

    const emojis=["💗","💖","💕","✨","🎉","🥰","🌸"];
    for(let i=0;i<30;i++){
      const p=document.createElement("div");
      p.className="particle";
      p.textContent=emojis[Math.floor(Math.random()*emojis.length)];
      p.style.left=rand(0,100)+"vw";
      p.style.animationDelay=rand(0,0.2)+"s";
      celebrateParticles.appendChild(p);
    }

    if(celebrateTimer)clearTimeout(celebrateTimer);
    celebrateTimer=setTimeout(()=>{
      hideCelebrate();
      resolve();
    },ms);
  });
}
function hideCelebrate(){
  if(celebrateTimer){
    clearTimeout(celebrateTimer);
    celebrateTimer=null;
  }
  celebrate.classList.add("hidden");
  celebrateParticles.innerHTML="";
}
celebrate.addEventListener("click",hideCelebrate);

/* =========================
   Memory (FIXED)
========================= */
let memSequence=[];
let memUserIndex=0;
let memLevel=0;
let memShowing=false;
let memActive=false;

const MEM_EMOJIS=["💗","🌸","✨","😊"];

function rebuildMemoryGrid(){
  memoryGridEl.innerHTML="";
  MEM_EMOJIS.forEach((emoji,i)=>{
    const b=document.createElement("button");
    b.className="memBtn";
    b.dataset.pad=i;
    b.textContent="♡";
    b.addEventListener("click",()=>handleMemClick(i));
    memoryGridEl.appendChild(b);
  });
}

async function flashPad(i){
  const btn=memoryGridEl.children[i];
  btn.textContent=MEM_EMOJIS[i];
  btn.classList.add("flash");
  await sleep(400);
  btn.textContent="♡";
  btn.classList.remove("flash");
  await sleep(200);
}

async function showSequence(){
  memShowing=true;
  memoryStatus.textContent="Смотри внимательно…";
  for(const i of memSequence) await flashPad(i);
  memShowing=false;
  memoryStatus.textContent="Теперь твоя очередь";
}

async function memoryStart(){
  memActive=true;
  memLevel=1;
  memSequence=[];
  memUserIndex=0;
  memSequence.push(Math.floor(Math.random()*4));
  await showSequence();
}

async function memoryNextLevel(){
  memShowing=true;
  await showCelebrate(1100);

  memLevel++;
  memUserIndex=0;
  memSequence.push(Math.floor(Math.random()*4));

  await sleep(250);
  memShowing=false;
  await showSequence();
}

function memoryFail(){
  memActive=false;
  memoryStatus.textContent="Ошибка 😅 Нажми Start";
  memLevel=0;
  memSequence=[];
  memUserIndex=0;
}

async function handleMemClick(i){
  if(!memActive||memShowing)return;

  await flashPad(i);

  if(i!==memSequence[memUserIndex]){
    memoryFail();
    return;
  }

  memUserIndex++;
  if(memUserIndex>=memSequence.length){
    await memoryNextLevel();
  }
}

memoryStartBtn.addEventListener("click",memoryStart);
memoryResetBtn.addEventListener("click",()=>{
  memActive=false;
  memLevel=0;
  memSequence=[];
  memUserIndex=0;
  memoryStatus.textContent="Нажми Start";
  rebuildMemoryGrid();
});

/* =========================
   Init
========================= */
function init(){
  setNewWish();
  rebuildMemoryGrid();
}
init();
