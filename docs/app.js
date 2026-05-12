const STORAGE_KEY = "holo-resume-lab-history";

const ZH = {
  sampleLoaded: "\u793a\u4f8b\u5c65\u5386\u5df2\u8f7d\u5165\uff0c\u4f60\u53ef\u4ee5\u76f4\u63a5\u5728\u8fd9\u4efd\u6837\u4f8b\u4e0a\u4fee\u6539\u3002",
  previewReady: (theme) => `\u5df2\u5b9e\u65f6\u751f\u6210 ${theme} \u98ce\u683c\u9884\u89c8\uff0c\u53ef\u7ee7\u7eed\u4fee\u6539\u5185\u5bb9\u6216\u4fdd\u5b58\u5f53\u524d\u7248\u672c\u3002`,
  saved: "\u5f53\u524d\u7248\u672c\u5df2\u4fdd\u5b58\u5230\u672c\u5730\u7248\u672c\u5e93\u3002",
  cleared: "\u672c\u5730\u7248\u672c\u5e93\u5df2\u6e05\u7a7a\u3002",
  copied: "\u7b80\u5386\u6458\u8981\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f\u3002",
  copyFailed: "\u590d\u5236\u5931\u8d25\uff0c\u53ef\u80fd\u662f\u6d4f\u89c8\u5668\u6743\u9650\u9650\u5236\u3002",
  exported: "Markdown \u7b80\u5386\u5df2\u5bfc\u51fa\u3002",
  emptyHistory: "\u8fd8\u6ca1\u6709\u4fdd\u5b58\u7684\u7248\u672c\u3002\u586b\u5199\u5185\u5bb9\u540e\u70b9\u51fb\u201c\u4fdd\u5b58\u7248\u672c\u201d\u5373\u53ef\u521b\u5efa\u3002",
  restored: (index) => `\u5df2\u6062\u590d\u7b2c ${index} \u4e2a\u7248\u672c\uff0c\u4f60\u53ef\u4ee5\u7ee7\u7eed\u4fee\u6539\u3002`,
  fallbackSummary: "\u5728\u8fd9\u91cc\u8f93\u5165\u4f60\u7684\u804c\u4e1a\u6982\u8ff0\uff0c\u7cfb\u7edf\u4f1a\u5b9e\u65f6\u751f\u6210\u4e00\u4efd\u5177\u6709 3D \u73bb\u7483\u8d28\u611f\u7684\u4e2a\u4eba\u7b80\u5386\u7248\u5f0f\u3002",
  fallbackLocation: "\u57ce\u5e02\u5f85\u586b\u5199",
  fallbackEmail: "\u90ae\u7bb1\u5f85\u586b\u5199",
  fallbackPhone: "\u7535\u8bdd\u5f85\u586b\u5199",
  fallbackWebsite: "\u4e2a\u4eba\u94fe\u63a5\u5f85\u586b\u5199",
  fallbackName: "\u4f60\u7684\u540d\u5b57",
  fallbackRole: "\u4f60\u7684\u76ee\u6807\u804c\u4f4d",
  fallbackEyebrow: "\u7b80\u5386\u751f\u6210\u5668",
  fallbackOpen: "\u5f00\u653e\u673a\u4f1a\u4e2d",
  fallbackHighlight: "\u8bf7\u5728\u5de6\u4fa7\u586b\u5199\u4f60\u7684\u6838\u5fc3\u4eae\u70b9",
  fallbackSkill1: "\u4ea7\u54c1\u7b56\u7565",
  fallbackSkill2: "\u7528\u6237\u7814\u7a76",
  fallbackSkill3: "\u8de8\u56e2\u961f\u534f\u4f5c",
  fallbackExpTitle: "\u8bf7\u586b\u5199\u5de5\u4f5c\u7ecf\u5386 | \u804c\u4f4d | \u65f6\u95f4",
  fallbackExpBody: "\u5efa\u8bae\u7a81\u51fa\u804c\u8d23\u3001\u52a8\u4f5c\u548c\u7ed3\u679c\u3002",
  fallbackProjectTitle: "\u8bf7\u586b\u5199\u9879\u76ee\u7ecf\u5386 | \u89d2\u8272",
  fallbackProjectBody: "\u5efa\u8bae\u5199\u6e05\u695a\u9879\u76ee\u76ee\u6807\u3001\u65b9\u6848\u548c\u91cf\u5316\u7ed3\u679c\u3002",
  fallbackEducation: "\u8bf7\u586b\u5199\u6559\u80b2\u7ecf\u5386",
  fallbackMetric: "\u5f85\u586b\u5199",
  fallbackStrength: "\u7b56\u7565 x \u4f53\u9a8c x \u6267\u884c",
  unnamedCandidate: "\u672a\u547d\u540d\u5019\u9009\u4eba",
  unnamedRole: "\u672a\u547d\u540d\u804c\u4f4d",
  summaryTitle: "\u5019\u9009\u4eba",
  targetRole: "\u76ee\u6807\u804c\u4f4d",
  defaultMdName: "\u7b80\u5386",
  initialsFallback: "CV",
};

