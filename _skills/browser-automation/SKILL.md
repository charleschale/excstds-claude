---
name: browser-automation
description: "Browser automation and computer use capabilities using Puppeteer and Chrome DevTools Protocol. Use when Claude needs to interact with web pages (clicking, typing, scrolling), take screenshots of rendered HTML or web content, fill forms and click buttons programmatically, automate browser workflows, test web interfaces, render and interact with HTML content, or simulate computer use for web-based tasks. Works with local HTML files and fetched web content. For external websites, use web_fetch first to get content, then render locally."
---

# Browser Automation Skill

Enables Claude to control a headless Chrome browser for web automation, screenshots, and interaction.

## Capabilities

- **Screenshot**: Capture rendered pages (viewport or full-page)
- **Click**: Mouse clicks at coordinates or on elements by selector
- **Type**: Keyboard input with configurable delay
- **Scroll**: Scroll pages via mouse wheel events
- **Keyboard shortcuts**: Hotkeys like Ctrl+A, Ctrl+C
- **DOM inspection**: Execute JavaScript, query elements
- **Form interaction**: Fill inputs, click buttons, submit forms
- **Drag and drop**: Mouse drag operations

## Quick Start

Use programmatically in Node.js:

```javascript
const { BrowserUse } = require('./scripts/browser_use.js');
const browser = await BrowserUse.create();
await browser.loadHTML('<html><body>Hello World</body></html>');
await browser.click(100, 200);
await browser.type('Hello World');
await browser.screenshot('/output/result.png');
await browser.close();
```

## Working with External Websites

Direct internet access from Chrome is blocked. Use this workflow:

1. **Fetch content** using `web_fetch` tool to get HTML
2. **Load locally**: `await browser.loadHTML(fetchedHTML, originalUrl)`
3. **Interact**: Full mouse/keyboard control works on local content

## API Reference

See `references/api.md` for complete method documentation.

## Chrome Configuration

The skill uses specific Chrome flags for stability in container environments.

## Limitations

1. **No direct internet**: Chrome cannot access external URLs directly
2. **Browser only**: Cannot control desktop applications
3. **Headless only**: No visible display for real-time viewing

## Workarounds

| Limitation | Workaround |
|------------|-----------|
| No internet | Use web_fetch to get HTML, then loadHTML() |
| Need live data | Fetch periodically, re-render |
| Visual feedback | Generate screenshot sequences |
