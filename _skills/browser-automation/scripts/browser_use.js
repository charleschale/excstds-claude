#!/usr/bin/env node
/**
 * Browser Automation - Computer Use Implementation
 * 
 * Provides Puppeteer-based browser control for headless Chrome automation.
 * Use with web_fetch content for external websites.
 */

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/home/claude/.cache/puppeteer/chrome/linux-131.0.6778.204/chrome-linux64/chrome';

class BrowserUse {
    constructor(browser, page, viewport) {
        this.browser = browser;
        this.page = page;
        this.viewport = viewport;
    }
    
    /**
     * Create a new browser instance
     * @param {Object} options - {viewport: {width, height}}
     */
    static async create(options = {}) {
        const viewport = options.viewport || { width: 1280, height: 720 };
        
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: CHROME_PATH,
            args: [
                '--no-sandbox',
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-software-rasterizer',
                '--single-process',
            ],
            defaultViewport: viewport
        });
        
        const page = await browser.newPage();
        return new BrowserUse(browser, page, viewport);
    }
    
    // === Content Loading ===
    
    /** Load HTML string, optionally with base URL for relative links */
    async loadHTML(html, baseUrl = 'https://localhost') {
        let processed = html;
        if (!html.includes('<base') && baseUrl) {
            processed = html.replace(/<head>/i, `<head><base href="${baseUrl}">`);
        }
        const tempFile = `/tmp/browser_use_${Date.now()}.html`;
        fs.writeFileSync(tempFile, processed);
        await this.page.goto(`file://${tempFile}`, { waitUntil: 'networkidle0' });
        return tempFile;
    }
    
    /** Load local file */
    async loadFile(filePath) {
        await this.page.goto(`file://${path.resolve(filePath)}`, { waitUntil: 'networkidle0' });
    }
    
    /** Navigate to URL (works for file:// and data: URLs) */
    async goto(url) {
        await this.page.goto(url, { waitUntil: 'networkidle0' });
    }
    
    // === Screenshots ===
    
    async screenshot(outputPath, fullPage = false) {
        await this.page.screenshot({ path: outputPath, fullPage });
        return outputPath;
    }
    
    // === Mouse Actions ===
    
    async click(x, y) {
        await this.page.mouse.click(x, y);
    }
    
    async doubleClick(x, y) {
        await this.page.mouse.click(x, y, { clickCount: 2 });
    }
    
    async rightClick(x, y) {
        await this.page.mouse.click(x, y, { button: 'right' });
    }
    
    async move(x, y) {
        await this.page.mouse.move(x, y);
    }
    
    async drag(startX, startY, endX, endY, steps = 10) {
        await this.page.mouse.move(startX, startY);
        await this.page.mouse.down();
        for (let i = 1; i <= steps; i++) {
            await this.page.mouse.move(
                startX + (endX - startX) * (i / steps),
                startY + (endY - startY) * (i / steps)
            );
        }
        await this.page.mouse.up();
    }
    
    async scroll(deltaX, deltaY) {
        await this.page.mouse.wheel({ deltaX, deltaY });
    }
    
    // === Keyboard Actions ===
    
    async type(text, options = { delay: 30 }) {
        await this.page.keyboard.type(text, options);
    }
    
    async key(keyName) {
        await this.page.keyboard.press(keyName);
    }
    
    async hotkey(...keys) {
        for (const k of keys.slice(0, -1)) await this.page.keyboard.down(k);
        await this.page.keyboard.press(keys[keys.length - 1]);
        for (const k of keys.slice(0, -1).reverse()) await this.page.keyboard.up(k);
    }
    
    // === Element Interaction ===
    
    async getElementBounds(selector) {
        return this.page.evaluate((sel) => {
            const el = document.querySelector(sel);
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return { x: rect.x + rect.width/2, y: rect.y + rect.height/2, width: rect.width, height: rect.height };
        }, selector);
    }
    
    async clickElement(selector) {
        const bounds = await this.getElementBounds(selector);
        if (bounds) { await this.click(bounds.x, bounds.y); return true; }
        return false;
    }
    
    async typeInElement(selector, text, options) {
        if (await this.clickElement(selector)) {
            await this.type(text, options);
            return true;
        }
        return false;
    }
    
    // === DOM Inspection ===
    
    async evaluate(expression) {
        return this.page.evaluate(expression);
    }
    
    async getText(selector) {
        return this.page.evaluate((sel) => document.querySelector(sel)?.textContent, selector);
    }
    
    async getValue(selector) {
        return this.page.evaluate((sel) => document.querySelector(sel)?.value, selector);
    }
    
    async getHTML(selector = 'body') {
        return this.page.evaluate((sel) => document.querySelector(sel)?.innerHTML, selector);
    }
    
    async waitForSelector(selector, timeout = 5000) {
        await this.page.waitForSelector(selector, { timeout });
    }
    
    // === Utilities ===
    
    async wait(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
    
    async title() {
        return this.page.title();
    }
    
    async close() {
        await this.browser.close();
    }
}

// CLI interface
async function main() {
    const args = process.argv.slice(2);
    const action = args[args.indexOf('--action') + 1];
    const url = args[args.indexOf('--url') + 1];
    const output = args[args.indexOf('--output') + 1];
    
    if (!action) {
        console.log('Usage: browser_use.js --action <action> [options]');
        console.log('Actions: screenshot, title');
        console.log('Options: --url <url> --output <file>');
        return;
    }
    
    const browser = await BrowserUse.create();
    
    if (url) await browser.goto(url);
    
    switch (action) {
        case 'screenshot':
            await browser.screenshot(output || '/tmp/screenshot.png');
            console.log(`Screenshot saved to ${output || '/tmp/screenshot.png'}`);
            break;
        case 'title':
            console.log(await browser.title());
            break;
    }
    
    await browser.close();
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { BrowserUse };