const SAMPLE_DATA = {
  name: "\u6797\u77e5\u8fdc",
  role: "\u9ad8\u7ea7\u4ea7\u54c1\u7ecf\u7406 / AI \u4f53\u9a8c\u8d1f\u8d23\u4eba",
  location: "\u4e0a\u6d77 / \u8fdc\u7a0b",
  email: "lin.zhiyuan@example.com",
  phone: "+86 138 0000 0000",
  website: "portfolio.zhiyuan.studio",
  summary:
    "7 \u5e74\u4ea7\u54c1\u7b56\u7565\u4e0e\u4f53\u9a8c\u8bbe\u8ba1\u590d\u5408\u80cc\u666f\uff0c\u957f\u671f\u805a\u7126 B \u7aef\u5e73\u53f0\u3001AI \u5de5\u4f5c\u6d41\u4e0e\u590d\u6742\u4fe1\u606f\u4ea7\u54c1\u3002\u64c5\u957f\u628a\u62bd\u8c61\u6218\u7565\u8f6c\u5316\u4e3a\u6e05\u6670\u7684\u4ea7\u54c1\u65b9\u5411\u3001\u53ef\u843d\u5730\u7684\u4f53\u9a8c\u7cfb\u7edf\uff0c\u4ee5\u53ca\u9ad8\u6548\u7684\u8de8\u56e2\u961f\u534f\u4f5c\u673a\u5236\u3002",
  highlights:
    "\u4e3b\u5bfc\u4f01\u4e1a\u7ea7 AI Copilot \u5e73\u53f0\u4ece 0 \u5230 1 \u642d\u5efa\uff0c6 \u4e2a\u6708\u5185\u8986\u76d6 12 \u4e2a\u4e1a\u52a1\u56e2\u961f\n\u91cd\u6784\u6838\u5fc3\u4fe1\u606f\u67b6\u6784\uff0c\u5173\u952e\u6d41\u7a0b\u8f6c\u5316\u7387\u63d0\u5347 28%\n\u5efa\u7acb\u4ea7\u54c1\u4e0e\u8bbe\u8ba1\u534f\u540c\u673a\u5236\uff0c\u5c06\u9700\u6c42\u4ea4\u4ed8\u5468\u671f\u7f29\u77ed 35%\n\u6c89\u6dc0\u9762\u5411\u9ad8\u7ba1\u3001\u9500\u552e\u4e0e\u5b9e\u65bd\u56e2\u961f\u7684\u6807\u51c6\u5316\u53d9\u4e8b\u6a21\u677f",
  skills:
    "\u4ea7\u54c1\u7b56\u7565\n\u7528\u6237\u7814\u7a76\n\u589e\u957f\u8bbe\u8ba1\nAIGC \u5de5\u4f5c\u6d41\n\u4fe1\u606f\u67b6\u6784\nFigma\nPRD\n\u8bbe\u8ba1\u7cfb\u7edf\n\u63d0\u793a\u8bcd\u8bbe\u8ba1\n\u8de8\u56e2\u961f\u534f\u4f5c",
  experience:
    "\u66dc\u77f3\u667a\u80fd | \u9ad8\u7ea7\u4ea7\u54c1\u7ecf\u7406 / AI \u4f53\u9a8c\u8d1f\u8d23\u4eba | 2023 - \u81f3\u4eca\n\u8d1f\u8d23\u4f01\u4e1a\u7ea7\u667a\u80fd\u52a9\u624b\u4ea7\u54c1\u8def\u7ebf\u56fe\u4e0e\u591a\u89d2\u8272\u5de5\u4f5c\u6d41\u8bbe\u8ba1\n\u642d\u5efa\u63d0\u793a\u8bcd\u8d44\u4ea7\u3001\u77e5\u8bc6\u5e93\u53ec\u56de\u548c\u4efb\u52a1\u7f16\u6392\u673a\u5236\uff0c\u63a8\u52a8\u6838\u5fc3\u573a\u666f\u4e0a\u7ebf\n\u8054\u52a8\u7814\u53d1\u3001\u8fd0\u8425\u4e0e\u5ba2\u6237\u6210\u529f\u56e2\u961f\uff0c\u5b8c\u6210\u4ece\u8bd5\u70b9\u5230\u89c4\u6a21\u5316\u590d\u5236\n\n\u661f\u4e91\u534f\u4f5c | \u4ea7\u54c1\u7ecf\u7406 | 2020 - 2023\n\u8d1f\u8d23\u534f\u4f5c\u5e73\u53f0\u4e0e\u7ba1\u7406\u540e\u53f0\u4ea7\u54c1\uff0c\u8986\u76d6\u5ba1\u6279\u3001\u4efb\u52a1\u4e0e\u6570\u636e\u770b\u677f\u7b49\u6a21\u5757\n\u63a8\u52a8\u8bbe\u8ba1\u7cfb\u7edf\u4e0e\u4e1a\u52a1\u7ec4\u4ef6\u6807\u51c6\u5316\uff0c\u652f\u6491\u591a\u6761\u4ea7\u54c1\u7ebf\u5e76\u884c\u8fed\u4ee3\n\u901a\u8fc7\u7528\u6237\u8bbf\u8c08\u4e0e\u57cb\u70b9\u5206\u6790\uff0c\u6301\u7eed\u4f18\u5316\u65b0\u624b\u8def\u5f84\u548c\u5173\u952e\u7559\u5b58\u8282\u70b9",
  projects:
    "AI Copilot \u5de5\u4f5c\u53f0 | \u4ea7\u54c1\u8d1f\u8d23\u4eba\n\u9762\u5411\u77e5\u8bc6\u5de5\u4f5c\u8005\u6253\u9020\u4efb\u52a1\u534f\u540c\u4e0e\u5185\u5bb9\u751f\u6210\u4e00\u4f53\u5316\u4f53\u9a8c\n\u8bbe\u8ba1\u591a\u6a21\u578b\u5207\u6362\u3001\u77e5\u8bc6\u6ce8\u5165\u4e0e\u7ed3\u6784\u5316\u8f93\u51fa\u6d41\u7a0b\uff0c\u63d0\u5347\u4f7f\u7528\u6df1\u5ea6\n\n\u589e\u957f\u9a7e\u9a76\u8231 | \u4f53\u9a8c\u7b56\u7565\u8d1f\u8d23\u4eba\n\u4e3a\u7ba1\u7406\u5c42\u6784\u5efa\u4ece\u7ecf\u8425\u6307\u6807\u5230\u884c\u52a8\u5efa\u8bae\u7684\u53d9\u4e8b\u5f0f\u770b\u677f\n\u901a\u8fc7\u4fe1\u606f\u5206\u5c42\u4e0e\u89c6\u89c9\u4f18\u5148\u7ea7\u91cd\u6784\uff0c\u8ba9\u590d\u6742\u6307\u6807\u66f4\u6613\u7406\u89e3\u4e0e\u51b3\u7b56",
  education:
    "\u540c\u6d4e\u5927\u5b66 | \u5de5\u4e1a\u8bbe\u8ba1 | \u7855\u58eb | 2017 - 2020\n\u6c5f\u5357\u5927\u5b66 | \u89c6\u89c9\u4f20\u8fbe\u8bbe\u8ba1 | \u5b66\u58eb | 2013 - 2017",
  theme: "dimension",
  density: "balanced",
  photo: true,
  metrics: true,
  accent: true,
};

