const recordKey = "fitness-tracker-v2-records";
const legacyRecordKey = "fitness-tracker-v1";
const profileKey = "fitness-tracker-profile";
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
let records = loadRecords();
let profile = loadProfile();
let selectedDate = startOfDay(new Date());
let currentWeekStart = getMonday(selectedDate);

const els = {
  profileButton: document.querySelector("#profileButton"),
  avatarInitial: document.querySelector("#avatarInitial"),
  drawerInitial: document.querySelector("#drawerInitial"),
  drawerName: document.querySelector("#drawerName"),
  drawer: document.querySelector("#profileDrawer"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  closeDrawer: document.querySelector("#closeDrawer"),
  todayLabel: document.querySelector("#todayLabel"),
  weekDays: document.querySelector("#weekDays"),
  weekLabel: document.querySelector("#weekLabel"),
  selectedDate: document.querySelector("#selectedDate"),
  dayTitle: document.querySelector("#dayTitle"),
  dayImage: document.querySelector("#dayImage"),
  actionList: document.querySelector("#actionList"),
  actionCount: document.querySelector("#actionCount"),
  dayComplete: document.querySelector("#dayComplete"),
  weekCompletion: document.querySelector("#weekCompletion"),
  completionRing: document.querySelector("#completionRing"),
  completionCount: document.querySelector("#completionCount"),
  ringText: document.querySelector("#ringText"),
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
  waist: document.querySelector("#waist"),
  pushups: document.querySelector("#pushups"),
  plank: document.querySelector("#plank"),
  specialList: document.querySelector("#specialList"),
  trainingDays: document.querySelector("#trainingDays"),
  specialDays: document.querySelector("#specialDays"),
  proteinDays: document.querySelector("#proteinDays"),
  sleepRisk: document.querySelector("#sleepRisk"),
  statusMatrix: document.querySelector("#statusMatrix"),
  pushupBest: document.querySelector("#pushupBest"),
  pushupBar: document.querySelector("#pushupBar"),
  pushupGuide: document.querySelector("#pushupGuide"),
  trendBars: document.querySelector("#trendBars"),
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
  localStorage.setItem(recordKey, JSON.stringify(records));
}

function loadProfile() {
  const defaults = {
    name: "羊咩咩",
    age: "23",
    gender: "女",
    height: "160",
    weight: "54",
    equipment: "一对 1.5 kg 哑铃，居家训练",
    goals: "增肌、提升体能、塑形；加强核心、上肢力量和腰腹稳定。",
    notes: "无伤病；目前标准俯卧撑基础较弱，平板支撑尚可。",
  };
  try {
    return { ...defaults, ...(JSON.parse(localStorage.getItem(profileKey)) || {}) };
  } catch {
    return defaults;
  }
}

function saveProfile() {
  localStorage.setItem(profileKey, JSON.stringify(profile));
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
    waist: "",
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
  records[key] = { ...getRecord(date), ...patch };
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

function renderProfile() {
  const initial = (profile.name || "我").trim().slice(0, 1);
  els.avatarInitial.textContent = initial;
  els.drawerInitial.textContent = initial;
  els.drawerName.textContent = profile.name || "我";
  Object.entries(profileFields).forEach(([key, field]) => {
    field.value = profile[key] || "";
  });
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

function renderDay() {
  const record = getRecord(selectedDate);
  const planIndex = getPlanIndex(selectedDate);
  const plan = plans[planIndex];
  els.selectedDate.textContent = `${weekdayNames[planIndex]} · ${formatDate(selectedDate)}`;
  els.dayTitle.textContent = plan.title;
  els.dayImage.src = imageBase + plan.image;
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
      <span class="action-badge">${weekdayNames[planIndex]}</span>
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
  els.waist.value = record.waist ?? "";
  els.pushups.value = record.pushups ?? "";
  els.plank.value = record.plank ?? "";
  els.readinessText.textContent = getReadiness(record);
}

function getReadiness(record) {
  const sleep = Number(record.sleep);
  const soreness = Number(record.soreness);
  if (record.energy === "低" || soreness >= 7 || (sleep > 0 && sleep < 6)) return "建议降强度";
  if (record.energy === "好" && sleep >= 7 && soreness <= 3) return "状态很好";
  return "正常训练";
}

function renderSpecials() {
  const record = getRecord(selectedDate);
  const recommended = new Set(recommendedSpecials(selectedDate).map((item) => item.id));
  els.specialList.innerHTML = "";

  specialModules.forEach((module) => {
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
  const completion = Math.round((completed / 7) * 100);
  els.weekCompletion.textContent = `${completion}%`;
  els.completionCount.textContent = `${completed}/7 天`;
  els.ringText.textContent = `${completion}%`;
  els.completionRing.style.setProperty("--progress", `${completion}%`);

  const specialDays = weekRecords.filter(isSpecialDone).length;
  const proteinDays = weekRecords.filter((record) => Number(record.protein) >= 70).length;
  const sleepRisk = weekRecords.filter((record) => Number(record.sleep) > 0 && Number(record.sleep) < 7).length;
  els.trainingDays.textContent = completed;
  els.specialDays.textContent = specialDays;
  els.proteinDays.textContent = proteinDays;
  els.sleepRisk.textContent = sleepRisk;

  const best = Object.values(records).reduce((max, record) => Math.max(max, Number(record.pushups) || 0), 0);
  els.pushupBest.textContent = best;
  els.pushupBar.style.width = `${Math.min(best / 10, 1) * 100}%`;
  renderPushupGuide(best);
  renderMatrix(days);
  renderTrends();
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
      Number(record.protein) > 0,
      Number(record.water) > 0,
      Number(record.sleep) > 0,
    ];
    const row = document.createElement("div");
    row.className = "matrix-row";
    row.innerHTML = `<strong>${weekdayNames[index]}</strong>${labels
      .map((label, labelIndex) => {
        const hasValue = hasValues[labelIndex];
        const cls = statuses[labelIndex] ? "done" : hasValue ? "" : "warn";
        const symbol = statuses[labelIndex] ? "✓" : hasValue ? "·" : "待";
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
  renderProfile();
  renderWeek();
  renderDay();
  renderSpecials();
  renderStats();
}

function updateCurrentRecordFromInput(input) {
  if (!input.id) return;
  const value = input.type === "checkbox" ? input.checked : input.value;
  setRecord(selectedDate, { [input.id]: value });
  if (input.id === "soreness") els.sorenessValue.textContent = input.value;
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
    renderStats();
  });
});

document.querySelectorAll("#logForm input, #logForm textarea").forEach((input) => {
  input.addEventListener("input", () => updateCurrentRecordFromInput(input));
  input.addEventListener("change", () => updateCurrentRecordFromInput(input));
});

document.querySelector("#completeRecommended").addEventListener("click", () => {
  const specials = { ...getRecord(selectedDate).specials };
  recommendedSpecials(selectedDate).forEach((module) => {
    specials[module.id] = true;
  });
  setRecord(selectedDate, { specials });
  renderAll();
});

document.querySelector("#resetDayBtn").addEventListener("click", () => {
  records[dateKey(selectedDate)] = defaultRecord(selectedDate);
  saveRecords();
  renderAll();
});

document.querySelector("#exportBtn").addEventListener("click", () => {
  const payload = { profile, records };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `fitness-records-${dateKey(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});

els.profileButton.addEventListener("click", openDrawer);
els.closeDrawer.addEventListener("click", closeDrawer);
els.drawerBackdrop.addEventListener("click", closeDrawer);

Object.entries(profileFields).forEach(([key, field]) => {
  field.addEventListener("input", () => {
    profile = { ...profile, [key]: field.value };
    saveProfile();
    renderProfile();
  });
});

renderAll();
