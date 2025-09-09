import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';

// 模板定义
interface CursorRulesTemplate {
    id: string;
    name: string;
    description: string;
    category?: string;
    tags?: string[];
    content: string;
}

// 模板配置定义
interface TemplatesConfig {
    version: string;
    lastUpdated: string;
    templates: CursorRulesTemplate[];
}

// 扩展的QuickPickItem接口
interface TemplateQuickPickItem extends vscode.QuickPickItem {
    template?: CursorRulesTemplate;
}

// 配置常量
const CONFIG = {
    TEMPLATES_URL: 'http://8.141.118.63/static/oh-my-cursorrules/templates.json',
    LOCAL_TEMPLATES_FILE: 'templates.json',
    CACHE_KEY: 'cursorrules-templates-cache'
};

// 全局变量存储模板
let templates: CursorRulesTemplate[] = [];
let templatesConfig: TemplatesConfig | null = null;

// 从本地文件加载模板
async function loadTemplatesFromFile(): Promise<TemplatesConfig | null> {
    try {
        const extensionPath = vscode.extensions.getExtension('iseekfun.oh-my-cursorrules')?.extensionPath;
        if (!extensionPath) {
            return null;
        }
        
        const templatesPath = path.join(extensionPath, CONFIG.LOCAL_TEMPLATES_FILE);
        if (fs.existsSync(templatesPath)) {
            const content = fs.readFileSync(templatesPath, 'utf8');
            return JSON.parse(content) as TemplatesConfig;
        }
    } catch (error) {
        console.error('加载本地模板文件失败:', error);
    }
    return null;
}

// 从网络下载模板
async function downloadTemplatesFromNetwork(): Promise<TemplatesConfig | null> {
    return new Promise((resolve) => {
        const url = new URL(CONFIG.TEMPLATES_URL);
        const options = {
            hostname: url.hostname,
            port: url.port || (url.protocol === 'https:' ? 443 : 80),
            path: url.pathname + url.search,
            method: 'GET',
            headers: {
                'User-Agent': 'Oh-My-CursorRules-Extension/1.0.0'
            }
        };

        const client = url.protocol === 'https:' ? https : http;
        
        const req = client.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const config = JSON.parse(data) as TemplatesConfig;
                    resolve(config);
                } catch (error) {
                    console.error('解析网络模板数据失败:', error);
                    resolve(null);
                }
            });
        });
        
        req.on('error', (error) => {
            console.error('下载模板失败:', error);
            resolve(null);
        });
        
        req.setTimeout(10000, () => {
            req.destroy();
            resolve(null);
        });
        
        req.end();
    });
}

// 初始化模板
async function initializeTemplates(context: vscode.ExtensionContext): Promise<void> {
    // 首先尝试从缓存加载
    const cachedConfig = context.globalState.get<TemplatesConfig>(CONFIG.CACHE_KEY);
    if (cachedConfig) {
        templatesConfig = cachedConfig;
        templates = cachedConfig.templates;
        console.log('从缓存加载模板成功');
        return;
    }
    
    // 尝试从本地文件加载
    const localConfig = await loadTemplatesFromFile();
    if (localConfig) {
        templatesConfig = localConfig;
        templates = localConfig.templates;
        // 缓存到全局状态
        context.globalState.update(CONFIG.CACHE_KEY, localConfig);
        console.log('从本地文件加载模板成功');
        return;
    }
    
    // 最后尝试从网络下载
    const networkConfig = await downloadTemplatesFromNetwork();
    if (networkConfig) {
        templatesConfig = networkConfig;
        templates = networkConfig.templates;
        // 缓存到全局状态
        context.globalState.update(CONFIG.CACHE_KEY, networkConfig);
        console.log('从网络下载模板成功');
        return;
    }
    
    console.error('无法加载任何模板');
}