const fields = {
  name: document.getElementById("nameInput"),
  role: document.getElementById("roleInput"),
  location: document.getElementById("locationInput"),
  email: document.getElementById("emailInput"),
  phone: document.getElementById("phoneInput"),
  website: document.getElementById("websiteInput"),
  summary: document.getElementById("summaryInput"),
  highlights: document.getElementById("highlightsInput"),
  skills: document.getElementById("skillsInput"),
  experience: document.getElementById("experienceInput"),
  projects: document.getElementById("projectsInput"),
  education: document.getElementById("educationInput"),
  theme: document.getElementById("themeSelect"),
  density: document.getElementById("densitySelect"),
  photo: document.getElementById("photoToggle"),
  metrics: document.getElementById("metricsToggle"),
  accent: document.getElementById("accentToggle"),
};

const preview = {
  card: document.getElementById("resumeCard"),
  eyebrow: document.getElementById("previewEyebrow"),
  name: document.getElementById("previewName"),
  role: document.getElementById("previewRole"),
  summary: document.getElementById("previewSummary"),
  photo: document.getElementById("previewPhoto"),
  location: document.getElementById("previewLocation"),
  email: document.getElementById("previewEmail"),
  phone: document.getElementById("previewPhone"),
  website: document.getElementById("previewWebsite"),
  highlights: document.getElementById("previewHighlights"),
  skills: document.getElementById("previewSkills"),
  experience: document.getElementById("previewExperience"),
  projects: document.getElementById("previewProjects"),
  education: document.getElementById("previewEducation"),
  metricRole: document.getElementById("metricRole"),
  metricStrength: document.getElementById("metricStrength"),
  themeBadge: document.getElementById("themeBadge"),
};

