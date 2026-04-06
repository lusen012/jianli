const STYLE_MAP = {
  executiveBlue: {
    name: "商务蓝",
    summary: "适合简历、招聘平台和企业官网，背景稳重，整体更职业。",
    backgroundTop: "#eef5ff",
    backgroundBottom: "#a9bfdc",
    glow: "rgba(49, 96, 168, 0.35)",
    suit: "#223246",
    tie: "#174ea6",
    shirt: "#f5f8fd"
  },
  lightGray: {
    name: "极简灰",
    summary: "背景干净克制，适合产品、运营、设计和通用求职场景。",
    backgroundTop: "#f7f7f7",
    backgroundBottom: "#ccd2da",
    glow: "rgba(116, 126, 138, 0.25)",
    suit: "#495566",
    tie: "#7f8d9f",
    shirt: "#fbfcfe"
  },
  charcoalPro: {
    name: "深色高管",
    summary: "偏深色背景和更强层次感，适合管理岗、金融、咨询等正式场景。",
    backgroundTop: "#2d3644",
    backgroundBottom: "#0f1622",
    glow: "rgba(255, 255, 255, 0.12)",
    suit: "#121923",
    tie: "#506b96",
    shirt: "#f0f4f8"
  },
  freshOffice: {
    name: "清新白领",
    summary: "更明亮柔和，适合校招、行政、市场、人事等岗位。",
    backgroundTop: "#fcfefe",
    backgroundBottom: "#bcd9d6",
    glow: "rgba(122, 194, 186, 0.22)",
    suit: "#4d6670",
    tie: "#6fa29d",
    shirt: "#ffffff"
  }
};

