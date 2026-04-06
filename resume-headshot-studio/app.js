const canvas = document.getElementById("resultCanvas");
const ctx = canvas.getContext("2d");

const imageInput = document.getElementById("imageInput");
const styleSelect = document.getElementById("styleSelect");
const zoomRange = document.getElementById("zoomRange");
const liftRange = document.getElementById("liftRange");
const warmthRange = document.getElementById("warmthRange");
const clarityRange = document.getElementById("clarityRange");
const beautyToggle = document.getElementById("beautyToggle");
const formalWearToggle = document.getElementById("formalWearToggle");
const bgSoftLightToggle = document.getElementById("bgSoftLightToggle");
const generateBtn = document.getElementById("generateBtn");
const saveBtn = document.getElementById("saveBtn");
const downloadBtn = document.getElementById("downloadBtn");
const statusMessage = document.getElementById("statusMessage");
const emptyState = document.getElementById("emptyState");
const styleNotes = document.getElementById("styleNotes");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const STORAGE_KEY = "resume-headshot-history";

const state = {
  image: null,
  filename: "resume-headshot",
  generated: false,
};

const STYLE_MAP = {
  executiveBlue: {
    name: "商务蓝",
    summary: "适合简历、招聘平台和企业官网，背景稳重，整体更职业。",
    backgroundTop: "#eef5ff",
    backgroundBottom: "#a9bfdc",
    glow: "rgba(49, 96, 168, 0.35)",
    suit: "#223246",
    tie: "#174ea6",
    shirt: "#f5f8fd",
    tone: { brightness: 1.04, saturation: 1.08, contrast: 1.08 },
  },
  lightGray: {
    name: "极简灰",
    summary: "背景干净克制，适合产品、运营、设计和通用求职场景。",
    backgroundTop: "#f7f7f7",
    backgroundBottom: "#ccd2da",
    glow: "rgba(116, 126, 138, 0.25)",
    suit: "#495566",
    tie: "#7f8d9f",
    shirt: "#fbfcfe",
    tone: { brightness: 1.05, saturation: 0.96, contrast: 1.1 },
  },
  charcoalPro: {
    name: "深色高管",
    summary: "偏深色背景和更强层次感，适合管理岗、金融、咨询等正式场景。",
    backgroundTop: "#2d3644",
    backgroundBottom: "#0f1622",
    glow: "rgba(255, 255, 255, 0.12)",
    suit: "#121923",
    tie: "#506b96",
    shirt: "#f0f4f8",
    tone: { brightness: 0.98, saturation: 1.02, contrast: 1.16 },
  },
  freshOffice: {
    name: "清新白领",
    summary: "更明亮柔和，适合校招、行政、市场、人事等岗位。",
    backgroundTop: "#fcfefe",
    backgroundBottom: "#bcd9d6",
    glow: "rgba(122, 194, 186, 0.22)",
    suit: "#4d6670",
    tie: "#6fa29d",
    shirt: "#ffffff",
    tone: { brightness: 1.08, saturation: 1.04, contrast: 1.02 },
  },
};

function setStatus(message) {
  statusMessage.textContent = message;
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function setHistory(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function downloadDataUrl(dataUrl, fileName) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  link.click();
}

function renderHistory() {
  const items = getHistory();
  historyList.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "history-empty";
    empty.textContent = "暂无保存记录。";
    historyList.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "history-item";

    const image = document.createElement("img");
    image.src = item.dataUrl;
    image.alt = item.name;

    const meta = document.createElement("div");
    meta.className = "history-meta";
    meta.textContent = `${item.name} | ${item.savedAt}`;

    const button = document.createElement("button");
    button.className = "history-download";
    button.type = "button";
    button.textContent = "下载";
    button.addEventListener("click", () => {
      downloadDataUrl(item.dataUrl, `${item.name}.png`);
    });

    card.append(image, meta, button);
    historyList.appendChild(card);
  });
}

function updateStyleNotes() {
  const preset = STYLE_MAP[styleSelect.value];
  styleNotes.textContent = `${preset.name}：${preset.summary} 当前版本为纯前端本地修图与合成方案，后续可以继续复用这个界面去接真实 AI 生图接口。`;
}