const buttons = {
  loadSample: document.getElementById("loadSampleBtn"),
  jumpBuilder: document.getElementById("jumpBuilderBtn"),
  saveVersion: document.getElementById("saveVersionBtn"),
  clearHistory: document.getElementById("clearHistoryBtn"),
  copySummary: document.getElementById("copySummaryBtn"),
  exportMarkdown: document.getElementById("exportMarkdownBtn"),
  exportMarkdownTop: document.getElementById("exportMarkdownBtnTop"),
};

const statusMessage = document.getElementById("statusMessage");
const historyList = document.getElementById("historyList");

function setStatus(message) {
  statusMessage.textContent = message;
}

function lines(text) {
  return text.split("\n").map((item) => item.trim()).filter(Boolean);
}

function blocks(text) {
  const trimmed = text.trim();
  if (!trimmed) return [];
  return trimmed
    .split(/\n\s*\n/)
    .map((block) => block.split("\n").map((line) => line.trim()).filter(Boolean))
    .filter((block) => block.length);
}

function getInitials(name) {
  const clean = (name || "").trim();
  if (!clean) return ZH.initialsFallback;
  return [...clean].slice(0, 2).join("").toUpperCase();
}

function getFormData() {
  return {
    name: fields.name.value.trim(),
    role: fields.role.value.trim(),
    location: fields.location.value.trim(),
    email: fields.email.value.trim(),
    phone: fields.phone.value.trim(),
    website: fields.website.value.trim(),
    summary: fields.summary.value.trim(),
    highlights: fields.highlights.value,
    skills: fields.skills.value,
    experience: fields.experience.value,
    projects: fields.projects.value,
    education: fields.education.value,
    theme: fields.theme.value,
    density: fields.density.value,
    photo: fields.photo.checked,
    metrics: fields.metrics.checked,
    accent: fields.accent.checked,
  };
}

function applyFormData(data) {
  fields.name.value = data.name || "";
  fields.role.value = data.role || "";
  fields.location.value = data.location || "";
  fields.email.value = data.email || "";
  fields.phone.value = data.phone || "";
  fields.website.value = data.website || "";
  fields.summary.value = data.summary || "";
  fields.highlights.value = data.highlights || "";
  fields.skills.value = data.skills || "";
  fields.experience.value = data.experience || "";
  fields.projects.value = data.projects || "";
  fields.education.value = data.education || "";
  fields.theme.value = data.theme || "dimension";
  fields.density.value = data.density || "balanced";
  fields.photo.checked = Boolean(data.photo);
  fields.metrics.checked = Boolean(data.metrics);
  fields.accent.checked = Boolean(data.accent);
}

