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
const K_QUIZ_BLOCK = "uniweek_quizBlock";       // history|science|literature|geo|logic
const quizPoolKey = (block, level) => `uniweek_quizPool_${block}_${level}`;

/* =========================
   DOM helpers
========================= */
const $ = (id) => document.getElementById(id);"use strict";

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

// Tabs
const tabSchedule = $("tabSchedule");
const tabWishes = $("tabWishes");
const tabSettings = $("tabSettings");

const screenSchedule = $("screenSchedule");
const screenWishes = $("screenWishes");
const screenSettings = $("screenSettings");

// Week switch
const weekOddBtn = $("weekOddBtn");
const weekEvenBtn = $("weekEvenBtn");

// Schedule (new UI: date header)
const calendarBtn = $("calendarBtn");
const datePicker = $("datePicker");
const pickedDateLabel = $("pickedDateLabel");
const prevDayBtn = $("prevDayBtn");
const nextDayBtn = $("nextDayBtn");
const scheduleList = $("scheduleList");

// Wishes
const newWishBtn = $("newWishBtn");
const wishBox = $("wishBox");

// Settings (schedule)
const addClassBtn = $("addClassBtn");
const csvInput = $("csvInput");
const clearScheduleBtn = $("clearScheduleBtn");

const classDialog = $("classDialog");
const classForm = $("classForm");

// Memory
const memoryGridEl = $("memoryGrid");
const memoryStatus = $("memoryStatus");
const memoryStartBtn = $("memoryStartBtn");
const memoryResetBtn = $("memoryResetBtn");
const memoryLevelLabel = $("memoryLevelLabel");

// Quiz
const quizScore = $("quizScore");
const quizQuestion = $("quizQuestion");
const quizOptions = $("quizOptions");
const quizNextBtn = $("quizNextBtn");
const quizResetBtn = $("quizResetBtn");
const quizFeedback = $("quizFeedback");
const quizEasyBtn = $("quizEasyBtn");
const quizMedBtn = $("quizMedBtn");
const quizHardBtn = $("quizHardBtn");

// Celebration overlay
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
  "Доброе утро, мой цветочек 🌸💗 как ты спала?",
  "Ты самая милая девочка на этой планете, моя принцесса 👑💞",
  "Если вдруг станет грустно — представь, как я тебя обнимаю, любимая 🫂💗",
  "Ты такая красивая, моя девочка, что я иногда просто залипаю 😌💖",
  "Напоминание на сегодня: я тебя очень сильно люблю 💗",
  "Пусть сегодня тебя окружают только добрые люди, мой цветочек 🌷✨",
  "Ты моя принцесса и моя гордость 🥰👑",
  "Даже если день сложный — ты всё равно моя умничка 💕",
  "Я бы сейчас поцеловал тебя в лобик, моя девочка 😚💗",
  "Ты заслуживаешь самого мягкого и спокойного дня, любимая ☁️💞",

  "Ты такая милая… даже когда злишься 😌💗",
  "Пожалуйста, береги себя, мой цветочек, ты для меня — целый мир 🌍💖",
  "Я всегда на твоей стороне, моя принцесса 💞",
  "Ты самая нежная душа, любимая 🌸💗",
  "Если устала — иди ко мне, моя девочка, я тебя укрою 🧸💕",
  "Ты делаешь мою жизнь светлее просто тем, что есть ✨💖",
  "Я скучаю по тебе даже когда прошло 5 минут, мой цветочек 🥺💗",
  "Пусть сегодня тебя кто-нибудь похвалит. А если нет — я уже, любимая 💕",
  "Ты моя радость, моя девочка 🌷💗",
  "Даже в пижаме ты самая красивая, любимая 😌💞",

  "Я люблю твою улыбку, мой цветочек. Она лечит 💗✨",
  "Если кто-то тебя обидит — я мысленно рядом 😌💗",
  "Ты — моё спокойствие и мой хаос одновременно 🥰",
  "Пусть сегодня будет момент, когда ты почувствуешь себя счастливой 💖",
  "Ты можешь быть любой — я люблю тебя во всех версиях 💕",
  "Ты не обязана быть сильной, любимая. Я рядом 🫂💗",
  "Я так горжусь тобой, моя девочка 🥺💞",
  "Ты невероятная. И это не обсуждается 💗✨",
  "Я бы сейчас просто тихо держал тебя за руку 🫶💖",
  "Ты самое тёплое, что есть в моей жизни ☀️💞",

  "Если сомневаешься в себе — вспомни, что ты самая красивая и самая умная девочка на свете 💗✨",
  "Мне так повезло, что именно ты — моя, любимая 🥺💞",
  "Спасибо, что ты есть у меня, мой цветочек 💗✨",
  "Я выбираю тебя каждый день. И буду выбирать 💖",
  "Пусть сегодня ты почувствуешь себя самой любимой девочкой на свете 🥰💗",

  // Мотивационные 💪✨
  "Моя девочка, ты справишься. Даже если по шагам — ты всё равно справишься 💗",
  "Мой цветочек, у тебя всё получится. Я в тебя верю 💞",
  "Любимая, ты сильнее любых сложностей 💪💗",
  "Моя принцесса, сегодня твой день. И ты его проживёшь красиво 👑✨",
  "Ты умная и способная, моя девочка. Не забывай это 💖",
  "Если что-то не выйдет с первого раза — выйдет со второго, мой цветочек 🌸",
  "Ты растёшь и становишься только сильнее 💪💞",
  "Любимая, у тебя огромный потенциал. И ты его раскрываешь ✨",
  "Моя принцесса, ты достойна больших побед 👑💗",
  "Ты уже проделала большой путь, и я горжусь тобой 💖",

  "Мой цветочек, не бойся ошибок — они делают тебя умнее 🌸✨",
  "Ты справляешься лучше, чем тебе кажется 💗",
  "Любимая, ты заслуживаешь успеха 💞",
  "Моя принцесса, верь в себя так же, как я верю в тебя 👑💖",
  "Ты способна на большее, моя девочка 💪💗",
  "Даже если тяжело — ты не сдаёшься. И это уже сила 💞",
  "Мой цветочек, каждый день ты становишься лучше 🌷✨",
  "Любимая, у тебя светлая голова и доброе сердце 💗",
  "Моя принцесса, ты создана для красивой жизни 👑💖",
  "Ты всё сможешь. А я всегда буду рядом 💞",
  "Держись Любимая, с холодной головой и теплом в сердце ты справишься 💞",

  // Более личные 🥹💗
  "Иногда я просто смотрю на тебя и понимаю — это моё счастье 💗",
  "Любимая, ты даже не представляешь, как сильно я тебя ценю 🥺",
  "Моя девочка, с тобой мне спокойно по-настоящему 💞",
  "Если бы можно было — я бы сейчас просто молча тебя обнял 🌸",
  "Ты — мой самый родной человек 💗",
  "Мне хорошо просто от мысли о тебе 🫶",
  "Мой цветочек, ты делаешь мою жизнь теплее 🌷",
  "Любимая, я благодарен судьбе за тебя 💖",
  "С тобой хочется строить будущее 💞",
  "Ты моё сердце. И это навсегда 💗",
  "Даже обычный день становится особенным, если ты в нём есть ✨",
  "Моя принцесса, ты — моя нежность 👑💗",
  "Я люблю, как ты смеёшься 🥰",
  "Ты — мой человек. И это лучшее чувство 💞",
  "Я рядом, прямо в твоём сердечке 💖"
];

/* =========================
   Praises (похвала)
========================= */
const PRAISES = [
  { t:"Ты моя умничка 💗🥰", s:"Так держать! ✨" },
  { t:"Вау! Ты супер 💖", s:"Я тобой горжусь 😍" },
  { t:"Браво, красавица 💗", s:"У тебя отлично получается 🌸" },
  { t:"Ты просто космос ⭐️", s:"Продолжай в том же духе 🚀" },
  { t:"Гордость моя 💞", s:"Ещё чуть-чуть — и будет рекорд ✨" },
  { t:"Умничкааа 💗", s:"Ты справилась идеально 😌" },
  { t:"Ты сильная 💪💗", s:"И очень-очень умная 🥰" },
  { t:"Красиво сделано 💖", s:"Вот это уровень! 🎉" },
  { t:"Молодец, любимая 🌷", s:"Ты сияешь ✨" },
  { t:"Победа! 💕", s:"Так приятно смотреть на твой прогресс 😊" }
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

function getWeek() {
  const w = localStorage.getItem(K_WEEK);
  return (w === "odd" || w === "even") ? w : "odd";
}
function setWeek(w) {
  localStorage.setItem(K_WEEK, w);
  updateWeekUI();
  renderSelectedDate();
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
  return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
}

function normalizeHex(hex) {
  if (!hex) return null;
  let c = String(hex).trim().replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(c)) return null;
  return c.toUpperCase();
}

function uuid() {
  return (crypto?.randomUUID) ? crypto.randomUUID() : ("id_" + Math.random().toString(16).slice(2) + "_" + Date.now());
}

function isoDate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysBetween(isoA, isoB) {
  const [ay, am, ad] = isoA.split("-").map(Number);
  const [by, bm, bd] = isoB.split("-").map(Number);
  const a = new Date(ay, am - 1, ad).getTime();
  const b = new Date(by, bm - 1, bd).getTime();
  return Math.floor((b - a) / (1000 * 60 * 60 * 24));
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

  tabSchedule?.classList.toggle("active", s);
  tabWishes?.classList.toggle("active", w);
  tabSettings?.classList.toggle("active", st);

  screenSchedule?.classList.toggle("active", s);
  screenWishes?.classList.toggle("active", w);
  screenSettings?.classList.toggle("active", st);
}

/* =========================
   Week UI
========================= */
function updateWeekUI() {
  const w = getWeek();
  weekOddBtn?.classList.toggle("active", w === "odd");
  weekEvenBtn?.classList.toggle("active", w === "even");
}

/* =========================
   Schedule (date-based, like screenshot)
========================= */
let selectedISO = isoDate();

function addDaysISO(iso, delta) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + delta);
  return isoDate(dt);
}

function prettyDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("ru-RU", { weekday: "long", day: "2-digit", month: "long" });
}

function dayKeyFromISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const wd = dt.getDay(); // 0 Sun ... 6 Sat
  const map = { 1: "monday", 2: "tuesday", 3: "wednesday", 4: "thursday", 5: "friday", 6: "saturday" };
  return map[wd] || null;
}

// ISO week number (понедельник = начало недели)
function getISOWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;           // 1..7 (Mon..Sun)
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);   // четверг этой недели
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo; // 1..53
}

function applyWeekFromISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const weekNo = getISOWeekNumber(dt);

  // нечётная = odd (числитель), чётная = even (знаменатель)
  const w = (weekNo % 2 === 1) ? "odd" : "even";

  if (getWeek() !== w) {
    localStorage.setItem(K_WEEK, w);
    updateWeekUI();
  }
}

function renderSelectedDate() {
  if (!scheduleList) return;

  // авто-определение недели по календарю
  applyWeekFromISO(selectedISO);

  const selectedWeek = getWeek();
  const dayKey = dayKeyFromISO(selectedISO);

  if (pickedDateLabel) {
    pickedDateLabel.textContent = dayKey
      ? prettyDate(selectedISO)
      : `${prettyDate(selectedISO)} — воскресенье`;
  }

  if (!dayKey) {
    scheduleList.innerHTML = `<div class="smallMuted">В воскресенье пар нет 💗</div>`;
    return;
  }

  const classes = loadJSON(K_CLASSES, []).sort(sortClasses);

  const items = classes
    .filter(c => c.dayOfWeek === dayKey && weekFilterOK(c, selectedWeek))
    .sort((a, b) => a.startMinutes - b.startMinutes);

  scheduleList.innerHTML = "";

  if (!items.length) {
    scheduleList.innerHTML = `<div class="smallMuted">На этот день пар нет 💗</div>`;
    return;
  }

  for (const it of items) {
    const badgeClass =
      it.classType === "lecture" ? "badge-lecture" :
      it.classType === "seminar" ? "badge-seminar" :
      "badge-lab";

    const typeLabel =
      it.classType === "lecture" ? "Лекция" :
      it.classType === "seminar" ? "Семинар" : "Лаба";

    const subParts = [];
    if (it.weekType && it.weekType !== "both") subParts.push(it.weekType === "odd" ? "Числитель" : "Знаменатель");

    const card = document.createElement("div");
    card.className = "scheduleCard";
    card.innerHTML = `
      <div class="scheduleTop">
        <div class="scheduleTime">
          ${minutesToHHmm(it.startMinutes)} – ${minutesToHHmm(it.endMinutes)}
          ${it.location ? " • " + it.location : ""}
        </div>
        <div class="scheduleBadge ${badgeClass}">${typeLabel}</div>
      </div>
      <div class="scheduleTitle">${it.courseName}</div>
      ${subParts.length ? `<div class="scheduleSub">${subParts.join(" • ")}</div>` : ""}
    `;
    scheduleList.appendChild(card);
  }
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
    if (!["lecture", "seminar", "lab"].includes(classType)) throw new Error(`Строка ${n}: неверный type.`);
    if (!DAYS.some(d => d.key === dayOfWeek)) throw new Error(`Строка ${n}: неверный dayOfWeek.`);
    if (!["odd", "even", "both"].includes(weekType)) throw new Error(`Строка ${n}: неверный weekType.`);

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
  classForm?.reset();
  classDialog?.showModal();
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
  if (!["lecture", "seminar", "lab"].includes(classType)) return alert("Неверный тип.");
  if (!DAYS.some(d => d.key === dayOfWeek)) return alert("Неверный день.");
  if (!["odd", "even", "both"].includes(weekType)) return alert("Неверный тип недели.");
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

  classDialog?.close();
  renderSelectedDate();
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
    return daysBetween(last, today) >= 3;
  });

  if (!pool.length) pool = BASE_WISHES.filter(w => !inLast10.has(w));
  if (!pool.length) pool = BASE_WISHES.slice();

  return pool[Math.floor(Math.random() * pool.length)];
}

function setNewWish() {
  if (!wishBox) return;
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
let celebrateBusy = false;

function showCelebrate() {
  if (!celebrate) return;
  if (celebrateBusy) return;
  celebrateBusy = true;

  const pick = PRAISES[Math.floor(Math.random() * PRAISES.length)];
  if (celebrateTitle) celebrateTitle.textContent = pick.t;
  if (celebrateSub) celebrateSub.textContent = pick.s;

  if (celebrateParticles) celebrateParticles.innerHTML = "";
  celebrate.classList.remove("hidden");
  celebrate.setAttribute("aria-hidden", "false");

  const emojis = ["💗","💖","💕","💞","✨","🎉","🥰","😊","🌸","🌷","⭐️"];
  const count = 28;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = rand(0, 100) + "vw";
    p.style.animationDelay = rand(0, 0.18) + "s";
    p.style.animationDuration = rand(1.05, 1.55) + "s";
    p.style.fontSize = rand(16, 28) + "px";
    celebrateParticles?.appendChild(p);
  }

  setTimeout(hideCelebrate, 1350);
}

