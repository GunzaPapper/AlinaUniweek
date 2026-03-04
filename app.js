// =====================
// Alina’s UniWeek 💗 v3.1 FINAL
// =====================

// ===== Storage keys =====
const K_WEEK = "uniweek_selectedWeek";            // "odd" | "even"
const K_WEEK_MODE = "uniweek_weekMode";           // "auto" | "manual"
const K_CLASSES = "uniweek_classes";              // array
const K_SELECTED_DATE = "uniweek_selectedDate";   // "YYYY-MM-DD"
const K_QUIZ_DIFF = "uniweek_quiz_diff";          // "easy"|"medium"|"hard"
const K_QUIZ_HIST = "uniweek_quiz_hist";          // {easy:[], medium:[], hard:[]}
const K_MEMORY_BEST = "uniweek_memory_best";      // number

// ===== Anchor week for auto week mode =====
// Поставь здесь дату понедельника, когда ТОЧНО был Odd (числитель).
const ANCHOR_DATE = "2026-02-24"; // YYYY-MM-DD
const ANCHOR_WEEK = "odd";

// ===== DOM: tabs =====
const tabSchedule = document.getElementById("tabSchedule");
const tabWishes = document.getElementById("tabWishes");
const tabSettings = document.getElementById("tabSettings");

const screenSchedule = document.getElementById("screenSchedule");
const screenWishes = document.getElementById("screenWishes");
const screenSettings = document.getElementById("screenSettings");

// ===== DOM: schedule =====
const weekOddBtn = document.getElementById("weekOddBtn");
const weekEvenBtn = document.getElementById("weekEvenBtn");
const subtitle = document.getElementById("subtitle");

const todayLabel = document.getElementById("todayLabel");
const todayList = document.getElementById("todayList");
const weekGrid = document.getElementById("weekGrid");
const selectedDateLabel = document.getElementById("selectedDateLabel");

const openCalendarBtn = document.getElementById("openCalendarBtn");
const goSettingsBtn = document.getElementById("goSettingsBtn");

