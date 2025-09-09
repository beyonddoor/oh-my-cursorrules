# Oh My CursorRules

Oh My CursorRules 是一个强大的 VS Code 插件，用于快速生成和管理 Cursor AI 的规则文件。通过预定义的模板，您可以轻松创建适用于不同开发场景的 `.cursorrules` 文件。

## ✨ 主要特性

- 🎯 丰富的预定义模板库
- 🚀 一键生成 `.cursorrules` 文件
- 📝 模板实时预览
- 🔄 智能更新机制
- 📂 右键菜单快速访问
- 🌐 在线模板更新
- 📁 分类管理模板
- 🏷️ 标签化搜索
- 💾 本地缓存支持

## 📦 支持的项目类型

- **移动应用开发**
  - Android 应用
  - iOS 应用
  - Flutter 跨平台
  - React Native
  - 微信小程序

- **Web 开发**
  - React
  - Vue
  - Next.js
  - HTML/CSS/JavaScript

- **游戏开发**
  - Cocos Creator

- **服务端开发**
  - C++
  - Python

## 🚀 快速开始

### 安装插件

1. 在 VS Code 中打开扩展市场
2. 搜索 "Oh My CursorRules"
3. 点击安装
4. 重启 VS Code

### 使用方法

#### 方法一：命令面板
1. 按下 `Ctrl+Shift+P`（Windows/Linux）或 `Cmd+Shift+P`（Mac）
2. 输入 "生成 CursorRules 文件"
3. 选择并执行命令

#### 方法二：右键菜单
1. 在 VS Code 资源管理器中右键点击目标文件夹
2. 选择 "生成 CursorRules 文件"
3. 选择适合您项目的模板

#### 方法三：更新模板
1. 使用命令面板（`Ctrl+Shift+P` 或 `Cmd+Shift+P`）
2. 输入 "更新 CursorRules"
3. 执行命令以获取最新模板

## 📝 模板系统

### 可用模板

插件提供多种预定义模板：

1. **移动端模板**
   - `app-android.cursorrules`: Android 应用开发
   - `app-ios.cursorrules`: iOS 应用开发
   - `app-flutter.cursorrules`: Flutter 跨平台开发
   - `app-RN.cursorrules`: React Native 开发
   - `app-weixin.cursorrules`: 微信小程序开发

2. **Web 开发模板**
   - `web-react.cursorrules`: React 开发
   - `web-vue.cursorrules`: Vue.js 开发
   - `web-nextjs.cursorrules`: Next.js 开发
   - `web-html.cursorrules`: 传统 Web 开发

3. **游戏开发模板**
   - `game-cocos.cursorrules`: Cocos Creator 游戏开发

4. **服务端开发模板**
   - `server-c++.cursorrules`: C++ 服务端开发
   - `app-python.cursorrules`: Python 开发

5. **通用模板**
   - `generic.cursorrules`: 通用开发辅助

### 自定义模板

您可以通过以下方式自定义模板：

1. 修改 `templates.json` 文件
2. 设置自定义模板服务器
3. 通过插件的更新功能获取在线模板

## 🔧 配置说明

模板配置存储在 `templates.json` 文件中，包含以下字段：

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

## 🤝 贡献指南

欢迎为项目做出贡献！您可以：

1. 提交 Issue 报告问题
2. 提交 Pull Request 改进代码
3. 分享您的自定义模板

## 📄 许可证

本项目采用 MIT 许可证。详情请参见 [LICENSE](LICENSE) 文件。

## 🔗 相关链接

- [GitHub 仓库](https://github.com/beyonddoor/oh-my-cursorrules)
- [问题反馈](https://github.com/beyonddoor/oh-my-cursorrules/issues)
- [更新日志](CHANGELOG.md)

## 💡 常见问题

**Q: 如何更新模板？**
A: 使用命令面板执行"更新 CursorRules"命令即可获取最新模板。

**Q: 支持离线使用吗？**
A: 是的，插件会自动缓存模板到本地，支持离线使用。

**Q: 如何添加自定义模板？**
A: 您可以直接修改 `templates.json` 文件添加自定义模板，或设置自己的模板服务器。
