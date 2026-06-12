const recordKey = "fitness-tracker-v2-records";
const legacyRecordKey = "fitness-tracker-v1";
const profileKey = "fitness-tracker-profile";
const lastSaveKey = "fitness-tracker-last-save";
const dbName = "fitness-tracker-db";
const dbStore = "kv";
const imageBase = "./assets/";

const plans = [
  {
    title: "下肢 + 核心",
    focus: "力量基础",
    image: "day1-monday-lower-core.png",
    actions: [
      ["深蹲", "3 组 x 15 次"],
      ["哑铃罗马尼亚硬拉", "3 组 x 15 次"],
      ["臀桥", "3 组 x 20 次"],
      ["反向弓步", "2 组 x 每侧 10 次"],
      ["死虫", "3 组 x 每侧 10 次"],
    ],
  },
  {
    title: "上肢 + 核心",
    focus: "俯卧撑基础",
    image: "day2-tuesday-upper-core.png",
    actions: [
      ["上斜俯卧撑", "3 组 x 8-12 次"],
      ["跪姿俯卧撑", "2 组 x 5-8 次"],
      ["单臂哑铃划船", "3 组 x 每侧 15 次"],
      ["哑铃肩推", "3 组 x 12 次"],
      ["平板支撑", "3 组 x 30-45 秒"],
    ],
  },
  {
    title: "低冲击体能 + 拉伸",
    focus: "心肺恢复",
    image: "day3-wednesday-cardio-stretch.png",
    actions: [
      ["原地踏步", "4 组 x 45 秒"],
      ["开合步", "4 组 x 45 秒"],
      ["后踢腿", "4 组 x 45 秒"],
      ["慢速登山者", "3 组 x 20 秒"],
      ["全身拉伸", "8 分钟"],
    ],
  },
  {
    title: "臀腿 + 腰腹稳定",
    focus: "核心稳定",
    image: "day4-thursday-glutes-core.png",
    actions: [
      ["相扑深蹲", "3 组 x 15 次"],
      ["分腿蹲", "3 组 x 每侧 10 次"],
      ["单腿臀桥", "3 组 x 每侧 10 次"],
      ["鸟狗式", "3 组 x 每侧 10 次"],
      ["侧平板", "3 组 x 每侧 20-35 秒"],
    ],
  },
  {
    title: "上肢加强",
    focus: "推拉力量",
    image: "day5-friday-upper-strength.png",
    actions: [
      ["上斜俯卧撑", "3 组 x 8-12 次"],
      ["单臂哑铃划船", "3 组 x 每侧 15 次"],
      ["俯身反向飞鸟", "2 组 x 15 次"],
      ["哑铃弯举", "2 组 x 15 次"],
      ["超人式", "2 组 x 12 次"],
    ],
  },
  {
    title: "休息 + 恢复",
    focus: "主动恢复",
    image: "day6-saturday-recovery.png",
    actions: [
      ["轻松散步", "20-30 分钟"],
      ["猫牛式", "2 组 x 10 次"],
      ["髋部拉伸", "每侧 30 秒"],
      ["肩颈放松", "3 分钟"],
    ],
  },
  {
    title: "全身循环 + 核心",
    focus: "综合巩固",
    image: "day7-sunday-fullbody-core.png",
    actions: [
      ["哑铃深蹲推举", "3 组 x 10 次"],
      ["上斜俯卧撑", "3 组 x 8-12 次"],
      ["哑铃划船", "3 组 x 每侧 15 次"],
      ["慢速登山者", "3 组 x 20 秒"],
      ["平板支撑", "3 组 x 30-45 秒"],
    ],
  },
];

const specialModules = [
  {
    id: "pushup",
    title: "10 个标准俯卧撑专项",
    tag: "上肢",
    subtitle: "每周 3-4 次，小量高频，不练到力竭。",
    recommendedDays: [0, 1, 4, 6],
    steps: ["上斜俯卧撑 3x8-12", "跪姿俯卧撑 2x5-8", "离心俯卧撑 3x3", "平板支撑 2x30-45 秒"],
  },
  {
    id: "core",
    title: "腰腹核心稳定专项",
    tag: "核心",
    subtitle: "强化腹部、腰背和骨盆稳定，帮助俯卧撑不塌腰。",
    recommendedDays: [0, 3, 6],
    steps: ["死虫 2x每侧10", "鸟狗式 2x每侧10", "侧平板 2x每侧20-35 秒", "臀桥行进 2x12"],
  },
  {
    id: "upper",
    title: "肩背推拉补强专项",
    tag: "体态",
    subtitle: "保护肩颈，补背部发力，减少只练推不练拉。",
    recommendedDays: [1, 4],
    steps: ["墙天使 2x12", "俯身反向飞鸟 2x15", "单臂哑铃划船 2x每侧15", "肩胛俯卧撑 2x8-10"],
  },
  {
    id: "recovery",
    title: "恢复与灵活性专项",
    tag: "恢复",
    subtitle: "疲劳、睡眠差或酸痛高时优先做这一组。",
    recommendedDays: [2, 5],
    steps: ["猫牛式 2x10", "髋屈肌拉伸 每侧40秒", "胸椎旋转 每侧8次", "肩颈放松 3分钟"],
  },
];