// ===== DOM: settings =====
const addClassBtn = document.getElementById("addClassBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const csvInput = document.getElementById("csvInput");
const importSub = document.getElementById("importSub");

// ===== DOM: add class =====
const classDialog = document.getElementById("classDialog");
const classForm = document.getElementById("classForm");

// ===== DOM: calendar sheet =====
const calBackdrop = document.getElementById("calBackdrop");
const calSheet = document.getElementById("calSheet");
const calTitle = document.getElementById("calTitle");
const calMonthLabel = document.getElementById("calMonthLabel");
const calGrid = document.getElementById("calGrid");
const calPrevBtn = document.getElementById("calPrevBtn");
const calNextBtn = document.getElementById("calNextBtn");
const calCancelBtn = document.getElementById("calCancelBtn");
const calDoneBtn = document.getElementById("calDoneBtn");

// ===== DOM: wishes & quiz & memory launch =====
const wishBox = document.getElementById("wishBox");
const newWishBtn = document.getElementById("newWishBtn");
const startQuizBtn = document.getElementById("startQuizBtn");
const openMemoryWishesBtn = document.getElementById("openMemoryWishesBtn");

const quizDialog = document.getElementById("quizDialog");
const closeQuizBtn = document.getElementById("closeQuizBtn");
const quizEasyBtn = document.getElementById("quizEasyBtn");
const quizMedBtn = document.getElementById("quizMedBtn");
const quizHardBtn = document.getElementById("quizHardBtn");
const quizQuestion = document.getElementById("quizQuestion");
const quizAnswers = document.getElementById("quizAnswers");
const quizNextBtn = document.getElementById("quizNextBtn");

// ===== DOM: memory =====
const memoryDialog = document.getElementById("memoryDialog");
const closeMemoryBtn = document.getElementById("closeMemoryBtn");
const restartMemoryBtn = document.getElementById("restartMemoryBtn");
const memoryGrid = document.getElementById("memoryGrid");
const memoryMeta = document.getElementById("memoryMeta");

// ===== DOM: praise overlay =====
const praiseOverlay = document.getElementById("praiseOverlay");
const praiseText = document.getElementById("praiseText");
const hearts = document.getElementById("hearts");
const confettiCanvas = document.getElementById("confettiCanvas");

// ===== Data =====
const DAYS = [
    { key: "monday", name: "Понедельник", sort: 1 },
    { key: "tuesday", name: "Вторник", sort: 2 },
    { key: "wednesday", name: "Среда", sort: 3 },
    { key: "thursday", name: "Четверг", sort: 4 },
    { key: "friday", name: "Пятница", sort: 5 },
    { key: "saturday", name: "Суббота", sort: 6 },
];

const WISHES = [
    "Доброе утро, Алина 💗 Пусть сегодня всё получится легко.",
    "Ты умная, сильная и очень красивая. Я верю в тебя 💗",
    "Пусть день будет спокойным, а пары — понятными 🌸",
    "Если вдруг станет тяжело — вдох… и ты справишься 💗",
    "Пусть у тебя будет сегодня хотя бы одна маленькая радость ✨",
    "Ты большая умничка. Даже если сомневаешься — ты справишься 💗",
    "Нежный день и нежная ты 🌷 Всё будет хорошо.",
    "Пусть знания ложатся мягко, а настроение держится тёплым ☁️",
    "Я рядом мыслями. Дыши и улыбайся 💗",
    "Пусть сегодня тебя будут окружать хорошие люди 🌸",
    "Ты заслуживаешь лёгкий день и тёплые слова 💗",
    "Ты можешь больше, чем думаешь. Я верю 💗",
    "Пусть всё сложится так, как тебе нужно ✨",
    "Ты справляешься. И это главное 💗",
    "Пусть будет меньше спешки и больше спокойствия 🌿",
    "Ты невероятная. Не забывай это 💗",
    "Пусть сегодня будет день «я молодец» — потому что ты молодец 💗",
    "Всё получится шаг за шагом. Я рядом 💗",
    "Пусть пары пройдут быстро, а вечер будет уютным 🌙",
    "Ты умница. Всегда 💗",
];

const PRAISES = [
    "Умничка 💗",
    "Вот это да! ✨",
    "Ты супер! 💗",
    "Горжусь тобой 🌸",
    "Идеально! 💗",
    "Красотка, так держать ✨",
    "Дааа! Ты справилась 💗",
    "Ты просто чудо 🌷",
    "Молодец! 💗",
    "Браво ✨",
];

// Quiz questions
const QUIZ_BANK = {
    easy: [
        { q: "Какое настроение сегодня выбираем?", a: ["Спокойное", "Боевое", "Нежное"], correct: 0 },
        { q: "Что помогает, когда тревожно?", a: ["Дыхание", "Паника", "Спор"], correct: 0 },
        { q: "Лучший способ поддержать себя?", a: ["Добрые слова", "Самокритика", "Сравнения"], correct: 0 },
        { q: "Что важнее всего на учёбе?", a: ["Шаг за шагом", "Идеальность", "Никаких ошибок"], correct: 0 },
        { q: "Что ты можешь прямо сейчас?", a: ["Справиться", "Сдаться", "Переживать"], correct: 0 },
    ],
    medium: [
        { q: "Как называется договор дарения в ГК РФ?", a: ["Дарение", "Ссуда", "Хранение"], correct: 0 },
        { q: "Кто является субъектом административного правонарушения?", a: ["Физ/юр лица", "Только юр лица", "Только граждане"], correct: 0 },
        { q: "Какой вид ответственности чаще всего в налоговом праве?", a: ["Финансовая", "Дисциплинарная", "Моральная"], correct: 0 },
        { q: "Основной источник таможенного права РФ?", a: ["ТК ЕАЭС", "ГК РФ", "УК РФ"], correct: 0 },
        { q: "Юридическая техника — это про…", a: ["Качество норм", "Спорт", "Музыку"], correct: 0 },
    ],
    hard: [
        { q: "Что такое юридический факт?", a: ["Обстоятельство, влекущее последствия", "Мнение", "Привычка"], correct: 0 },
        { q: "В чем смысл принципа законности?", a: ["Действовать по закону", "Действовать по желанию", "Действовать по слухам"], correct: 0 },
        { q: "Норма права состоит из…", a: ["Гипотеза, диспозиция, санкция", "Только санкция", "Только диспозиция"], correct: 0 },
        { q: "Что такое презумпция?", a: ["Предположение до опровержения", "Приказ", "Пожелание"], correct: 0 },
        { q: "Функция права — это…", a: ["Направление воздействия", "Случайность", "Ошибка"], correct: 0 },
    ],
};

// ===== State =====
let isBlocked = false;

// Calendar state
let calViewYear = 0;
let calViewMonth = 0; // 0-11
let calTempSelected = null; // Date

// Wishes state
let lastWishIdx = -1;

// Quiz state
let quizDiff = "easy";
let quizCurrent = null;

// Memory state
let memState = null;

// ===== Helpers =====
function loadJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}
function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function newId() {
    if (crypto && crypto.randomUUID) return crypto.randomUUID();
    return "id_" + Math.random().toString(16).slice(2) + "_" + Date.now();
}