function loadImage(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      state.image = img;
      state.filename = (file.name || "resume-headshot").replace(/\.[^.]+$/, "");
      state.generated = false;
      saveBtn.disabled = true;
      downloadBtn.disabled = true;
      emptyState.style.display = "none";
      drawPreview();
      setStatus("图片已加载，可以继续调整参数或直接生成。");
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function createPortraitClipPath() {
  const path = new Path2D();
  path.ellipse(canvas.width / 2, canvas.height * 0.38, canvas.width * 0.25, canvas.height * 0.33, 0, 0, Math.PI * 2);
  return path;
}

function drawBackground(preset) {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, preset.backgroundTop);
  gradient.addColorStop(1, preset.backgroundBottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const halo = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height * 0.23,
    40,
    canvas.width / 2,
    canvas.height * 0.23,
    canvas.width * 0.5
  );
  halo.addColorStop(0, "rgba(255,255,255,0.86)");
  halo.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (bgSoftLightToggle.checked) {
    ctx.fillStyle = preset.glow;
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.22, canvas.height * 0.2, 180, 220, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.78, canvas.height * 0.68, 180, 240, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPhoto(preset) {
  if (!state.image) {
    return;
  }

  const image = state.image;
  const zoom = Number(zoomRange.value);
  const lift = Number(liftRange.value);
  const warmth = Number(warmthRange.value);
  const clarity = Number(clarityRange.value);

  const scale = Math.max(canvas.width / image.width, canvas.height / image.height) * zoom;
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const x = (canvas.width - drawWidth) / 2;
  const y = (canvas.height - drawHeight) / 2 - 80 + lift;

  const tone = preset.tone;
  const sharpen = beautyToggle.checked ? clarity / 10 : 0;
  const blur = beautyToggle.checked ? 0.8 : 0;

  ctx.save();
  ctx.filter = [
    `brightness(${tone.brightness + warmth * 0.003})`,
    `contrast(${tone.contrast + sharpen * 0.015})`,
    `saturate(${tone.saturation + warmth * 0.002})`,
    `blur(${blur}px)`,
  ].join(" ");
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
  ctx.restore();

  if (beautyToggle.checked) {
    const faceMask = createPortraitClipPath();
    ctx.save();
    ctx.clip(faceMask);
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = "rgba(255, 241, 231, 0.92)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
}

function drawFormalWear(preset) {
  if (!formalWearToggle.checked) {
    return;
  }

  const centerX = canvas.width / 2;
  const collarTop = canvas.height * 0.62;

  ctx.save();

  ctx.fillStyle = preset.suit;
  ctx.beginPath();
  ctx.moveTo(centerX - 320, canvas.height);
  ctx.lineTo(centerX - 220, collarTop + 50);
  ctx.lineTo(centerX - 110, collarTop + 8);
  ctx.lineTo(centerX - 26, collarTop + 112);
  ctx.lineTo(centerX - 6, canvas.height);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(centerX + 320, canvas.height);
  ctx.lineTo(centerX + 220, collarTop + 50);
  ctx.lineTo(centerX + 110, collarTop + 8);
  ctx.lineTo(centerX + 26, collarTop + 112);
  ctx.lineTo(centerX + 6, canvas.height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = preset.shirt;
  ctx.beginPath();
  ctx.moveTo(centerX - 96, collarTop + 10);
  ctx.lineTo(centerX, collarTop + 132);
  ctx.lineTo(centerX + 96, collarTop + 10);
  ctx.lineTo(centerX + 58, collarTop + 160);
  ctx.lineTo(centerX - 58, collarTop + 160);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = preset.tie;
  ctx.beginPath();
  ctx.moveTo(centerX, collarTop + 72);
  ctx.lineTo(centerX + 34, collarTop + 124);
  ctx.lineTo(centerX + 8, canvas.height);
  ctx.lineTo(centerX - 8, canvas.height);
  ctx.lineTo(centerX - 34, collarTop + 124);
  ctx.closePath();
  ctx.fill();

  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, canvas.height * 0.58, canvas.width, canvas.height * 0.42);

  ctx.restore();
}

function drawFinish() {
  const vignette = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    canvas.width * 0.18,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width * 0.75
  );
  vignette.addColorStop(0, "rgba(255,255,255,0)");
  vignette.addColorStop(1, "rgba(12,19,31,0.22)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255,255,255,0.52)";
  ctx.lineWidth = 10;
  ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
}

function render() {
  const preset = STYLE_MAP[styleSelect.value];
  drawBackground(preset);
  drawPhoto(preset);
  drawFormalWear(preset);
  drawFinish();
  updateStyleNotes();
}

function drawPreview() {
  render();
}

imageInput.addEventListener("change", (event) => {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }
  loadImage(file);
});

[styleSelect, zoomRange, liftRange, warmthRange, clarityRange, beautyToggle, formalWearToggle, bgSoftLightToggle].forEach((element) => {
  element.addEventListener("input", () => {
    if (!state.image) {
      updateStyleNotes();
      return;
    }
    drawPreview();
  });
});

generateBtn.addEventListener("click", () => {
  if (!state.image) {
    setStatus("请先上传一张清晰的正面人像照片。");
    return;
  }

  render();
  state.generated = true;
  saveBtn.disabled = false;
  downloadBtn.disabled = false;
  setStatus("工作照已生成。你可以继续微调、保存本地记录或直接下载 PNG。");
});

saveBtn.addEventListener("click", () => {
  if (!state.generated) {
    return;
  }

  const preset = STYLE_MAP[styleSelect.value];
  const items = getHistory();
  items.unshift({
    name: `${state.filename}-${preset.name}`,
    savedAt: new Date().toLocaleString("zh-CN", { hour12: false }),
    dataUrl: canvas.toDataURL("image/png"),
  });
  setHistory(items.slice(0, 8));
  renderHistory();
  setStatus("当前结果已保存到浏览器本地记录。");
});

downloadBtn.addEventListener("click", () => {
  if (!state.generated) {
    return;
  }
  downloadDataUrl(
    canvas.toDataURL("image/png"),
    `${state.filename}-${STYLE_MAP[styleSelect.value].name}.png`
  );
  setStatus("下载已开始。");
});

clearHistoryBtn.addEventListener("click", () => {
  setHistory([]);
  renderHistory();
  setStatus("本地记录已清空。");
});

updateStyleNotes();
drawBackground(STYLE_MAP.executiveBlue);
renderHistory();