const pushupGuides = [
  ["第 1-2 周", "上斜俯卧撑 3x10-15", "跪姿俯卧撑 2x5-8", "离心俯卧撑 3x3"],
  ["第 3-4 周", "降低上斜高度 3x8-12", "跪姿俯卧撑 3x8-10", "离心俯卧撑 3x4"],
  ["第 5-6 周", "标准俯卧撑单次练习", "跪姿俯卧撑 2x10-12", "离心俯卧撑 3x5"],
  ["第 7-8 周", "标准俯卧撑 4-6 组", "每组保留 1-2 次余力", "上斜俯卧撑补足容量"],
  ["第 9-10 周", "每周测试 1 次", "训练日总量 20-35 次", "目标连续 10 个"],
];

const weekdayNames = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const beijingFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
let storageOK = isStorageAvailable();
let durableStorageOK = false;
let hydrationDone = false;
let userInteracted = false;
let lastSavedAt = "";
let records = loadRecords();
let profile = loadProfile();
let selectedDate = getBeijingToday();
let currentWeekStart = getMonday(selectedDate);

const els = {
  profileButton: document.querySelector("#profileButton"),
  headerName: document.querySelector("#headerName"),
  saveStatus: document.querySelector("#saveStatus"),
  storageNotice: document.querySelector("#storageNotice"),
  drawerExportBtn: document.querySelector("#drawerExportBtn"),
  importBtn: document.querySelector("#importBtn"),
  importFile: document.querySelector("#importFile"),
  avatarInitial: document.querySelector("#avatarInitial"),
  drawerInitial: document.querySelector("#drawerInitial"),
  drawerName: document.querySelector("#drawerName"),
  drawer: document.querySelector("#profileDrawer"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  closeDrawer: document.querySelector("#closeDrawer"),
  todayLabel: document.querySelector("#todayLabel"),
  storageWarning: document.querySelector("#storageWarning"),
  toggleImageBtn: document.querySelector("#toggleImageBtn"),
  imagePreview: document.querySelector("#imagePreview"),
  imageModal: document.querySelector("#imageModal"),
  closeImageModal: document.querySelector("#closeImageModal"),
  modalImage: document.querySelector("#modalImage"),
  heroDate: document.querySelector("#heroDate"),
  heroTitle: document.querySelector("#heroTitle"),
  encouragementText: document.querySelector("#encouragementText"),
  todayProgressText: document.querySelector("#todayProgressText"),
  weekDays: document.querySelector("#weekDays"),
  weekLabel: document.querySelector("#weekLabel"),
  dayImage: document.querySelector("#dayImage"),
  actionList: document.querySelector("#actionList"),
  actionCount: document.querySelector("#actionCount"),
  dayComplete: document.querySelector("#dayComplete"),
  todayRing: document.querySelector("#todayRing"),
  ringText: document.querySelector("#ringText"),
  recentDone: document.querySelector("#recentDone"),
  streakDays: document.querySelector("#streakDays"),
  lastTraining: document.querySelector("#lastTraining"),
  heroPushupBest: document.querySelector("#heroPushupBest"),
  readinessText: document.querySelector("#readinessText"),
  sleep: document.querySelector("#sleep"),
  soreness: document.querySelector("#soreness"),
  sorenessValue: document.querySelector("#sorenessValue"),
  notes: document.querySelector("#notes"),
  protein: document.querySelector("#protein"),
  water: document.querySelector("#water"),
  breakfast: document.querySelector("#breakfast"),
  vegetables: document.querySelector("#vegetables"),
  snacks: document.querySelector("#snacks"),
  weight: document.querySelector("#weight"),
  pushups: document.querySelector("#pushups"),
  plank: document.querySelector("#plank"),
  dietSummary: document.querySelector("#dietSummary"),
  specialList: document.querySelector("#specialList"),
  trainingDays: document.querySelector("#trainingDays"),
  specialDays: document.querySelector("#specialDays"),
  proteinDays: document.querySelector("#proteinDays"),
  dietOverviewText: document.querySelector("#dietOverviewText"),
  sleepRisk: document.querySelector("#sleepRisk"),
  weekScore: document.querySelector("#weekScore"),
  focusScoreRing: document.querySelector("#focusScoreRing"),
  overviewFocusTitle: document.querySelector("#overviewFocusTitle"),
  overviewFocusText: document.querySelector("#overviewFocusText"),
  overviewFocusStats: document.querySelector("#overviewFocusStats"),
  weeklyReview: document.querySelector("#weeklyReview"),
  statusMatrix: document.querySelector("#statusMatrix"),
  pushupBest: document.querySelector("#pushupBest"),
  pushupBar: document.querySelector("#pushupBar"),
  pushupGuide: document.querySelector("#pushupGuide"),
  trendBars: document.querySelector("#trendBars"),
  specialHeroTitle: document.querySelector("#specialHeroTitle"),
  specialHeroCopy: document.querySelector("#specialHeroCopy"),
  avatarUploadBtn: document.querySelector("#avatarUploadBtn"),
  avatarRemoveBtn: document.querySelector("#avatarRemoveBtn"),
  avatarFile: document.querySelector("#avatarFile"),
};

const profileFields = {
  name: document.querySelector("#profileName"),
  age: document.querySelector("#profileAge"),
  gender: document.querySelector("#profileGender"),
  height: document.querySelector("#profileHeight"),
  weight: document.querySelector("#profileWeight"),
  equipment: document.querySelector("#profileEquipment"),
  goals: document.querySelector("#profileGoals"),
  notes: document.querySelector("#profileNotes"),
};

function pad(num) {
  return String(num).padStart(2, "0");
}

function getBeijingToday() {
  const parts = Object.fromEntries(
    beijingFormatter.formatToParts(new Date()).map((part) => [part.type, part.value]),
  );
  return new Date(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
}

function dateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function getMonday(date) {
  const day = date.getDay() || 7;
  return addDays(startOfDay(date), 1 - day);
}

function getPlanIndex(date) {
  return (date.getDay() + 6) % 7;
}

function formatDate(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function isStorageAvailable() {
  try {
    const testKey = "__fitness_storage_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB unavailable"));
      return;
    }
    const request = indexedDB.open(dbName, 1);
    request.addEventListener("upgradeneeded", () => {
      request.result.createObjectStore(dbStore);
    });
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
  });
}

