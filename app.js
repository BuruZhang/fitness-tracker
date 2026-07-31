const recordKey = "fitness-tracker-v2-records";
const legacyRecordKey = "fitness-tracker-v1";
const profileKey = "fitness-tracker-profile";
const lastSaveKey = "fitness-tracker-last-save";
const nutritionIdeaCacheKey = "fitness-tracker-nutrition-ideas";
const dbName = "fitness-tracker-db";
const dbStore = "kv";
const imageBase = "./assets/";

const plans = [
  {
    title: "下肢 + 核心",
    focus: "力量基础",
    image: "day1-monday-lower-core-v3.png",
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
    image: "day2-tuesday-upper-core-v3.png",
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
    image: "day3-wednesday-cardio-stretch-v3.png",
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
    image: "day4-thursday-glutes-core-v3.png",
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
    image: "day5-friday-upper-strength-v3.png",
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
    image: "day6-saturday-recovery-v3.png",
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
    image: "day7-sunday-fullbody-core-v3.png",
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

const stageOptions = [
  {
    id: "stage1",
    name: "适应入门",
    title: "阶段 1",
    summary: "先熟悉动作和节奏，不追求强度。",
    target: "每周完成 3-4 天，动作稳定优先。",
  },
  {
    id: "stage2",
    name: "基础建立",
    title: "阶段 2",
    summary: "让训练变得更稳定，逐步增加容量。",
    target: "每周完成 4-5 天，俯卧撑基础动作更顺。",
  },
  {
    id: "stage3",
    name: "力量进阶",
    title: "阶段 3",
    summary: "上肢、核心和臀腿开始更有训练感。",
    target: "动作质量稳定后，再增加组数或降低上斜高度。",
  },
  {
    id: "stage4",
    name: "俯卧撑冲刺",
    title: "阶段 4",
    summary: "围绕 10 个标准俯卧撑做专项推进。",
    target: "每周测试 1 次，其余训练保留余力。",
  },
  {
    id: "stage5",
    name: "巩固塑形",
    title: "阶段 5",
    summary: "达成后继续稳住体态、线条和体能。",
    target: "训练、恢复、饮食形成长期节奏。",
  },
];

const statusOptions = {
  energy: [
    ["低", "偏低", "今天轻一点"],
    ["正常", "正常", "可以按计划"],
    ["好", "很好", "可以稳步推进"],
  ],
  sleepStatus: [
    ["不足", "不足", "优先恢复"],
    ["一般", "一般", "观察状态"],
    ["充足", "充足", "恢复不错"],
  ],
  sorenessStatus: [
    ["轻微", "轻微", "正常训练"],
    ["中等", "中等", "动作放慢"],
    ["明显", "明显", "建议降强度"],
  ],
};

const warmupSets = {
  default: {
    title: "3 分钟热身",
    summary: "让肩、髋和核心先醒过来，正式训练会更稳。",
    steps: ["肩绕环 30 秒", "猫牛式 8 次", "髋部画圈 每侧 20 秒", "原地踏步 60 秒"],
  },
  upper: {
    title: "上肢热身",
    summary: "先激活肩背，减少俯卧撑和推举时的代偿。",
    steps: ["肩绕环 30 秒", "墙天使 8 次", "肩胛俯卧撑 8 次", "平板支撑 20 秒"],
  },
  lower: {
    title: "下肢热身",
    summary: "先打开髋和膝踝，让深蹲、弓步更舒服。",
    steps: ["原地踏步 60 秒", "髋部画圈 每侧 20 秒", "徒手深蹲 8 次", "臀桥 10 次"],
  },
  recovery: {
    title: "恢复热身",
    summary: "低强度活动即可，目标是放松和恢复。",
    steps: ["鼻吸口呼 5 次", "猫牛式 8 次", "胸椎旋转 每侧 6 次", "轻松散步 2 分钟"],
  },
};

const actionTips = {
  深蹲: ["脚尖同向", "臀部后坐", "背部自然", "膝盖不扣"],
  哑铃罗马尼亚硬拉: ["髋部后折", "哑铃贴腿", "背部平直", "腿后侧发力"],
  臀桥: ["脚跟踩稳", "臀部夹紧", "顶峰停顿", "腰不硬顶"],
  反向弓步: ["前脚踩稳", "身体直立", "膝盖不扣", "慢起慢落"],
  死虫: ["腰背贴地", "手脚伸远", "核心收紧", "幅度可小"],
  上斜俯卧撑: ["身体直线", "核心收紧", "肩不耸", "肘约45度"],
  跪姿俯卧撑: ["核心收紧", "胸口下沉", "腰不塌", "手腕舒服"],
  单臂哑铃划船: ["肘向后", "肩胛内收", "背部发力", "不耸肩"],
  哑铃肩推: ["肋骨收住", "核心稳定", "直上直下", "腰不后仰"],
  平板支撑: ["肩肘对齐", "臀腹收紧", "身体直线", "不塌腰"],
  原地踏步: ["抬膝自然", "手臂轻摆", "呼吸稳定", "低冲击"],
  开合步: ["左右迈步", "膝盖微屈", "落地轻", "呼吸稳"],
  后踢腿: ["身体直立", "脚跟后踢", "核心稳", "不甩腰"],
  慢速登山者: ["手撑稳", "膝靠胸", "动作慢", "核心别松"],
  全身拉伸: ["呼吸放慢", "轻微拉感", "不硬压", "不憋气"],
  相扑深蹲: ["站距略宽", "脚尖外开", "胸口打开", "膝盖同向"],
  分腿蹲: ["前脚踩稳", "垂直上下", "核心稳", "幅度可调"],
  单腿臀桥: ["骨盆摆正", "脚跟发力", "臀部夹紧", "不晃髋"],
  鸟狗式: ["对侧伸远", "核心稳定", "骨盆不晃", "慢伸慢收"],
  侧平板: ["肩髋成线", "侧腰发力", "臀部不掉", "可屈膝"],
  俯身反向飞鸟: ["微屈肘", "肩胛后收", "肩不耸", "小幅控住"],
  哑铃弯举: ["上臂贴身", "慢弯慢放", "手腕稳定", "不借力"],
  超人式: ["轻抬胸腿", "背部发力", "颈部放松", "幅度可小"],
  轻松散步: ["能说话", "肩膀放松", "步伐自然", "恢复优先"],
  猫牛式: ["配合呼吸", "慢弓慢塌", "脊柱活动", "不憋气"],
  髋部拉伸: ["骨盆微收", "髋前侧拉感", "身体直立", "腰不后仰"],
  肩颈放松: ["肩膀下沉", "动作缓慢", "呼吸放松", "不硬掰"],
  哑铃深蹲推举: ["深蹲稳", "核心收紧", "顺势上推", "可拆动作"],
  哑铃划船: ["背部稳定", "肘向后", "肩胛内收", "不扭腰"],
};

const actionImages = {
  深蹲: "actions/squat.png",
  哑铃罗马尼亚硬拉: "actions/romanian-deadlift.png",
  臀桥: "actions/glute-bridge.png",
  反向弓步: "actions/reverse-lunge.png",
  死虫: "actions/dead-bug.png",
  上斜俯卧撑: "actions/incline-pushup.png",
  跪姿俯卧撑: "actions/kneeling-pushup.png",
  单臂哑铃划船: "actions/bent-over-row.png",
  哑铃肩推: "actions/seated-shoulder-press.png",
  平板支撑: "actions/plank.png",
  原地踏步: "actions/march-in-place.png",
  开合步: "actions/step-jack.png",
  后踢腿: "actions/march-in-place.png",
  慢速登山者: "actions/slow-mountain-climber.png",
  全身拉伸: "actions/chest-wall-stretch.png",
  相扑深蹲: "actions/sumo-squat.png",
  分腿蹲: "actions/reverse-lunge.png",
  单腿臀桥: "actions/glute-bridge.png",
  鸟狗式: "actions/bird-dog.png",
  侧平板: "actions/side-plank.png",
  俯身反向飞鸟: "actions/band-pull-apart.png",
  哑铃弯举: "actions/dumbbell-curl.png",
  超人式: "actions/superman.png",
  轻松散步: "actions/march-in-place.png",
  猫牛式: "actions/cat-cow.png",
  髋部拉伸: "actions/hip-flexor-stretch.png",
  肩颈放松: "actions/chest-wall-stretch.png",
  哑铃深蹲推举: "actions/squat.png",
  哑铃划船: "actions/bent-over-row.png",
};

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
let selectedFlowStepId = "";
let continueTrainingAfterStatus = false;

const els = {
  profileButton: document.querySelector("#profileButton"),
  headerName: document.querySelector("#headerName"),
  startTrainingBtn: document.querySelector("#startTrainingBtn"),
  saveStatus: document.querySelector("#saveStatus"),
  storageNotice: document.querySelector("#storageNotice"),
  drawerExportBtn: document.querySelector("#drawerExportBtn"),
  importBtn: document.querySelector("#importBtn"),
  importFile: document.querySelector("#importFile"),
  avatarInitial: document.querySelector("#avatarInitial"),
  drawerInitial: document.querySelector("#drawerInitial"),
  drawerName: document.querySelector("#drawerName"),
  drawerStageText: document.querySelector("#drawerStageText"),
  drawerStageButton: document.querySelector("#drawerStageButton"),
  drawer: document.querySelector("#profileDrawer"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  closeDrawer: document.querySelector("#closeDrawer"),
  todayLabel: document.querySelector("#todayLabel"),
  headerFocusLabel: document.querySelector("#headerFocusLabel"),
  headerFocusTitle: document.querySelector("#headerFocusTitle"),
  headerRing: document.querySelector("#headerRing"),
  headerRingText: document.querySelector("#headerRingText"),
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
  quickLog: document.querySelector("#quickLog"),
  trainingCard: document.querySelector("#trainingCard"),
  trainingCues: document.querySelector("#trainingCues"),
  cueSummary: document.querySelector("#cueSummary"),
  trainingInsightTitle: document.querySelector("#trainingInsightTitle"),
  trainingInsightText: document.querySelector("#trainingInsightText"),
  trainingFlowTitle: document.querySelector("#trainingFlowTitle"),
  trainingFlow: document.querySelector("#trainingFlow"),
  statusButton: document.querySelector("#statusButton"),
  statusButtonText: document.querySelector("#statusButtonText"),
  stageButton: document.querySelector("#stageButton"),
  stageButtonText: document.querySelector("#stageButtonText"),
  dailyReadinessTitle: document.querySelector("#dailyReadinessTitle"),
  dailyReadinessScore: document.querySelector("#dailyReadinessScore"),
  todayScreenDate: document.querySelector("#todayScreenDate"),
  trainingScreenStage: document.querySelector("#trainingScreenStage"),
  sheetBackdrop: document.querySelector("#sheetBackdrop"),
  statusSheet: document.querySelector("#statusSheet"),
  stageSheet: document.querySelector("#stageSheet"),
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
  nutritionIdeaTitle: document.querySelector("#nutritionIdeaTitle"),
  nutritionIdeaCopy: document.querySelector("#nutritionIdeaCopy"),
  refreshNutritionIdea: document.querySelector("#refreshNutritionIdea"),
  specialList: document.querySelector("#specialList"),
  specialHero: document.querySelector("#specialHero"),
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
    stage: "stage1",
    customStageName: "我的阶段",
    customStageSummary: "按自己的节奏调整训练重点。",
    customStageTarget: "先保持稳定记录，再逐步提高强度。",
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
    warmupComplete: false,
    stretchComplete: false,
    energy: "正常",
    sleepStatus: "一般",
    sorenessStatus: "轻微",
    readinessLogged: false,
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

function getCurrentStage() {
  if (profile.stage === "custom") {
    return {
      id: "custom",
      name: profile.customStageName || "我的阶段",
      title: "自定义",
      summary: profile.customStageSummary || "按自己的节奏调整训练重点。",
      target: profile.customStageTarget || "先保持稳定记录，再逐步提高强度。",
    };
  }
  return stageOptions.find((stage) => stage.id === profile.stage) || stageOptions[0];
}

function getWarmup(date) {
  const planIndex = getPlanIndex(date);
  if (planIndex === 1 || planIndex === 4) return warmupSets.upper;
  if (planIndex === 0 || planIndex === 3 || planIndex === 6) return warmupSets.lower;
  if (planIndex === 2 || planIndex === 5) return warmupSets.recovery;
  return warmupSets.default;
}

function getStatusSummary(record) {
  if (!hasReadinessInput(record)) return "还没有记录今天的状态";
  const parts = [
    `精神${record.energy || "正常"}`,
    `睡眠${record.sleepStatus || "一般"}`,
    `酸痛${record.sorenessStatus || "轻微"}`,
  ];
  return parts.join(" · ");
}

function hasReadinessInput(record) {
  return Boolean(
    record.readinessLogged ||
      Number(record.sleep) > 0 ||
      Number(record.soreness) > 0 ||
      record.energy === "低" ||
      record.energy === "好" ||
      record.sleepStatus === "不足" ||
      record.sleepStatus === "充足" ||
      record.sorenessStatus === "中等" ||
      record.sorenessStatus === "明显",
  );
}

function getReadinessScore(record) {
  if (!hasReadinessInput(record)) return null;
  const readiness = getReadiness(record);
  if (readiness === "状态很好") return 90;
  if (readiness === "建议降强度") return 68;
  return 82;
}

function getSpecialProgress(record) {
  const recommended = effectiveRecommendedSpecials(selectedDate);
  const done = recommended.filter((module) => record.specials?.[module.id]).length;
  return { recommended, done, total: recommended.length };
}

function getActionTip(name) {
  return actionTips[name] || ["动作放慢", "姿势稳定", "不适暂停"];
}

function getActionImage(name, fallbackPlan) {
  return imageBase + (actionImages[name] || fallbackPlan.image);
}

function renderCueSummary(plan) {
  if (!els.cueSummary) return;
  els.cueSummary.innerHTML = plan.actions
    .map(([name, detail]) => {
      const cues = getActionTip(name).slice(0, 3);
      return `
        <div class="cue-summary-item">
          <strong>${escapeHTML(name)}</strong>
          <span>${escapeHTML(detail)}</span>
          <div>${cues.map((cue) => `<em>${escapeHTML(cue)}</em>`).join("")}</div>
        </div>
      `;
    })
    .join("");
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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
  if (record.complete) return "今天已经完成主训练，做完拉伸就安心收尾。";
  if (readiness === "建议降强度") return "今天把强度放轻一点，恢复和核心稳定更重要。";
  if (progress.done > 0) return `已完成 ${progress.done} 项，剩下的慢一点也没关系。`;
  if (streak >= 3) return `连续 ${streak} 天保持节奏，今天继续稳住。`;
  if (bestPushups > 0 && bestPushups < 10) return "上肢力量正在积累，先把每一次动作做稳。";
  return "先确认身体状态，再进入今天的训练。";
}

function renderProfile() {
  const initial = (profile.name || "我").trim().slice(0, 1);
  const stage = getCurrentStage();
  els.avatarInitial.textContent = initial;
  els.drawerInitial.textContent = initial;
  if (els.headerName) els.headerName.textContent = "元气小练";
  els.drawerName.textContent = profile.name || "我";
  if (els.drawerStageText) els.drawerStageText.textContent = `${stage.title} · ${stage.name}`;
  [els.profileButton, document.querySelector(".avatar-large")].forEach((avatar) => {
    if (!avatar) return;
    if (profile.avatar) {
      avatar.classList.add("has-image");
      avatar.style.backgroundImage = `url("${profile.avatar}"), url("./assets/mascot-dachshund-q-brown.png")`;
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
  const planIndex = getPlanIndex(selectedDate);
  const progress = getActionProgress(selectedDate);
  els.todayLabel.textContent = `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日 ${weekdayNames[planIndex]}`;
  if (els.headerFocusLabel) els.headerFocusLabel.textContent = progress.percent >= 100 ? "今日完成" : "今日训练";
  if (els.headerFocusTitle) els.headerFocusTitle.textContent = plans[planIndex].title;
  if (els.headerRingText) els.headerRingText.textContent = `${progress.percent}`;
  if (els.headerRing) els.headerRing.style.setProperty("--progress", `${progress.percent}%`);
  if (els.todayScreenDate) {
    els.todayScreenDate.textContent = `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日 ${weekdayNames[planIndex]}`;
  }
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
        <i class="status-dot ${record.warmupComplete ? "done" : ""}"></i>
        <i class="status-dot ${record.complete ? "done" : ""}"></i>
        <i class="status-dot ${isSpecialDone(record) ? "done" : ""}"></i>
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
  const record = getRecord(selectedDate);
  const heroCard = document.querySelector(".hero-card");
  if (heroCard && plan.actions[0]) {
    heroCard.style.setProperty("--figma-hero-image", `url("${getActionImage(plan.actions[0][0], plan)}")`);
  }
  const progress = getActionProgress(selectedDate);
  const stats = getRecentStats();
  const readiness = getReadiness(record);
  const stage = getCurrentStage();
  els.heroDate.textContent = `北京时间 · ${weekdayNames[planIndex]} · ${formatDate(selectedDate)}`;
  els.heroTitle.textContent = record.complete ? "今日完成，恢复收尾" : plan.title;
  els.encouragementText.textContent = getEncouragement(selectedDate);
  els.todayProgressText.textContent =
    readiness === "待评估"
      ? `正训 ${progress.done}/${progress.total} · ${stage.name}`
      : `正训 ${progress.done}/${progress.total} · ${readiness} · ${stage.name}`;
  if (els.startTrainingBtn) {
    els.startTrainingBtn.textContent = progress.percent >= 100 ? "查看今日成果" : progress.done > 0 ? "继续今日训练" : "开始今日训练";
  }
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
  els.dayComplete.checked = Boolean(record.complete);
  renderTrainingFlow(record, plan, planIndex);
  renderCueSummary(plan);
  els.actionList.innerHTML = "";

  plan.actions.forEach(([name, detail], index) => {
    const cues = getActionTip(name);
    const item = document.createElement("label");
    item.className = "action-item";
    item.classList.toggle("done", Boolean(record.actions[index]));
    item.innerHTML = `
      <input type="checkbox" ${record.actions[index] ? "checked" : ""} />
        <img class="action-thumb" src="${getActionImage(name, plan)}" alt="${escapeHTML(name)}动作示范" loading="lazy" decoding="async" />
        <span class="action-content">
          <span class="action-line">
            <span class="action-name">${name}</span>
            <span class="action-detail">${detail}</span>
          </span>
          <span class="action-guidance">
            <b>要点</b>
            <span class="cue-row">
              ${cues.map((cue) => `<span class="cue-chip">${escapeHTML(cue)}</span>`).join("")}
            </span>
          </span>
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

function renderTrainingFlow(record, plan, planIndex) {
  if (!els.trainingFlow) return;
  const progress = getActionProgress(selectedDate);
  const warmup = getWarmup(selectedDate);
  const readiness = getReadiness(record);
  const readinessScore = getReadinessScore(record);
  const stage = getCurrentStage();
  const specialProgress = getSpecialProgress(record);
  const recommendedNames = specialProgress.recommended.map((module) => module.tag).join(" / ") || "按需选择";
  const specialDone = specialProgress.total > 0 && specialProgress.done >= specialProgress.total;
  const stretchDone = Boolean(record.stretchComplete);
  els.trainingFlowTitle.textContent = plan.title;
  els.actionCount.textContent = `${progress.done}/${progress.total} 正训`;
  if (els.statusButtonText) els.statusButtonText.textContent = readiness === "待评估" ? "记录状态" : readiness;
  if (els.stageButtonText) els.stageButtonText.textContent = stage.name;
  if (els.trainingScreenStage) els.trainingScreenStage.textContent = `${stage.title} · ${stage.name}`;
  if (els.dailyReadinessTitle) {
    els.dailyReadinessTitle.textContent =
      readiness === "待评估" ? "今天感觉如何？" : readiness === "状态很好" ? "状态很好" : readiness === "建议降强度" ? "适合轻练" : "状态良好";
  }
  if (els.dailyReadinessScore) els.dailyReadinessScore.textContent = readinessScore === null ? "轻点记录" : `${readinessScore} 综合评分`;
  const formatProgressLabel = (done, total) => `${done}/${Math.max(total, 1)}`;
  const flowSteps = [
    {
      id: "warmup",
      index: "01",
      short: "热身",
      icon: "./assets/ri-glyph-warmup.svg",
      title: warmup.title,
      status: record.warmupComplete ? "已完成" : "待完成",
      done: Boolean(record.warmupComplete),
      doneCount: record.warmupComplete ? warmup.steps.length : 0,
      totalCount: warmup.steps.length,
      action: "warmup",
      actionText: record.warmupComplete ? "取消热身" : "完成热身",
      detail: record.warmupComplete ? "身体已经进入状态，可以安心进入正训。" : "激活髋、膝、踝，让接下来的动作更舒服。",
      meta: `${warmup.steps.length} 项 · 约 3 分钟`,
      cues: ["唤醒肩背", "核心收紧", "轻量开始"],
    },
    {
      id: "train",
      index: "02",
      short: "正训",
      icon: "./assets/ri-glyph-train.svg",
      title: "正式训练",
      status: record.complete ? "已完成" : `${progress.done}/${progress.total}`,
      done: Boolean(record.complete),
      doneCount: progress.done,
      totalCount: progress.total,
      action: "train",
      actionText: progress.done > 0 ? "继续清单" : "动作清单",
      detail: record.complete
        ? "这一段完成得很好，下一步进入专项或拉伸。"
        : progress.done > 0
          ? `已完成 ${progress.done} 项，保持节奏继续推进。`
          : "先稳住动作质量，再追求数量。",
      meta: `${progress.done}/${progress.total} 项 · 逐项勾选`,
      cues: progress.done > 0 ? ["动作质量", "呼吸稳定", "慢起慢落"] : ["推拉力量", "核心收紧", "不抢速度"],
      secondaryAction: "image",
      secondaryText: "动作图",
    },
    {
      id: "special",
      index: "03",
      short: "专项",
      icon: "./assets/ri-glyph-special.svg",
      title: "今日专项",
      status: specialDone ? "已完成" : `${specialProgress.done}/${specialProgress.total}`,
      done: specialDone,
      doneCount: specialProgress.done,
      totalCount: specialProgress.total,
      action: "specialDone",
      actionText: specialDone ? "取消专项" : "完成专项",
      detail: specialDone
        ? "专项补强已完成，训练闭环更完整。"
        : readiness === "建议降强度"
          ? "今天优先恢复专项。"
          : `建议：${recommendedNames}`,
      meta: "按需补强 · 不练到力竭",
      cues: ["按需补强", "小量完成", "保持体态"],
      secondaryAction: "special",
      secondaryText: "专项库",
    },
    {
      id: "stretch",
      index: "04",
      short: "拉伸",
      icon: "./assets/ri-glyph-stretch.svg",
      title: "拉伸放松",
      status: stretchDone ? "已完成" : "收尾",
      done: stretchDone,
      doneCount: stretchDone ? 1 : 0,
      totalCount: 1,
      action: "stretch",
      actionText: stretchDone ? "取消拉伸" : "完成拉伸",
      detail: stretchDone ? "今天的训练已经完整收尾，安心记录状态。" : "舒缓肩颈、髋部和腰背，训练后恢复更稳。",
      meta: "约 8 分钟 · 拉到舒服的位置即可",
      cues: ["慢呼吸", "肩颈放松", "恢复闭环"],
    },
  ];
  const activeStep =
    flowSteps.find((step) => step.id === selectedFlowStepId) ||
    flowSteps.find((step) => !step.done) ||
    flowSteps[flowSteps.length - 1];
  const activeIndex = flowSteps.findIndex((step) => step.id === activeStep.id);
  const nextStep = flowSteps[activeIndex + 1] || flowSteps.find((step) => !step.done) || activeStep;
  const activeStepProgress = Math.round((activeStep.doneCount / Math.max(activeStep.totalCount, 1)) * 100);
  const activeStepMode = activeStep.done ? "complete" : activeStep.doneCount > 0 ? "progress" : "pending";
  const activeStepTitle =
    activeStep.id === "train" && activeStep.done
      ? "正训完成"
      : activeStep.id === "train" && activeStepMode === "progress"
        ? "继续正训"
        : activeStep.done
          ? `${activeStep.short}完成`
          : activeStep.title;
  const activeStepAction = activeStep.done ? "nextStep" : activeStep.action;
  const activeStepActionText = activeStep.done ? "下一步" : activeStep.actionText;
  const activeStepStatusLabel = activeStep.done ? "完成" : formatProgressLabel(activeStep.doneCount, activeStep.totalCount);
  if (els.trainingInsightTitle && els.trainingInsightText) {
    const stepInsight = {
      warmup: [
        readiness === "待评估" ? "先记录状态，再开始" : readiness === "建议降强度" ? "先轻热身，观察状态" : "先热身，再进正训",
        readiness === "待评估"
          ? "花 10 秒记录精神、睡眠和酸痛；今天的训练建议会更贴合你。"
          : readiness === "建议降强度"
          ? "今天身体反馈优先，热身后如果仍疲劳，就把正训降到轻量。"
          : "把肩背和核心先唤醒，能减少俯卧撑和推举时的代偿。",
      ],
      train: [
        progress.done > 0 ? `已完成 ${progress.done} 项，继续稳住` : "进入正训，质量优先",
        readiness === "建议降强度"
          ? "每组保留余力，动作变形就停，不需要追满数量。"
          : "控制节奏、核心收紧，先做稳再考虑提高难度。",
      ],
      special: [
        "专项放在正训后",
        readiness === "建议降强度"
          ? "今天更适合恢复专项，减少额外推举和俯卧撑压力。"
          : `建议补充 ${recommendedNames}，小量完成就足够。`,
      ],
      stretch: [
        record.complete ? "收尾恢复，完成闭环" : "拉伸放松，给身体降速",
        "放慢呼吸，舒缓肩颈、髋部和腰背，让明天更容易延续。",
      ],
    }[activeStep.id];
    els.trainingInsightTitle.textContent = stepInsight[0];
    els.trainingInsightText.textContent = stepInsight[1];
  }
  els.trainingFlow.innerHTML = `
    <div class="flow-stage-strip" aria-label="训练阶段与进度">
      <span>${stage.title} · ${stage.name}</span>
      <strong>${progress.done}/${progress.total} 正训</strong>
    </div>
    <div class="flow-step-tabs" aria-label="今日训练步骤">
      ${flowSteps
        .map(
          (step) => `
            <button class="flow-step-pill ${step.id === activeStep.id ? "active" : ""} ${step.done ? "done" : ""}" type="button" data-step="${step.id}" aria-pressed="${step.id === activeStep.id}">
              <img src="${step.icon}" alt="" loading="lazy" decoding="async" />
              <span>${step.index}</span>
              <strong>${step.short}</strong>
            </button>
          `,
        )
        .join("")}
    </div>
    <article class="flow-focus-card ${activeStep.done ? "done" : ""} is-${activeStepMode}" style="--step-progress: ${activeStepProgress}%">
      <div class="flow-focus-main">
        <span class="flow-card-head">
          <span class="step-index">${activeStep.index}</span>
          <span class="flow-stage-label">${activeStep.done ? "本段完成" : "当前进行"}</span>
        </span>
        <h4>${activeStepTitle}</h4>
        <p>${activeStep.detail}</p>
        <div class="flow-cue-list" aria-label="动作提示">
          ${activeStep.cues.slice(0, 2).map((cue) => `<span>${cue}</span>`).join("")}
        </div>
        <small>${activeStep.meta}</small>
      </div>
      <div class="flow-focus-actions">
        <div class="flow-state-orb" aria-label="${activeStepStatusLabel}">
          <strong>${activeStep.done ? "✓" : activeStepStatusLabel}</strong>
          <span>${activeStep.done ? "完成" : activeStep.short}</span>
        </div>
        <button class="primary-flow-button" type="button" data-action="${activeStepAction}">${activeStepActionText}</button>
      </div>
    </article>
    <div class="flow-preview-list" aria-label="其他训练步骤">
      ${flowSteps
        .filter((step) => step.id !== activeStep.id)
        .map(
          (step) => `
            <button class="flow-preview-row ${step.done ? "done" : ""}" type="button" data-step="${step.id}">
              <img src="${step.icon}" alt="" loading="lazy" decoding="async" />
              <span>${step.index}</span>
              <strong>${step.title}</strong>
              <em>${step.status}</em>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
  els.trainingFlow.querySelectorAll("button[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "warmup") {
        setRecord(selectedDate, { warmupComplete: !getRecord(selectedDate).warmupComplete });
        renderAll();
      }
      if (action === "stretch") {
        setRecord(selectedDate, { stretchComplete: !getRecord(selectedDate).stretchComplete });
        renderAll();
      }
      if (action === "train") {
        activateView("special");
        els.trainingCard?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (action === "special") {
        activateView("special");
        els.specialHero?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (action === "specialDone") {
        const specials = { ...getRecord(selectedDate).specials };
        effectiveRecommendedSpecials(selectedDate).forEach((module) => {
          specials[module.id] = !specialDone;
        });
        setRecord(selectedDate, { specials });
        renderAll();
      }
      if (action === "nextStep") {
        selectedFlowStepId = nextStep.id;
        renderTrainingFlow(getRecord(selectedDate), plans[getPlanIndex(selectedDate)], getPlanIndex(selectedDate));
      }
      if (action === "image") openImageModal();
    });
  });
  els.trainingFlow.querySelectorAll("button[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedFlowStepId = button.dataset.step;
      renderTrainingFlow(getRecord(selectedDate), plans[getPlanIndex(selectedDate)], getPlanIndex(selectedDate));
    });
  });
}

function openChoiceSheet(sheet) {
  if (!sheet) return;
  els.sheetBackdrop.hidden = false;
  sheet.hidden = false;
  document.body.classList.add("modal-open");
}

function closeChoiceSheets() {
  if (els.statusSheet) els.statusSheet.hidden = true;
  if (els.stageSheet) els.stageSheet.hidden = true;
  if (els.sheetBackdrop) els.sheetBackdrop.hidden = true;
  document.body.classList.remove("modal-open");
  continueTrainingAfterStatus = false;
}

function renderStatusSheet() {
  const record = getRecord(selectedDate);
  const groups = [
    ["energy", "精神状态"],
    ["sleepStatus", "睡眠恢复"],
    ["sorenessStatus", "身体酸痛"],
  ];
  els.statusSheet.innerHTML = `
    <div class="sheet-handle" aria-hidden="true"></div>
    <div class="sheet-head">
      <div>
        <p class="eyebrow">今日状态</p>
        <h3>${getReadiness(record)}</h3>
      </div>
      <button class="icon-button" type="button" data-action="close">×</button>
    </div>
    <p class="sheet-copy">${getStatusSummary(record)}。选完后会自动保存，用来调整今天的训练建议。</p>
    <div class="choice-groups">
      ${groups
        .map(
          ([field, title]) => `
            <section class="choice-group">
              <strong>${title}</strong>
              <div class="choice-grid">
                ${statusOptions[field]
                  .map(
                    ([value, label, hint]) => `
                      <button class="choice-option ${record[field] === value ? "active" : ""}" type="button" data-field="${field}" data-value="${value}">
                        <span>${label}</span>
                        <small>${hint}</small>
                      </button>
                    `,
                  )
                  .join("")}
              </div>
            </section>
          `,
        )
        .join("")}
    </div>
    <button class="primary-button full-width" type="button" data-action="status-finish">${continueTrainingAfterStatus ? "开始今日训练" : "保存状态"}</button>
  `;
  els.statusSheet.querySelectorAll("[data-action='close']").forEach((button) => {
    button.addEventListener("click", closeChoiceSheets);
  });
  els.statusSheet.querySelectorAll(".choice-option").forEach((button) => {
    button.addEventListener("click", () => {
      setRecord(selectedDate, { [button.dataset.field]: button.dataset.value, readinessLogged: true });
      renderAll();
      renderStatusSheet();
    });
  });
  els.statusSheet.querySelector("[data-action='status-finish']")?.addEventListener("click", () => {
    const shouldContinue = continueTrainingAfterStatus;
    closeChoiceSheets();
    if (shouldContinue) openTrainingView();
  });
}

function renderStageSheet() {
  const current = getCurrentStage();
  const customActive = profile.stage === "custom";
  els.stageSheet.innerHTML = `
    <div class="sheet-handle" aria-hidden="true"></div>
    <div class="sheet-head">
      <div>
        <p class="eyebrow">训练阶段</p>
        <h3>当前：${current.name}</h3>
      </div>
      <button class="icon-button" type="button" data-action="close">×</button>
    </div>
    <p class="sheet-copy">阶段由你自己选择，系统只负责把今日内容和记录组织得更清楚。</p>
    <div class="stage-list">
      ${stageOptions
        .map(
          (stage) => `
            <button class="stage-option ${stage.id === current.id ? "active" : ""}" type="button" data-stage="${stage.id}">
              <span>${stage.title}</span>
              <strong>${stage.name}</strong>
              <small>${stage.summary}</small>
              <em>${stage.target}</em>
            </button>
          `,
        )
        .join("")}
      <section class="custom-stage ${customActive ? "active" : ""}">
        <div>
          <span>自定义阶段</span>
          <strong>${escapeHTML(profile.customStageName || "我的阶段")}</strong>
        </div>
        <label class="field">
          <span>阶段名称</span>
          <input id="customStageName" class="plain-input" type="text" value="${escapeHTML(profile.customStageName || "")}" placeholder="例如：俯卧撑冲刺周" />
        </label>
        <label class="field">
          <span>阶段说明</span>
          <textarea id="customStageSummary" rows="2" placeholder="这个阶段主要想解决什么">${escapeHTML(profile.customStageSummary || "")}</textarea>
        </label>
        <label class="field">
          <span>阶段目标</span>
          <textarea id="customStageTarget" rows="2" placeholder="例如：每周训练 4 天，俯卧撑动作更稳定">${escapeHTML(profile.customStageTarget || "")}</textarea>
        </label>
        <button id="saveCustomStage" class="primary-button full-width" type="button">保存并使用自定义阶段</button>
      </section>
    </div>
  `;
  els.stageSheet.querySelector("[data-action='close']").addEventListener("click", closeChoiceSheets);
  els.stageSheet.querySelectorAll(".stage-option").forEach((button) => {
    button.addEventListener("click", () => {
      userInteracted = true;
      profile = { ...profile, stage: button.dataset.stage };
      saveProfile();
      renderAll();
      closeChoiceSheets();
    });
  });
  els.stageSheet.querySelector("#saveCustomStage").addEventListener("click", () => {
    userInteracted = true;
    profile = {
      ...profile,
      stage: "custom",
      customStageName: els.stageSheet.querySelector("#customStageName").value.trim() || "我的阶段",
      customStageSummary:
        els.stageSheet.querySelector("#customStageSummary").value.trim() || "按自己的节奏调整训练重点。",
      customStageTarget:
        els.stageSheet.querySelector("#customStageTarget").value.trim() || "先保持稳定记录，再逐步提高强度。",
    };
    saveProfile();
    renderAll();
    closeChoiceSheets();
  });
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
  if (!hasReadinessInput(record)) return "待评估";
  const sleep = Number(record.sleep);
  const soreness = Number(record.soreness);
  const sleepLow = record.sleepStatus === "不足" || (sleep > 0 && sleep < 6);
  const sorenessHigh = record.sorenessStatus === "明显" || soreness >= 7;
  const sleepGood = record.sleepStatus === "充足" || sleep >= 7;
  const sorenessLow = record.sorenessStatus === "轻微" || soreness <= 3;
  if (record.energy === "低" || sleepLow || sorenessHigh) return "建议降强度";
  if (record.energy === "好" && sleepGood && sorenessLow) return "状态很好";
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

const localNutritionIdeas = [
  ["鸡蛋 + 主食 + 蔬菜", "早餐或训练后补一餐：蛋白、碳水和蔬菜都留一点位置。"],
  ["鸡胸肉 + 米饭 + 深色蔬菜", "不需要吃得极端；先让每一餐都有一份看得见的蛋白质。"],
  ["无糖酸奶 + 水果 + 坚果", "适合时间紧时加餐，优先补足日常饮食，不替代正餐。"],
  ["豆腐 + 鸡蛋 + 杂粮", "没有肉类也能把一餐的蛋白质做得更扎实。"],
];

function setNutritionIdea(title, copy) {
  if (els.nutritionIdeaTitle) els.nutritionIdeaTitle.textContent = title;
  if (els.nutritionIdeaCopy) els.nutritionIdeaCopy.textContent = copy;
}

function pickLocalNutritionIdea() {
  return localNutritionIdeas[Math.floor(Math.random() * localNutritionIdeas.length)];
}

function getCachedNutritionIdeas() {
  try {
    const cached = JSON.parse(localStorage.getItem(nutritionIdeaCacheKey) || "null");
    if (!cached || !Array.isArray(cached.meals) || Date.now() - cached.savedAt > 7 * 24 * 60 * 60 * 1000) return [];
    return cached.meals;
  } catch {
    return [];
  }
}

async function refreshNutritionIdea() {
  if (!els.refreshNutritionIdea) return;
  const fallback = pickLocalNutritionIdea();
  els.refreshNutritionIdea.disabled = true;
  els.refreshNutritionIdea.textContent = "加载中";
  try {
    let meals = getCachedNutritionIdeas();
    if (!meals.length) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4500);
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast", {
        signal: controller.signal,
        credentials: "omit",
      });
      clearTimeout(timeout);
      if (!response.ok) throw new Error("nutrition api unavailable");
      const payload = await response.json();
      meals = Array.isArray(payload.meals) ? payload.meals.map((meal) => meal.strMeal).filter(Boolean) : [];
      if (!meals.length) throw new Error("nutrition api returned no meals");
      localStorage.setItem(nutritionIdeaCacheKey, JSON.stringify({ savedAt: Date.now(), meals }));
    }
    const meal = meals[Math.floor(Math.random() * meals.length)];
    setNutritionIdea(meal, "鸡胸肉主菜灵感来自公开食谱库；按自己的口味搭配主食和蔬菜即可。");
  } catch {
    setNutritionIdea(fallback[0], `${fallback[1]} 当前网络不可用，已切换为本地灵感。`);
  } finally {
    els.refreshNutritionIdea.disabled = false;
    els.refreshNutritionIdea.textContent = "换一个";
  }
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
  const warmupDays = weekRecords.filter((record) => record.warmupComplete).length;
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
  renderWeeklyReview(days, weekRecords, { warmupDays, completed, specialDays, proteinDays, sleepRisk, best, dietRecordDays: dietRecords.length });
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
        Math.min(stats.warmupDays, 6) * 3 +
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
    ["热身", `${stats.warmupDays}/7`],
    ["训练", `${stats.completed}/7`],
    ["专项", `${stats.specialDays}/7`],
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
  const labels = ["热身", "正训", "专项", "饮食", "状态"];
  els.statusMatrix.innerHTML = "";
  days.forEach((date, index) => {
    const record = getRecord(date);
    const statuses = [
      record.warmupComplete,
      record.complete,
      isSpecialDone(record),
      hasDietRecord(record),
      hasReadinessInput(record),
    ];
    const hasValues = [
      true,
      true,
      true,
      hasDietRecord(record),
      true,
    ];
    const row = document.createElement("div");
    row.className = "matrix-row";
    row.innerHTML = `<strong>${weekdayNames[index]}</strong>${labels
      .map((label, labelIndex) => {
        const hasValue = hasValues[labelIndex];
        const cls = statuses[labelIndex] ? "done" : hasValue ? "" : "warn";
        const symbol = statuses[labelIndex] ? "✓" : hasValue ? "·" : label === "饮食" ? "选" : "待";
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

function activateView(view) {
  document.body.dataset.view = view;
  document.querySelectorAll(".view-tab").forEach((item) => {
    const active = item.dataset.view === view;
    item.classList.toggle("active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
  document.querySelectorAll(".view-panel").forEach((panel) => panel.classList.toggle("active", panel.id === `${view}View`));
  closeDrawer();
}

function updateCurrentRecordFromInput(input) {
  if (!input.id) return;
  const value = input.type === "checkbox" ? input.checked : input.value;
  const readinessField = ["sleep", "soreness"].includes(input.id);
  setRecord(selectedDate, { [input.id]: value, ...(readinessField ? { readinessLogged: true } : {}) });
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

function openTrainingView() {
  activateView("special");
  els.trainingFlow?.scrollIntoView({ behavior: "smooth", block: "start" });
}

if (els.startTrainingBtn) {
  els.startTrainingBtn.addEventListener("click", () => {
    if (!hasReadinessInput(getRecord(selectedDate))) {
      continueTrainingAfterStatus = true;
      renderStatusSheet();
      openChoiceSheet(els.statusSheet);
      return;
    }
    openTrainingView();
  });
}

els.statusButton?.addEventListener("click", () => {
  continueTrainingAfterStatus = false;
  renderStatusSheet();
  openChoiceSheet(els.statusSheet);
});

els.stageButton?.addEventListener("click", () => {
  renderStageSheet();
  openChoiceSheet(els.stageSheet);
});

els.drawerStageButton?.addEventListener("click", () => {
  renderStageSheet();
  openChoiceSheet(els.stageSheet);
});

els.sheetBackdrop?.addEventListener("click", closeChoiceSheets);

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
    activateView(tab.dataset.view);
  });
});

document.querySelectorAll(".segmented button").forEach((button) => {
  button.addEventListener("click", () => {
    setRecord(selectedDate, { energy: button.dataset.value, readinessLogged: true });
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

els.refreshNutritionIdea?.addEventListener("click", refreshNutritionIdea);

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

document.body.dataset.view = "today";
renderAll();
updateSaveStatus(storageOK ? "idle" : "error");
hydrateFromDurableStorage();