function parseHHmmToMinutes(s) {
    const v = String(s).trim();
    const m = /^(\d{1,2}):(\d{2})$/.exec(v);
    if (!m) return null;
    const hh = Number(m[1]);
    const mm = Number(m[2]);
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
    let c = String(hex).trim();
    if (!c) return null;
    c = c.replace("#", "");
    if (c.length !== 6) return null;
    if (!/^[0-9a-fA-F]{6}$/.test(c)) return null;
    return c.toUpperCase();
}
function hexToRgb(hex6) {
    const h = normalizeHex(hex6);
    if (!h) return null;
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

function formatDateYMD(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}
function parseDateYMD(s) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ""));
    if (!m) return null;
    const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    d.setHours(0, 0, 0, 0);
    return d;
}
function getSelectedDate() {
    const raw = localStorage.getItem(K_SELECTED_DATE);
    const d = raw ? parseDateYMD(raw) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d || today;
}
function setSelectedDate(d) {
    const dd = new Date(d);
    dd.setHours(0, 0, 0, 0);
    localStorage.setItem(K_SELECTED_DATE, formatDateYMD(dd));
}

function getWeekMode() {
    const m = localStorage.getItem(K_WEEK_MODE);
    return (m === "manual") ? "manual" : "auto";
}
function setWeekMode(m) {
    localStorage.setItem(K_WEEK_MODE, (m === "manual") ? "manual" : "auto");
}
function getWeek() {
    const w = localStorage.getItem(K_WEEK);
    return (w === "even" || w === "odd") ? w : "odd";
}
function setWeek(w) {
    setWeekMode("manual");
    localStorage.setItem(K_WEEK, w);
    updateWeekUI();
    renderAll();
}

function weekFromAnchor(date) {
    const anchor = new Date(ANCHOR_DATE + "T00:00:00");
    anchor.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((d.getTime() - anchor.getTime()) / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks % 2 === 0) return ANCHOR_WEEK;
    return (ANCHOR_WEEK === "odd") ? "even" : "odd";
}

function applyAutoWeekIfNeeded() {
    if (getWeekMode() !== "auto") return;
    const d = getSelectedDate();
    localStorage.setItem(K_WEEK, weekFromAnchor(d));
}

function weekFilterOK(item, selectedWeek) {
    if (selectedWeek === "odd") return item.weekType === "odd" || item.weekType === "both";
    if (selectedWeek === "even") return item.weekType === "even" || item.weekType === "both";
    return true;
}

function sortClasses(a, b) {
    const da = DAYS.find(x => x.key === a.dayOfWeek)?.sort ?? 99;
    const db = DAYS.find(x => x.key === b.dayOfWeek)?.sort ?? 99;
    if (da !== db) return da - db;
    return a.startMinutes - b.startMinutes;
}