async function durableGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(dbStore, "readonly");
    const store = tx.objectStore(dbStore);
    const request = store.get(key);
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
    tx.addEventListener("complete", () => db.close());
  });
}

async function durableSet(key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(dbStore, "readwrite");
    tx.objectStore(dbStore).put(value, key);
    tx.addEventListener("complete", () => {
      db.close();
      durableStorageOK = true;
      resolve(true);
    });
    tx.addEventListener("error", () => {
      db.close();
      reject(tx.error);
    });
  });
}

function durableSetQuiet(key, value) {
  durableSet(key, value)
    .then(() => {
      lastSavedAt = new Date().toISOString();
      updateSaveStatus("saved");
    })
    .catch(() => {
      durableStorageOK = false;
      if (!storageOK) updateSaveStatus("error", "保存受限，请导出备份");
    });
}

async function hydrateFromDurableStorage() {
  try {
    const [durableRecords, durableProfile] = await Promise.all([
      durableGet(recordKey),
      durableGet(profileKey),
    ]);
    durableStorageOK = true;
    if (!userInteracted) {
      if (durableRecords && typeof durableRecords === "object" && Object.keys(durableRecords).length) {
        records = mergeRecords(records, durableRecords);
      }
      if (durableProfile && typeof durableProfile === "object") {
        profile = { ...profile, ...durableProfile };
      }
      hydrationDone = true;
      renderAll();
      updateSaveStatus("idle", getLastSaveText());
    }
  } catch {
    durableStorageOK = false;
    hydrationDone = true;
    updateSaveStatus(storageOK ? "idle" : "error");
  }
}

function mergeRecords(localRecords, durableRecords) {
  const merged = { ...durableRecords, ...localRecords };
  Object.keys(durableRecords).forEach((key) => {
    const localUpdated = Date.parse(localRecords[key]?.updatedAt || "");
    const durableUpdated = Date.parse(durableRecords[key]?.updatedAt || "");
    if (durableUpdated > localUpdated) merged[key] = durableRecords[key];
  });
  return merged;
}

