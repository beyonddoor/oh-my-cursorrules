# CursorRules Generator

一个用于生成 Cursor AI 规则文件的 VS Code 插件。

## 功能特性

- 🎯 提供多种预定义模板
- 🚀 快速生成 `.cursorrules` 文件
- 📝 支持模板预览和选择
- 🔄 自动覆盖确认
- 📂 集成到资源管理器右键菜单
- 🌐 支持网络更新模板
- 📁 模板按分类组织
- 🏷️ 支持标签搜索
- 💾 智能缓存机制

## 支持的模板

1. **Cocos Creator 游戏开发** - 适用于 Cocos Creator 游戏开发项目
2. **Web 前端开发** - 适用于 React、Vue 等前端项目
3. **Node.js 后端开发** - 适用于 Express、NestJS 等后端项目
4. **Python 数据科学** - 适用于数据分析和机器学习项目
5. **通用编程助手** - 适用于通用编程任务

## 使用方法

### 方法一：命令面板
1. 按 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (Mac) 打开命令面板
2. 输入 "生成 CursorRules 文件"
3. 选择命令并执行

### 方法二：右键菜单
1. 在资源管理器中右键点击文件夹
2. 选择 "生成 CursorRules 文件"

### 方法三：快捷键
- 可以通过 VS Code 的键盘快捷键设置自定义快捷键

### 方法四：更新模板
1. 按 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (Mac) 打开命令面板
2. 输入 "更新模板"
3. 选择命令并执行，插件会自动检查并下载最新模板

## 安装和开发

### 安装依赖
```bash
npm install
```

### 编译
```bash
npm run compile
```

### 打包
```bash
npm run vscode:prepublish
```

### 调试
1. 按 `F5` 启动调试
2. 在新窗口中测试插件功能

## 模板系统

### 模板配置
模板配置存储在 `templates.json` 文件中，支持以下字段：
- `version`: 模板版本号
- `lastUpdated`: 最后更新时间
- `templates`: 模板数组

### 模板结构
每个模板包含以下字段：
```json
{
    "id": "template-id",
    "name": "模板名称",
    "description": "模板描述",
    "category": "分类名称",
    "tags": ["标签1", "标签2"],
    "content": "模板内容"
}
```

### 网络更新
插件支持从网络自动更新模板：
- 默认从 GitHub 仓库获取最新模板
- 支持版本检查和增量更新
- 自动缓存到本地，离线时使用缓存

### 自定义模板
你可以：
1. 修改 `templates.json` 文件添加自定义模板
2. 设置自己的模板服务器URL
3. 通过插件更新功能获取最新模板

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个插件！

## 许可证

MIT License