// 更新模板
async function updateTemplates(context: vscode.ExtensionContext): Promise<boolean> {
    const networkConfig = await downloadTemplatesFromNetwork();
    if (networkConfig) {
        // 检查版本是否有更新
        const currentConfig = context.globalState.get<TemplatesConfig>(CONFIG.CACHE_KEY);
        if (!currentConfig || networkConfig.version !== currentConfig.version) {
            templatesConfig = networkConfig;
            templates = networkConfig.templates;
            context.globalState.update(CONFIG.CACHE_KEY, networkConfig);
            console.log('模板更新成功');
            return true;
        } else {
            console.log('模板已是最新版本');
            return false;
        }
    }
    return false;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('CursorRules Generator 插件已激活');

    // 初始化模板
    initializeTemplates(context);

    // 注册生成命令
    const generateDisposable = vscode.commands.registerCommand('oh-my-cursorrules.generate', async () => {
        await generateCursorRules();
    });

    // 注册更新命令
    const updateDisposable = vscode.commands.registerCommand('oh-my-cursorrules.update', async () => {
        await updateTemplatesFromNetwork(context);
    });

    context.subscriptions.push(generateDisposable, updateDisposable);
}

async function generateCursorRules() {
    try {
        // 显示模板选择菜单
        const selectedTemplate = await showTemplateSelection();
        if (!selectedTemplate) {
            return; // 用户取消了选择
        }

        // 获取当前工作区路径
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('请先打开一个工作区');
            return;
        }

        // 生成文件路径
        const filePath = path.join(workspaceFolder.uri.fsPath, '.cursorrules');

        // 检查文件是否已存在
        if (fs.existsSync(filePath)) {
            const overwrite = await vscode.window.showWarningMessage(
                '.cursorrules 文件已存在，是否要覆盖？',
                '覆盖',
                '取消'
            );
            if (overwrite !== '覆盖') {
                return;
            }
        }

        // 写入文件
        fs.writeFileSync(filePath, selectedTemplate.content, 'utf8');

        // 显示成功消息
        vscode.window.showInformationMessage(
            `已成功生成 .cursorrules 文件，使用模板：${selectedTemplate.name}`
        );

        // 打开生成的文件
        const document = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(document);

    } catch (error) {
        console.error('生成 CursorRules 文件时出错:', error);
        vscode.window.showErrorMessage(`生成文件时出错: ${error}`);
    }
}

// 更新模板的网络函数
async function updateTemplatesFromNetwork(context: vscode.ExtensionContext): Promise<void> {
    try {
        vscode.window.showInformationMessage('正在检查模板更新...');
        
        const hasUpdate = await updateTemplates(context);
        
        if (hasUpdate) {
            vscode.window.showInformationMessage(
                `模板已更新到版本 ${templatesConfig?.version}！`,
                '查看更新'
            );
        } else {
            vscode.window.showInformationMessage('模板已是最新版本');
        }
    } catch (error) {
        console.error('更新模板失败:', error);
        vscode.window.showErrorMessage(`更新模板失败: ${error}`);
    }
}

async function showTemplateSelection(): Promise<CursorRulesTemplate | undefined> {
    if (templates.length === 0) {
        vscode.window.showErrorMessage('没有可用的模板，请检查网络连接或联系开发者');
        return undefined;
    }

    // 按分类分组模板
    const categories = new Map<string, CursorRulesTemplate[]>();
    templates.forEach(template => {
        const category = template.category || '其他';
        if (!categories.has(category)) {
            categories.set(category, []);
        }
        categories.get(category)!.push(template);
    });

    // 创建快速选择项
    const items: TemplateQuickPickItem[] = [];
    
    categories.forEach((categoryTemplates, categoryName) => {
        // 添加分类标题
        items.push({
            label: `$(folder) ${categoryName}`,
            kind: vscode.QuickPickItemKind.Separator
        });
        
        // 添加该分类下的模板
        categoryTemplates.forEach(template => {
            const tags = template.tags ? template.tags.join(', ') : '';
            items.push({
                label: `$(file-text) ${template.name}`,
                description: template.description,
                detail: `ID: ${template.id}${tags ? ` | 标签: ${tags}` : ''}`,
                template: template
            });
        });
    });

    console.log(items);

    // 显示选择菜单
    const selectedItem = await vscode.window.showQuickPick(items, {
        placeHolder: '选择一个 CursorRules 模板',
        matchOnDescription: true,
        matchOnDetail: true
    });

    return selectedItem?.template;
}

export function deactivate() {
    console.log('CursorRules Generator 插件已停用');
}
