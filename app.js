"use strict";

/* =========================
   Storage keys
========================= */
const K_WEEK = "uniweek_selectedWeek";          // "odd" | "even"
const K_CLASSES = "uniweek_classes";            // array

const K_WISH_HISTORY = "uniweek_wishHistory10"; // last 10 wishes
const K_WISH_LASTMAP = "uniweek_wishLastMap";   // {wish: "YYYY-MM-DD"}

const K_QUIZ_LEVEL = "uniweek_quizLevel";       // easy|medium|hard
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
   Data
========================= */
const DAYS = [
  { key: "monday", name: "Понедельник", sort: 1 },
  { key: "tuesday", name: "Вторник", sort: 2 },
  { key: "wednesday", name: "Среда", sort: 3 },
  { key: "thursday", name: "Четверг", sort: 4 },
  { key: "friday", name: "Пятница", sort: 5 },
  { key: "saturday", name: "Суббота", sort: 6 },
];

const BASE_WISHES = [
  "Доброе утро, Алина 💗 Ты справишься со всем сегодня.",
  "Пусть день будет мягким, а мысли — спокойными 🌸",
  "Ты умная и сильная. Я верю в тебя всегда 💗",
  "Пусть сегодня будет хоть одна маленькая радость — и она будет твоей ✨",
  "Если станет трудно — просто вспомни: ты не одна 💗",
  "Пусть пары пройдут легко, а настроение будет тёплым и спокойным 🌷",
  "Ты прекрасная. И у тебя всё получится 💗",
  "Дыши глубже. Ты уже молодец 🙂",
  "Пусть всё важное получится с первого раза ✨",
  "Я рядом мыслями. Всегда 💗",
  "Ты — моя гордость. Без условий 💞",
  "Если устала — сделай паузу. Ты не обязана быть идеальной ☁️",
  "Сегодня твоя улыбка — главный план дня 😊",
  "Я люблю тебя. И точка 💗",
  "Пусть даже сложное станет понятным ✨",
  "Я мысленно держу тебя за руку 💗",
];

