# Nexitally Homepage - React 复刻版

这是一个用 React + Tailwind CSS 复刻的 Nexitally 首页。

## 🎨 设计特点

- **暗黑科技风格** - 黑色背景 (#000000) 配白色文字和蓝色点缀
- **响应式设计** - 支持桌面端和移动端
- **完整还原** - 包含导航栏、Hero区域、特性介绍、定价套餐、页脚

## 📦 安装步骤

```bash
# 1. 进入项目目录
cd nexitally-home

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问 http://localhost:3000
```

## 🛠️ 技术栈

- **React 18** - UI 框架
- **Tailwind CSS 3** - 原子化 CSS
- **Vite 5** - 构建工具
- **Lucide React** - 图标库

## 📁 项目结构

```
nexitally-home/
├── index.html          # HTML 入口
├── src/
│   ├── main.jsx        # React 挂载点
│   ├── index.css       # 全局样式
│   └── App.jsx         # 主组件
├── package.json        # 项目配置
├── vite.config.js      # Vite 配置
├── tailwind.config.js  # Tailwind 配置
└── postcss.config.js   # PostCSS 配置
```

## 🔗 原始网站

原始网站: https://nexitallysafe.com/

## 📝 功能对照

| 原始网站 | React 版本 |
|---------|-----------|
| 顶部导航栏 (Logo + 下拉菜单 + 语言选择) | ✅ 完整还原 |
| Hero 区域 (NEXITALLY 大标题) | ✅ 完整还原 |
| 5个特性卡片 | ✅ 完整还原 |
| 定价套餐展示 | ✅ 完整还原 |
| 页脚 (Logo + 链接 + 联系方式) | ✅ 完整还原 |

## ⚠️ 注意事项

1. **图片资源**: 项目中的图片链接指向原始网站的静态资源，需要联网才能加载
2. **功能交互**: 某些交互功能（如语言切换、购物车）需要后端支持
3. **图标**: 使用 Lucide React 图标库替代了原始网站的 Flaticon

## 🚀 构建生产版本

```bash
npm run build
```

构建后的文件位于 `dist/` 目录。
