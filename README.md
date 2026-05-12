# jianli

一个以 3D 玻璃拟态和霓虹视觉语言为核心的个人简历生成项目。

## 在线访问

- GitHub Pages 站点：`https://lusen012.github.io/jianli/`

如果刚推送完工作流，Pages 可能需要 1-3 分钟完成首次部署。

## 项目结构

- `resume-headshot-studio/`
  - 本地开发与预览使用的主项目目录
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

或直接双击：

```text
start-preview.cmd
```

本地访问地址：

```text
http://127.0.0.1:4173/
```

## 说明

仓库根目录主要承担发布与展示职责，前端主代码位于：

- [resume-headshot-studio/README.md](./resume-headshot-studio/README.md)