function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate();
}
function dowKeyFromDate(d) {
    const wd = d.getDay(); // 0=Sun..6=Sat
    const map = { 1: "monday", 2: "tuesday", 3: "wednesday", 4: "thursday", 5: "friday", 6: "saturday" };
    return map[wd] || null;
}
function formatHumanDate(d) {
    return d.toLocaleDateString("ru-RU", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}
function nowMinutes() {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
}
// ===== Tabs =====
function showTab(which) {
    const isSchedule = which === "schedule";
    const isWishes = which === "wishes";
    const isSettings = which === "settings";

    tabSchedule.classList.toggle("active", isSchedule);
    tabWishes.classList.toggle("active", isWishes);
    tabSettings.classList.toggle("active", isSettings);

    screenSchedule.classList.toggle("active", isSchedule);
    screenWishes.classList.toggle("active", isWishes);
    screenSettings.classList.toggle("active", isSettings);
}

// ===== Week UI =====
function updateWeekUI() {
    const w = getWeek();
    weekOddBtn.classList.toggle("active", w === "odd");
    weekEvenBtn.classList.toggle("active", w === "even");

    const mode = getWeekMode();
    subtitle.textContent = (mode === "auto")
        ? `Авто-неделя: ${w.toUpperCase()}`
        : `Ручной режим: ${w.toUpperCase()}`;
}

// ===== Rendering schedule =====
function renderSelectedDateLabel() {
    selectedDateLabel.textContent = `Выбрано: ${formatHumanDate(getSelectedDate())}`;
}

function renderClassItem(item, { compact = false, isNow = false } = {}) {
    const el = document.createElement("div");
    el.className = "item" + (isNow ? " now" : "");

    const bar = document.createElement("div");
    bar.className = "itemBar";

    let tintStyle = "";
    if (item.colorHex) {
        const rgb = hexToRgb(item.colorHex);
        if (rgb) {
            bar.style.background = `#${item.colorHex}`;
            tintStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.08)`;
        }
    }
    el.appendChild(bar);

    const main = document.createElement("div");
    main.className = "itemMain";

    if (tintStyle && !isNow) el.style.background = tintStyle;

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

    const sub = document.createElement("div");
    sub.className = "itemSub";
    const parts = [];
    if (!compact) parts.push(item.weekType.toUpperCase());
    parts.push(item.location);
    parts.push(item.teacher);
    sub.textContent = parts.filter(Boolean).join(" • ");
    main.appendChild(sub);

    el.appendChild(main);
    return el;
}

function renderToday() {
    const selectedDate = getSelectedDate();
    todayLabel.textContent = selectedDate.toLocaleDateString("ru-RU", { weekday: "long", day: "2-digit", month: "long" });

    const selectedWeek = getWeek();
    const classes = loadJSON(K_CLASSES, []).sort(sortClasses);

    const dayKey = dowKeyFromDate(selectedDate);
    todayList.innerHTML = "";

    if (!dayKey) {
        todayList.innerHTML = `<div class="smallMuted">Это воскресенье — расписание отображаем Пн–Сб 💗</div>`;
        return;
    }

    const items = classes
        .filter(c => c.dayOfWeek === dayKey && weekFilterOK(c, selectedWeek))
        .sort((a, b) => a.startMinutes - b.startMinutes);

    if (items.length === 0) {
        todayList.innerHTML = `<div class="smallMuted">На этот день пар нет (или они в другой неделе).</div>`;
        return;
    }

    const shouldHighlightNow = isSameDay(selectedDate, new Date());
    const nowMin = shouldHighlightNow ? nowMinutes() : -1;

    for (const item of items) {
        const isNow = shouldHighlightNow && (item.startMinutes <= nowMin && nowMin <= item.endMinutes);
        todayList.appendChild(renderClassItem(item, { compact: false, isNow }));
    }
}

function renderWeek() {
    const selectedWeek = getWeek();
    const classes = loadJSON(K_CLASSES, []).sort(sortClasses);

    weekGrid.innerHTML = "";
    for (const day of DAYS) {
        const dayItems = classes
            .filter(c => c.dayOfWeek === day.key && weekFilterOK(c, selectedWeek))
            .sort((a, b) => a.startMinutes - b.startMinutes);

        const wrap = document.createElement("div");
        wrap.className = "dayBlock";

        const title = document.createElement("div");
        title.className = "dayTitle";
        title.textContent = day.name;
        wrap.appendChild(title);

        if (dayItems.length === 0) {
            const empty = document.createElement("div");
            empty.className = "dayEmpty";
            empty.textContent = "Нет пар";
            wrap.appendChild(empty);
        } else {
            const list = document.createElement("div");
            list.className = "list";
            for (const item of dayItems) list.appendChild(renderClassItem(item, { compact: true, isNow: false }));
            wrap.appendChild(list);
        }

        weekGrid.appendChild(wrap);
    }
}
function renderAll() {
    applyAutoWeekIfNeeded();
    updateWeekUI();
    renderSelectedDateLabel();
    renderToday();
    renderWeek();
    renderWishesIfEmpty();
}

// ===== Add class modal =====
function openAddClass() {
    classForm.reset();
    classDialog.showModal();
}

function saveClassFromForm() {
    const fd = new FormData(classForm);

    const courseName = String(fd.get("courseName") || "").trim();
    const classType = String(fd.get("classType") || "").trim().toLowerCase();
    const dayOfWeek = String(fd.get("dayOfWeek") || "").trim();
    const weekType = String(fd.get("weekType") || "").trim();
    const startTime = String(fd.get("startTime") || "").trim();
    const endTime = String(fd.get("endTime") || "").trim();
    const location = String(fd.get("location") || "").trim();
    const teacher = String(fd.get("teacher") || "").trim();
    const colorHex = normalizeHex(String(fd.get("colorHex") || "").trim());

    if (!courseName) return alert("Введите название пары.");
    if (!["lecture", "seminar", "lab"].includes(classType)) return alert("Неверный тип (lecture/seminar/lab).");
    if (!DAYS.some(d => d.key === dayOfWeek)) return alert("Неверный день.");
    if (!["odd", "even", "both"].includes(weekType)) return alert("Неверный тип недели.");
    if (!location) return alert("Введите аудиторию.");
    if (!teacher) return alert("Введите преподавателя.");

    const startMinutes = parseHHmmToMinutes(startTime);
    const endMinutes = parseHHmmToMinutes(endTime);
    if (startMinutes == null) return alert("Неверное время начала. Формат HH:mm");
    if (endMinutes == null) return alert("Неверное время конца. Формат HH:mm");
    if (startMinutes >= endMinutes) return alert("Время начала должно быть раньше времени конца.");

    const item = {
        id: newId(),
        courseName,
        classType,
        dayOfWeek,
        startMinutes,
        endMinutes,
        weekType,
        location,
        teacher,
        colorHex: colorHex ? colorHex : null
    };

    const classes = loadJSON(K_CLASSES, []);
    classes.push(item);
    saveJSON(K_CLASSES, classes);

    classDialog.close();
    renderAll();
}

// ===== CSV import =====
// Header: courseName,type,dayOfWeek,startTime,endTime,weekType,location,teacher,color
function splitCSVLine(line) {
    let res = [];
    let cur = "";
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') { inQ = !inQ; continue; }
        if (ch === "," && !inQ) { res.push(cur); cur = ""; }
        else cur += ch;
    }
    res.push(cur);
    return res;
}

function parseCSV(text) {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) throw new Error("Пустой CSV.");

    const header = lines[0].toLowerCase();
    const expected = "coursename,type,dayofweek,starttime,endtime,weektype,location,teacher,color";
    if (header !== expected) throw new Error("Неверный заголовок CSV.\nОжидаю:\n" + expected);

    const out = [];
    for (let i = 1; i < lines.length; i++) {
        const lineNumber = i + 1;
        const cols = splitCSVLine(lines[i]);
        if (cols.length !== 9) throw new Error(`Строка ${lineNumber}: нужно 9 колонок, найдено ${cols.length}.`);

        const courseName = cols[0].trim();
        const type = cols[1].trim().toLowerCase();
        const dayOfWeek = cols[2].trim().toLowerCase();
        const startTime = cols[3].trim();
        const endTime = cols[4].trim();
        const weekType = cols[5].trim().toLowerCase();
        const location = cols[6].trim();
        const teacher = cols[7].trim();
        const color = normalizeHex(cols[8].trim());

        if (!courseName) throw new Error(`Строка ${lineNumber}: courseName пустой.`);
        if (!["lecture", "seminar", "lab"].includes(type)) throw new Error(`Строка ${lineNumber}: неверный type.`);
        if (!DAYS.some(d => d.key === dayOfWeek)) throw new Error(`Строка ${lineNumber}: неверный dayOfWeek.`);
        if (!["odd", "even", "both"].includes(weekType)) throw new Error(`Строка ${lineNumber}: неверный weekType.`);
        if (!location) throw new Error(`Строка ${lineNumber}: location пустой.`);
        if (!teacher) throw new Error(`Строка ${lineNumber}: teacher пустой.`);

        const sMin = parseHHmmToMinutes(startTime);
        const eMin = parseHHmmToMinutes(endTime);
        if (sMin == null) throw new Error(`Строка ${lineNumber}: неверный startTime (HH:mm).`);
        if (eMin == null) throw new Error(`Строка ${lineNumber}: неверный endTime (HH:mm).`);
        if (sMin >= eMin) throw new Error(`Строка ${lineNumber}: startTime должен быть раньше endTime.`);

        out.push({
            id: newId(),
            courseName,
            classType: type,
            dayOfWeek,
            startMinutes: sMin,
            endMinutes: eMin,
            weekType,
            location,
            teacher,
            colorHex: color ? color : null
        });
    }
    return out;
}
// ===== Calendar sheet =====
function openCalendarSheet() {
    if (isBlocked) return;
    const sel = getSelectedDate();
    calTempSelected = new Date(sel);
    calTempSelected.setHours(0, 0, 0, 0);

    calViewYear = calTempSelected.getFullYear();
    calViewMonth = calTempSelected.getMonth();

    renderCalendar();
    calBackdrop.hidden = false;
    calSheet.hidden = false;
    requestAnimationFrame(() => calSheet.classList.add("show"));
}

function closeCalendarSheet() {
    calSheet.classList.remove("show");
    setTimeout(() => {
        calBackdrop.hidden = true;
        calSheet.hidden = true;
    }, 220);
}

function renderCalendar() {
    const monthName = new Date(calViewYear, calViewMonth, 1)
        .toLocaleDateString("ru-RU", { month: "long", year: "numeric" });

    calTitle.textContent = monthName[0].toUpperCase() + monthName.slice(1);
    calMonthLabel.textContent = "Выбери дату";
    calGrid.innerHTML = "";

    const first = new Date(calViewYear, calViewMonth, 1);
    const last = new Date(calViewYear, calViewMonth + 1, 0);
    const startDow = (first.getDay() + 6) % 7; // Monday=0
    const totalDays = last.getDate();

    const cells = startDow + totalDays;
    const rows = Math.ceil(cells / 7) * 7;

    const today = new Date(); today.setHours(0, 0, 0, 0);

    for (let i = 0; i < rows; i++) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "calCell muted";
        cell.disabled = true;

        const dayNum = i - startDow + 1;
        if (dayNum >= 1 && dayNum <= totalDays) {
            const d = new Date(calViewYear, calViewMonth, dayNum);
            d.setHours(0, 0, 0, 0);

            cell.disabled = false;
            cell.classList.remove("muted");
            cell.textContent = String(dayNum);

            if (isSameDay(d, today)) cell.classList.add("today");
            if (calTempSelected && isSameDay(d, calTempSelected)) cell.classList.add("selected");

            cell.addEventListener("click", () => {
                calTempSelected = d;
                renderCalendar();
            });
        } else {
            cell.textContent = "";
        }

        calGrid.appendChild(cell);
    }
}

// ===== Wishes =====
function pickWishIdx() {
    if (WISHES.length === 0) return -1;
    if (WISHES.length === 1) return 0;
    let idx = Math.floor(Math.random() * WISHES.length);
    if (idx === lastWishIdx) idx = (idx + 1 + Math.floor(Math.random() * (WISHES.length - 1))) % WISHES.length;
    return idx;
}

function setWishAnimated() {
    if (isBlocked) return;
    const idx = pickWishIdx();
    if (idx < 0) return;

    wishBox.classList.add("fadeOut");
    setTimeout(() => {
        wishBox.textContent = WISHES[idx];
        lastWishIdx = idx;
        wishBox.classList.remove("fadeOut");
        wishBox.classList.add("fadeIn");
        setTimeout(() => wishBox.classList.remove("fadeIn"), 200);
    }, 180);
}

function renderWishesIfEmpty() {
    if (!wishBox.textContent.trim()) {
        const idx = pickWishIdx();
        if (idx >= 0) {
            wishBox.textContent = WISHES[idx];
            lastWishIdx = idx;
        }
    }
}

// ===== Praise + effects =====
let confettiAnim = null;

function resizeConfettiCanvas() {
    const rect = praiseOverlay.getBoundingClientRect();
    confettiCanvas.width = Math.floor(rect.width);
    confettiCanvas.height = Math.floor(rect.height);
}

function spawnHearts(count = 14) {
    hearts.innerHTML = "";
    const w = hearts.clientWidth;
    const h = hearts.clientHeight;
    for (let i = 0; i < count; i++) {
        const el = document.createElement("div");
        el.className = "heart";
        el.textContent = "💗";
        el.style.left = `${Math.random() * (w - 24)}px`;
        el.style.top = `${h - 40 + Math.random() * 10}px`;
        el.style.animationDelay = `${Math.random() * 140}ms`;
        el.style.fontSize = `${14 + Math.random() * 14}px`;
        hearts.appendChild(el);
    }
}

function startConfetti(durationMs = 900) {
    resizeConfettiCanvas();
    const ctx = confettiCanvas.getContext("2d");
    const W = confettiCanvas.width;
    const H = confettiCanvas.height;

    const pieces = [];
    const colors = ["#F7A8C6", "#fce3ee", "#ffffff", "#ffd5e6", "#f7c1d6"];

    for (let i = 0; i < 120; i++) {
        pieces.push({
            x: Math.random() * W,
            y: -20 - Math.random() * 200,
            vx: (Math.random() - 0.5) * 1.4,
            vy: 1.2 + Math.random() * 2.2,
            size: 3 + Math.random() * 4,
            rot: Math.random() * Math.PI,
            vr: (Math.random() - 0.5) * 0.2,
            c: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    const start = performance.now();
    function frame(t) {
        const elapsed = t - start;
        ctx.clearRect(0, 0, W, H);

        for (const p of pieces) {
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vr;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.c;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
            ctx.restore();
        }

        if (elapsed < durationMs) confettiAnim = requestAnimationFrame(frame);
        else { ctx.clearRect(0, 0, W, H); confettiAnim = null; }
    }
    confettiAnim = requestAnimationFrame(frame);
}

function pickPraise() {
    const k = "uniweek_praise_hist";
    const hist = loadJSON(k, []);
    let idx = Math.floor(Math.random() * PRAISES.length);
    if (PRAISES.length > 1) {
        let tries = 0;
        while (hist.includes(idx) && tries < 20) {
            idx = Math.floor(Math.random() * PRAISES.length);
            tries++;
        }
    }
    hist.push(idx);
    while (hist.length > 5) hist.shift();
    saveJSON(k, hist);
    return PRAISES[idx];
}

function showPraise(text) {
    if (isBlocked) return Promise.resolve();
    isBlocked = true;

    praiseText.textContent = text || pickPraise();
    praiseOverlay.hidden = false;

    spawnHearts(16);
    startConfetti(900);

    return new Promise((resolve) => {
        setTimeout(() => {
            praiseOverlay.hidden = true;
            hearts.innerHTML = "";
            if (confettiAnim) cancelAnimationFrame(confettiAnim);
            isBlocked = false;
            resolve();
        }, 950);
    });
}

// ===== Quiz =====
function getQuizHist() {
    return loadJSON(K_QUIZ_HIST, { easy: [], medium: [], hard: [] });
}
function pushQuizHist(diff, idx, max = 15) {
    const h = getQuizHist();
    const arr = Array.isArray(h[diff]) ? h[diff] : [];
    arr.push(idx);
    while (arr.length > max) arr.shift();
    h[diff] = arr;
    saveJSON(K_QUIZ_HIST, h);
}

function pickQuizQuestion(diff) {
    const bank = QUIZ_BANK[diff] || [];
    if (bank.length === 0) return null;

    const hist = getQuizHist();
    const recent = new Set((hist[diff] || []).slice(-20));

    let idx = Math.floor(Math.random() * bank.length);
    let tries = 0;
    while (recent.has(idx) && tries < 40) { idx = Math.floor(Math.random() * bank.length); tries++; }

    const last = (hist[diff] || [])[hist[diff].length - 1];
    if (bank.length > 1 && idx === last) idx = (idx + 1) % bank.length;

    return { idx, ...bank[idx] };
}

function setQuizDiff(diff) {
    quizDiff = diff;
    localStorage.setItem(K_QUIZ_DIFF, diff);
    quizEasyBtn.classList.toggle("active", diff === "easy");
    quizMedBtn.classList.toggle("active", diff === "medium");
    quizHardBtn.classList.toggle("active", diff === "hard");
}

function renderQuizQuestion() {
    quizCurrent = pickQuizQuestion(quizDiff);
    if (!quizCurrent) {
        quizQuestion.textContent = "Пока нет вопросов 💗";
        quizAnswers.innerHTML = "";
        return;
    }
    quizQuestion.textContent = quizCurrent.q;
    quizAnswers.innerHTML = "";

    quizCurrent.a.forEach((ans, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "answerBtn";
        btn.textContent = ans;
        btn.addEventListener("click", async () => {
            if (isBlocked) return;
            const ok = i === quizCurrent.correct;
            pushQuizHist(quizDiff, quizCurrent.idx, 20);
            await showPraise(ok ? pickPraise() : "Ничего 💗 Попробуем ещё раз ✨");
            renderQuizQuestion();
        });
        quizAnswers.appendChild(btn);
    });
}

function openQuiz() {
    if (isBlocked) return;
    const saved = localStorage.getItem(K_QUIZ_DIFF);
    setQuizDiff(saved === "medium" || saved === "hard" ? saved : "easy");
    renderQuizQuestion();
    quizDialog.showModal();
}

// ===== Memory =====
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function newMemoryGame() {
    const icons = ["🍓", "🌸", "💗", "🍬", "🧁", "🐻", "✨", "🎀"];
    const deck = shuffle([...icons, ...icons]).map((v, idx) => ({ id: idx, v, matched: false }));
    return { deck, flipped: [], moves: 0, lock: false };
}

function renderMemory() {
    memoryGrid.innerHTML = "";
    const best = Number(localStorage.getItem(K_MEMORY_BEST) || 0);

    memoryMeta.textContent = best > 0 ? `Лучший результат: ${best} ходов` : "Собери пары 💗";

    for (const card of memState.deck) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "memCard";

        const isFlipped = memState.flipped.includes(card.id);
        if (card.matched) btn.classList.add("matched");

        if (!isFlipped && !card.matched) {
            btn.classList.add("hidden");
            btn.textContent = "💗";
        } else {
            btn.textContent = card.v;
        }

        btn.addEventListener("click", () => onMemoryClick(card.id));
        memoryGrid.appendChild(btn);
    }
}

async function onMemoryClick(cardId) {
    if (isBlocked) return;         // ✅ пауза при похвале
    if (!memState || memState.lock) return;

    const card = memState.deck.find(c => c.id === cardId);
    if (!card || card.matched) return;
    if (memState.flipped.includes(cardId)) return;

    memState.flipped.push(cardId);
    renderMemory();

    if (memState.flipped.length === 2) {
        memState.lock = true;
        memState.moves += 1;

        const [aId, bId] = memState.flipped;
        const a = memState.deck.find(c => c.id === aId);
        const b = memState.deck.find(c => c.id === bId);

        if (a && b && a.v === b.v) {
            a.matched = true;
            b.matched = true;
            memState.flipped = [];
            renderMemory();

            await showPraise(pickPraise());
            memState.lock = false;

            if (memState.deck.every(c => c.matched)) {
                const prevBest = Number(localStorage.getItem(K_MEMORY_BEST) || 0);
                if (!prevBest || memState.moves < prevBest) localStorage.setItem(K_MEMORY_BEST, String(memState.moves));
                await showPraise("Ты победила! 💗");
                renderMemory();
            }
        } else {
            setTimeout(() => {
                memState.flipped = [];
                memState.lock = false;
                renderMemory();
            }, 650);
        }
    }
}
function openMemory() {
    if (isBlocked) return;
    memState = newMemoryGame();
    renderMemory();
    memoryDialog.showModal();
}

// ===== Events =====
tabSchedule.addEventListener("click", () => showTab("schedule"));
tabWishes.addEventListener("click", () => showTab("wishes"));
tabSettings.addEventListener("click", () => showTab("settings"));

goSettingsBtn.addEventListener("click", () => showTab("settings"));

weekOddBtn.addEventListener("click", () => setWeek("odd"));
weekEvenBtn.addEventListener("click", () => setWeek("even"));

addClassBtn.addEventListener("click", openAddClass);

classForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveClassFromForm();
});

clearAllBtn.addEventListener("click", () => {
    if (!confirm("Точно очистить всё?")) return;
    localStorage.removeItem(K_CLASSES);
    localStorage.removeItem(K_WEEK);
    localStorage.removeItem(K_WEEK_MODE);
    localStorage.removeItem(K_SELECTED_DATE);
    localStorage.removeItem(K_QUIZ_HIST);
    localStorage.removeItem(K_QUIZ_DIFF);
    localStorage.removeItem(K_MEMORY_BEST);
    wishBox.textContent = "";
    lastWishIdx = -1;
    renderAll();
});

// CSV import + красивая подпись
csvInput.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (importSub) importSub.textContent = file.name;

    try {
        const text = await file.text();
        const parsed = parseCSV(text);
        const classes = loadJSON(K_CLASSES, []);
        parsed.forEach(x => classes.push(x));
        saveJSON(K_CLASSES, classes);
        await showPraise(`Импортировано: ${parsed.length} 💗`);
        renderAll();
    } catch (err) {
        alert(String(err?.message || err));
    } finally {
        e.target.value = "";
        setTimeout(() => { if (importSub) importSub.textContent = "Нажми и выбери файл"; }, 900);
    }
});

// Calendar
openCalendarBtn.addEventListener("click", openCalendarSheet);
calBackdrop.addEventListener("click", closeCalendarSheet);
calCancelBtn.addEventListener("click", closeCalendarSheet);

calPrevBtn.addEventListener("click", () => {
    calViewMonth -= 1;
    if (calViewMonth < 0) { calViewMonth = 11; calViewYear -= 1; }
    renderCalendar();
});
calNextBtn.addEventListener("click", () => {
    calViewMonth += 1;
    if (calViewMonth > 11) { calViewMonth = 0; calViewYear += 1; }
    renderCalendar();
});

calDoneBtn.addEventListener("click", () => {
    if (!calTempSelected) return closeCalendarSheet();
    setSelectedDate(calTempSelected);

    // Choosing date => auto mode + sync week
    setWeekMode("auto");
    applyAutoWeekIfNeeded();
    updateWeekUI();

    closeCalendarSheet();
    renderAll();
});

// Wishes
newWishBtn.addEventListener("click", setWishAnimated);

// Quiz
startQuizBtn.addEventListener("click", openQuiz);
closeQuizBtn.addEventListener("click", () => quizDialog.close());
quizEasyBtn.addEventListener("click", () => { setQuizDiff("easy"); renderQuizQuestion(); });
quizMedBtn.addEventListener("click", () => { setQuizDiff("medium"); renderQuizQuestion(); });
quizHardBtn.addEventListener("click", () => { setQuizDiff("hard"); renderQuizQuestion(); });
quizNextBtn.addEventListener("click", () => { if (!isBlocked) renderQuizQuestion(); });

// Memory launch (в пожеланиях)
openMemoryWishesBtn.addEventListener("click", openMemory);
closeMemoryBtn.addEventListener("click", () => memoryDialog.close());
restartMemoryBtn.addEventListener("click", () => { memState = newMemoryGame(); renderMemory(); });

// Resize confetti canvas on orientation changes
window.addEventListener("resize", () => {
    if (!praiseOverlay.hidden) resizeConfettiCanvas();
});

// ===== Init =====
function init() {
    // ✅ принудительно прячем похвалу при старте
    praiseOverlay.hidden = true;

    // set default selected date to today if missing
    if (!localStorage.getItem(K_SELECTED_DATE)) setSelectedDate(new Date());

    // default week mode
    if (!localStorage.getItem(K_WEEK_MODE)) setWeekMode("auto");

    applyAutoWeekIfNeeded();
    updateWeekUI();

    showTab("schedule");
    renderAll();

    // Service Worker for offline
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js").catch(() => { });
    }
}
init();