function renderList(container, items, className) {
  container.innerHTML = "";
  items.forEach((item) => {
    const node = document.createElement("span");
    node.className = className;
    node.textContent = item.replace(/[|｜]/g, " / ");
    container.appendChild(node);
  });
}

function renderHighlights(items) {
  preview.highlights.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    preview.highlights.appendChild(li);
  });
}

function renderTimeline(container, items, titleClass, listClass, cardClass) {
  container.innerHTML = "";
  items.forEach((block) => {
    const card = document.createElement("article");
    card.className = cardClass;
    const title = document.createElement("strong");
    title.className = titleClass;
    title.textContent = block[0];
    card.appendChild(title);

    if (block.length > 1) {
      const list = document.createElement("ul");
      list.className = listClass;
      block.slice(1).forEach((point) => {
        const li = document.createElement("li");
        li.textContent = point;
        list.appendChild(li);
      });
      card.appendChild(list);
    }

    container.appendChild(card);
  });
}

function renderEducation(items) {
  preview.education.innerHTML = "";
  items.forEach((item) => {
    const row = document.createElement("article");
    row.className = "education-item";
    const title = document.createElement("strong");
    title.className = "education-title";
    title.textContent = item;
    row.appendChild(title);
    preview.education.appendChild(row);
  });
}

function themeLabel(theme) {
  return {
    dimension: "Dimension Glass",
    pulse: "Neon Pulse",
    aurora: "Aurora Grid",
  }[theme] || "Dimension Glass";
}

function buildMarkdown(data) {
  const highlightLines = lines(data.highlights).map((item) => `- ${item}`).join("\n");
  const skillLines = lines(data.skills).map((item) => `- ${item}`).join("\n");
  const experienceBlocks = blocks(data.experience)
    .map((block) => [`### ${block[0]}`, ...block.slice(1).map((item) => `- ${item}`)].join("\n"))
    .join("\n\n");
  const projectBlocks = blocks(data.projects)
    .map((block) => [`### ${block[0]}`, ...block.slice(1).map((item) => `- ${item}`)].join("\n"))
    .join("\n\n");
  const educationLines = lines(data.education).map((item) => `- ${item}`).join("\n");

  return `# ${data.name}

## ${data.role}

- 城市：${data.location}
- 邮箱：${data.email}
- 电话：${data.phone}
- 链接：${data.website}

## 个人简介
${data.summary}

## 核心亮点
${highlightLines}

## 技能矩阵
${skillLines}

## 工作经历
${experienceBlocks}

## 项目经历
${projectBlocks}

## 教育经历
${educationLines}
`;
}