const PRAISES = [
  { t:"Ты моя умничка 💗🥰", s:"Так держать! ✨" },
  { t:"Вау! Ты супер 💖", s:"Я тобой горжусь 😍" },
  { t:"Браво, красавица 💗", s:"У тебя отлично получается 🌸" },
  { t:"Ты просто космос ⭐️", s:"Продолжай в том же духе 🚀" },
  { t:"Гордость моя 💞", s:"Ещё чуть-чуть — и будет рекорд ✨" },
  { t:"Умничкааа 💗", s:"Ты справилась идеально 😌" },
  { t:"Ты сильная 💪💗", s:"И очень-очень умная 🥰" },
  { t:"Красиво сделано 💖", s:"Вот это уровень! 🎉" },
  { t:"Молодец, Алина 🌷", s:"Ты сияешь ✨" },
  { t:"Победа! 💕", s:"Так приятно смотреть на твой прогресс 😊" },
  { t:"Ты — лучшая 💗", s:"Я в тебя верю всегда 🌸" },
  { t:"Супер-умница 🥰", s:"Ещё один шаг вперёд ✨" },
  { t:"Это было круто 💖", s:"Ты реально молодец 😍" },
  { t:"Умничка моя 💞", s:"Я горжусь тобой 💗" },
  { t:"Ты справилась ⭐️", s:"И это только начало 🌷" },
  { t:"Как же ты хороша 💗", s:"Продолжай, я рядом 😊" },
  { t:"Шикарно! 💕", s:"Ты очень способная ✨" },
  { t:"Так держать 💖", s:"Ты делаешь это красиво 🌸" },
  { t:"Аплодисменты 👏💗", s:"Ты умница-умница 🥰" },
  { t:"Великолепно ⭐️", s:"Ещё один успех 🎉" },
  { t:"Ты победительница 💗", s:"Вот это характер 💪" },
  { t:"Солнце, ты молодец 🌞", s:"Я улыбаюсь от гордости 😊" },
  { t:"Идеально 💖", s:"Ты на высоте ✨" },
  { t:"Крутая! 💞", s:"Прямо как я люблю 😍" },
  { t:"Талант 💗", s:"И труд — лучшая комбинация 🌸" },
  { t:"Прекрасно 🥰", s:"Ещё разочек? 😉" },
  { t:"Умница моя 💕", s:"Ты можешь всё ✨" },
  { t:"Сильно! 💖", s:"Это было уверенно 💪" },
  { t:"Чудо моё 💗", s:"Ты делаешь мой день лучше 🌷" },
  { t:"Вот это да! ⭐️", s:"Ты растёшь на глазах ✨" },
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
function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function getWeek() {
  const w = localStorage.getItem(K_WEEK);
  return (w === "odd" || w === "even") ? w : "odd";
}
function setWeek(w) {
  localStorage.setItem(K_WEEK, w);
  updateWeekUI();
  renderAll();
}

function parseHHmmToMinutes(s) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(s).trim());
  if (!m) return null;
  const hh = Number(m[1]), mm = Number(m[2]);
  if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return null;
  return hh * 60 + mm;
}
function minutesToHHmm(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return String(h).padStart(2,"0") + ":" + String(m).padStart(2,"0");
}
function normalizeHex(hex) {
  if (!hex) return null;
  let c = String(hex).trim().replace("#","");
  if (!/^[0-9a-fA-F]{6}$/.test(c)) return null;
  return c.toUpperCase();
}
function uuid() {
  return (crypto?.randomUUID) ? crypto.randomUUID() : ("id_" + Math.random().toString(16).slice(2) + "_" + Date.now());
}
function isoDate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
function daysBetween(isoA, isoB) {
  const [ay, am, ad] = isoA.split("-").map(Number);
  const [by, bm, bd] = isoB.split("-").map(Number);
  const a = new Date(ay, am-1, ad).getTime();
  const b = new Date(by, bm-1, bd).getTime();
  return Math.floor((b - a) / (1000*60*60*24));
}
function todayDayKey() {
  const wd = new Date().getDay(); // 0 Sun ... 6 Sat
  const map = {1:"monday",2:"tuesday",3:"wednesday",4:"thursday",5:"friday",6:"saturday"};
  return map[wd] || null;
}
function formatTodayLabel() {
  return new Date().toLocaleDateString("ru-RU", { weekday:"long", day:"2-digit", month:"long" });
}
function weekFilterOK(item, selectedWeek) {
  return selectedWeek === "odd"
    ? (item.weekType === "odd" || item.weekType === "both")
    : (item.weekType === "even" || item.weekType === "both");
}
function sortClasses(a, b) {
  const da = DAYS.find(d => d.key === a.dayOfWeek)?.sort ?? 99;
  const db = DAYS.find(d => d.key === b.dayOfWeek)?.sort ?? 99;
  if (da !== db) return da - db;
  return a.startMinutes - b.startMinutes;
}

/* =========================
   Tabs
========================= */
function showTab(which) {
  const s = which === "schedule";
  const w = which === "wishes";
  const st = which === "settings";

  tabSchedule.classList.toggle("active", s);
  tabWishes.classList.toggle("active", w);
  tabSettings.classList.toggle("active", st);

  screenSchedule.classList.toggle("active", s);
  screenWishes.classList.toggle("active", w);
  screenSettings.classList.toggle("active", st);
}

/* =========================
   Week UI
========================= */
function updateWeekUI() {
  const w = getWeek();
  weekOddBtn.classList.toggle("active", w === "odd");
  weekEvenBtn.classList.toggle("active", w === "even");
}

/* =========================
   Schedule rendering
========================= */
function renderClassItem(item, compact=false) {
  const el = document.createElement("div");
  el.className = "item";

  const dot = document.createElement("div");
  dot.className = "dot";
  if (item.colorHex) dot.style.background = "#" + item.colorHex;
  el.appendChild(dot);

  const main = document.createElement("div");
  main.className = "itemMain";

  const top = document.createElement("div");
  top.className = "itemTop";

  const title = document.createElement("div");
  title.className = "itemTitle";
  title.textContent = item.courseName;

  const meta = document.createElement("div");
  meta.className = "itemMeta";
  meta.textContent = `${minutesToHHmm(item.startMinutes)}–${minutesToHHmm(item.endMinutes)} • ${item.classType}`;

  top.appendChild(title);
  top.appendChild(meta);
  main.appendChild(top);

  const subParts = [];
  if (!compact) subParts.push(item.weekType.toUpperCase());
  if (item.location) subParts.push(item.location);

  if (subParts.length) {
    const sub = document.createElement("div");
    sub.className = "itemSub";
    sub.textContent = subParts.join(" • ");
    main.appendChild(sub);
  }

  el.appendChild(main);
  return el;
}

