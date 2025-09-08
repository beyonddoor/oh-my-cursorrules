# 打包说明

## 目录结构

```
cursor/
├── src/                    # 源代码目录
│   └── extension.ts
├── out/                    # 编译输出目录
│   ├── extension.js
│   └── extension.js.map
├── package/                # 打包专用目录
│   ├── package.json        # 扩展配置
│   ├── templates.json      # 模板数据
│   ├── README.md          # 扩展说明
│   ├── LICENSE            # 许可证
│   ├── out/               # 编译后的文件
│   │   ├── extension.js
│   │   └── extension.js.map
│   └── .vscodeignore      # 打包忽略文件
├── rules/                  # 规则文件（不打包）
├── templates.json          # 模板数据（源文件）
└── build-package.js       # 打包脚本
```

## 打包流程

### 方法一：使用 npm 脚本（推荐）

```bash
# 编译 + 打包
npm run package

# 或者分步执行
npm run compile          # 编译 TypeScript
npm run build:package    # 从 package 目录打包
```

### 方法二：手动打包

```bash
# 1. 编译源代码
npm run compile

# 2. 复制必要文件到 package 目录（已自动完成）
# 3. 从 package 目录打包
cd package
npx vsce package
```

## 优势

1. **清晰的分离**：开发文件和打包文件完全分离
2. **最小化包体积**：只包含运行时必需的文件
3. **易于维护**：打包配置独立，不影响开发环境
4. **自动化**：一键完成编译和打包流程

## 包含的文件

打包后的 `.vsix` 文件只包含：
- `package.json` - 扩展配置
- `templates.json` - 模板数据
- `README.md` - 扩展说明
- `LICENSE` - 许可证
- `out/extension.js` - 主程序
- `out/extension.js.map` - 源码映射

## 排除的文件

以下文件不会被打包：
- `src/` - 源代码目录
- `rules/` - 规则文件目录
- `node_modules/` - 依赖包
- `.vscode/` - 开发配置
- `tsconfig.json` - TypeScript 配置
- 其他开发相关文件