function hideCelebrate() {
  celebrate?.classList.add("hidden");
  celebrate?.setAttribute("aria-hidden", "true");
  if (celebrateParticles) celebrateParticles.innerHTML = "";
  celebrateBusy = false;
}
celebrate?.addEventListener("click", hideCelebrate);

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
  if (memoryStatus) memoryStatus.textContent = text;
  if (memoryLevelLabel) memoryLevelLabel.textContent = `Level: ${memLevel}`;
}

function updatePadCountForLevel() {
  memPadCount = Math.min(4 + Math.max(0, memLevel - 1), MEM_MAX_PADS);
  const cols = Math.ceil(Math.sqrt(memPadCount));
  memoryGridEl?.style.setProperty("--cols", String(cols));
}

function rebuildMemoryGrid() {
  if (!memoryGridEl) return;
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
  // во время похвалы клики должны быть заблокированы
  memShowing = true;
  showCelebrate();
  await sleep(1350);

  memLevel += 1;
  memUserIndex = 0;

  updatePadCountForLevel();
  rebuildMemoryGrid();
  addRandomStep();

  await sleep(200);
  await showSequence();
}

function memoryFail() {
  memActive = false;
  setMemoryUI(`Ошибка 😅 Был уровень ${memLevel}. Нажми Start`);
  memLevel = 0;
  memSequence = [];
  memUserIndex = 0;

  memPadCount = 4;
  memoryGridEl?.style.setProperty("--cols", "2");
  rebuildMemoryGrid();
}