function renderToday() {
  todayLabel.textContent = formatTodayLabel();
  const selectedWeek = getWeek();
  const classes = loadJSON(K_CLASSES, []).sort(sortClasses);

  const key = todayDayKey();
  const items = key ? classes.filter(c => c.dayOfWeek === key && weekFilterOK(c, selectedWeek)) : [];

  todayList.innerHTML = "";
  if (!key) {
    todayList.innerHTML = `<div class="smallMuted">Сегодня воскресенье — расписание отображаем Пн–Сб 💗</div>`;
    return;
  }
  if (!items.length) {
    todayList.innerHTML = `<div class="smallMuted">На сегодня пар нет (или они в другой неделе).</div>`;
    return;
  }
  for (const it of items) todayList.appendChild(renderClassItem(it));
}

function renderWeek() {
  const selectedWeek = getWeek();
  const classes = loadJSON(K_CLASSES, []).sort(sortClasses);

  weekGrid.innerHTML = "";
  for (const day of DAYS) {
    const dayItems = classes
      .filter(c => c.dayOfWeek === day.key && weekFilterOK(c, selectedWeek))
      .sort((a,b)=>a.startMinutes-b.startMinutes);

    const wrap = document.createElement("div");
    wrap.className = "dayBlock";

    const t = document.createElement("div");
    t.className = "dayTitle";
    t.textContent = day.name;
    wrap.appendChild(t);

    if (!dayItems.length) {
      const e = document.createElement("div");
      e.className = "dayEmpty";
      e.textContent = "Нет пар";
      wrap.appendChild(e);
    } else {
      const list = document.createElement("div");
      list.className = "list";
      for (const it of dayItems) list.appendChild(renderClassItem(it, true));
      wrap.appendChild(list);
    }

    weekGrid.appendChild(wrap);
  }
}

function renderAll() {
  renderToday();
  renderWeek();
}

/* =========================
   CSV Import
========================= */
function splitCSVLine(line) {
  let res = [];
  let cur = "";
  let inQ = false;
  for (const ch of line) {
    if (ch === '"') { inQ = !inQ; continue; }
    if (ch === "," && !inQ) { res.push(cur); cur = ""; }
    else cur += ch;
  }
  res.push(cur);
  return res;
}

function parseCSV(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (!lines.length) throw new Error("Пустой CSV.");

  const expected = "coursename,type,dayofweek,starttime,endtime,weektype,location,color";
  const header = lines[0].toLowerCase();
  if (header !== expected) throw new Error("Неверный заголовок CSV.\nОжидаю:\n" + expected);

  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const n = i + 1;
    const cols = splitCSVLine(lines[i]);
    if (cols.length !== 8) throw new Error(`Строка ${n}: нужно 8 колонок, найдено ${cols.length}.`);

    const courseName = cols[0].trim();
    const classType = cols[1].trim().toLowerCase();
    const dayOfWeek = cols[2].trim().toLowerCase();
    const startTime = cols[3].trim();
    const endTime = cols[4].trim();
    const weekType = cols[5].trim().toLowerCase();
    const location = cols[6].trim();
    const colorHex = normalizeHex(cols[7].trim());

    if (!courseName) throw new Error(`Строка ${n}: courseName пустой.`);
    if (!["lecture","seminar","lab"].includes(classType)) throw new Error(`Строка ${n}: неверный type.`);
    if (!DAYS.some(d => d.key === dayOfWeek)) throw new Error(`Строка ${n}: неверный dayOfWeek.`);
    if (!["odd","even","both"].includes(weekType)) throw new Error(`Строка ${n}: неверный weekType.`);

    const sMin = parseHHmmToMinutes(startTime);
    const eMin = parseHHmmToMinutes(endTime);
    if (sMin == null) throw new Error(`Строка ${n}: неверный startTime (HH:mm).`);
    if (eMin == null) throw new Error(`Строка ${n}: неверный endTime (HH:mm).`);
    if (sMin >= eMin) throw new Error(`Строка ${n}: startTime должен быть раньше endTime.`);

    out.push({
      id: uuid(),
      courseName,
      classType,
      dayOfWeek,
      startMinutes: sMin,
      endMinutes: eMin,
      weekType,
      location: location ? location : null,
      colorHex: colorHex ? colorHex : null,
    });
  }
  return out;
}

