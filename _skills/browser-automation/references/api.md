# Browser Automation API Reference

## BrowserUse Class

### Static Methods

#### `BrowserUse.create(options?)`
Creates new browser instance.
- `options.viewport`: `{width, height}` - Default: 1280x720
- Returns: `Promise<BrowserUse>`

### Content Loading

#### `loadHTML(html, baseUrl?)`
Load HTML string with optional base URL for relative links.

#### `loadFile(filePath)`
Load local HTML file.

#### `goto(url)`
Navigate to URL (file:// or data: URLs only).

### Screenshots

#### `screenshot(outputPath, fullPage?)`
Capture screenshot. `fullPage: true` for entire page.

### Mouse Actions

| Method | Parameters | Description |
|--------|------------|-------------|
| `click(x, y)` | coordinates | Left click |
| `doubleClick(x, y)` | coordinates | Double click |
| `rightClick(x, y)` | coordinates | Context menu click |
| `move(x, y)` | coordinates | Move cursor |
| `drag(x1, y1, x2, y2, steps?)` | start, end, steps | Drag operation |
| `scroll(deltaX, deltaY)` | scroll amounts | Mouse wheel |

### Keyboard Actions

| Method | Parameters | Description |
|--------|------------|-------------|
| `type(text, options?)` | text, {delay} | Type characters |
| `key(keyName)` | key name | Press single key |
| `hotkey(...keys)` | key sequence | Keyboard shortcut |

### Element Interaction

| Method | Parameters | Returns |
|--------|------------|---------|
| `clickElement(selector)` | CSS selector | boolean |
| `typeInElement(selector, text)` | selector, text | boolean |
| `getElementBounds(selector)` | CSS selector | {x, y, width, height} |

### DOM Inspection

| Method | Parameters | Returns |
|--------|------------|---------|
| `evaluate(expression)` | JS code | any |
| `getText(selector)` | CSS selector | string |
| `getValue(selector)` | CSS selector | string |
| `getHTML(selector?)` | CSS selector | string |
| `title()` | none | string |

### Utilities

| Method | Parameters | Description |
|--------|------------|-------------|
| `wait(ms)` | milliseconds | Sleep |
| `waitForSelector(selector, timeout?)` | CSS, ms | Wait for element |
| `close()` | none | Terminate browser |

## Key Names for `key()` and `hotkey()`

Common keys: Enter, Tab, Escape, Backspace, Delete, Space, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Home, End, PageUp, PageDown

Modifiers: Control, Shift, Alt, Meta