function getLastSaveText() {
  if (!storageOK && !durableStorageOK) return "无法自动保存";
  let savedAt = lastSavedAt;
  if (!savedAt && storageOK) {
    try {
      savedAt = localStorage.getItem(lastSaveKey) || "";
    } catch {
      savedAt = "";
    }
  }
  if (!savedAt) return "本机自动保存";
  const date = new Date(savedAt);
  if (Number.isNaN(date.getTime())) return "本机自动保存";
  return `已保存 ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function updateSaveStatus(type = "idle", text = getLastSaveText()) {
  if (!els?.saveStatus) return;
  els.saveStatus.textContent = text;
  els.saveStatus.dataset.state = type;
  if (els.storageNotice) {
    const mode = durableStorageOK ? "双层保存已启用" : storageOK ? "本机保存已启用" : "当前浏览器限制自动保存";
    els.storageNotice.textContent =
      storageOK || durableStorageOK ? `${mode}，建议每周导出备份一次` : "请使用导出备份保存记录";
  }
}

function persistJSON(key, value) {
  if (!storageOK) {
    updateSaveStatus("error", "无法自动保存");
    return false;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
    lastSavedAt = new Date().toISOString();
    localStorage.setItem(lastSaveKey, lastSavedAt);
    updateSaveStatus("saved");
    return true;
  } catch {
    storageOK = false;
    updateSaveStatus("error", "保存失败，请导出备份");
    return false;
  }
}

function loadRecords() {
  try {
    const current = localStorage.getItem(recordKey);
    const legacy = localStorage.getItem(legacyRecordKey);
    return JSON.parse(current || legacy || "{}") || {};
  } catch {
    return {};
  }
}

function saveRecords() {
  persistJSON(recordKey, records);
  durableSetQuiet(recordKey, records);
}

function loadProfile() {
  const defaults = {
    name: "元气训练生",
    age: "",
    gender: "",
    height: "",
    weight: "",
    equipment: "一对 1.5 kg 哑铃，居家训练",
    goals: "增肌、提升体能、塑形；加强核心、上肢力量和腰腹稳定。",
    notes: "如有伤病或明显疼痛，优先降低强度或暂停训练。",
    avatar: "",
  };
  try {
    const savedProfile = JSON.parse(localStorage.getItem(profileKey)) || {};
    const mergedProfile = { ...defaults, ...savedProfile };
    if (mergedProfile.name === "训练者") {
      mergedProfile.name = "元气训练生";
    }
    return mergedProfile;
  } catch {
    return defaults;
  }
}

function saveProfile() {
  persistJSON(profileKey, profile);
  durableSetQuiet(profileKey, profile);
}

function defaultRecord(date) {
  const plan = plans[getPlanIndex(date)];
  return {
    complete: false,
    actions: plan.actions.map(() => false),
    specials: {},
    energy: "正常",
    sleep: "",
    soreness: 0,
    notes: "",
    protein: "",
    water: "",
    breakfast: false,
    vegetables: false,
    snacks: false,
    weight: "",
    pushups: "",
    plank: "",
  };
}

function normalizeRecord(record, date) {
  const base = defaultRecord(date);
  return {
    ...base,
    ...record,
    actions: Array.isArray(record.actions) ? record.actions : base.actions,
    specials: record.specials || {},
  };
}

function getRecord(date) {
  const key = dateKey(date);
  records[key] = normalizeRecord(records[key] || {}, date);
  return records[key];
}

function setRecord(date, patch) {
  const key = dateKey(date);
  userInteracted = true;
  records[key] = { ...getRecord(date), ...patch, updatedAt: new Date().toISOString() };
  saveRecords();
}

function weekDates(offset = 0) {
  const start = addDays(currentWeekStart, offset * 7);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

function isSpecialDone(record) {
  return Object.values(record.specials || {}).some(Boolean);
}

function recommendedSpecials(date) {
  const index = getPlanIndex(date);
  return specialModules.filter((module) => module.recommendedDays.includes(index));
}

function effectiveRecommendedSpecials(date) {
  const record = getRecord(date);
  if (getReadiness(record) === "建议降强度") {
    return specialModules.filter((module) => module.id === "recovery");
  }
  return recommendedSpecials(date);
}

function getActionProgress(date) {
  const record = getRecord(date);
  const total = plans[getPlanIndex(date)].actions.length;
  const done = (record.actions || []).filter(Boolean).length;
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

function getBestPushups() {
  return Object.values(records).reduce((max, record) => Math.max(max, Number(record.pushups) || 0), 0);
}

function getRecentStats() {
  const today = getBeijingToday();
  const recentDates = Array.from({ length: 7 }, (_, index) => addDays(today, index - 6));
  const recentRecords = recentDates.map(getRecord);
  const recentDone = recentRecords.filter((record) => record.complete).length;
  let streak = 0;
  const streakStart = getRecord(today).complete ? today : addDays(today, -1);
  for (let date = streakStart; ; date = addDays(date, -1)) {
    const record = records[dateKey(date)];
    if (!record?.complete) break;
    streak += 1;
  }
  const completedKeys = Object.keys(records)
    .filter((key) => records[key]?.complete)
    .sort();
  const lastKey = completedKeys.at(-1);
  const lastTraining = lastKey
    ? `${Number(lastKey.slice(5, 7))}/${Number(lastKey.slice(8, 10))}`
    : "暂无";
  return { recentDone, streak, lastTraining, bestPushups: getBestPushups() };
}

function getEncouragement(date) {
  const record = getRecord(date);
  const readiness = getReadiness(record);
  const progress = getActionProgress(date);
  const { streak, bestPushups } = getRecentStats();
  if (record.complete) return "今天的训练已完成，拉伸收尾后好好恢复。";
  if (readiness === "建议降强度") return "今天适合放轻一点，做恢复和核心稳定就很好。";
  if (progress.done > 0) return `已经完成 ${progress.done} 项，剩下的按动作质量来。`;
  if (streak >= 3) return `连续 ${streak} 天保持节奏了，今天继续稳稳推进。`;
  if (bestPushups > 0 && bestPushups < 10) return "上肢力量正在积累，先把每一次动作做稳。";
  return "先从热身开始，进入状态后再完成今天的训练。";
}

function renderProfile() {
  const initial = (profile.name || "我").trim().slice(0, 1);
  els.avatarInitial.textContent = initial;
  els.drawerInitial.textContent = initial;
  if (els.headerName) els.headerName.textContent = profile.name || "我";
  els.drawerName.textContent = profile.name || "我";
  [els.profileButton, document.querySelector(".avatar-large")].forEach((avatar) => {
    if (!avatar) return;
    if (profile.avatar) {
      avatar.classList.add("has-image");
      avatar.style.backgroundImage = `url("${profile.avatar}")`;
    } else {
      avatar.classList.remove("has-image");
      avatar.style.backgroundImage = "";
    }
  });
  Object.entries(profileFields).forEach(([key, field]) => {
    field.value = profile[key] || "";
  });
}

function renderEnvironmentWarning() {
  if (!els.storageWarning) return;
  els.storageWarning.hidden = window.location.protocol !== "file:";
}

function openDrawer() {
  els.drawerBackdrop.hidden = false;
  els.drawer.classList.add("open");
  els.drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  els.drawer.classList.remove("open");
  els.drawer.setAttribute("aria-hidden", "true");
  setTimeout(() => {
    if (!els.drawer.classList.contains("open")) els.drawerBackdrop.hidden = true;
  }, 180);
}

function renderWeek() {
  const days = weekDates();
  els.weekLabel.textContent = `${days[0].getMonth() + 1}/${days[0].getDate()} - ${days[6].getMonth() + 1}/${days[6].getDate()}`;
  els.todayLabel.textContent = `${weekdayNames[getPlanIndex(selectedDate)]} · ${formatDate(selectedDate)}`;
  els.weekDays.innerHTML = "";

  days.forEach((date, index) => {
    const record = getRecord(date);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "day-pill";
    button.classList.toggle("active", dateKey(date) === dateKey(selectedDate));
    button.classList.toggle("complete", record.complete);
    button.innerHTML = `
      <span>${weekdayNames[index]}</span>
      <strong>${date.getDate()}</strong>
      <small>${plans[index].focus}</small>
      <div class="dot-row" aria-hidden="true">
        <i class="status-dot ${record.complete ? "done" : ""}"></i>
        <i class="status-dot ${isSpecialDone(record) ? "done" : ""}"></i>
        <i class="status-dot ${Number(record.protein) >= 70 ? "done" : ""}"></i>
      </div>
    `;
    button.addEventListener("click", () => {
      selectedDate = date;
      renderAll();
    });
    els.weekDays.appendChild(button);
  });
}

function renderHero() {
  const planIndex = getPlanIndex(selectedDate);
  const plan = plans[planIndex];
  const progress = getActionProgress(selectedDate);
  const stats = getRecentStats();
  els.heroDate.textContent = `北京时间 · ${weekdayNames[planIndex]} · ${formatDate(selectedDate)}`;
  els.heroTitle.textContent = plan.title;
  els.encouragementText.textContent = getEncouragement(selectedDate);
  els.todayProgressText.textContent = `今日 ${progress.done}/${progress.total} 项 · ${getReadiness(getRecord(selectedDate))}`;
  els.ringText.textContent = `${progress.percent}%`;
  els.todayRing.style.setProperty("--progress", `${progress.percent}%`);
  els.recentDone.textContent = `${stats.recentDone}/7`;
  els.streakDays.textContent = `${stats.streak} 天`;
  els.lastTraining.textContent = stats.lastTraining;
  els.heroPushupBest.textContent = stats.bestPushups;
}

function renderDay() {
  const record = getRecord(selectedDate);
  const planIndex = getPlanIndex(selectedDate);
  const plan = plans[planIndex];
  els.dayImage.src = imageBase + plan.image;
  els.modalImage.src = imageBase + plan.image;
  els.actionCount.textContent = `${plan.actions.length} 项`;
  els.dayComplete.checked = Boolean(record.complete);
  els.actionList.innerHTML = "";

  plan.actions.forEach(([name, detail], index) => {
    const item = document.createElement("label");
    item.className = "action-item";
    item.classList.toggle("done", Boolean(record.actions[index]));
    item.innerHTML = `
      <input type="checkbox" ${record.actions[index] ? "checked" : ""} />
      <span>
        <span class="action-name">${name}</span>
        <span class="action-detail">${detail}</span>
      </span>
    `;
    item.querySelector("input").addEventListener("change", (event) => {
      const actions = [...getRecord(selectedDate).actions];
      actions[index] = event.target.checked;
      setRecord(selectedDate, { actions, complete: actions.every(Boolean) });
      renderAll();
    });
    els.actionList.appendChild(item);
  });

  setForm(record);
}

function openImageModal() {
  els.imageModal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeImageModal() {
  els.imageModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function resizeAvatar(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("error", () => reject(reader.error));
    reader.addEventListener("load", () => {
      const img = new Image();
      img.addEventListener("error", () => reject(new Error("image load failed")));
      img.addEventListener("load", () => {
        const max = 512;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.86));
      });
      img.src = String(reader.result || "");
    });
    reader.readAsDataURL(file);
  });
}

function setForm(record) {
  document.querySelectorAll(".segmented button").forEach((button) => {
    button.classList.toggle("active", button.dataset.value === record.energy);
  });
  els.sleep.value = record.sleep ?? "";
  els.soreness.value = record.soreness ?? 0;
  els.sorenessValue.textContent = els.soreness.value;
  els.notes.value = record.notes ?? "";
  els.protein.value = record.protein ?? "";
  els.water.value = record.water ?? "";
  els.breakfast.checked = Boolean(record.breakfast);
  els.vegetables.checked = Boolean(record.vegetables);
  els.snacks.checked = Boolean(record.snacks);
  els.weight.value = record.weight ?? "";
  els.pushups.value = record.pushups ?? "";
  els.plank.value = record.plank ?? "";
  els.readinessText.textContent = getReadiness(record);
  els.dietSummary.textContent = getDietSummary(record);
}

function getReadiness(record) {
  const sleep = Number(record.sleep);
  const soreness = Number(record.soreness);
  if (record.energy === "低" || soreness >= 7 || (sleep > 0 && sleep < 6)) return "建议降强度";
  if (record.energy === "好" && sleep >= 7 && soreness <= 3) return "状态很好";
  return "正常训练";
}

function hasDietRecord(record) {
  return (
    Number(record.protein) > 0 ||
    Number(record.water) > 0 ||
    Boolean(record.breakfast) ||
    Boolean(record.vegetables) ||
    Boolean(record.snacks)
  );
}

function getDietSummary(record) {
  if (!hasDietRecord(record)) return "可选";
  const parts = [];
  if (Number(record.protein) > 0) parts.push(`${record.protein}g`);
  if (Number(record.water) > 0) parts.push(`${record.water}L`);
  return parts.length ? parts.join(" · ") : "已记录";
}

function renderSpecials() {
  const record = getRecord(selectedDate);
  const recommendedList = effectiveRecommendedSpecials(selectedDate);
  const recommended = new Set(recommendedList.map((item) => item.id));
  const readiness = getReadiness(record);
  els.specialHeroTitle.textContent = readiness === "建议降强度" ? "今日恢复优先" : "今日建议专项";
  els.specialHeroCopy.textContent =
    readiness === "建议降强度"
      ? "睡眠、酸痛或精神状态提示你今天适合降强度。做恢复专项即可，不需要硬冲。"
      : "根据当天训练自动推荐，优先做标记为“今日建议”的项目。";
  els.specialList.innerHTML = "";

  [...specialModules].sort((a, b) => Number(recommended.has(b.id)) - Number(recommended.has(a.id))).forEach((module) => {
    const done = Boolean(record.specials[module.id]);
    const card = document.createElement("article");
    card.className = "special-card";
    card.classList.toggle("done", done);
    card.innerHTML = `
      <div class="special-top">
        <input type="checkbox" ${done ? "checked" : ""} />
        <span>
          <span class="special-title">${module.title}</span>
          <span class="special-subtitle">${module.subtitle}</span>
        </span>
        <span class="special-tag">${recommended.has(module.id) ? "今日建议" : module.tag}</span>
      </div>
      <ul class="special-steps">
        ${module.steps.map((step) => `<li>${step}</li>`).join("")}
      </ul>
    `;
    card.querySelector("input").addEventListener("change", (event) => {
      const specials = { ...getRecord(selectedDate).specials, [module.id]: event.target.checked };
      setRecord(selectedDate, { specials });
      renderAll();
    });
    els.specialList.appendChild(card);
  });
}

function renderStats() {
  const days = weekDates();
  const weekRecords = days.map(getRecord);
  const completed = weekRecords.filter((record) => record.complete).length;
  const specialDays = weekRecords.filter(isSpecialDone).length;
  const dietRecords = weekRecords.filter(hasDietRecord);
  const proteinDays = dietRecords.filter((record) => Number(record.protein) >= 70).length;
  const sleepRisk = weekRecords.filter((record) => Number(record.sleep) > 0 && Number(record.sleep) < 7).length;
  if (els.trainingDays) els.trainingDays.textContent = completed;
  if (els.specialDays) els.specialDays.textContent = specialDays;
  if (els.proteinDays) els.proteinDays.textContent = dietRecords.length;
  if (els.dietOverviewText) els.dietOverviewText.textContent = dietRecords.length ? `蛋白达标 ${proteinDays} 天` : "可选记录";
  if (els.sleepRisk) els.sleepRisk.textContent = sleepRisk;

  const best = getBestPushups();
  els.pushupBest.textContent = best;
  els.pushupBar.style.width = `${Math.min(best / 10, 1) * 100}%`;
  renderPushupGuide(best);
  renderWeeklyReview(days, weekRecords, { completed, specialDays, proteinDays, sleepRisk, best, dietRecordDays: dietRecords.length });
  renderMatrix(days);
  renderTrends();
}

function renderWeeklyReview(days, weekRecords, stats) {
  const dietRecords = weekRecords.filter(hasDietRecord);
  const waterDays = dietRecords.filter((record) => Number(record.water) >= 1.5).length;
  const sorenessRisk = weekRecords.filter((record) => Number(record.soreness) >= 7).length;
  const recoveryGoodDays = Math.max(0, 7 - stats.sleepRisk - sorenessRisk);
  const score = Math.min(
    100,
    Math.round(
      Math.min(stats.completed, 6) * 7 +
        Math.min(stats.specialDays, 4) * 5 +
        Math.min(stats.proteinDays, 5) * 4 +
        Math.min(recoveryGoodDays, 5) * 4,
    ),
  );
  els.weekScore.textContent = score;
  els.focusScoreRing.style.setProperty("--score", `${score}%`);

  const trainingText =
    stats.completed >= 5
      ? "训练频率已经够用，接下来守住动作质量。"
      : stats.completed >= 3
        ? "训练有基础了，再补 1-2 天会更稳。"
        : "先把每周 3 天做稳，不急着追求完美。";
  const recoveryText =
    stats.sleepRisk + sorenessRisk === 0
      ? "恢复状态不错，可以按计划推进。"
      : `本周有 ${stats.sleepRisk} 天睡眠不足、${sorenessRisk} 天酸痛偏高，建议把恢复专项放前面。`;
  const dietText =
    dietRecords.length === 0
      ? "本周未记录饮食，不影响训练完成；想看恢复质量时再补记即可。"
      : stats.proteinDays >= Math.min(4, dietRecords.length) && waterDays >= Math.min(4, dietRecords.length)
        ? `已记录 ${dietRecords.length} 天，蛋白和饮水对训练支持不错。`
        : `已记录 ${dietRecords.length} 天，其中蛋白达标 ${stats.proteinDays} 天、饮水达标 ${waterDays} 天。`;
  const pushupText =
    stats.best >= 10
      ? "标准俯卧撑目标已达成，可以进入动作质量和组数巩固。"
      : `标准俯卧撑最好 ${stats.best} 个，距离 10 个还差 ${10 - stats.best} 个。`;

  let focusTitle = "先把训练频率做稳";
  let focusText = trainingText;
  if (stats.completed >= 5 && stats.sleepRisk + sorenessRisk > 1) {
    focusTitle = "本周重点：恢复质量";
    focusText = recoveryText;
  } else if (stats.completed >= 4 && stats.best < 10) {
    focusTitle = "本周重点：俯卧撑进阶";
    focusText = pushupText;
  } else if (stats.completed >= 5) {
    focusTitle = "本周节奏不错";
    focusText = "训练频率已经到位，下一步关注动作质量和恢复。";
  } else if (dietRecords.length > 0 && stats.proteinDays === 0) {
    focusTitle = "本周重点：蛋白支持";
    focusText = dietText;
  }

  els.overviewFocusTitle.textContent = focusTitle;
  els.overviewFocusText.textContent = focusText;
  els.overviewFocusStats.innerHTML = [
    ["训练", `${stats.completed}/7`],
    ["专项", `${stats.specialDays}/7`],
    ["饮食", dietRecords.length ? `${stats.proteinDays}/${dietRecords.length}` : "可选"],
    ["恢复风险", `${stats.sleepRisk + sorenessRisk}天`],
  ]
    .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  els.weeklyReview.innerHTML = [
    ["训练", trainingText],
    ["恢复", recoveryText],
    ["饮食", dietText],
    ["俯卧撑", pushupText],
  ]
    .map(([title, text]) => `<div class="review-item"><strong>${title}</strong><span>${text}</span></div>`)
    .join("");
}

function renderPushupGuide(best) {
  const stageIndex = Math.min(Math.floor(best / 2), pushupGuides.length - 1);
  const guide = pushupGuides[stageIndex];
  els.pushupGuide.innerHTML = [`当前阶段：${guide[0]}`, ...guide.slice(1)]
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function renderMatrix(days) {
  const labels = ["正训", "专项", "蛋白", "饮水", "睡眠"];
  els.statusMatrix.innerHTML = "";
  days.forEach((date, index) => {
    const record = getRecord(date);
    const statuses = [
      record.complete,
      isSpecialDone(record),
      Number(record.protein) >= 70,
      Number(record.water) >= 1.5,
      Number(record.sleep) >= 7,
    ];
    const hasValues = [
      true,
      true,
      hasDietRecord(record),
      hasDietRecord(record),
      Number(record.sleep) > 0,
    ];
    const row = document.createElement("div");
    row.className = "matrix-row";
    row.innerHTML = `<strong>${weekdayNames[index]}</strong>${labels
      .map((label, labelIndex) => {
        const hasValue = hasValues[labelIndex];
        const cls = statuses[labelIndex] ? "done" : hasValue ? "" : "warn";
        const symbol = statuses[labelIndex] ? "✓" : hasValue ? "·" : label === "蛋白" || label === "饮水" ? "选" : "待";
        return `<span class="matrix-cell ${cls}" title="${label}">${symbol}</span>`;
      })
      .join("")}`;
    els.statusMatrix.appendChild(row);
  });
}

function renderTrends() {
  els.trendBars.innerHTML = "";
  [-3, -2, -1, 0].forEach((offset) => {
    const days = weekDates(offset);
    const done = days.map(getRecord).filter((record) => record.complete).length;
    const percent = Math.round((done / 7) * 100);
    const row = document.createElement("div");
    row.className = "trend-row";
    row.innerHTML = `
      <span>${offset === 0 ? "本周" : `${Math.abs(offset)}周前`}</span>
      <div class="trend-track"><div class="trend-fill" style="width:${percent}%"></div></div>
      <span>${percent}%</span>
    `;
    els.trendBars.appendChild(row);
  });
}

function renderAll() {
  renderEnvironmentWarning();
  renderProfile();
  renderWeek();
  renderHero();
  renderDay();
  renderSpecials();
  renderStats();
}

function updateCurrentRecordFromInput(input) {
  if (!input.id) return;
  const value = input.type === "checkbox" ? input.checked : input.value;
  setRecord(selectedDate, { [input.id]: value });
  if (input.id === "soreness") els.sorenessValue.textContent = input.value;
  renderHero();
  renderSpecials();
  renderStats();
  els.readinessText.textContent = getReadiness(getRecord(selectedDate));
}

document.querySelector("#prevWeek").addEventListener("click", () => {
  currentWeekStart = addDays(currentWeekStart, -7);
  selectedDate = currentWeekStart;
  renderAll();
});

document.querySelector("#nextWeek").addEventListener("click", () => {
  currentWeekStart = addDays(currentWeekStart, 7);
  selectedDate = currentWeekStart;
  renderAll();
});

els.dayComplete.addEventListener("change", (event) => {
  const plan = plans[getPlanIndex(selectedDate)];
  const complete = event.target.checked;
  setRecord(selectedDate, {
    complete,
    actions: plan.actions.map(() => complete),
  });
  renderAll();
});

document.querySelectorAll(".view-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".view-tab").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".view-panel").forEach((panel) => panel.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`#${tab.dataset.view}View`).classList.add("active");
  });
});