/* =========================
   Add class (manual)
========================= */
function openAddClass() {
  classForm.reset();
  classDialog.showModal();
}

function saveClassFromForm() {
  const fd = new FormData(classForm);

  const courseName = String(fd.get("courseName") || "").trim();
  const classType = String(fd.get("classType") || "").trim().toLowerCase();
  const dayOfWeek = String(fd.get("dayOfWeek") || "").trim().toLowerCase();
  const weekType = String(fd.get("weekType") || "").trim().toLowerCase();
  const startMinutes = parseHHmmToMinutes(String(fd.get("startTime") || "").trim());
  const endMinutes = parseHHmmToMinutes(String(fd.get("endTime") || "").trim());
  const location = String(fd.get("location") || "").trim();
  const colorHex = normalizeHex(String(fd.get("colorHex") || "").trim());

  if (!courseName) return alert("Введите название пары.");
  if (!["lecture","seminar","lab"].includes(classType)) return alert("Неверный тип.");
  if (!DAYS.some(d => d.key === dayOfWeek)) return alert("Неверный день.");
  if (!["odd","even","both"].includes(weekType)) return alert("Неверный тип недели.");
  if (startMinutes == null || endMinutes == null) return alert("Время должно быть в формате HH:mm");
  if (startMinutes >= endMinutes) return alert("Начало должно быть раньше конца.");

  const item = {
    id: uuid(),
    courseName,
    classType,
    dayOfWeek,
    startMinutes,
    endMinutes,
    weekType,
    location: location ? location : null,
    colorHex: colorHex ? colorHex : null,
  };

  const classes = loadJSON(K_CLASSES, []);
  classes.push(item);
  saveJSON(K_CLASSES, classes);

  classDialog.close();
  renderAll();
}

/* =========================
   Wishes (anti-repeat)
========================= */
function pickWishSmart() {
  const history = loadJSON(K_WISH_HISTORY, []);
  const lastMap = loadJSON(K_WISH_LASTMAP, {});
  const today = isoDate();
  const inLast10 = new Set(history);

  let pool = BASE_WISHES.filter(w => {
    if (inLast10.has(w)) return false;
    const last = lastMap[w];
    if (!last) return true;
    return daysBetween(last, today) >= 3; // не повторять чаще чем раз в 3 дня
  });

  if (!pool.length) pool = BASE_WISHES.filter(w => !inLast10.has(w));
  if (!pool.length) pool = BASE_WISHES.slice();

  return pool[Math.floor(Math.random() * pool.length)];
}

function setNewWish() {
  const w = pickWishSmart();
  wishBox.textContent = w;

  const today = isoDate();
  const history = loadJSON(K_WISH_HISTORY, []);
  const lastMap = loadJSON(K_WISH_LASTMAP, {});

  history.unshift(w);
  saveJSON(K_WISH_HISTORY, history.slice(0, 10));
  lastMap[w] = today;
  saveJSON(K_WISH_LASTMAP, lastMap);
}

/* =========================
   Celebration
========================= */
function rand(min, max) { return Math.random() * (max - min) + min; }

