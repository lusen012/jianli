# 简历工作照小程序样例

这是一个微信小程序前端样例，目录可直接导入微信开发者工具。

## 已包含

- 上传正面照
- 选择职业照风格
- 调整头像缩放和人物上移
- 本地 Canvas 生成工作照预览
- 保存到系统相册

## 目录结构

- [app.json](E:\codex\resume-headshot-miniapp\app.json)
- [pages/index/index.wxml](E:\codex\resume-headshot-miniapp\pages\index\index.wxml)
- [pages/index/index.js](E:\codex\resume-headshot-miniapp\pages\index\index.js)
- [pages/index/index.wxss](E:\codex\resume-headshot-miniapp\pages\index\index.wxss)

## 说明

当前小程序样例仍然是本地预处理与合成逻辑，适合先验证页面和交互。

如果要接真实 AI 生图接口，建议下一步：

- 在云函数或你的服务端新增生成接口
- 小程序上传图片到服务端
- 服务端调用图像模型返回结果图
- 小程序展示最终图并保存到相册