function renderPreview() {
  const data = getFormData();
  const highlightItems = lines(data.highlights);
  const skillItems = lines(data.skills);
  const experienceItems = blocks(data.experience);
  const projectItems = blocks(data.projects);
  const educationItems = lines(data.education);

  preview.eyebrow.textContent = `${data.role || ZH.fallbackEyebrow} / ${data.location || ZH.fallbackOpen}`;
  preview.name.textContent = data.name || ZH.fallbackName;
  preview.role.textContent = data.role || ZH.fallbackRole;
  preview.summary.textContent = data.summary || ZH.fallbackSummary;
  preview.photo.querySelector(".avatar-core").textContent = getInitials(data.name);
  preview.location.textContent = data.location || ZH.fallbackLocation;
  preview.email.textContent = data.email || ZH.fallbackEmail;
  preview.phone.textContent = data.phone || ZH.fallbackPhone;
  preview.website.textContent = data.website || ZH.fallbackWebsite;

  renderHighlights(highlightItems.length ? highlightItems.slice(0, 5) : [ZH.fallbackHighlight]);
  renderList(preview.skills, skillItems.length ? skillItems.slice(0, 12) : [ZH.fallbackSkill1, ZH.fallbackSkill2, ZH.fallbackSkill3], "skill-chip");
  renderTimeline(
    preview.experience,
    experienceItems.length ? experienceItems : [[ZH.fallbackExpTitle, ZH.fallbackExpBody]],
    "timeline-title",
    "timeline-points",
    "timeline-item"
  );
  renderTimeline(
    preview.projects,
    projectItems.length ? projectItems : [[ZH.fallbackProjectTitle, ZH.fallbackProjectBody]],
    "project-title",
    "project-points",
    "project-card"
  );
  renderEducation(educationItems.length ? educationItems : [ZH.fallbackEducation]);

  preview.metricRole.textContent = data.role || ZH.fallbackMetric;
  preview.metricStrength.textContent = highlightItems[0] || ZH.fallbackStrength;
  preview.themeBadge.textContent = themeLabel(data.theme);

  preview.card.className = "resume-card";
  preview.card.classList.add(`theme-${data.theme}`);
  preview.card.classList.add(`density-${data.density}`);
  preview.card.classList.toggle("photo-off", !data.photo);
  preview.card.classList.toggle("metrics-off", !data.metrics);
  preview.card.classList.toggle("accent-off", !data.accent);

  setStatus(ZH.previewReady(themeLabel(data.theme)));
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function setHistory(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function renderHistory() {
  const history = getHistory();
  historyList.innerHTML = "";

  if (!history.length) {
    const empty = document.createElement("div");
    empty.className = "history-empty";
    empty.textContent = ZH.emptyHistory;
    historyList.appendChild(empty);
    return;
  }

  history.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "history-item";

    const title = document.createElement("strong");
    title.textContent = `${item.name} / ${item.role}`;

    const meta = document.createElement("p");
    meta.textContent = `${item.themeLabel} · ${item.savedAt}`;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "pill-button secondary-button";
    button.textContent = "\u6062\u590d\u6b64\u7248\u672c";
    button.addEventListener("click", () => {
      applyFormData(item.data);
      renderPreview();
      setStatus(ZH.restored(index + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    card.append(title, meta, button);
    historyList.appendChild(card);
  });
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    setStatus(successMessage);
  } catch {
    setStatus(ZH.copyFailed);
  }
}

function downloadTextFile(content, fileName) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function saveCurrentVersion() {
  const data = getFormData();
  const history = getHistory();
  history.unshift({
    name: data.name || ZH.unnamedCandidate,
    role: data.role || ZH.unnamedRole,
    savedAt: new Date().toLocaleString("zh-CN", { hour12: false }),
    themeLabel: themeLabel(data.theme),
    data,
  });
  setHistory(history.slice(0, 8));
  renderHistory();
  setStatus(ZH.saved);
}

function exportMarkdown() {
  const data = getFormData();
  const markdown = buildMarkdown(data);
  downloadTextFile(markdown, `${data.name || ZH.defaultMdName}.md`);
  setStatus(ZH.exported);
}

Object.values(fields).forEach((element) => {
  const eventName = element.type === "checkbox" || element.tagName === "SELECT" ? "change" : "input";
  element.addEventListener(eventName, renderPreview);
});

buttons.loadSample.addEventListener("click", () => {
  applyFormData(SAMPLE_DATA);
  renderPreview();
  setStatus(ZH.sampleLoaded);
});

buttons.jumpBuilder.addEventListener("click", () => {
  document.getElementById("builder").scrollIntoView({ behavior: "smooth", block: "start" });
});

buttons.saveVersion.addEventListener("click", saveCurrentVersion);
buttons.clearHistory.addEventListener("click", () => {
  setHistory([]);
  renderHistory();
  setStatus(ZH.cleared);
});

buttons.copySummary.addEventListener("click", () => {
  const data = getFormData();
  const text = `${data.name || ZH.summaryTitle} | ${data.role || ZH.targetRole}\n${data.summary || ""}`;
  copyText(text, ZH.copied);
});

buttons.exportMarkdown.addEventListener("click", exportMarkdown);
buttons.exportMarkdownTop.addEventListener("click", exportMarkdown);

applyFormData(SAMPLE_DATA);
renderPreview();
renderHistory();