function showCelebrate() {
  const pick = PRAISES[Math.floor(Math.random() * PRAISES.length)];
  celebrateTitle.textContent = pick.t;
  celebrateSub.textContent = pick.s;

  celebrateParticles.innerHTML = "";
  celebrate.classList.remove("hidden");
  celebrate.setAttribute("aria-hidden", "false");

  const emojis = ["💗","💖","💕","💞","✨","🎉","🥰","😊","🌸","🌷","⭐️"];
  const count = 32;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = rand(0, 100) + "vw";
    p.style.animationDelay = rand(0, 0.18) + "s";
    p.style.animationDuration = rand(1.05, 1.55) + "s";
    p.style.fontSize = rand(16, 28) + "px";
    celebrateParticles.appendChild(p);
  }

  setTimeout(hideCelebrate, 1350);
}
function hideCelebrate() {
  celebrate.classList.add("hidden");
  celebrate.setAttribute("aria-hidden", "true");
  celebrateParticles.innerHTML = "";
}
celebrate.addEventListener("click", hideCelebrate);

/* =========================
   Memory (Simon-like)
========================= */
let memButtons = [];
let memSequence = [];
let memUserIndex = 0;
let memLevel = 0;
let memShowing = false;
let memActive = false;

let memPadCount = 4;
const MEM_MAX_PADS = 16;

const MEM_COLORS = [
  "rgba(247,168,198,.35)",
  "rgba(255,214,231,.60)",
  "rgba(247,168,198,.22)",
  "rgba(255,214,231,.38)",
  "rgba(252,227,238,.70)",
  "rgba(247,168,198,.28)",
  "rgba(255,214,231,.48)",
  "rgba(247,168,198,.18)"
];

const MEM_EMOJIS = ["💗","🌸","✨","😊","🥰","🌷","⭐️","🍓","🧸","🎀","🍬","☁️","🫶","💖","💕","😌"];
const MEM_COVER = "♡";

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function setMemoryUI(text) {
  memoryStatus.textContent = text;
  memoryLevelLabel.textContent = `Level: ${memLevel}`;
}

function updatePadCountForLevel() {
  memPadCount = Math.min(4 + Math.max(0, memLevel - 1), MEM_MAX_PADS);
  const cols = Math.ceil(Math.sqrt(memPadCount));
  memoryGridEl.style.setProperty("--cols", String(cols));
}

function rebuildMemoryGrid() {
  memoryGridEl.innerHTML = "";
  memButtons = [];

  for (let i = 0; i < memPadCount; i++) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "memBtn";
    b.dataset.pad = String(i);
    b.style.background = MEM_COLORS[i % MEM_COLORS.length];
    b.dataset.emoji = MEM_EMOJIS[i % MEM_EMOJIS.length];
    b.textContent = MEM_COVER;
    memoryGridEl.appendChild(b);
    memButtons.push(b);
  }
}

async function flashPad(i) {
  const btn = memButtons[i];
  if (!btn) return;

  btn.textContent = btn.dataset.emoji || "💗";
  btn.style.color = "rgba(0,0,0,.55)";
  btn.classList.add("flash");

  await sleep(420);

  btn.classList.remove("flash");
  btn.textContent = MEM_COVER;
  btn.style.color = "rgba(0,0,0,.35)";

  await sleep(220);
}

function addRandomStep() {
  memSequence.push(Math.floor(Math.random() * memPadCount));
}

async function showSequence() {
  memShowing = true;
  setMemoryUI("Смотри внимательно…");
  await sleep(200);
  for (const i of memSequence) await flashPad(i);
  memShowing = false;
  setMemoryUI("Теперь твоя очередь");
}

async function memoryStart() {
  memActive = true;
  memLevel = 1;
  memSequence = [];
  memUserIndex = 0;

  updatePadCountForLevel();
  rebuildMemoryGrid();
  addRandomStep();

  await sleep(200);
  await showSequence();
}

async function memoryNextLevel() {
  showCelebrate();

  memLevel += 1;
  memUserIndex = 0;

  updatePadCountForLevel();
  rebuildMemoryGrid();
  addRandomStep();

  await sleep(480);
  await showSequence();
}

function memoryFail() {
  memActive = false;
  setMemoryUI(`Ошибка 😅 Был уровень ${memLevel}. Нажми Start`);
  memLevel = 0;
  memSequence = [];
  memUserIndex = 0;

  memPadCount = 4;
  memoryGridEl.style.setProperty("--cols", "2");
  rebuildMemoryGrid();
}