Page({
  data: {
    styleKeys: Object.keys(STYLE_MAP),
    styleNames: Object.values(STYLE_MAP).map((item) => item.name),
    styleIndex: 0,
    zoomValue: 120,
    zoom: 1.2,
    liftValue: 0,
    lift: 0,
    beauty: true,
    formalWear: true,
    imagePath: "",
    generatedTempPath: "",
    statusText: "等待上传图片。",
    styleNote: "商务蓝：适合简历、招聘平台和企业官网，背景稳重，整体更职业。"
  },

  onReady() {
    this.initCanvas();
  },

  initCanvas() {
    const query = wx.createSelectorQuery().in(this);
    query.select("#resultCanvas").fields({ node: true, size: true }).exec((res) => {
      const canvasInfo = res[0];
      if (!canvasInfo) return;

      const { node, width, height } = canvasInfo;
      const dpr = wx.getWindowInfo().pixelRatio;
      node.width = width * dpr;
      node.height = height * dpr;

      this.canvas = node;
      this.ctx = node.getContext("2d");
      this.ctx.scale(dpr, dpr);
      this.canvasWidth = width;
      this.canvasHeight = height;
      this.drawBackground();
    });
  },

  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["album", "camera"],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        this.setData({
          imagePath: tempFilePath,
          generatedTempPath: "",
          statusText: "图片已加载，可以继续调整参数或直接生成。"
        });
        this.drawPreview();
      }
    });
  },

  onStyleChange(event) {
    const styleIndex = Number(event.detail.value);
    const styleKey = this.data.styleKeys[styleIndex];
    const preset = STYLE_MAP[styleKey];
    this.setData({
      styleIndex,
      styleNote: `${preset.name}：${preset.summary}`
    });
    this.drawPreview();
  },

  onZoomChange(event) {
    const zoomValue = Number(event.detail.value);
    this.setData({
      zoomValue,
      zoom: (zoomValue / 100).toFixed(2)
    });
    this.drawPreview();
  },

  onLiftChange(event) {
    const liftValue = Number(event.detail.value);
    this.setData({
      liftValue,
      lift: liftValue
    });
    this.drawPreview();
  },

  onBeautyChange(event) {
    this.setData({ beauty: event.detail.value });
    this.drawPreview();
  },

  onFormalWearChange(event) {
    this.setData({ formalWear: event.detail.value });
    this.drawPreview();
  },

  getCurrentPreset() {
    const styleKey = this.data.styleKeys[this.data.styleIndex];
    return STYLE_MAP[styleKey];
  },

  drawBackground() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const width = this.canvasWidth;
    const height = this.canvasHeight;
    const preset = this.getCurrentPreset();

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, preset.backgroundTop);
    gradient.addColorStop(1, preset.backgroundBottom);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = preset.glow;
    ctx.beginPath();
    ctx.ellipse(width * 0.2, height * 0.22, 80, 120, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(width * 0.78, height * 0.72, 100, 140, 0, 0, Math.PI * 2);
    ctx.fill();
  },

  drawFormalWear() {
    if (!this.data.formalWear || !this.ctx) return;

    const ctx = this.ctx;
    const width = this.canvasWidth;
    const height = this.canvasHeight;
    const centerX = width / 2;
    const collarTop = height * 0.62;
    const preset = this.getCurrentPreset();

    ctx.fillStyle = preset.suit;
    ctx.beginPath();
    ctx.moveTo(centerX - 120, height);
    ctx.lineTo(centerX - 80, collarTop + 40);
    ctx.lineTo(centerX - 40, collarTop);
    ctx.lineTo(centerX - 10, collarTop + 72);
    ctx.lineTo(centerX - 4, height);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX + 120, height);
    ctx.lineTo(centerX + 80, collarTop + 40);
    ctx.lineTo(centerX + 40, collarTop);
    ctx.lineTo(centerX + 10, collarTop + 72);
    ctx.lineTo(centerX + 4, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = preset.shirt;
    ctx.beginPath();
    ctx.moveTo(centerX - 38, collarTop);
    ctx.lineTo(centerX, collarTop + 82);
    ctx.lineTo(centerX + 38, collarTop);
    ctx.lineTo(centerX + 20, collarTop + 92);
    ctx.lineTo(centerX - 20, collarTop + 92);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = preset.tie;
    ctx.beginPath();
    ctx.moveTo(centerX, collarTop + 30);
    ctx.lineTo(centerX + 14, collarTop + 62);
    ctx.lineTo(centerX + 4, height);
    ctx.lineTo(centerX - 4, height);
    ctx.lineTo(centerX - 14, collarTop + 62);
    ctx.closePath();
    ctx.fill();
  },

  drawPreview() {
    if (!this.ctx) return;
    this.drawBackground();

    if (!this.data.imagePath) {
      return;
    }

    const ctx = this.ctx;
    const width = this.canvasWidth;
    const height = this.canvasHeight;
    const zoom = Number(this.data.zoom);
    const lift = Number(this.data.lift);

    const image = this.canvas.createImage();
    image.onload = () => {
      this.drawBackground();

      const scale = Math.max(width / image.width, height / image.height) * zoom;
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2 - 40 + lift;

      ctx.save();
      ctx.filter = this.data.beauty ? "brightness(1.05) contrast(1.05) saturate(1.05) blur(0.3px)" : "none";
      ctx.drawImage(image, x, y, drawWidth, drawHeight);
      ctx.restore();

      if (this.data.beauty) {
        ctx.save();
        ctx.globalAlpha = 0.14;
        ctx.fillStyle = "rgba(255, 241, 231, 0.92)";
        ctx.beginPath();
        ctx.ellipse(width / 2, height * 0.36, width * 0.19, height * 0.18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      this.drawFormalWear();
    };
    image.src = this.data.imagePath;
  },

  generateImage() {
    if (!this.data.imagePath) {
      wx.showToast({ title: "请先上传照片", icon: "none" });
      return;
    }

    this.drawPreview();

    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvas: this.canvas,
        success: (res) => {
          this.setData({
            generatedTempPath: res.tempFilePath,
            statusText: "工作照已生成，可以保存到相册。"
          });
        },
        fail: () => {
          wx.showToast({ title: "生成失败", icon: "none" });
        }
      }, this);
    }, 180);
  },

  saveImage() {
    if (!this.data.generatedTempPath) {
      wx.showToast({ title: "请先生成图片", icon: "none" });
      return;
    }

    wx.saveImageToPhotosAlbum({
      filePath: this.data.generatedTempPath,
      success: () => {
        wx.showToast({ title: "已保存到相册", icon: "success" });
      },
      fail: () => {
        wx.showToast({ title: "保存失败，请检查相册权限", icon: "none" });
      }
    });
  }
});
