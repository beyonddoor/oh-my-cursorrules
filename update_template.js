/**
 * 
 * 根据index.json和cursorrules文件，生成templates.json
 * 
 */

const fs = require('fs');
const path = require('path');

// 获取当前脚本所在目录
const currentDir = path.join(__dirname, 'rules');

// 读取index.json文件
function readIndexJson() {
    const indexPath = path.join(currentDir, 'index.json');
    try {
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        return JSON.parse(indexContent);
    } catch (error) {
        console.error('读取index.json失败:', error.message);
        process.exit(1);
    }
}

// 读取cursorrules文件内容
function readCursorrulesFile(filePath) {
    const fullPath = path.join(currentDir, filePath);
    try {
        return fs.readFileSync(fullPath, 'utf8');
    } catch (error) {
        console.error(`读取${filePath}失败:`, error.message);
        return '';
    }
}

// 生成templates.json
function generateTemplatesJson() {
    console.log('开始生成templates.json...');
    
    // 读取index.json
    const indexData = readIndexJson();
    console.log(`找到${indexData.length}个规则文件`);
    
    // 生成模板数据
    const templates = indexData.map(rule => {
        console.log(`处理规则: ${rule.name}`);
        
        // 读取对应的cursorrules文件内容
        const content = readCursorrulesFile(rule.path);
        
        return {
            id: rule.name,
            name: rule.name,
            description: rule.description,
            category: rule.category,
            tags: rule.tags,
            content: content
        };
    });
    
    // 生成完整的templates.json结构
    const templatesJson = {
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
        templates: templates
    };
    
    // 写入templates.json文件
    const outputPath = path.join(currentDir, '..', 'templates.json');
    try {
        fs.writeFileSync(outputPath, JSON.stringify(templatesJson, null, 2), 'utf8');
        console.log(`成功生成templates.json，包含${templates.length}个模板`);
        console.log(`输出路径: ${outputPath}`);
    } catch (error) {
        console.error('写入templates.json失败:', error.message);
        process.exit(1);
    }
}

// 主函数
function main() {
    try {
        generateTemplatesJson();
        console.log('✅ 任务完成！');
    } catch (error) {
        console.error('❌ 执行失败:', error.message);
        process.exit(1);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main();
}

module.exports = {
    readIndexJson,
    readCursorrulesFile,
    generateTemplatesJson
};