function memoryReset() {
  memActive = false;
  memShowing = false;
  memLevel = 0;
  memSequence = [];
  memUserIndex = 0;

  memPadCount = 4;
  memoryGridEl.style.setProperty("--cols", "2");
  rebuildMemoryGrid();
  setMemoryUI("Нажми Start");
}

async function handleMemClick(padIndex) {
  if (!memActive || memShowing) return;

  await flashPad(padIndex);

  if (padIndex !== memSequence[memUserIndex]) {
    memoryFail();
    return;
  }

  memUserIndex += 1;
  if (memUserIndex >= memSequence.length) {
    await memoryNextLevel();
  }
}

memoryGridEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".memBtn");
  if (!btn) return;
  handleMemClick(Number(btn.dataset.pad));
});

/* =========================
   Quiz (anti-repeat)
========================= */
const QUESTIONS = [
  // EASY
  { id:"e1", level:"easy", q:"Сколько минут в 2 часах 30 мин?", opts:["120","150","180","210"], a:1 },
  { id:"e2", level:"easy", q:"Продолжи: понедельник, вторник, …", opts:["четверг","суббота","пятница","среда"], a:3 },
  { id:"e3", level:"easy", q:"Столица Японии?", opts:["Киото","Токио","Осака","Нагоя"], a:1 },
  { id:"e4", level:"easy", q:"Сколько будет 9×7?", opts:["56","63","72","79"], a:1 },
  { id:"e5", level:"easy", q:"Что тяжелее: 1 кг ваты или 1 кг железа?", opts:["Вата","Железо","Одинаково","Зависит"], a:2 },

  // MEDIUM
  { id:"m1", level:"medium", q:"Продолжи ряд: 3, 6, 12, 24, ?", opts:["27","36","48","60"], a:2 },
  { id:"m2", level:"medium", q:"Если 5x − 10 = 15, то x =", opts:["3","4","5","6"], a:2 },
  { id:"m3", level:"medium", q:"Чему равно 12.5% от 240?", opts:["24","30","36","48"], a:1 },
  { id:"m4", level:"medium", q:"Какой газ преобладает в атмосфере Земли?", opts:["Кислород","Азот","Углекислый газ","Водород"], a:1 },
  { id:"m5", level:"medium", q:"Лишнее слово: квадрат, треугольник, круг, куб", opts:["квадрат","треугольник","круг","куб"], a:3 },
  { id:"m6", level:"medium", q:"Сколько секунд в 2.5 минут?", opts:["120","130","150","180"], a:2 },

  // HARD
  { id:"h1", level:"hard", q:"1, 1, 2, 3, 5, 8, ? (Фибоначчи)", opts:["11","12","13","15"], a:2 },
  { id:"h2", level:"hard", q:"Если a:b = 2:5 и b = 40, то a =", opts:["8","10","16","20"], a:3 },
  { id:"h3", level:"hard", q:"(8×7) − (6×5) =", opts:["26","28","30","32"], a:1 },
  { id:"h4", level:"hard", q:"Сколько хромосом у человека (в соматической клетке)?", opts:["44","46","48","52"], a:1 },
  { id:"h5", level:"hard", q:"Какое из этих чудес света — античное?", opts:["Колизей","Маяк в Александрии","Эйфелева башня","Биг-Бен"], a:1 },
  { id:"h6", level:"hard", q:"Антоним слова «изобилие»:", opts:["скудость","щедрость","богатство","излишек"], a:0 }
];

let quizCorrect = 0;
let quizTotal = 0;
let quizCurrent = null;
let quizLocked = false;

function getQuizLevel() {
  const v = localStorage.getItem(K_QUIZ_LEVEL);
  return (v === "easy" || v === "medium" || v === "hard") ? v : "medium";
}
function setQuizLevel(level) {
  localStorage.setItem(K_QUIZ_LEVEL, level);
  updateQuizLevelUI();
  nextQuiz();
}
function updateQuizLevelUI() {
  const level = getQuizLevel();
  quizEasyBtn.classList.toggle("active", level === "easy");
  quizMedBtn.classList.toggle("active", level === "medium");
  quizHardBtn.classList.toggle("active", level === "hard");
}
function updateQuizScore() {
  quizScore.textContent = `${quizCorrect} / ${quizTotal}`;
}