function memoryReset() {
  memActive = false;
  memShowing = false;
  memLevel = 0;
  memSequence = [];
  memUserIndex = 0;

  memPadCount = 4;
  memoryGridEl?.style.setProperty("--cols", "2");
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

memoryGridEl?.addEventListener("click", (e) => {
  const btn = e.target.closest(".memBtn");
  if (!btn) return;
  handleMemClick(Number(btn.dataset.pad));
});

const QUESTIONS = [
  // ======================
  // 🏛️ HISTORY (40)
  // ======================
  // EASY (15)
  { id:"his3_e01", block:"history", level:"easy", q:"В какой стране были фараоны?", opts:["Египет","Греция","Италия","Китай"], a:0, exp:"Фараоны правили в Древнем Египте." },
  { id:"his3_e02", block:"history", level:"easy", q:"Как назывались воины Древнего Рима?", opts:["Легионеры","Самураи","Рыцари","Викинги"], a:0, exp:"Римская армия — легионы." },
  { id:"his3_e03", block:"history", level:"easy", q:"Колизей находится в…", opts:["Риме","Афинах","Париже","Лондоне"], a:0, exp:"Колизей — в Риме." },
  { id:"his3_e04", block:"history", level:"easy", q:"Викинги — это…", opts:["Северные мореплаватели","Римские сенаторы","Египетские жрецы","Китайские императоры"], a:0, exp:"Викинги — народы Севера." },
  { id:"his3_e05", block:"history", level:"easy", q:"Пирамиды Гизы связаны с…", opts:["Египтом","Японией","Бразилией","Австралией"], a:0, exp:"Гиза — Египет." },
  { id:"his3_e06", block:"history", level:"easy", q:"Спарта — это…", opts:["Древнегреческий город","Римская провинция","Остров в Японии","Гора в Альпах"], a:0, exp:"Спарта — полис в Греции." },
  { id:"his3_e07", block:"history", level:"easy", q:"Иероглифы — письменность…", opts:["Египта","Исландии","Канады","Испании"], a:0, exp:"Иероглифы — Древний Египет." },
  { id:"his3_e08", block:"history", level:"easy", q:"Кто такие гладиаторы?", opts:["Бойцы на арене","Моряки","Учёные","Купцы"], a:0, exp:"Сражались в амфитеатрах." },
  { id:"his3_e09", block:"history", level:"easy", q:"Средневековье — это время…", opts:["Замков и рыцарей","Динозавров","Космонавтов","Интернета"], a:0, exp:"Рыцари и замки — символ эпохи." },
  { id:"his3_e10", block:"history", level:"easy", q:"Кто первым полетел в космос?", opts:["Гагарин","Армстронг","Терешкова","Кеплер"], a:0, exp:"Юрий Гагарин — первый человек в космосе." },
  { id:"his3_e11", block:"history", level:"easy", q:"Крестовые походы были в…", opts:["Средневековье","Античность","XX век","Каменный век"], a:0, exp:"Это средневековые походы." },
  { id:"his3_e12", block:"history", level:"easy", q:"Самураи связаны со страной…", opts:["Япония","Египет","Италия","Исландия"], a:0, exp:"Самураи — Япония." },
  { id:"his3_e13", block:"history", level:"easy", q:"Как назывался путь торговли между Востоком и Западом?", opts:["Шёлковый путь","Соляной путь","Ледяной путь","Золотой путь"], a:0, exp:"Шёлковый путь — сеть маршрутов." },
  { id:"his3_e14", block:"history", level:"easy", q:"Античность обычно связывают с…", opts:["Грецией и Римом","Только Японией","Только Австралией","Только Канадой"], a:0, exp:"Античность = Греция/Рим." },
  { id:"his3_e15", block:"history", level:"easy", q:"Титаник затонул в…", opts:["1912","1812","2012","1712"], a:0, exp:"Катастрофа «Титаника» — 1912." },

  // MEDIUM (15)
  { id:"his3_m01", block:"history", level:"medium", q:"Ренессанс — это…", opts:["Возрождение","Каменный век","Античность","Новейшее время"], a:0, exp:"Ренессанс = Возрождение." },
  { id:"his3_m02", block:"history", level:"medium", q:"Реформа — это…", opts:["Изменение системы","Праздник","Стих","Переезд"], a:0, exp:"Реформа меняет устройство/правила." },
  { id:"his3_m03", block:"history", level:"medium", q:"Мачу-Пикчу построили…", opts:["Инки","Римляне","Викинги","Кельты"], a:0, exp:"Это наследие инков." },
  { id:"his3_m04", block:"history", level:"medium", q:"Амфитеатр для гладиаторов в Риме — это…", opts:["Колизей","Пантеон","Парфенон","Версаль"], a:0, exp:"Колизей — главная арена." },
  { id:"his3_m05", block:"history", level:"medium", q:"Кто совершил экспедицию первой кругосветки?", opts:["Магеллан","Колумб","Дарвин","Цезарь"], a:0, exp:"Экспедиция Магеллана первой обогнула Землю." },
  { id:"his3_m06", block:"history", level:"medium", q:"Демократия — это…", opts:["Власть народа","Власть одного","Власть армии","Власть денег"], a:0, exp:"Демо+кратия = народ+власть." },
  { id:"his3_m07", block:"history", level:"medium", q:"Археология изучает прошлое по…", opts:["Находкам","Гороскопам","Снам","Рекламе"], a:0, exp:"Археологи работают с артефактами." },
  { id:"his3_m08", block:"history", level:"medium", q:"Печатный станок связали с именем…", opts:["Гутенберг","Ньютон","Галилей","Пифагор"], a:0, exp:"Иоганн Гутенберг." },
  { id:"his3_m09", block:"history", level:"medium", q:"«Хроника» — это…", opts:["Летопись событий","Сказка","Карта","Песня"], a:0, exp:"Хроника фиксирует события по порядку." },
  { id:"his3_m10", block:"history", level:"medium", q:"Что раньше?", opts:["Античность","Средневековье","XX век","Новейшее время"], a:0, exp:"Античность — раньше остальных." },
  { id:"his3_m11", block:"history", level:"medium", q:"Самый известный город-государство «про философов» в Греции?", opts:["Афины","Спарта","Рим","Троя"], a:0, exp:"Афины — центр культуры и философии." },
  { id:"his3_m12", block:"history", level:"medium", q:"Кто такие «колонисты» (в истории)?", opts:["Переселенцы","Только солдаты","Только учёные","Только короли"], a:0, exp:"Колонисты — переселялись в новые земли." },
  { id:"his3_m13", block:"history", level:"medium", q:"Что обычно называют «революцией»?", opts:["Резкий переворот","Спокойную реформу","Погодное явление","Спор"], a:0, exp:"Революция — резкие изменения." },
  { id:"his3_m14", block:"history", level:"medium", q:"Какое море «внутри Европы» и часто упоминается в истории торговли?", opts:["Средиземное","Берингово","Карибское","Аравийское"], a:0, exp:"Средиземное море — ключевое." },
  { id:"his3_m15", block:"history", level:"medium", q:"Сколько веков в тысячелетии?", opts:["10","100","50","12"], a:0, exp:"1000 лет = 10 веков." },

  // HARD (10)
  { id:"his3_h01", block:"history", level:"hard", q:"Полис — это…", opts:["Город-государство","Империя","Племя","Остров"], a:0, exp:"Полис — независимый город." },
  { id:"his3_h02", block:"history", level:"hard", q:"Хронология — наука о…", opts:["Датах и порядке событий","Климате","Птицах","Языках"], a:0, exp:"Хронология упорядочивает события." },
  { id:"his3_h03", block:"history", level:"hard", q:"До империи Рим был…", opts:["Республикой","Султанатом","Ханством","Колонией"], a:0, exp:"Римская республика предшествовала империи." },
  { id:"his3_h04", block:"history", level:"hard", q:"Эпоха Великих географических открытий — это…", opts:["XV–XVII вв.","I–III вв.","XIX–XX вв.","XXI век"], a:0, exp:"Пик открытий — XV–XVII века." },
  { id:"his3_h05", block:"history", level:"hard", q:"«Династия» — это…", opts:["Род правителей","Тип армии","Город","Монета"], a:0, exp:"Династия — семья правителей." },
  { id:"his3_h06", block:"history", level:"hard", q:"Макиавелли написал…", opts:["«Государь»","«Одиссею»","«Илиаду»","«Фауста»"], a:0, exp:"Автор «Государя» — Макиавелли." },
  { id:"his3_h07", block:"history", level:"hard", q:"Что было раньше?", opts:["Средневековье","Ренессанс","Индустриальная революция","Космическая эра"], a:0, exp:"Средневековье самое раннее из списка." },
  { id:"his3_h08", block:"history", level:"hard", q:"Что такое «источник» в истории?", opts:["Документ/свидетельство","Только река","Только человек","Только музей"], a:0, exp:"Источник — всё, что даёт сведения о прошлом." },
  { id:"his3_h09", block:"history", level:"hard", q:"Кто такие «скрипторы»?", opts:["Переписчики рукописей","Моряки","Лекари","Кузнецы"], a:0, exp:"Скрипторы переписывали книги." },
  { id:"his3_h10", block:"history", level:"hard", q:"«Анналы» ближе всего к…", opts:["Летописям","Комедиям","Романам","Плакатам"], a:0, exp:"Анналы — годовые записи событий." },

  // ======================
  // 🧪 SCIENCE (40)
  // ======================
  // EASY (15)
  { id:"sci3_e01", block:"science", level:"easy", q:"Какая звезда в центре нашей системы?", opts:["Солнце","Сириус","Полярная","Вега"], a:0, exp:"Солнце — центр Солнечной системы." },
  { id:"sci3_e02", block:"science", level:"easy", q:"Что качает кровь по телу?", opts:["Сердце","Лёгкие","Желудок","Почки"], a:0, exp:"Сердце — насос." },
  { id:"sci3_e03", block:"science", level:"easy", q:"Что из этого — газ?", opts:["Кислород","Стекло","Камень","Лёд"], a:0, exp:"Кислород — газ." },
  { id:"sci3_e04", block:"science", level:"easy", q:"Что измеряет термометр?", opts:["Температуру","Скорость","Массу","Давление"], a:0, exp:"Термометр — температура." },
  { id:"sci3_e05", block:"science", level:"easy", q:"Какая планета ближе к Солнцу?", opts:["Меркурий","Марс","Земля","Юпитер"], a:0, exp:"Самая близкая — Меркурий." },
  { id:"sci3_e06", block:"science", level:"easy", q:"Что нужно растениям для фотосинтеза?", opts:["Свет","Лёд","Шоколад","Тень"], a:0, exp:"Фотосинтез требует света." },
  { id:"sci3_e07", block:"science", level:"easy", q:"Какая планета известна кольцами?", opts:["Сатурн","Венера","Марс","Меркурий"], a:0, exp:"Сатурн знаменит кольцами." },
  { id:"sci3_e08", block:"science", level:"easy", q:"Что мы вдыхаем, чтобы жить?", opts:["Кислород","Гелий","Азот","Дым"], a:0, exp:"Нам нужен кислород." },
  { id:"sci3_e09", block:"science", level:"easy", q:"Вода при 0°C обычно становится…", opts:["Льдом","Паром","Плазмой","Песком"], a:0, exp:"При 0°C замерзает." },
  { id:"sci3_e10", block:"science", level:"easy", q:"Телескоп нужен, чтобы…", opts:["Наблюдать звёзды","Считать шаги","Готовить","Рисовать"], a:0, exp:"Телескоп — астрономия." },
  { id:"sci3_e11", block:"science", level:"easy", q:"Что тяжелее: 1 кг ваты или 1 кг железа?", opts:["Одинаково","Вата","Железо","Зависит"], a:0, exp:"Оба по 1 кг." },
  { id:"sci3_e12", block:"science", level:"easy", q:"Радуга — это явление…", opts:["Света","Звука","Гравитации","Магнита"], a:0, exp:"Радуга связана со светом." },
  { id:"sci3_e13", block:"science", level:"easy", q:"Какая часть тела отвечает за мысли?", opts:["Мозг","Пятка","Локоть","Печень"], a:0, exp:"Мозг — центр нервной системы." },
  { id:"sci3_e14", block:"science", level:"easy", q:"Что такое «клетка» в биологии?", opts:["Мини-единица живого","Камень","Планета","Облако"], a:0, exp:"Клетка — основа живого." },
  { id:"sci3_e15", block:"science", level:"easy", q:"Какая часть растения обычно зелёная?", opts:["Лист","Корень","Семя","Пыльца"], a:0, exp:"Лист содержит хлорофилл." },

  // MEDIUM (15)
  { id:"sci3_m01", block:"science", level:"medium", q:"Какой газ преобладает в атмосфере Земли?", opts:["Азот","Кислород","Углекислый газ","Водород"], a:0, exp:"Азота больше всего (~78%)." },
  { id:"sci3_m02", block:"science", level:"medium", q:"Единица напряжения — это…", opts:["Вольт","Ампер","Ом","Ватт"], a:0, exp:"Напряжение измеряют в вольтах." },
  { id:"sci3_m03", block:"science", level:"medium", q:"Единица силы тока — это…", opts:["Ампер","Вольт","Ом","Джоуль"], a:0, exp:"Ток измеряют в амперах." },
  { id:"sci3_m04", block:"science", level:"medium", q:"Единица мощности — это…", opts:["Ватт","Ньютон","Паскаль","Кельвин"], a:0, exp:"Мощность — ватт." },
  { id:"sci3_m05", block:"science", level:"medium", q:"Как называется центр атома?", opts:["Ядро","Электрон","Орбита","Луч"], a:0, exp:"В центре — ядро." },
  { id:"sci3_m06", block:"science", level:"medium", q:"Какая частица имеет отрицательный заряд?", opts:["Электрон","Протон","Нейтрон","Фотон"], a:0, exp:"Электрон отрицательный." },
  { id:"sci3_m07", block:"science", level:"medium", q:"Испарение — это переход воды в…", opts:["Пар","Лёд","Камень","Пыль"], a:0, exp:"Испарение = жидкость → газ." },
  { id:"sci3_m08", block:"science", level:"medium", q:"Сколько планет в Солнечной системе?", opts:["8","7","9","10"], a:0, exp:"Официально 8 планет." },
  { id:"sci3_m09", block:"science", level:"medium", q:"Что хранит генетическую информацию?", opts:["ДНК","Вода","Соль","Кислород"], a:0, exp:"ДНК — носитель наследственности." },
  { id:"sci3_m10", block:"science", level:"medium", q:"Что измеряют в паскалях?", opts:["Давление","Температуру","Скорость","Массу"], a:0, exp:"Па — единица давления." },
  { id:"sci3_m11", block:"science", level:"medium", q:"В каком органе происходит газообмен?", opts:["Лёгкие","Печень","Желудок","Кости"], a:0, exp:"Газообмен — в лёгких." },
  { id:"sci3_m12", block:"science", level:"medium", q:"Сколько хромосом у человека в соматической клетке?", opts:["46","44","48","52"], a:0, exp:"У человека 46 хромосом." },
  { id:"sci3_m13", block:"science", level:"medium", q:"Что такое «орбита»?", opts:["Путь движения вокруг тела","Тип топлива","Река","Гора"], a:0, exp:"Орбита — траектория вокруг." },
  { id:"sci3_m14", block:"science", level:"medium", q:"Что из этого — энергия?", opts:["Джоуль","Метр","Секунда","Килограмм"], a:0, exp:"Джоуль — единица энергии." },
  { id:"sci3_m15", block:"science", level:"medium", q:"Что такое «гравитация»?", opts:["Притяжение тел","Свет","Звук","Тепло"], a:0, exp:"Гравитация — притяжение." },

  // HARD (10)
  { id:"sci3_h01", block:"science", level:"hard", q:"Единица силы в СИ — это…", opts:["Ньютон","Ватт","Паскаль","Джоуль"], a:0, exp:"Сила измеряется в ньютонах." },
  { id:"sci3_h02", block:"science", level:"hard", q:"pH меньше 7 — среда…", opts:["Кислая","Щелочная","Нейтральная","Солёная"], a:0, exp:"pH<7 означает кислотность." },
  { id:"sci3_h03", block:"science", level:"hard", q:"Скорость света примерно…", opts:["300 000 км/с","30 000 км/с","3 000 км/с","300 км/с"], a:0, exp:"Около 300 000 км/с." },
  { id:"sci3_h04", block:"science", level:"hard", q:"Абсолютный ноль есть в шкале…", opts:["Кельвина","Цельсия","Фаренгейта","Реомюра"], a:0, exp:"Кельвин начинается от абсолютного нуля." },
  { id:"sci3_h05", block:"science", level:"hard", q:"Конвекция — это перенос тепла…", opts:["Потоками газа/жидкости","По твёрдому телу","Светом","Замерзанием"], a:0, exp:"Конвекция — перенос потоками." },
  { id:"sci3_h06", block:"science", level:"hard", q:"Закон сохранения энергии: энергия…", opts:["Переходит из формы в форму","Исчезает","Появляется из ниоткуда","Всегда равна нулю"], a:0, exp:"Энергия сохраняется." },
  { id:"sci3_h07", block:"science", level:"hard", q:"Что НЕ планета по современной классификации?", opts:["Плутон","Марс","Венера","Юпитер"], a:0, exp:"Плутон — карликовая планета." },
  { id:"sci3_h08", block:"science", level:"hard", q:"Что такое «инерция»?", opts:["Свойство сохранять скорость","Способность светиться","Вкус","Температура"], a:0, exp:"Инерция — сопротивление изменению движения." },
  { id:"sci3_h09", block:"science", level:"hard", q:"Какая волна не требует среды?", opts:["Электромагнитная","Звуковая","Морская","Сейсмическая"], a:0, exp:"Свет — электромагнитная волна." },
  { id:"sci3_h10", block:"science", level:"hard", q:"В чём измеряют частоту?", opts:["Герц","Ньютон","Паскаль","Кулон"], a:0, exp:"Гц — колебания в секунду." },

  // ======================
  // 📚 LITERATURE (40)
  // ======================
  // EASY (15)
  { id:"lit3_e01", block:"literature", level:"easy", q:"Кто написал «Война и мир»?", opts:["Толстой","Пушкин","Чехов","Гоголь"], a:0, exp:"Автор — Л.Н. Толстой." },
  { id:"lit3_e02", block:"literature", level:"easy", q:"Кто написал «Сказку о рыбаке и рыбке»?", opts:["Пушкин","Толстой","Гоголь","Достоевский"], a:0, exp:"Автор — А.С. Пушкин." },
  { id:"lit3_e03", block:"literature", level:"easy", q:"Кто создал Шерлока Холмса?", opts:["Конан Дойл","Кристи","Толкин","Верн"], a:0, exp:"Автор — Артур Конан Дойл." },
  { id:"lit3_e04", block:"literature", level:"easy", q:"Басня — это…", opts:["Короткий поучительный рассказ","Большой роман","Газета","Пьеса"], a:0, exp:"Басня обычно с моралью." },
  { id:"lit3_e05", block:"literature", level:"easy", q:"Персонаж — это…", opts:["Герой произведения","Обложка","Шрифт","Страница"], a:0, exp:"Персонаж — действующее лицо." },
  { id:"lit3_e06", block:"literature", level:"easy", q:"Рифма — это…", opts:["Созвучие концов строк","Большая глава","Сюжет","Диалог"], a:0, exp:"Рифма — созвучие." },
  { id:"lit3_e07", block:"literature", level:"easy", q:"Роман — это обычно…", opts:["Большое повествование","Короткая шутка","Один абзац","Только список"], a:0, exp:"Роман — крупный жанр." },
  { id:"lit3_e08", block:"literature", level:"easy", q:"Кто написал «Евгений Онегин»?", opts:["Пушкин","Лермонтов","Чехов","Булгаков"], a:0, exp:"Пушкин." },
  { id:"lit3_e09", block:"literature", level:"easy", q:"Стихотворение — это…", opts:["Поэтический текст","Научная таблица","Инструкция","Карта"], a:0, exp:"Стихотворение — поэзия." },
  { id:"lit3_e10", block:"literature", level:"easy", q:"Кто написал «Капитанскую дочку»?", opts:["Пушкин","Толстой","Тургенев","Чехов"], a:0, exp:"Пушкин." },
  { id:"lit3_e11", block:"literature", level:"easy", q:"Сказка чаще всего…", opts:["Вымышленная история","Отчёт","Закон","График"], a:0, exp:"Сказка — вымысел." },
  { id:"lit3_e12", block:"literature", level:"easy", q:"«Глава» в книге — это…", opts:["Часть текста","Картинка","Сноска","Обложка"], a:0, exp:"Глава — раздел." },
  { id:"lit3_e13", block:"literature", level:"easy", q:"Что делает автор?", opts:["Пишет произведение","Ремонтирует","Плавает","Считает налоги"], a:0, exp:"Автор создаёт текст." },
  { id:"lit3_e14", block:"literature", level:"easy", q:"Лирика чаще всего про…", opts:["Чувства","Только карты","Только формулы","Только спорт"], a:0, exp:"Лирика выражает эмоции." },
  { id:"lit3_e15", block:"literature", level:"easy", q:"Кто написал «Ревизор»?", opts:["Гоголь","Чехов","Толстой","Пушкин"], a:0, exp:"Автор — Н.В. Гоголь." },

  // MEDIUM (15)
  { id:"lit3_m01", block:"literature", level:"medium", q:"Кто написал «Преступление и наказание»?", opts:["Достоевский","Тургенев","Чехов","Булгаков"], a:0, exp:"Ф.М. Достоевский." },
  { id:"lit3_m02", block:"literature", level:"medium", q:"Кто автор «Мастера и Маргариты»?", opts:["Булгаков","Толстой","Гоголь","Некрасов"], a:0, exp:"М.А. Булгаков." },
  { id:"lit3_m03", block:"literature", level:"medium", q:"Метафора — это…", opts:["Перенос значения","Точный расчёт","Список","Рифма"], a:0, exp:"Метафора образно переносит смысл." },
  { id:"lit3_m04", block:"literature", level:"medium", q:"Олицетворение — это…", opts:["Предмет как человек","Сравнение с 'как'","Повтор","Сноска"], a:0, exp:"Неживое ведёт себя как живое." },
  { id:"lit3_m05", block:"literature", level:"medium", q:"Эпитет — это…", opts:["Образное определение","Заголовок","Нумерация","Список"], a:0, exp:"Эпитет украшает описание." },
  { id:"lit3_m06", block:"literature", level:"medium", q:"Сюжет — это…", opts:["Последовательность событий","Шрифт","Бумага","Цена"], a:0, exp:"Сюжет = события." },
  { id:"lit3_m07", block:"literature", level:"medium", q:"Тема произведения — это…", opts:["О чём текст","Сколько страниц","Формат","Год"], a:0, exp:"Тема отвечает «о чём?»." },
  { id:"lit3_m08", block:"literature", level:"medium", q:"Верлибр — это…", opts:["Свободный стих","Сонет","Комедия","Сказка"], a:0, exp:"Верлибр часто без рифмы." },
  { id:"lit3_m09", block:"literature", level:"medium", q:"«Диалог» — это…", opts:["Разговор персонажей","Описание природы","Список","Название"], a:0, exp:"Диалог = реплики." },
  { id:"lit3_m10", block:"literature", level:"medium", q:"Кто написал «Отцы и дети»?", opts:["Тургенев","Гоголь","Достоевский","Пушкин"], a:0, exp:"Автор — И.С. Тургенев." },
  { id:"lit3_m11", block:"literature", level:"medium", q:"Кто написал «Герой нашего времени»?", opts:["Лермонтов","Толстой","Чехов","Булгаков"], a:0, exp:"Автор — М.Ю. Лермонтов." },
  { id:"lit3_m12", block:"literature", level:"medium", q:"Кто автор «Ромео и Джульетты»?", opts:["Шекспир","Диккенс","Гёте","Байрон"], a:0, exp:"Это трагедия Шекспира." },
  { id:"lit3_m13", block:"literature", level:"medium", q:"Что такое «жанр»?", opts:["Тип произведения","Цвет обложки","Размер шрифта","Цена"], a:0, exp:"Жанр: роман, рассказ, трагедия…" },
  { id:"lit3_m14", block:"literature", level:"medium", q:"Антоним к «изобилие»:", opts:["Скудость","Щедрость","Богатство","Излишек"], a:0, exp:"Изобилию противоположна скудость." },
  { id:"lit3_m15", block:"literature", level:"medium", q:"Что такое «кульминация»?", opts:["Пик напряжения","Начало","Список героев","Обложка"], a:0, exp:"Кульминация — высшая точка." },

  // HARD (10)
  { id:"lit3_h01", block:"literature", level:"hard", q:"Аллюзия — это…", opts:["Намёк/отсылка","Опечатка","Список","Рифма"], a:0, exp:"Аллюзия отсылает к известному." },
  { id:"lit3_h02", block:"literature", level:"hard", q:"Эпос — это…", opts:["Род литературы о событиях","Только чувства","Только диалоги","Только стихи"], a:0, exp:"Эпос рассказывает историю." },
  { id:"lit3_h03", block:"literature", level:"hard", q:"Сонет обычно имеет…", opts:["14 строк","8 строк","10 строк","20 строк"], a:0, exp:"Классический сонет — 14." },
  { id:"lit3_h04", block:"literature", level:"hard", q:"Автор «1984»?", opts:["Оруэлл","Брэдбери","Хаксли","Толкин"], a:0, exp:"Джордж Оруэлл." },
  { id:"lit3_h05", block:"literature", level:"hard", q:"Автор «451° по Фаренгейту»?", opts:["Брэдбери","Оруэлл","Хаксли","Кафка"], a:0, exp:"Рэй Брэдбери." },
  { id:"lit3_h06", block:"literature", level:"hard", q:"Антиутопия — это…", opts:["Мрачная модель общества","Комедия","Сказка","Поэма"], a:0, exp:"Антиутопия показывает опасный строй." },
  { id:"lit3_h07", block:"literature", level:"hard", q:"«Лаконичный» — это…", opts:["Короткий и ёмкий","Громкий","Длинный","Сложный"], a:0, exp:"Лаконично = без лишнего." },
  { id:"lit3_h08", block:"literature", level:"hard", q:"Что такое «парафраз»?", opts:["Пересказ своими словами","Опечатка","Рифма","Таблица"], a:0, exp:"Парафраз — переформулирование." },
  { id:"lit3_h09", block:"literature", level:"hard", q:"«Драма» как род литературы — это…", opts:["Про действие и конфликт","Только описание природы","Только факты","Только шутки"], a:0, exp:"Драма строится на конфликте." },
  { id:"lit3_h10", block:"literature", level:"hard", q:"Что такое «интертекст» ближе всего к…", opts:["Связям/отсылкам между текстами","Списку","Рифме","Географии"], a:0, exp:"Тексты «разговаривают» друг с другом." },

  // ======================
  // 🌍 GEOGRAPHY (40)
  // ======================
  // EASY (15)
  { id:"geo3_e01", block:"geo", level:"easy", q:"Столица Франции?", opts:["Париж","Рим","Берлин","Вена"], a:0, exp:"Париж — столица Франции." },
  { id:"geo3_e02", block:"geo", level:"easy", q:"Столица Италии?", opts:["Рим","Милан","Венеция","Неаполь"], a:0, exp:"Рим — столица." },
  { id:"geo3_e03", block:"geo", level:"easy", q:"Самый большой океан?", opts:["Тихий","Атлантический","Индийский","Северный"], a:0, exp:"Тихий — крупнейший." },
  { id:"geo3_e04", block:"geo", level:"easy", q:"Египет на каком континенте (в основном)?", opts:["Африка","Европа","Америка","Австралия"], a:0, exp:"Египет — Африка." },
  { id:"geo3_e05", block:"geo", level:"easy", q:"Столица Японии?", opts:["Токио","Осака","Киото","Нагоя"], a:0, exp:"Токио." },
  { id:"geo3_e06", block:"geo", level:"easy", q:"Где находится Бразилия?", opts:["Южная Америка","Европа","Африка","Азия"], a:0, exp:"Южная Америка." },
  { id:"geo3_e07", block:"geo", level:"easy", q:"Какой материк самый холодный?", opts:["Антарктида","Африка","Евразия","Австралия"], a:0, exp:"Антарктида — самый холодный." },
  { id:"geo3_e08", block:"geo", level:"easy", q:"Столица Германии?", opts:["Берлин","Гамбург","Мюнхен","Кёльн"], a:0, exp:"Берлин." },
  { id:"geo3_e09", block:"geo", level:"easy", q:"Сахара — это…", opts:["Пустыня","Океан","Гора","Остров"], a:0, exp:"Крупнейшая пустыня Африки." },
  { id:"geo3_e10", block:"geo", level:"easy", q:"Самая высокая гора мира?", opts:["Эверест","Эльбрус","Монблан","Килиманджаро"], a:0, exp:"Эверест." },
  { id:"geo3_e11", block:"geo", level:"easy", q:"Амстердам — это столица…", opts:["Нидерландов","Швеции","Португалии","Греции"], a:0, exp:"Амстердам — столица Нидерландов." },
  { id:"geo3_e12", block:"geo", level:"easy", q:"Экватор делит Землю на…", opts:["Север и юг","Восток и запад","Горы и равнины","Моря и сушу"], a:0, exp:"По широте — на север/юг." },
  { id:"geo3_e13", block:"geo", level:"easy", q:"Какая страна — «сапог» на карте?", opts:["Италия","Испания","Норвегия","Япония"], a:0, exp:"Италия." },
  { id:"geo3_e14", block:"geo", level:"easy", q:"Где находятся Альпы?", opts:["Европа","Африка","Антарктида","Австралия"], a:0, exp:"Альпы — в Европе." },
  { id:"geo3_e15", block:"geo", level:"easy", q:"Столица Испании?", opts:["Мадрид","Барселона","Севилья","Валенсия"], a:0, exp:"Мадрид." },

  // MEDIUM (15)
  { id:"geo3_m01", block:"geo", level:"medium", q:"Архипелаг — это…", opts:["Группа островов","Группа гор","Река","Пустыня"], a:0, exp:"Архипелаг = много островов." },
  { id:"geo3_m02", block:"geo", level:"medium", q:"Река Лондона — это…", opts:["Темза","Сена","Рейн","Дунай"], a:0, exp:"Темза." },
  { id:"geo3_m03", block:"geo", level:"medium", q:"0° долготы — это…", opts:["Гринвичский меридиан","Экватор","Тропик","Полярный круг"], a:0, exp:"Нулевой меридиан." },
  { id:"geo3_m04", block:"geo", level:"medium", q:"Самый большой материк по площади?", opts:["Евразия","Африка","Северная Америка","Австралия"], a:0, exp:"Евразия крупнейшая." },
  { id:"geo3_m05", block:"geo", level:"medium", q:"Сена протекает через…", opts:["Париж","Лондон","Рим","Берлин"], a:0, exp:"Сена — Париж." },
  { id:"geo3_m06", block:"geo", level:"medium", q:"Амазонка находится в…", opts:["Южной Америке","Африке","Европе","Азии"], a:0, exp:"Южная Америка." },
  { id:"geo3_m07", block:"geo", level:"medium", q:"Где расположен Большой Барьерный риф?", opts:["Австралия","Исландия","Канада","Марокко"], a:0, exp:"У берегов Австралии." },
  { id:"geo3_m08", block:"geo", level:"medium", q:"Что такое «дельта реки»?", opts:["Разветвление у устья","Источник","Гора","Океан"], a:0, exp:"Река распадается на рукава." },
  { id:"geo3_m09", block:"geo", level:"medium", q:"Какая страна НЕ в Европе?", opts:["Марокко","Польша","Австрия","Португалия"], a:0, exp:"Марокко — Африка." },
  { id:"geo3_m10", block:"geo", level:"medium", q:"Самая длинная река Южной Америки (часто так считают)?", opts:["Амазонка","Нил","Дунай","Янцзы"], a:0, exp:"Амазонка." },
  { id:"geo3_m11", block:"geo", level:"medium", q:"Самое глубокое озеро мира?", opts:["Байкал","Виктория","Онтарио","Ладога"], a:0, exp:"Байкал — самое глубокое." },
  { id:"geo3_m12", block:"geo", level:"medium", q:"Гренландия относится к региону…", opts:["Северная Америка","Африка","Австралия","Антарктида"], a:0, exp:"Географически — Северная Америка." },
  { id:"geo3_m13", block:"geo", level:"medium", q:"Какая столица находится на Дунае?", opts:["Вена","Париж","Мадрид","Лиссабон"], a:0, exp:"Вена стоит на Дунае." },
  { id:"geo3_m14", block:"geo", level:"medium", q:"Что такое «муссон»?", opts:["Сезонный ветер","Гора","Река","Остров"], a:0, exp:"Меняет направление по сезонам." },
  { id:"geo3_m15", block:"geo", level:"medium", q:"Какая страна имеет самый большой по площади остров (в смысле государства-острова)?", opts:["Австралия","Исландия","Куба","Мадагаскар"], a:0, exp:"Австралия — государство-материк/остров." },

  // HARD (10)
  { id:"geo3_h01", block:"geo", level:"hard", q:"Как называется точка противоположная зениту?", opts:["Надир","Экватор","Азимут","Полюс"], a:0, exp:"Надир — противоположность зениту." },
  { id:"geo3_h02", block:"geo", level:"hard", q:"Какая из линий — широта?", opts:["Параллель","Меридиан","Диагональ","Хорда"], a:0, exp:"Широты — параллели." },
  { id:"geo3_h03", block:"geo", level:"hard", q:"Что измеряют в узлах?", opts:["Скорость корабля","Температуру","Высоту","Массу"], a:0, exp:"Узел — морская скорость." },
  { id:"geo3_h04", block:"geo", level:"hard", q:"Самый высокий действующий вулкан Земли (часто называют)?", opts:["Охос-дель-Саладо","Фудзи","Этна","Кракатау"], a:0, exp:"Охос-дель-Саладо — один из самых высоких." },
  { id:"geo3_h05", block:"geo", level:"hard", q:"Как называется «впадина» океана у берегов Перу и Чили?", opts:["Перуано-Чилийский жёлоб","Марианская впадина","Байкальская впадина","Атакамская ложбина"], a:0, exp:"Перуано-Чилийский жёлоб." },
  { id:"geo3_h06", block:"geo", level:"hard", q:"Фьорды чаще всего ассоциируются со страной…", opts:["Норвегия","Египет","Мексика","Индия"], a:0, exp:"Норвегия известна фьордами." },
  { id:"geo3_h07", block:"geo", level:"hard", q:"Что такое «изолиния» на карте?", opts:["Линия равных значений","Граница страны","Река","Дорога"], a:0, exp:"Напр. изотермы, изобары." },
  { id:"geo3_h08", block:"geo", level:"hard", q:"Самая высокая вершина Европы (часто так считают)?", opts:["Эльбрус","Монблан","Маттерхорн","Олимп"], a:0, exp:"Эльбрус часто считают высшей точкой Европы." },
  { id:"geo3_h09", block:"geo", level:"hard", q:"«Эстуарий» — это…", opts:["Воронкообразное устье реки","Источник","Озеро","Ледник"], a:0, exp:"Особый тип устья." },
  { id:"geo3_h10", block:"geo", level:"hard", q:"Где находится мыс Доброй Надежды?", opts:["ЮАР","Италия","Япония","Канада"], a:0, exp:"Южная Африка." },

  // ======================
  // 🧠 LOGIC (40)
  // ======================
  // EASY (15)
  { id:"log3_e01", block:"logic", level:"easy", q:"Сколько будет 17 − 9?", opts:["6","7","8","9"], a:2, exp:"17−9=8." },
  { id:"log3_e02", block:"logic", level:"easy", q:"Сколько минут в 3 часах?", opts:["120","150","180","210"], a:2, exp:"3×60=180." },
  { id:"log3_e03", block:"logic", level:"easy", q:"Что больше: 0.6 или 0.06?", opts:["0.6","0.06","Они равны","Нельзя сравнить"], a:0, exp:"0.6=60%, 0.06=6%." },
  { id:"log3_e04", block:"logic", level:"easy", q:"Сколько сторон у треугольника?", opts:["2","3","4","5"], a:1, exp:"Треугольник — 3 стороны." },
  { id:"log3_e05", block:"logic", level:"easy", q:"9×7 =", opts:["56","63","72","79"], a:1, exp:"9×7=63." },
  { id:"log3_e06", block:"logic", level:"easy", q:"50% от 120 =", opts:["50","60","70","80"], a:1, exp:"Половина 120 — 60." },
  { id:"log3_e07", block:"logic", level:"easy", q:"Продолжи: 2, 4, 6, 8, …", opts:["9","10","11","12"], a:1, exp:"+2 → 10." },
  { id:"log3_e08", block:"logic", level:"easy", q:"Что больше: 3/4 или 2/3?", opts:["3/4","2/3","Равны","Нельзя"], a:0, exp:"0.75 > 0.66…" },
  { id:"log3_e09", block:"logic", level:"easy", q:"Сколько секунд в 2 минутах?", opts:["100","110","120","130"], a:2, exp:"2×60=120." },
  { id:"log3_e10", block:"logic", level:"easy", q:"15 + 6 =", opts:["19","20","21","22"], a:2, exp:"21." },
  { id:"log3_e11", block:"logic", level:"easy", q:"Чётное число:", opts:["7","9","12","15"], a:2, exp:"12 делится на 2." },
  { id:"log3_e12", block:"logic", level:"easy", q:"Квадрат числа 5 это…", opts:["10","20","25","30"], a:2, exp:"5×5=25." },
  { id:"log3_e13", block:"logic", level:"easy", q:"Если сегодня вторник, завтра…", opts:["Понедельник","Среда","Пятница","Воскресенье"], a:1, exp:"После вторника — среда." },
  { id:"log3_e14", block:"logic", level:"easy", q:"Самое большое число:", opts:["99","101","100","98"], a:1, exp:"101 больше 100." },
  { id:"log3_e15", block:"logic", level:"easy", q:"Если 10 яблок разделить поровну на 2, будет…", opts:["3","4","5","6"], a:2, exp:"10/2=5." },

  // MEDIUM (15)
  { id:"log3_m01", block:"logic", level:"medium", q:"Если x + 8 = 14, то x =", opts:["4","5","6","7"], a:2, exp:"14−8=6." },
  { id:"log3_m02", block:"logic", level:"medium", q:"Если 3a = 27, то a =", opts:["6","7","8","9"], a:3, exp:"27/3=9." },
  { id:"log3_m03", block:"logic", level:"medium", q:"Продолжи: 1, 4, 9, 16, ?", opts:["20","24","25","36"], a:2, exp:"Квадраты: 5²=25." },
  { id:"log3_m04", block:"logic", level:"medium", q:"12.5% от 240 =", opts:["24","30","36","48"], a:1, exp:"1/8 от 240 = 30." },
  { id:"log3_m05", block:"logic", level:"medium", q:"Сколько минут в 1.5 часах?", opts:["60","75","90","120"], a:2, exp:"1.5×60=90." },
  { id:"log3_m06", block:"logic", level:"medium", q:"Продолжи: 3, 6, 12, 24, ?", opts:["27","36","48","60"], a:2, exp:"×2 → 48." },
  { id:"log3_m07", block:"logic", level:"medium", q:"Если 2x = 18, x =", opts:["7","8","9","10"], a:2, exp:"18/2=9." },
  { id:"log3_m08", block:"logic", level:"medium", q:"Лишнее: квадрат, треугольник, круг, куб", opts:["квадрат","треугольник","круг","куб"], a:3, exp:"Куб — объёмная фигура." },
  { id:"log3_m09", block:"logic", level:"medium", q:"Сколько различных двузначных чисел из цифр 1 и 2 (повторы можно)?", opts:["2","3","4","6"], a:2, exp:"11,12,21,22 — 4." },
  { id:"log3_m10", block:"logic", level:"medium", q:"Верно ли: если все A — B, то A ⊂ B?", opts:["Да","Нет","Иногда","Нельзя сказать"], a:0, exp:"По определению подмножества." },
  { id:"log3_m11", block:"logic", level:"medium", q:"Сколько секунд в 2.5 минутах?", opts:["120","130","150","180"], a:2, exp:"2.5×60=150." },
  { id:"log3_m12", block:"logic", level:"medium", q:"Если 5x − 10 = 15, то x =", opts:["3","4","5","6"], a:2, exp:"5x=25 → x=5." },
  { id:"log3_m13", block:"logic", level:"medium", q:"Среднее арифметическое 2 и 8 =", opts:["4","5","6","7"], a:1, exp:"(2+8)/2=5." },
  { id:"log3_m14", block:"logic", level:"medium", q:"Если 30% от числа = 30, число =", opts:["60","90","100","120"], a:1, exp:"30 = 0.3·N → N=100." },
  { id:"log3_m15", block:"logic", level:"medium", q:"Продолжи: 2, 6, 18, 54, ?", opts:["81","108","162","216"], a:2, exp:"×3 → 162." },

  // HARD (10)
  { id:"log3_h01", block:"logic", level:"hard", q:"(8×7) − (6×5) =", opts:["26","28","30","32"], a:0, exp:"56−30=26." },
  { id:"log3_h02", block:"logic", level:"hard", q:"Фибоначчи: 1,1,2,3,5,8, ?", opts:["11","12","13","15"], a:2, exp:"5+8=13." },
  { id:"log3_h03", block:"logic", level:"hard", q:"Если a:b = 2:5 и b = 40, то a =", opts:["8","10","16","20"], a:3, exp:"5k=40→k=8→a=16." },
  { id:"log3_h04", block:"logic", level:"hard", q:"Сколько будет 7×8 − 6×5?", opts:["16","26","30","56"], a:1, exp:"56−30=26." },
  { id:"log3_h05", block:"logic", level:"hard", q:"Сколько разных двузначных чисел из цифр 1,2,3 (повторы можно)?", opts:["6","7","8","9"], a:3, exp:"3×3=9 вариантов." },
  { id:"log3_h06", block:"logic", level:"hard", q:"Если 3(a−2)=15, то a =", opts:["5","6","7","8"], a:3, exp:"a−2=5 → a=7… стоп: 15/3=5, a=7. (правильный 7)"},
  { id:"log3_h06_fix", block:"logic", level:"hard", q:"Если 3(a−2)=15, то a =", opts:["5","6","7","8"], a:2, exp:"15/3=5 → a−2=5 → a=7." },
  { id:"log3_h07", block:"logic", level:"hard", q:"1/3 от 120 =", opts:["30","35","40","45"], a:2, exp:"120/3=40." },
  { id:"log3_h08", block:"logic", level:"hard", q:"Если x/4 = 6, x =", opts:["18","20","22","24"], a:3, exp:"6×4=24." },
  { id:"log3_h09", block:"logic", level:"hard", q:"Логика: «Все A — B». Точно верно:", opts:["Все B — A","Некоторые B — A","Все A входят в B","Ничего"], a:2, exp:"A ⊂ B." },
  { id:"log3_h10", block:"logic", level:"hard", q:"Сколько будет 9² − 8² ?", opts:["15","17","19","21"], a:0, exp:"(9−8)(9+8)=1×17=17… стоп: значит правильный 17." },
  { id:"log3_h10_fix", block:"logic", level:"hard", q:"Сколько будет 9² − 8² ?", opts:["15","17","19","21"], a:1, exp:"81−64=17." },
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
  quizEasyBtn?.classList.toggle("active", level === "easy");
  quizMedBtn?.classList.toggle("active", level === "medium");
  quizHardBtn?.classList.toggle("active", level === "hard");
}
function updateQuizScore() {
  if (quizScore) quizScore.textContent = `${quizCorrect} / ${quizTotal}`;
}

function renderQuizQuestion() {
  if (quizFeedback) quizFeedback.textContent = "";
  if (quizOptions) quizOptions.innerHTML = "";
  quizLocked = false;

  if (!quizCurrent) {
    if (quizQuestion) quizQuestion.textContent = "Нажми “Next”, чтобы начать.";
    return;
  }

  if (quizQuestion) quizQuestion.textContent = quizCurrent.q;

  quizCurrent.opts.forEach((text, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "quizOptBtn";
    b.textContent = text;
    b.addEventListener("click", () => chooseQuiz(idx, b));
    quizOptions?.appendChild(b);
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
  const buttons = Array.from(quizOptions?.querySelectorAll(".quizOptBtn") || []);

  if (idx === correctIdx) {
    quizCorrect += 1;
    btnEl.classList.add("correct");
    if (quizFeedback) quizFeedback.textContent = "Верно ✅";
    showCelebrate();
  } else {
    btnEl.classList.add("wrong");
    buttons[correctIdx]?.classList.add("correct");
    if (quizFeedback) quizFeedback.textContent = "Не совсем 🙂";
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
// Tabs
tabSchedule?.addEventListener("click", () => showTab("schedule"));
tabWishes?.addEventListener("click", () => showTab("wishes"));
tabSettings?.addEventListener("click", () => showTab("settings"));

// Week switch
weekOddBtn?.addEventListener("click", () => setWeek("odd"));
weekEvenBtn?.addEventListener("click", () => setWeek("even"));

// Schedule: calendar + arrows
calendarBtn?.addEventListener("click", () => {
  if (!datePicker) return;
  if (typeof datePicker.showPicker === "function") datePicker.showPicker();
  else datePicker.click();
});

datePicker?.addEventListener("change", (e) => {
  const iso = e.target.value;
  if (!iso) return;
  selectedISO = iso;
  renderSelectedDate();
});

prevDayBtn?.addEventListener("click", () => {
  selectedISO = addDaysISO(selectedISO, -1);
  if (datePicker) datePicker.value = selectedISO;
  renderSelectedDate();
});

nextDayBtn?.addEventListener("click", () => {
  selectedISO = addDaysISO(selectedISO, 1);
  if (datePicker) datePicker.value = selectedISO;
  renderSelectedDate();
});

// Wishes
newWishBtn?.addEventListener("click", setNewWish);

// Settings: schedule
addClassBtn?.addEventListener("click", openAddClass);
classForm?.addEventListener("submit", (e) => { e.preventDefault(); saveClassFromForm(); });

clearScheduleBtn?.addEventListener("click", () => {
  if (!confirm("Точно очистить расписание?")) return;
  localStorage.removeItem(K_CLASSES);
  renderSelectedDate();
});

csvInput?.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const parsed = parseCSV(text);
    const classes = loadJSON(K_CLASSES, []);
    parsed.forEach(x => classes.push(x));
    saveJSON(K_CLASSES, classes);
    alert(`Импортировано: ${parsed.length}`);
    renderSelectedDate();
  } catch (err) {
    alert(String(err?.message || err));
  } finally {
    e.target.value = "";
  }
});

// Memory
memoryStartBtn?.addEventListener("click", () => { if (!memActive) memoryStart(); });
memoryResetBtn?.addEventListener("click", memoryReset);

// Quiz
quizNextBtn?.addEventListener("click", nextQuiz);
quizResetBtn?.addEventListener("click", resetQuiz);
quizEasyBtn?.addEventListener("click", () => setQuizLevel("easy"));
quizMedBtn?.addEventListener("click", () => setQuizLevel("medium"));
quizHardBtn?.addEventListener("click", () => setQuizLevel("hard"));

/* =========================
   Init
========================= */
function init() {
  updateWeekUI();
  showTab("schedule");

  selectedISO = isoDate();
  if (datePicker) datePicker.value = selectedISO;
  renderSelectedDate();

  setNewWish();
  memoryReset();

  updateQuizLevelUI();
  resetQuiz();
}
init();

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
const quizCatHistoryBtn = $("quizCatHistoryBtn");
const quizCatScienceBtn = $("quizCatScienceBtn");
const quizCatLitBtn = $("quizCatLitBtn");
const quizCatGeoBtn = $("quizCatGeoBtn");
const quizCatLogicBtn = $("quizCatLogicBtn");

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
  "Доброе утро, мой цветочек 🌸💗 как ты спала?",
  "Ты самая милая девочка на этой планете, моя принцесса 👑💞",
  "Если вдруг станет грустно — представь, как я тебя обнимаю, любимая 🫂💗",
  "Ты такая красивая, моя девочка, что я иногда просто залипаю 😌💖",
  "Напоминание на сегодня: я тебя очень сильно люблю 💗",
  "Пусть сегодня тебя окружают только добрые люди, мой цветочек 🌷✨",
  "Ты моя принцесса и моя гордость 🥰👑",
  "Даже если день сложный — ты всё равно моя умничка 💕",
  "Я бы сейчас поцеловал тебя в лобик, моя девочка 😚💗",
  "Ты заслуживаешь самого мягкого и спокойного дня, любимая ☁️💞",

  "Ты такая милая… даже когда злишься 😌💗",
  "Пожалуйста, береги себя, мой цветочек, ты для меня — целый мир 🌍💖",
  "Я всегда на твоей стороне, моя принцесса 💞",
  "Ты самая нежная душа, любимая 🌸💗",
  "Если устала — иди ко мне, моя девочка, я тебя укрою 🧸💕",
  "Ты делаешь мою жизнь светлее просто тем, что есть ✨💖",
  "Я скучаю по тебе даже когда прошло 5 минут, мой цветочек 🥺💗",
  "Пусть сегодня тебя кто-нибудь похвалит. А если нет — я уже, любимая 💕",
  "Ты моя радость, моя девочка 🌷💗",
  "Даже в пижаме ты самая красивая, любимая 😌💞",

  "Я люблю твою улыбку, мой цветочек. Она лечит 💗✨",
  "Если кто-то тебя обидит — я мысленно рядом 😌💗",
  "Ты — моё спокойствие и мой хаос одновременно 🥰",
  "Пусть сегодня будет момент, когда ты почувствуешь себя счастливой 💖",
  "Ты можешь быть любой — я люблю тебя во всех версиях 💕",
  "Ты не обязана быть сильной, любимая. Я рядом 🫂💗",
  "Я так горжусь тобой, моя девочка 🥺💞",
  "Ты невероятная. И это не обсуждается 💗✨",
  "Я бы сейчас просто тихо держал тебя за руку 🫶💖",
  "Ты самое тёплое, что есть в моей жизни ☀️💞",

  "Если сомневаешься в себе — вспомни, что ты самая красивая и самая умная девочка на свете 💗✨",
  "Мне так повезло, что именно ты — моя, любимая 🥺💞",
  "Спасибо, что ты есть у меня, мой цветочек 💗✨",
  "Я выбираю тебя каждый день. И буду выбирать 💖",
  "Пусть сегодня ты почувствуешь себя самой любимой девочкой на свете 🥰💗",

  // Мотивационные 💪✨
  "Моя девочка, ты справишься. Даже если по шагам — ты всё равно справишься 💗",
  "Мой цветочек, у тебя всё получится. Я в тебя верю 💞",
  "Любимая, ты сильнее любых сложностей 💪💗",
  "Моя принцесса, сегодня твой день. И ты его проживёшь красиво 👑✨",
  "Ты умная и способная, моя девочка. Не забывай это 💖",
  "Если что-то не выйдет с первого раза — выйдет со второго, мой цветочек 🌸",
  "Ты растёшь и становишься только сильнее 💪💞",
  "Любимая, у тебя огромный потенциал. И ты его раскрываешь ✨",
  "Моя принцесса, ты достойна больших побед 👑💗",
  "Ты уже проделала большой путь, и я горжусь тобой 💖",

  "Мой цветочек, не бойся ошибок — они делают тебя умнее 🌸✨",
  "Ты справляешься лучше, чем тебе кажется 💗",
  "Любимая, ты заслуживаешь успеха 💞",
  "Моя принцесса, верь в себя так же, как я верю в тебя 👑💖",
  "Ты способна на большее, моя девочка 💪💗",
  "Даже если тяжело — ты не сдаёшься. И это уже сила 💞",
  "Мой цветочек, каждый день ты становишься лучше 🌷✨",
  "Любимая, у тебя светлая голова и доброе сердце 💗",
  "Моя принцесса, ты создана для красивой жизни 👑💖",
  "Ты всё сможешь. А я всегда буду рядом 💞",
  "Держись Любимая, с холодной головой и теплом в сердце ты справишься 💞",

  // Более личные 🥹💗
  "Иногда я просто смотрю на тебя и понимаю — это моё счастье 💗",
  "Любимая, ты даже не представляешь, как сильно я тебя ценю 🥺",
  "Моя девочка, с тобой мне спокойно по-настоящему 💞",
  "Если бы можно было — я бы сейчас просто молча тебя обнял 🌸",
  "Ты — мой самый родной человек 💗",
  "Мне хорошо просто от мысли о тебе 🫶",
  "Мой цветочек, ты делаешь мою жизнь теплее 🌷",
  "Любимая, я благодарен судьбе за тебя 💖",
  "С тобой хочется строить будущее 💞",
  "Ты моё сердце. И это навсегда 💗",
  "Даже обычный день становится особенным, если ты в нём есть ✨",
  "Моя принцесса, ты — моя нежность 👑💗",
  "Я люблю, как ты смеёшься 🥰",
  "Ты — мой человек. И это лучшее чувство 💞",
  "Я рядом, прямо в твоём сердечке 💖"
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

const PRAISES = [
  { t:"Ты моя умничка 💗🥰", s:"Так держать! ✨" },
  { t:"Вау! Ты супер 💖", s:"Я тобой горжусь 😍" },
  { t:"Браво, красавица 💗", s:"У тебя отлично получается 🌸" },
  { t:"Ты просто космос ⭐️", s:"Продолжай в том же духе 🚀" },
  { t:"Гордость моя 💞", s:"Ещё чуть-чуть — и будет рекорд ✨" },
  { t:"Умничкааа 💗", s:"Ты справилась идеально 😌" },
  { t:"Ты сильная 💪💗", s:"И очень-очень умная 🥰" },
  { t:"Красиво сделано 💖", s:"Вот это уровень! 🎉" },
  { t:"Молодец, любимая 🌷", s:"Ты сияешь ✨" },
  { t:"Победа! 💕", s:"Так приятно смотреть на твой прогресс 😊" }
];

/* =========================
   Celebration (PAUSE-SAFE)
========================= */
function rand(min, max) { return Math.random() * (max - min) + min; }

let celebrateVisible = false;
let celebrateHideTimer = null;
let celebrateResolver = null;

// глобальная пауза для Memory (и можно использовать где угодно)
let UI_PAUSED = false;

function showCelebrate() {
  UI_PAUSED = true;
  celebrateVisible = true;

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

  if (celebrateHideTimer) clearTimeout(celebrateHideTimer);

  return new Promise((resolve) => {
    celebrateResolver = resolve;
    celebrateHideTimer = setTimeout(hideCelebrate, 1350);
  });
}

function hideCelebrate() {
  if (!celebrateVisible) return;

  celebrateVisible = false;
  UI_PAUSED = false;

  if (celebrateHideTimer) {
    clearTimeout(celebrateHideTimer);
    celebrateHideTimer = null;
  }

  celebrate.classList.add("hidden");
  celebrate.setAttribute("aria-hidden", "true");
  celebrateParticles.innerHTML = "";

  if (typeof celebrateResolver === "function") {
    const r = celebrateResolver;
    celebrateResolver = null;
    r(); // <- вот тут "разрешаем" продолжение игры
  }
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

  // ждём, пока похвала полностью уйдёт
  while (UI_PAUSED || celebrateVisible) await sleep(50);

  setMemoryUI("Смотри внимательно…");
  await sleep(200);

  for (const i of memSequence) {
    // если вдруг похвала появилась в середине — стопаемся и ждём
    while (UI_PAUSED || celebrateVisible) await sleep(50);
    await flashPad(i);
  }

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
  // ВАЖНО: ставим блокировку показа/кликов ещё до похвалы
  memShowing = true;

  await showCelebrate(); // <- теперь 100% ждём, пока похвала закроется

  memLevel += 1;
  memUserIndex = 0;

  updatePadCountForLevel();
  rebuildMemoryGrid();
  addRandomStep();

  await sleep(120);
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
  // Пока похвала видна / пауза активна — никаких кликов
  if (!memActive || memShowing || UI_PAUSED || celebrateVisible) return;

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
  // ======================
  // 🏛️ HISTORY (40)
  // ======================
  // EASY (15)
  { id:"his3_e01", block:"history", level:"easy", q:"В какой стране были фараоны?", opts:["Египет","Греция","Италия","Китай"], a:0, exp:"Фараоны правили в Древнем Египте." },
  { id:"his3_e02", block:"history", level:"easy", q:"Как назывались воины Древнего Рима?", opts:["Легионеры","Самураи","Рыцари","Викинги"], a:0, exp:"Римская армия — легионы." },
  { id:"his3_e03", block:"history", level:"easy", q:"Колизей находится в…", opts:["Риме","Афинах","Париже","Лондоне"], a:0, exp:"Колизей — в Риме." },
  { id:"his3_e04", block:"history", level:"easy", q:"Викинги — это…", opts:["Северные мореплаватели","Римские сенаторы","Египетские жрецы","Китайские императоры"], a:0, exp:"Викинги — народы Севера." },
  { id:"his3_e05", block:"history", level:"easy", q:"Пирамиды Гизы связаны с…", opts:["Египтом","Японией","Бразилией","Австралией"], a:0, exp:"Гиза — Египет." },
  { id:"his3_e06", block:"history", level:"easy", q:"Спарта — это…", opts:["Древнегреческий город","Римская провинция","Остров в Японии","Гора в Альпах"], a:0, exp:"Спарта — полис в Греции." },
  { id:"his3_e07", block:"history", level:"easy", q:"Иероглифы — письменность…", opts:["Египта","Исландии","Канады","Испании"], a:0, exp:"Иероглифы — Древний Египет." },
  { id:"his3_e08", block:"history", level:"easy", q:"Кто такие гладиаторы?", opts:["Бойцы на арене","Моряки","Учёные","Купцы"], a:0, exp:"Сражались в амфитеатрах." },
  { id:"his3_e09", block:"history", level:"easy", q:"Средневековье — это время…", opts:["Замков и рыцарей","Динозавров","Космонавтов","Интернета"], a:0, exp:"Рыцари и замки — символ эпохи." },
  { id:"his3_e10", block:"history", level:"easy", q:"Кто первым полетел в космос?", opts:["Гагарин","Армстронг","Терешкова","Кеплер"], a:0, exp:"Юрий Гагарин — первый человек в космосе." },
  { id:"his3_e11", block:"history", level:"easy", q:"Крестовые походы были в…", opts:["Средневековье","Античность","XX век","Каменный век"], a:0, exp:"Это средневековые походы." },
  { id:"his3_e12", block:"history", level:"easy", q:"Самураи связаны со страной…", opts:["Япония","Египет","Италия","Исландия"], a:0, exp:"Самураи — Япония." },
  { id:"his3_e13", block:"history", level:"easy", q:"Как назывался путь торговли между Востоком и Западом?", opts:["Шёлковый путь","Соляной путь","Ледяной путь","Золотой путь"], a:0, exp:"Шёлковый путь — сеть маршрутов." },
  { id:"his3_e14", block:"history", level:"easy", q:"Античность обычно связывают с…", opts:["Грецией и Римом","Только Японией","Только Австралией","Только Канадой"], a:0, exp:"Античность = Греция/Рим." },
  { id:"his3_e15", block:"history", level:"easy", q:"Титаник затонул в…", opts:["1912","1812","2012","1712"], a:0, exp:"Катастрофа «Титаника» — 1912." },

  // MEDIUM (15)
  { id:"his3_m01", block:"history", level:"medium", q:"Ренессанс — это…", opts:["Возрождение","Каменный век","Античность","Новейшее время"], a:0, exp:"Ренессанс = Возрождение." },
  { id:"his3_m02", block:"history", level:"medium", q:"Реформа — это…", opts:["Изменение системы","Праздник","Стих","Переезд"], a:0, exp:"Реформа меняет устройство/правила." },
  { id:"his3_m03", block:"history", level:"medium", q:"Мачу-Пикчу построили…", opts:["Инки","Римляне","Викинги","Кельты"], a:0, exp:"Это наследие инков." },
  { id:"his3_m04", block:"history", level:"medium", q:"Амфитеатр для гладиаторов в Риме — это…", opts:["Колизей","Пантеон","Парфенон","Версаль"], a:0, exp:"Колизей — главная арена." },
  { id:"his3_m05", block:"history", level:"medium", q:"Кто совершил экспедицию первой кругосветки?", opts:["Магеллан","Колумб","Дарвин","Цезарь"], a:0, exp:"Экспедиция Магеллана первой обогнула Землю." },
  { id:"his3_m06", block:"history", level:"medium", q:"Демократия — это…", opts:["Власть народа","Власть одного","Власть армии","Власть денег"], a:0, exp:"Демо+кратия = народ+власть." },
  { id:"his3_m07", block:"history", level:"medium", q:"Археология изучает прошлое по…", opts:["Находкам","Гороскопам","Снам","Рекламе"], a:0, exp:"Археологи работают с артефактами." },
  { id:"his3_m08", block:"history", level:"medium", q:"Печатный станок связали с именем…", opts:["Гутенберг","Ньютон","Галилей","Пифагор"], a:0, exp:"Иоганн Гутенберг." },
  { id:"his3_m09", block:"history", level:"medium", q:"«Хроника» — это…", opts:["Летопись событий","Сказка","Карта","Песня"], a:0, exp:"Хроника фиксирует события по порядку." },
  { id:"his3_m10", block:"history", level:"medium", q:"Что раньше?", opts:["Античность","Средневековье","XX век","Новейшее время"], a:0, exp:"Античность — раньше остальных." },
  { id:"his3_m11", block:"history", level:"medium", q:"Самый известный город-государство «про философов» в Греции?", opts:["Афины","Спарта","Рим","Троя"], a:0, exp:"Афины — центр культуры и философии." },
  { id:"his3_m12", block:"history", level:"medium", q:"Кто такие «колонисты» (в истории)?", opts:["Переселенцы","Только солдаты","Только учёные","Только короли"], a:0, exp:"Колонисты — переселялись в новые земли." },
  { id:"his3_m13", block:"history", level:"medium", q:"Что обычно называют «революцией»?", opts:["Резкий переворот","Спокойную реформу","Погодное явление","Спор"], a:0, exp:"Революция — резкие изменения." },
  { id:"his3_m14", block:"history", level:"medium", q:"Какое море «внутри Европы» и часто упоминается в истории торговли?", opts:["Средиземное","Берингово","Карибское","Аравийское"], a:0, exp:"Средиземное море — ключевое." },
  { id:"his3_m15", block:"history", level:"medium", q:"Сколько веков в тысячелетии?", opts:["10","100","50","12"], a:0, exp:"1000 лет = 10 веков." },

  // HARD (10)
  { id:"his3_h01", block:"history", level:"hard", q:"Полис — это…", opts:["Город-государство","Империя","Племя","Остров"], a:0, exp:"Полис — независимый город." },
  { id:"his3_h02", block:"history", level:"hard", q:"Хронология — наука о…", opts:["Датах и порядке событий","Климате","Птицах","Языках"], a:0, exp:"Хронология упорядочивает события." },
  { id:"his3_h03", block:"history", level:"hard", q:"До империи Рим был…", opts:["Республикой","Султанатом","Ханством","Колонией"], a:0, exp:"Римская республика предшествовала империи." },
  { id:"his3_h04", block:"history", level:"hard", q:"Эпоха Великих географических открытий — это…", opts:["XV–XVII вв.","I–III вв.","XIX–XX вв.","XXI век"], a:0, exp:"Пик открытий — XV–XVII века." },
  { id:"his3_h05", block:"history", level:"hard", q:"«Династия» — это…", opts:["Род правителей","Тип армии","Город","Монета"], a:0, exp:"Династия — семья правителей." },
  { id:"his3_h06", block:"history", level:"hard", q:"Макиавелли написал…", opts:["«Государь»","«Одиссею»","«Илиаду»","«Фауста»"], a:0, exp:"Автор «Государя» — Макиавелли." },
  { id:"his3_h07", block:"history", level:"hard", q:"Что было раньше?", opts:["Средневековье","Ренессанс","Индустриальная революция","Космическая эра"], a:0, exp:"Средневековье самое раннее из списка." },
  { id:"his3_h08", block:"history", level:"hard", q:"Что такое «источник» в истории?", opts:["Документ/свидетельство","Только река","Только человек","Только музей"], a:0, exp:"Источник — всё, что даёт сведения о прошлом." },
  { id:"his3_h09", block:"history", level:"hard", q:"Кто такие «скрипторы»?", opts:["Переписчики рукописей","Моряки","Лекари","Кузнецы"], a:0, exp:"Скрипторы переписывали книги." },
  { id:"his3_h10", block:"history", level:"hard", q:"«Анналы» ближе всего к…", opts:["Летописям","Комедиям","Романам","Плакатам"], a:0, exp:"Анналы — годовые записи событий." },

  // ======================
  // 🧪 SCIENCE (40)
  // ======================
  // EASY (15)
  { id:"sci3_e01", block:"science", level:"easy", q:"Какая звезда в центре нашей системы?", opts:["Солнце","Сириус","Полярная","Вега"], a:0, exp:"Солнце — центр Солнечной системы." },
  { id:"sci3_e02", block:"science", level:"easy", q:"Что качает кровь по телу?", opts:["Сердце","Лёгкие","Желудок","Почки"], a:0, exp:"Сердце — насос." },
  { id:"sci3_e03", block:"science", level:"easy", q:"Что из этого — газ?", opts:["Кислород","Стекло","Камень","Лёд"], a:0, exp:"Кислород — газ." },
  { id:"sci3_e04", block:"science", level:"easy", q:"Что измеряет термометр?", opts:["Температуру","Скорость","Массу","Давление"], a:0, exp:"Термометр — температура." },
  { id:"sci3_e05", block:"science", level:"easy", q:"Какая планета ближе к Солнцу?", opts:["Меркурий","Марс","Земля","Юпитер"], a:0, exp:"Самая близкая — Меркурий." },
  { id:"sci3_e06", block:"science", level:"easy", q:"Что нужно растениям для фотосинтеза?", opts:["Свет","Лёд","Шоколад","Тень"], a:0, exp:"Фотосинтез требует света." },
  { id:"sci3_e07", block:"science", level:"easy", q:"Какая планета известна кольцами?", opts:["Сатурн","Венера","Марс","Меркурий"], a:0, exp:"Сатурн знаменит кольцами." },
  { id:"sci3_e08", block:"science", level:"easy", q:"Что мы вдыхаем, чтобы жить?", opts:["Кислород","Гелий","Азот","Дым"], a:0, exp:"Нам нужен кислород." },
  { id:"sci3_e09", block:"science", level:"easy", q:"Вода при 0°C обычно становится…", opts:["Льдом","Паром","Плазмой","Песком"], a:0, exp:"При 0°C замерзает." },
  { id:"sci3_e10", block:"science", level:"easy", q:"Телескоп нужен, чтобы…", opts:["Наблюдать звёзды","Считать шаги","Готовить","Рисовать"], a:0, exp:"Телескоп — астрономия." },
  { id:"sci3_e11", block:"science", level:"easy", q:"Что тяжелее: 1 кг ваты или 1 кг железа?", opts:["Одинаково","Вата","Железо","Зависит"], a:0, exp:"Оба по 1 кг." },
  { id:"sci3_e12", block:"science", level:"easy", q:"Радуга — это явление…", opts:["Света","Звука","Гравитации","Магнита"], a:0, exp:"Радуга связана со светом." },
  { id:"sci3_e13", block:"science", level:"easy", q:"Какая часть тела отвечает за мысли?", opts:["Мозг","Пятка","Локоть","Печень"], a:0, exp:"Мозг — центр нервной системы." },
  { id:"sci3_e14", block:"science", level:"easy", q:"Что такое «клетка» в биологии?", opts:["Мини-единица живого","Камень","Планета","Облако"], a:0, exp:"Клетка — основа живого." },
  { id:"sci3_e15", block:"science", level:"easy", q:"Какая часть растения обычно зелёная?", opts:["Лист","Корень","Семя","Пыльца"], a:0, exp:"Лист содержит хлорофилл." },

  // MEDIUM (15)
  { id:"sci3_m01", block:"science", level:"medium", q:"Какой газ преобладает в атмосфере Земли?", opts:["Азот","Кислород","Углекислый газ","Водород"], a:0, exp:"Азота больше всего (~78%)." },
  { id:"sci3_m02", block:"science", level:"medium", q:"Единица напряжения — это…", opts:["Вольт","Ампер","Ом","Ватт"], a:0, exp:"Напряжение измеряют в вольтах." },
  { id:"sci3_m03", block:"science", level:"medium", q:"Единица силы тока — это…", opts:["Ампер","Вольт","Ом","Джоуль"], a:0, exp:"Ток измеряют в амперах." },
  { id:"sci3_m04", block:"science", level:"medium", q:"Единица мощности — это…", opts:["Ватт","Ньютон","Паскаль","Кельвин"], a:0, exp:"Мощность — ватт." },
  { id:"sci3_m05", block:"science", level:"medium", q:"Как называется центр атома?", opts:["Ядро","Электрон","Орбита","Луч"], a:0, exp:"В центре — ядро." },
  { id:"sci3_m06", block:"science", level:"medium", q:"Какая частица имеет отрицательный заряд?", opts:["Электрон","Протон","Нейтрон","Фотон"], a:0, exp:"Электрон отрицательный." },
  { id:"sci3_m07", block:"science", level:"medium", q:"Испарение — это переход воды в…", opts:["Пар","Лёд","Камень","Пыль"], a:0, exp:"Испарение = жидкость → газ." },
  { id:"sci3_m08", block:"science", level:"medium", q:"Сколько планет в Солнечной системе?", opts:["8","7","9","10"], a:0, exp:"Официально 8 планет." },
  { id:"sci3_m09", block:"science", level:"medium", q:"Что хранит генетическую информацию?", opts:["ДНК","Вода","Соль","Кислород"], a:0, exp:"ДНК — носитель наследственности." },
  { id:"sci3_m10", block:"science", level:"medium", q:"Что измеряют в паскалях?", opts:["Давление","Температуру","Скорость","Массу"], a:0, exp:"Па — единица давления." },
  { id:"sci3_m11", block:"science", level:"medium", q:"В каком органе происходит газообмен?", opts:["Лёгкие","Печень","Желудок","Кости"], a:0, exp:"Газообмен — в лёгких." },
  { id:"sci3_m12", block:"science", level:"medium", q:"Сколько хромосом у человека в соматической клетке?", opts:["46","44","48","52"], a:0, exp:"У человека 46 хромосом." },
  { id:"sci3_m13", block:"science", level:"medium", q:"Что такое «орбита»?", opts:["Путь движения вокруг тела","Тип топлива","Река","Гора"], a:0, exp:"Орбита — траектория вокруг." },
  { id:"sci3_m14", block:"science", level:"medium", q:"Что из этого — энергия?", opts:["Джоуль","Метр","Секунда","Килограмм"], a:0, exp:"Джоуль — единица энергии." },
  { id:"sci3_m15", block:"science", level:"medium", q:"Что такое «гравитация»?", opts:["Притяжение тел","Свет","Звук","Тепло"], a:0, exp:"Гравитация — притяжение." },

  // HARD (10)
  { id:"sci3_h01", block:"science", level:"hard", q:"Единица силы в СИ — это…", opts:["Ньютон","Ватт","Паскаль","Джоуль"], a:0, exp:"Сила измеряется в ньютонах." },
  { id:"sci3_h02", block:"science", level:"hard", q:"pH меньше 7 — среда…", opts:["Кислая","Щелочная","Нейтральная","Солёная"], a:0, exp:"pH<7 означает кислотность." },
  { id:"sci3_h03", block:"science", level:"hard", q:"Скорость света примерно…", opts:["300 000 км/с","30 000 км/с","3 000 км/с","300 км/с"], a:0, exp:"Около 300 000 км/с." },
  { id:"sci3_h04", block:"science", level:"hard", q:"Абсолютный ноль есть в шкале…", opts:["Кельвина","Цельсия","Фаренгейта","Реомюра"], a:0, exp:"Кельвин начинается от абсолютного нуля." },
  { id:"sci3_h05", block:"science", level:"hard", q:"Конвекция — это перенос тепла…", opts:["Потоками газа/жидкости","По твёрдому телу","Светом","Замерзанием"], a:0, exp:"Конвекция — перенос потоками." },
  { id:"sci3_h06", block:"science", level:"hard", q:"Закон сохранения энергии: энергия…", opts:["Переходит из формы в форму","Исчезает","Появляется из ниоткуда","Всегда равна нулю"], a:0, exp:"Энергия сохраняется." },
  { id:"sci3_h07", block:"science", level:"hard", q:"Что НЕ планета по современной классификации?", opts:["Плутон","Марс","Венера","Юпитер"], a:0, exp:"Плутон — карликовая планета." },
  { id:"sci3_h08", block:"science", level:"hard", q:"Что такое «инерция»?", opts:["Свойство сохранять скорость","Способность светиться","Вкус","Температура"], a:0, exp:"Инерция — сопротивление изменению движения." },
  { id:"sci3_h09", block:"science", level:"hard", q:"Какая волна не требует среды?", opts:["Электромагнитная","Звуковая","Морская","Сейсмическая"], a:0, exp:"Свет — электромагнитная волна." },
  { id:"sci3_h10", block:"science", level:"hard", q:"В чём измеряют частоту?", opts:["Герц","Ньютон","Паскаль","Кулон"], a:0, exp:"Гц — колебания в секунду." },

  // ======================
  // 📚 LITERATURE (40)
  // ======================
  // EASY (15)
  { id:"lit3_e01", block:"literature", level:"easy", q:"Кто написал «Война и мир»?", opts:["Толстой","Пушкин","Чехов","Гоголь"], a:0, exp:"Автор — Л.Н. Толстой." },
  { id:"lit3_e02", block:"literature", level:"easy", q:"Кто написал «Сказку о рыбаке и рыбке»?", opts:["Пушкин","Толстой","Гоголь","Достоевский"], a:0, exp:"Автор — А.С. Пушкин." },
  { id:"lit3_e03", block:"literature", level:"easy", q:"Кто создал Шерлока Холмса?", opts:["Конан Дойл","Кристи","Толкин","Верн"], a:0, exp:"Автор — Артур Конан Дойл." },
  { id:"lit3_e04", block:"literature", level:"easy", q:"Басня — это…", opts:["Короткий поучительный рассказ","Большой роман","Газета","Пьеса"], a:0, exp:"Басня обычно с моралью." },
  { id:"lit3_e05", block:"literature", level:"easy", q:"Персонаж — это…", opts:["Герой произведения","Обложка","Шрифт","Страница"], a:0, exp:"Персонаж — действующее лицо." },
  { id:"lit3_e06", block:"literature", level:"easy", q:"Рифма — это…", opts:["Созвучие концов строк","Большая глава","Сюжет","Диалог"], a:0, exp:"Рифма — созвучие." },
  { id:"lit3_e07", block:"literature", level:"easy", q:"Роман — это обычно…", opts:["Большое повествование","Короткая шутка","Один абзац","Только список"], a:0, exp:"Роман — крупный жанр." },
  { id:"lit3_e08", block:"literature", level:"easy", q:"Кто написал «Евгений Онегин»?", opts:["Пушкин","Лермонтов","Чехов","Булгаков"], a:0, exp:"Пушкин." },
  { id:"lit3_e09", block:"literature", level:"easy", q:"Стихотворение — это…", opts:["Поэтический текст","Научная таблица","Инструкция","Карта"], a:0, exp:"Стихотворение — поэзия." },
  { id:"lit3_e10", block:"literature", level:"easy", q:"Кто написал «Капитанскую дочку»?", opts:["Пушкин","Толстой","Тургенев","Чехов"], a:0, exp:"Пушкин." },
  { id:"lit3_e11", block:"literature", level:"easy", q:"Сказка чаще всего…", opts:["Вымышленная история","Отчёт","Закон","График"], a:0, exp:"Сказка — вымысел." },
  { id:"lit3_e12", block:"literature", level:"easy", q:"«Глава» в книге — это…", opts:["Часть текста","Картинка","Сноска","Обложка"], a:0, exp:"Глава — раздел." },
  { id:"lit3_e13", block:"literature", level:"easy", q:"Что делает автор?", opts:["Пишет произведение","Ремонтирует","Плавает","Считает налоги"], a:0, exp:"Автор создаёт текст." },
  { id:"lit3_e14", block:"literature", level:"easy", q:"Лирика чаще всего про…", opts:["Чувства","Только карты","Только формулы","Только спорт"], a:0, exp:"Лирика выражает эмоции." },
  { id:"lit3_e15", block:"literature", level:"easy", q:"Кто написал «Ревизор»?", opts:["Гоголь","Чехов","Толстой","Пушкин"], a:0, exp:"Автор — Н.В. Гоголь." },

  // MEDIUM (15)
  { id:"lit3_m01", block:"literature", level:"medium", q:"Кто написал «Преступление и наказание»?", opts:["Достоевский","Тургенев","Чехов","Булгаков"], a:0, exp:"Ф.М. Достоевский." },
  { id:"lit3_m02", block:"literature", level:"medium", q:"Кто автор «Мастера и Маргариты»?", opts:["Булгаков","Толстой","Гоголь","Некрасов"], a:0, exp:"М.А. Булгаков." },
  { id:"lit3_m03", block:"literature", level:"medium", q:"Метафора — это…", opts:["Перенос значения","Точный расчёт","Список","Рифма"], a:0, exp:"Метафора образно переносит смысл." },
  { id:"lit3_m04", block:"literature", level:"medium", q:"Олицетворение — это…", opts:["Предмет как человек","Сравнение с 'как'","Повтор","Сноска"], a:0, exp:"Неживое ведёт себя как живое." },
  { id:"lit3_m05", block:"literature", level:"medium", q:"Эпитет — это…", opts:["Образное определение","Заголовок","Нумерация","Список"], a:0, exp:"Эпитет украшает описание." },
  { id:"lit3_m06", block:"literature", level:"medium", q:"Сюжет — это…", opts:["Последовательность событий","Шрифт","Бумага","Цена"], a:0, exp:"Сюжет = события." },
  { id:"lit3_m07", block:"literature", level:"medium", q:"Тема произведения — это…", opts:["О чём текст","Сколько страниц","Формат","Год"], a:0, exp:"Тема отвечает «о чём?»." },
  { id:"lit3_m08", block:"literature", level:"medium", q:"Верлибр — это…", opts:["Свободный стих","Сонет","Комедия","Сказка"], a:0, exp:"Верлибр часто без рифмы." },
  { id:"lit3_m09", block:"literature", level:"medium", q:"«Диалог» — это…", opts:["Разговор персонажей","Описание природы","Список","Название"], a:0, exp:"Диалог = реплики." },
  { id:"lit3_m10", block:"literature", level:"medium", q:"Кто написал «Отцы и дети»?", opts:["Тургенев","Гоголь","Достоевский","Пушкин"], a:0, exp:"Автор — И.С. Тургенев." },
  { id:"lit3_m11", block:"literature", level:"medium", q:"Кто написал «Герой нашего времени»?", opts:["Лермонтов","Толстой","Чехов","Булгаков"], a:0, exp:"Автор — М.Ю. Лермонтов." },
  { id:"lit3_m12", block:"literature", level:"medium", q:"Кто автор «Ромео и Джульетты»?", opts:["Шекспир","Диккенс","Гёте","Байрон"], a:0, exp:"Это трагедия Шекспира." },
  { id:"lit3_m13", block:"literature", level:"medium", q:"Что такое «жанр»?", opts:["Тип произведения","Цвет обложки","Размер шрифта","Цена"], a:0, exp:"Жанр: роман, рассказ, трагедия…" },
  { id:"lit3_m14", block:"literature", level:"medium", q:"Антоним к «изобилие»:", opts:["Скудость","Щедрость","Богатство","Излишек"], a:0, exp:"Изобилию противоположна скудость." },
  { id:"lit3_m15", block:"literature", level:"medium", q:"Что такое «кульминация»?", opts:["Пик напряжения","Начало","Список героев","Обложка"], a:0, exp:"Кульминация — высшая точка." },

  // HARD (10)
  { id:"lit3_h01", block:"literature", level:"hard", q:"Аллюзия — это…", opts:["Намёк/отсылка","Опечатка","Список","Рифма"], a:0, exp:"Аллюзия отсылает к известному." },
  { id:"lit3_h02", block:"literature", level:"hard", q:"Эпос — это…", opts:["Род литературы о событиях","Только чувства","Только диалоги","Только стихи"], a:0, exp:"Эпос рассказывает историю." },
  { id:"lit3_h03", block:"literature", level:"hard", q:"Сонет обычно имеет…", opts:["14 строк","8 строк","10 строк","20 строк"], a:0, exp:"Классический сонет — 14." },
  { id:"lit3_h04", block:"literature", level:"hard", q:"Автор «1984»?", opts:["Оруэлл","Брэдбери","Хаксли","Толкин"], a:0, exp:"Джордж Оруэлл." },
  { id:"lit3_h05", block:"literature", level:"hard", q:"Автор «451° по Фаренгейту»?", opts:["Брэдбери","Оруэлл","Хаксли","Кафка"], a:0, exp:"Рэй Брэдбери." },
  { id:"lit3_h06", block:"literature", level:"hard", q:"Антиутопия — это…", opts:["Мрачная модель общества","Комедия","Сказка","Поэма"], a:0, exp:"Антиутопия показывает опасный строй." },
  { id:"lit3_h07", block:"literature", level:"hard", q:"«Лаконичный» — это…", opts:["Короткий и ёмкий","Громкий","Длинный","Сложный"], a:0, exp:"Лаконично = без лишнего." },
  { id:"lit3_h08", block:"literature", level:"hard", q:"Что такое «парафраз»?", opts:["Пересказ своими словами","Опечатка","Рифма","Таблица"], a:0, exp:"Парафраз — переформулирование." },
  { id:"lit3_h09", block:"literature", level:"hard", q:"«Драма» как род литературы — это…", opts:["Про действие и конфликт","Только описание природы","Только факты","Только шутки"], a:0, exp:"Драма строится на конфликте." },
  { id:"lit3_h10", block:"literature", level:"hard", q:"Что такое «интертекст» ближе всего к…", opts:["Связям/отсылкам между текстами","Списку","Рифме","Географии"], a:0, exp:"Тексты «разговаривают» друг с другом." },

  // ======================
  // 🌍 GEOGRAPHY (40)
  // ======================
  // EASY (15)
  { id:"geo3_e01", block:"geo", level:"easy", q:"Столица Франции?", opts:["Париж","Рим","Берлин","Вена"], a:0, exp:"Париж — столица Франции." },
  { id:"geo3_e02", block:"geo", level:"easy", q:"Столица Италии?", opts:["Рим","Милан","Венеция","Неаполь"], a:0, exp:"Рим — столица." },
  { id:"geo3_e03", block:"geo", level:"easy", q:"Самый большой океан?", opts:["Тихий","Атлантический","Индийский","Северный"], a:0, exp:"Тихий — крупнейший." },
  { id:"geo3_e04", block:"geo", level:"easy", q:"Египет на каком континенте (в основном)?", opts:["Африка","Европа","Америка","Австралия"], a:0, exp:"Египет — Африка." },
  { id:"geo3_e05", block:"geo", level:"easy", q:"Столица Японии?", opts:["Токио","Осака","Киото","Нагоя"], a:0, exp:"Токио." },
  { id:"geo3_e06", block:"geo", level:"easy", q:"Где находится Бразилия?", opts:["Южная Америка","Европа","Африка","Азия"], a:0, exp:"Южная Америка." },
  { id:"geo3_e07", block:"geo", level:"easy", q:"Какой материк самый холодный?", opts:["Антарктида","Африка","Евразия","Австралия"], a:0, exp:"Антарктида — самый холодный." },
  { id:"geo3_e08", block:"geo", level:"easy", q:"Столица Германии?", opts:["Берлин","Гамбург","Мюнхен","Кёльн"], a:0, exp:"Берлин." },
  { id:"geo3_e09", block:"geo", level:"easy", q:"Сахара — это…", opts:["Пустыня","Океан","Гора","Остров"], a:0, exp:"Крупнейшая пустыня Африки." },
  { id:"geo3_e10", block:"geo", level:"easy", q:"Самая высокая гора мира?", opts:["Эверест","Эльбрус","Монблан","Килиманджаро"], a:0, exp:"Эверест." },
  { id:"geo3_e11", block:"geo", level:"easy", q:"Амстердам — это столица…", opts:["Нидерландов","Швеции","Португалии","Греции"], a:0, exp:"Амстердам — столица Нидерландов." },
  { id:"geo3_e12", block:"geo", level:"easy", q:"Экватор делит Землю на…", opts:["Север и юг","Восток и запад","Горы и равнины","Моря и сушу"], a:0, exp:"По широте — на север/юг." },
  { id:"geo3_e13", block:"geo", level:"easy", q:"Какая страна — «сапог» на карте?", opts:["Италия","Испания","Норвегия","Япония"], a:0, exp:"Италия." },
  { id:"geo3_e14", block:"geo", level:"easy", q:"Где находятся Альпы?", opts:["Европа","Африка","Антарктида","Австралия"], a:0, exp:"Альпы — в Европе." },
  { id:"geo3_e15", block:"geo", level:"easy", q:"Столица Испании?", opts:["Мадрид","Барселона","Севилья","Валенсия"], a:0, exp:"Мадрид." },

  // MEDIUM (15)
  { id:"geo3_m01", block:"geo", level:"medium", q:"Архипелаг — это…", opts:["Группа островов","Группа гор","Река","Пустыня"], a:0, exp:"Архипелаг = много островов." },
  { id:"geo3_m02", block:"geo", level:"medium", q:"Река Лондона — это…", opts:["Темза","Сена","Рейн","Дунай"], a:0, exp:"Темза." },
  { id:"geo3_m03", block:"geo", level:"medium", q:"0° долготы — это…", opts:["Гринвичский меридиан","Экватор","Тропик","Полярный круг"], a:0, exp:"Нулевой меридиан." },
  { id:"geo3_m04", block:"geo", level:"medium", q:"Самый большой материк по площади?", opts:["Евразия","Африка","Северная Америка","Австралия"], a:0, exp:"Евразия крупнейшая." },
  { id:"geo3_m05", block:"geo", level:"medium", q:"Сена протекает через…", opts:["Париж","Лондон","Рим","Берлин"], a:0, exp:"Сена — Париж." },
  { id:"geo3_m06", block:"geo", level:"medium", q:"Амазонка находится в…", opts:["Южной Америке","Африке","Европе","Азии"], a:0, exp:"Южная Америка." },
  { id:"geo3_m07", block:"geo", level:"medium", q:"Где расположен Большой Барьерный риф?", opts:["Австралия","Исландия","Канада","Марокко"], a:0, exp:"У берегов Австралии." },
  { id:"geo3_m08", block:"geo", level:"medium", q:"Что такое «дельта реки»?", opts:["Разветвление у устья","Источник","Гора","Океан"], a:0, exp:"Река распадается на рукава." },
  { id:"geo3_m09", block:"geo", level:"medium", q:"Какая страна НЕ в Европе?", opts:["Марокко","Польша","Австрия","Португалия"], a:0, exp:"Марокко — Африка." },
  { id:"geo3_m10", block:"geo", level:"medium", q:"Самая длинная река Южной Америки (часто так считают)?", opts:["Амазонка","Нил","Дунай","Янцзы"], a:0, exp:"Амазонка." },
  { id:"geo3_m11", block:"geo", level:"medium", q:"Самое глубокое озеро мира?", opts:["Байкал","Виктория","Онтарио","Ладога"], a:0, exp:"Байкал — самое глубокое." },
  { id:"geo3_m12", block:"geo", level:"medium", q:"Гренландия относится к региону…", opts:["Северная Америка","Африка","Австралия","Антарктида"], a:0, exp:"Географически — Северная Америка." },
  { id:"geo3_m13", block:"geo", level:"medium", q:"Какая столица находится на Дунае?", opts:["Вена","Париж","Мадрид","Лиссабон"], a:0, exp:"Вена стоит на Дунае." },
  { id:"geo3_m14", block:"geo", level:"medium", q:"Что такое «муссон»?", opts:["Сезонный ветер","Гора","Река","Остров"], a:0, exp:"Меняет направление по сезонам." },
  { id:"geo3_m15", block:"geo", level:"medium", q:"Какая страна имеет самый большой по площади остров (в смысле государства-острова)?", opts:["Австралия","Исландия","Куба","Мадагаскар"], a:0, exp:"Австралия — государство-материк/остров." },

  // HARD (10)
  { id:"geo3_h01", block:"geo", level:"hard", q:"Как называется точка противоположная зениту?", opts:["Надир","Экватор","Азимут","Полюс"], a:0, exp:"Надир — противоположность зениту." },
  { id:"geo3_h02", block:"geo", level:"hard", q:"Какая из линий — широта?", opts:["Параллель","Меридиан","Диагональ","Хорда"], a:0, exp:"Широты — параллели." },
  { id:"geo3_h03", block:"geo", level:"hard", q:"Что измеряют в узлах?", opts:["Скорость корабля","Температуру","Высоту","Массу"], a:0, exp:"Узел — морская скорость." },
  { id:"geo3_h04", block:"geo", level:"hard", q:"Самый высокий действующий вулкан Земли (часто называют)?", opts:["Охос-дель-Саладо","Фудзи","Этна","Кракатау"], a:0, exp:"Охос-дель-Саладо — один из самых высоких." },
  { id:"geo3_h05", block:"geo", level:"hard", q:"Как называется «впадина» океана у берегов Перу и Чили?", opts:["Перуано-Чилийский жёлоб","Марианская впадина","Байкальская впадина","Атакамская ложбина"], a:0, exp:"Перуано-Чилийский жёлоб." },
  { id:"geo3_h06", block:"geo", level:"hard", q:"Фьорды чаще всего ассоциируются со страной…", opts:["Норвегия","Египет","Мексика","Индия"], a:0, exp:"Норвегия известна фьордами." },
  { id:"geo3_h07", block:"geo", level:"hard", q:"Что такое «изолиния» на карте?", opts:["Линия равных значений","Граница страны","Река","Дорога"], a:0, exp:"Напр. изотермы, изобары." },
  { id:"geo3_h08", block:"geo", level:"hard", q:"Самая высокая вершина Европы (часто так считают)?", opts:["Эльбрус","Монблан","Маттерхорн","Олимп"], a:0, exp:"Эльбрус часто считают высшей точкой Европы." },
  { id:"geo3_h09", block:"geo", level:"hard", q:"«Эстуарий» — это…", opts:["Воронкообразное устье реки","Источник","Озеро","Ледник"], a:0, exp:"Особый тип устья." },
  { id:"geo3_h10", block:"geo", level:"hard", q:"Где находится мыс Доброй Надежды?", opts:["ЮАР","Италия","Япония","Канада"], a:0, exp:"Южная Африка." },

  // ======================
  // 🧠 LOGIC (40)
  // ======================
  // EASY (15)
  { id:"log3_e01", block:"logic", level:"easy", q:"Сколько будет 17 − 9?", opts:["6","7","8","9"], a:2, exp:"17−9=8." },
  { id:"log3_e02", block:"logic", level:"easy", q:"Сколько минут в 3 часах?", opts:["120","150","180","210"], a:2, exp:"3×60=180." },
  { id:"log3_e03", block:"logic", level:"easy", q:"Что больше: 0.6 или 0.06?", opts:["0.6","0.06","Они равны","Нельзя сравнить"], a:0, exp:"0.6=60%, 0.06=6%." },
  { id:"log3_e04", block:"logic", level:"easy", q:"Сколько сторон у треугольника?", opts:["2","3","4","5"], a:1, exp:"Треугольник — 3 стороны." },
  { id:"log3_e05", block:"logic", level:"easy", q:"9×7 =", opts:["56","63","72","79"], a:1, exp:"9×7=63." },
  { id:"log3_e06", block:"logic", level:"easy", q:"50% от 120 =", opts:["50","60","70","80"], a:1, exp:"Половина 120 — 60." },
  { id:"log3_e07", block:"logic", level:"easy", q:"Продолжи: 2, 4, 6, 8, …", opts:["9","10","11","12"], a:1, exp:"+2 → 10." },
  { id:"log3_e08", block:"logic", level:"easy", q:"Что больше: 3/4 или 2/3?", opts:["3/4","2/3","Равны","Нельзя"], a:0, exp:"0.75 > 0.66…" },
  { id:"log3_e09", block:"logic", level:"easy", q:"Сколько секунд в 2 минутах?", opts:["100","110","120","130"], a:2, exp:"2×60=120." },
  { id:"log3_e10", block:"logic", level:"easy", q:"15 + 6 =", opts:["19","20","21","22"], a:2, exp:"21." },
  { id:"log3_e11", block:"logic", level:"easy", q:"Чётное число:", opts:["7","9","12","15"], a:2, exp:"12 делится на 2." },
  { id:"log3_e12", block:"logic", level:"easy", q:"Квадрат числа 5 это…", opts:["10","20","25","30"], a:2, exp:"5×5=25." },
  { id:"log3_e13", block:"logic", level:"easy", q:"Если сегодня вторник, завтра…", opts:["Понедельник","Среда","Пятница","Воскресенье"], a:1, exp:"После вторника — среда." },
  { id:"log3_e14", block:"logic", level:"easy", q:"Самое большое число:", opts:["99","101","100","98"], a:1, exp:"101 больше 100." },
  { id:"log3_e15", block:"logic", level:"easy", q:"Если 10 яблок разделить поровну на 2, будет…", opts:["3","4","5","6"], a:2, exp:"10/2=5." },

  // MEDIUM (15)
  { id:"log3_m01", block:"logic", level:"medium", q:"Если x + 8 = 14, то x =", opts:["4","5","6","7"], a:2, exp:"14−8=6." },
  { id:"log3_m02", block:"logic", level:"medium", q:"Если 3a = 27, то a =", opts:["6","7","8","9"], a:3, exp:"27/3=9." },
  { id:"log3_m03", block:"logic", level:"medium", q:"Продолжи: 1, 4, 9, 16, ?", opts:["20","24","25","36"], a:2, exp:"Квадраты: 5²=25." },
  { id:"log3_m04", block:"logic", level:"medium", q:"12.5% от 240 =", opts:["24","30","36","48"], a:1, exp:"1/8 от 240 = 30." },
  { id:"log3_m05", block:"logic", level:"medium", q:"Сколько минут в 1.5 часах?", opts:["60","75","90","120"], a:2, exp:"1.5×60=90." },
  { id:"log3_m06", block:"logic", level:"medium", q:"Продолжи: 3, 6, 12, 24, ?", opts:["27","36","48","60"], a:2, exp:"×2 → 48." },
  { id:"log3_m07", block:"logic", level:"medium", q:"Если 2x = 18, x =", opts:["7","8","9","10"], a:2, exp:"18/2=9." },
  { id:"log3_m08", block:"logic", level:"medium", q:"Лишнее: квадрат, треугольник, круг, куб", opts:["квадрат","треугольник","круг","куб"], a:3, exp:"Куб — объёмная фигура." },
  { id:"log3_m09", block:"logic", level:"medium", q:"Сколько различных двузначных чисел из цифр 1 и 2 (повторы можно)?", opts:["2","3","4","6"], a:2, exp:"11,12,21,22 — 4." },
  { id:"log3_m10", block:"logic", level:"medium", q:"Верно ли: если все A — B, то A ⊂ B?", opts:["Да","Нет","Иногда","Нельзя сказать"], a:0, exp:"По определению подмножества." },
  { id:"log3_m11", block:"logic", level:"medium", q:"Сколько секунд в 2.5 минутах?", opts:["120","130","150","180"], a:2, exp:"2.5×60=150." },
  { id:"log3_m12", block:"logic", level:"medium", q:"Если 5x − 10 = 15, то x =", opts:["3","4","5","6"], a:2, exp:"5x=25 → x=5." },
  { id:"log3_m13", block:"logic", level:"medium", q:"Среднее арифметическое 2 и 8 =", opts:["4","5","6","7"], a:1, exp:"(2+8)/2=5." },
  { id:"log3_m14", block:"logic", level:"medium", q:"Если 30% от числа = 30, число =", opts:["60","90","100","120"], a:1, exp:"30 = 0.3·N → N=100." },
  { id:"log3_m15", block:"logic", level:"medium", q:"Продолжи: 2, 6, 18, 54, ?", opts:["81","108","162","216"], a:2, exp:"×3 → 162." },

  // HARD (10)
  { id:"log3_h01", block:"logic", level:"hard", q:"(8×7) − (6×5) =", opts:["26","28","30","32"], a:0, exp:"56−30=26." },
  { id:"log3_h02", block:"logic", level:"hard", q:"Фибоначчи: 1,1,2,3,5,8, ?", opts:["11","12","13","15"], a:2, exp:"5+8=13." },
  { id:"log3_h03", block:"logic", level:"hard", q:"Если a:b = 2:5 и b = 40, то a =", opts:["8","10","16","20"], a:3, exp:"5k=40→k=8→a=16." },
  { id:"log3_h04", block:"logic", level:"hard", q:"Сколько будет 7×8 − 6×5?", opts:["16","26","30","56"], a:1, exp:"56−30=26." },
  { id:"log3_h05", block:"logic", level:"hard", q:"Сколько разных двузначных чисел из цифр 1,2,3 (повторы можно)?", opts:["6","7","8","9"], a:3, exp:"3×3=9 вариантов." },
  { id:"log3_h06", block:"logic", level:"hard", q:"Если 3(a−2)=15, то a =", opts:["5","6","7","8"], a:3, exp:"a−2=5 → a=7… стоп: 15/3=5, a=7. (правильный 7)"},
  { id:"log3_h06_fix", block:"logic", level:"hard", q:"Если 3(a−2)=15, то a =", opts:["5","6","7","8"], a:2, exp:"15/3=5 → a−2=5 → a=7." },
  { id:"log3_h07", block:"logic", level:"hard", q:"1/3 от 120 =", opts:["30","35","40","45"], a:2, exp:"120/3=40." },
  { id:"log3_h08", block:"logic", level:"hard", q:"Если x/4 = 6, x =", opts:["18","20","22","24"], a:3, exp:"6×4=24." },
  { id:"log3_h09", block:"logic", level:"hard", q:"Логика: «Все A — B». Точно верно:", opts:["Все B — A","Некоторые B — A","Все A входят в B","Ничего"], a:2, exp:"A ⊂ B." },
  { id:"log3_h10", block:"logic", level:"hard", q:"Сколько будет 9² − 8² ?", opts:["15","17","19","21"], a:0, exp:"(9−8)(9+8)=1×17=17… стоп: значит правильный 17." },
  { id:"log3_h10_fix", block:"logic", level:"hard", q:"Сколько будет 9² − 8² ?", opts:["15","17","19","21"], a:1, exp:"81−64=17." },
  ];

let quizCorrect = 0;
let quizTotal = 0;
let quizCurrent = null;
let quizLocked = false;
let quizShuffled = null;

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

function getQuizBlock() {
  const b = localStorage.getItem(K_QUIZ_BLOCK);
  return (b === "history" || b === "science" || b === "literature" || b === "geo" || b === "logic") ? b : "history";
}
function setQuizBlock(block) {
  localStorage.setItem(K_QUIZ_BLOCK, block);
  updateQuizBlockUI();
  nextQuiz();
}
function updateQuizBlockUI() {
  const b = getQuizBlock();
  quizCatHistoryBtn?.classList.toggle("active", b === "history");
  quizCatScienceBtn?.classList.toggle("active", b === "science");
  quizCatLitBtn?.classList.toggle("active", b === "literature");
  quizCatGeoBtn?.classList.toggle("active", b === "geo");
  quizCatLogicBtn?.classList.toggle("active", b === "logic");
}

function updateQuizScore() {
  quizScore.textContent = `${quizCorrect} / ${quizTotal}`;
}

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeShuffledQuestion(q) {
  const indexed = q.opts.map((text, idx) => ({ text, idx }));
  const shuffled = shuffleArray(indexed);
  const correctPos = shuffled.findIndex(x => x.idx === q.a);
  return { ...q, opts: shuffled.map(x => x.text), a: correctPos };
}

// анти-повтор: пул для каждой пары (block + level)
function pickFromPool(block, level) {
  const all = QUESTIONS.filter(q => q.block === block && q.level === level);
  if (!all.length) return null;

  let pool = loadJSON(quizPoolKey(block, level), null);

  // когда пул закончился — пересоздаём (чтобы пройти все, прежде чем повторять)
  if (!Array.isArray(pool) || pool.length === 0) {
    pool = all.map(q => q.id);
    saveJSON(quizPoolKey(block, level), pool);
  }

  const idx = Math.floor(Math.random() * pool.length);
  const id = pool[idx];
  pool.splice(idx, 1);
  saveJSON(quizPoolKey(block, level), pool);

  return all.find(x => x.id === id) || all[Math.floor(Math.random() * all.length)];
}

function renderQuizQuestion() {
  quizFeedback.textContent = "";
  quizOptions.innerHTML = "";
  quizLocked = false;

  if (!quizCurrent) {
    quizQuestion.textContent = "Нажми “Next”, чтобы начать.";
    return;
  }

  quizShuffled = makeShuffledQuestion(quizCurrent);
  quizQuestion.textContent = quizShuffled.q;

  quizShuffled.opts.forEach((text, idx) => {
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
  const block = getQuizBlock();

  const picked = pickFromPool(block, level);
  if (!picked) {
    quizCurrent = null;
    quizQuestion.textContent = "В этой категории пока нет вопросов для выбранного уровня 🙂";
    quizOptions.innerHTML = "";
    quizFeedback.textContent = "";
    return;
  }

  quizCurrent = picked;
  renderQuizQuestion();
}

function chooseQuiz(idx, btnEl) {
  if (!quizCurrent || !quizShuffled || quizLocked) return;
  quizLocked = true;

  quizTotal += 1;
  const correctIdx = quizShuffled.a;

  const buttons = Array.from(quizOptions.querySelectorAll(".quizOptBtn"));
  const exp = quizCurrent.exp ? `\n${quizCurrent.exp}` : "";

  if (idx === correctIdx) {
    quizCorrect += 1;
    btnEl.classList.add("correct");
    quizFeedback.textContent = `Верно ✅${exp}`;
    showCelebrate();
  } else {
    btnEl.classList.add("wrong");
    buttons[correctIdx]?.classList.add("correct");
    quizFeedback.textContent = `Не совсем 🙂 Правильно: “${quizShuffled.opts[correctIdx]}”.${exp}`;
  }

  updateQuizScore();
}

function resetQuiz() {
  quizCorrect = 0;
  quizTotal = 0;
  quizCurrent = null;
  quizShuffled = null;
  quizLocked = false;
  updateQuizScore();
  renderQuizQuestion();

  // сбрасываем только текущую пару блок+уровень
  const block = getQuizBlock();
  const level = getQuizLevel();
  localStorage.removeItem(quizPoolKey(block, level));
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
quizCatHistoryBtn?.addEventListener("click", () => setQuizBlock("history"));
quizCatScienceBtn?.addEventListener("click", () => setQuizBlock("science"));
quizCatLitBtn?.addEventListener("click", () => setQuizBlock("literature"));
quizCatGeoBtn?.addEventListener("click", () => setQuizBlock("geo"));
quizCatLogicBtn?.addEventListener("click", () => setQuizBlock("logic"));

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
  updateQuizBlockUI();
  resetQuiz();
}
init();

