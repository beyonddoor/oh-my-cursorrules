#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 开始构建 VS Code 扩展包...\n');

// 1. 确保 package 目录存在
const packageDir = path.join(__dirname, 'package');
if (!fs.existsSync(packageDir)) {
    console.log('❌ package 目录不存在，请先运行构建脚本');
    process.exit(1);
}

// 2. 同步最新文件到 package 目录
console.log('📋 同步文件到 package 目录...');

// 复制必要文件
const filesToSync = [
    'package.json',
    'templates.json', 
    'README.md',
    'LICENSE'
];

for (const file of filesToSync) {
    const srcPath = path.join(__dirname, file);
    const destPath = path.join(packageDir, file);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ 同步 ${file}`);
    } else {
        console.log(`❌ 源文件不存在: ${file}`);
        process.exit(1);
    }
}

// 同步编译后的文件
const outDir = path.join(packageDir, 'out');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const compiledFiles = ['extension.js', 'extension.js.map'];
for (const file of compiledFiles) {
    const srcPath = path.join(__dirname, 'out', file);
    const destPath = path.join(outDir, file);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ 同步 out/${file}`);
    } else {
        console.log(`❌ 编译文件不存在: out/${file}`);
        process.exit(1);
    }
}

// 3. 从 package 目录打包
console.log('\n📦 开始打包...');
try {
    // 切换到 package 目录并执行打包
    process.chdir(packageDir);
    execSync('npx vsce package', { stdio: 'inherit' });
    
    console.log('\n✅ 打包完成！');
    console.log('📁 扩展包已生成在 package 目录中');
    
} catch (error) {
    console.error('\n❌ 打包失败:', error.message);
    process.exit(1);
}