document.querySelectorAll(".segmented button").forEach((button) => {
  button.addEventListener("click", () => {
    setRecord(selectedDate, { energy: button.dataset.value });
    renderDay();
    renderHero();
    renderSpecials();
    renderStats();
  });
});

document.querySelectorAll("#logForm input, #logForm textarea").forEach((input) => {
  input.addEventListener("input", () => updateCurrentRecordFromInput(input));
  input.addEventListener("change", () => updateCurrentRecordFromInput(input));
});

document.querySelector("#completeRecommended").addEventListener("click", () => {
  const specials = { ...getRecord(selectedDate).specials };
  effectiveRecommendedSpecials(selectedDate).forEach((module) => {
    specials[module.id] = true;
  });
  setRecord(selectedDate, { specials });
  renderAll();
});

els.toggleImageBtn.addEventListener("click", openImageModal);
els.imagePreview.addEventListener("click", openImageModal);
els.closeImageModal.addEventListener("click", closeImageModal);
els.imageModal.addEventListener("click", (event) => {
  if (event.target === els.imageModal) closeImageModal();
});

document.querySelector("#resetDayBtn").addEventListener("click", () => {
  records[dateKey(selectedDate)] = defaultRecord(selectedDate);
  saveRecords();
  renderAll();
});

function exportBackup() {
  const payload = { profile, records };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `fitness-records-${dateKey(getBeijingToday())}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function importBackup(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const payload = JSON.parse(String(reader.result || "{}"));
      if (!payload || typeof payload !== "object") throw new Error("invalid");
      if (!payload.records || typeof payload.records !== "object") throw new Error("records");
      userInteracted = true;
      records = payload.records;
      if (payload.profile && typeof payload.profile === "object") {
        profile = { ...profile, ...payload.profile };
      }
      saveRecords();
      saveProfile();
      renderAll();
      updateSaveStatus("saved", "已导入并保存");
    } catch {
      updateSaveStatus("error", "导入失败，文件格式不对");
    }
  });
  reader.readAsText(file);
}

els.profileButton.addEventListener("click", openDrawer);
els.closeDrawer.addEventListener("click", closeDrawer);
els.drawerBackdrop.addEventListener("click", closeDrawer);
els.drawerExportBtn.addEventListener("click", exportBackup);
els.importBtn.addEventListener("click", () => els.importFile.click());
els.importFile.addEventListener("change", (event) => {
  const [file] = event.target.files || [];
  if (file) importBackup(file);
  event.target.value = "";
});

els.avatarUploadBtn.addEventListener("click", () => els.avatarFile.click());
els.avatarRemoveBtn.addEventListener("click", () => {
  userInteracted = true;
  profile = { ...profile, avatar: "" };
  saveProfile();
  renderProfile();
});
els.avatarFile.addEventListener("change", (event) => {
  const [file] = event.target.files || [];
  if (!file) return;
  resizeAvatar(file)
    .then((avatar) => {
      userInteracted = true;
      profile = { ...profile, avatar };
      saveProfile();
      renderProfile();
    })
    .catch(() => updateSaveStatus("error", "头像读取失败"));
  event.target.value = "";
});

Object.entries(profileFields).forEach(([key, field]) => {
  field.addEventListener("input", () => {
    userInteracted = true;
    profile = { ...profile, [key]: field.value };
    saveProfile();
    renderProfile();
  });
});

window.addEventListener("beforeunload", () => {
  if (storageOK) {
    localStorage.setItem(recordKey, JSON.stringify(records));
    localStorage.setItem(profileKey, JSON.stringify(profile));
    localStorage.setItem(lastSaveKey, new Date().toISOString());
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden" && storageOK) {
    localStorage.setItem(recordKey, JSON.stringify(records));
    localStorage.setItem(profileKey, JSON.stringify(profile));
    localStorage.setItem(lastSaveKey, new Date().toISOString());
  }
});

renderAll();
updateSaveStatus(storageOK ? "idle" : "error");
hydrateFromDurableStorage();