function renderQuizQuestion() {
  quizFeedback.textContent = "";
  quizOptions.innerHTML = "";
  quizLocked = false;

  if (!quizCurrent) {
    quizQuestion.textContent = "Нажми “Next”, чтобы начать.";
    return;
  }

  quizQuestion.textContent = quizCurrent.q;

  quizCurrent.opts.forEach((text, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "quizOptBtn";
    b.textContent = text;
    b.addEventListener("click", () => chooseQuiz(idx, b));
    quizOptions.appendChild(b);
  });
}

function nextQuiz() {
  const level = getQuizLevel();
  const hist = loadJSON(quizHistKey(level), []);
  const recent = new Set(hist);

  let pool = QUESTIONS.filter(q => q.level === level && !recent.has(q.id));
  if (!pool.length) pool = QUESTIONS.filter(q => q.level === level);
  if (!pool.length) pool = QUESTIONS.slice();

  quizCurrent = pool[Math.floor(Math.random() * pool.length)];
  renderQuizQuestion();

  hist.unshift(quizCurrent.id);
  saveJSON(quizHistKey(level), hist.slice(0, 8));
}

function chooseQuiz(idx, btnEl) {
  if (!quizCurrent || quizLocked) return;
  quizLocked = true;

  quizTotal += 1;
  const correctIdx = quizCurrent.a;

  const buttons = Array.from(quizOptions.querySelectorAll(".quizOptBtn"));

  if (idx === correctIdx) {
    quizCorrect += 1;
    btnEl.classList.add("correct");
    quizFeedback.textContent = "Верно ✅";
    showCelebrate();
  } else {
    btnEl.classList.add("wrong");
    buttons[correctIdx]?.classList.add("correct");
    quizFeedback.textContent = "Не совсем 🙂";
  }

  updateQuizScore();
}

function resetQuiz() {
  quizCorrect = 0;
  quizTotal = 0;
  quizCurrent = null;
  quizLocked = false;
  updateQuizScore();
  renderQuizQuestion();

  const level = getQuizLevel();
  localStorage.removeItem(quizHistKey(level));
}

/* =========================
   Events
========================= */
// tabs
tabSchedule.addEventListener("click", () => showTab("schedule"));
tabWishes.addEventListener("click", () => showTab("wishes"));
tabSettings.addEventListener("click", () => showTab("settings"));

// week
weekOddBtn.addEventListener("click", () => setWeek("odd"));
weekEvenBtn.addEventListener("click", () => setWeek("even"));

// wishes
newWishBtn.addEventListener("click", setNewWish);

// schedule settings
addClassBtn.addEventListener("click", openAddClass);
classForm.addEventListener("submit", (e) => { e.preventDefault(); saveClassFromForm(); });

clearScheduleBtn.addEventListener("click", () => {
  if (!confirm("Точно очистить расписание?")) return;
  localStorage.removeItem(K_CLASSES);
  renderAll();
});

csvInput.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const parsed = parseCSV(text);
    const classes = loadJSON(K_CLASSES, []);
    parsed.forEach(x => classes.push(x));
    saveJSON(K_CLASSES, classes);
    alert(`Импортировано: ${parsed.length}`);
    renderAll();
  } catch (err) {
    alert(String(err?.message || err));
  } finally {
    e.target.value = "";
  }
});

// memory
memoryStartBtn.addEventListener("click", () => { if (!memActive) memoryStart(); });
memoryResetBtn.addEventListener("click", memoryReset);

// quiz
quizNextBtn.addEventListener("click", nextQuiz);
quizResetBtn.addEventListener("click", resetQuiz);
quizEasyBtn.addEventListener("click", () => setQuizLevel("easy"));
quizMedBtn.addEventListener("click", () => setQuizLevel("medium"));
quizHardBtn.addEventListener("click", () => setQuizLevel("hard"));

/* =========================
   Init
========================= */
function init() {
  updateWeekUI();
  renderAll();
  showTab("schedule");

  setNewWish();
  memoryReset();

  updateQuizLevelUI();
  resetQuiz();
}
init();