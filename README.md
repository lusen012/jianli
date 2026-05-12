# jianli

一个以 3D 玻璃拟态、霓虹渐变和沉浸式信息层次为核心风格的个人简历生成项目。

## 在线预览

- GitHub Pages：<https://lusen012.github.io/jianli/>
- GitHub 仓库：<https://github.com/lusen012/jianli>

如果刚完成推送，Pages 可能需要 1 到 3 分钟完成同步。

## 项目结构

- `resume-headshot-studio/`
  - 主项目目录，包含页面、样式、交互逻辑和本地预览脚本
- `docs/`
  - GitHub Pages 发布目录
- `.github/workflows/deploy-pages.yml`
  - GitHub Pages 自动部署工作流

## 本地运行

进入项目目录：

```powershell
cd E:\codex\resume-headshot-studio
```

启动本地预览：

```powershell
powershell -ExecutionPolicy Bypass -File .\start-preview.ps1
```

或双击：

```text
start-preview.cmd
```

本地访问地址：

```text
http://127.0.0.1:4173/
```

## 相关说明

更完整的产品说明见：

- [resume-headshot-studio/README.md](./resume-headshot-studio/README.md)
