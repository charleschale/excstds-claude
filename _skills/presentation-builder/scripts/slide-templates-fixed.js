/**
 * Professional Slide Templates v2 - FIXED POSITIONING
 * All elements centered with safe margins
 */

// Using Google Slides dimensions for better compatibility
const SLIDE_W = 10;
const SLIDE_H = 5.625;

// Safe margins
const MARGIN = 0.5;
const CONTENT_W = SLIDE_W - (MARGIN * 2);  // 9
const CONTENT_H = SLIDE_H - (MARGIN * 2);  // 4.625

// ============================================================
// PROFESSIONAL COLOR PALETTES
// ============================================================
const THEMES = {
  elegantSage: {
    name: 'Elegant Sage',
    bg: 'F7F4EE',
    bgAlt: 'EDE8DC',
    card: 'FFFFFF',
    cardBorder: 'D4CFC3',
    accent: '7D8E74',
    accentLight: '9AAD8F',
    accentDark: '5C6B54',
    text: '2D3129',
    textSecondary: '5A5D56',
    textMuted: '8B8D88',
  },
  cleanBlue: {
    name: 'Clean Blue',
    bg: 'F0F7FC',
    bgAlt: 'E1EEF8',
    card: 'FFFFFF',
    cardBorder: 'C5DBE9',
    accent: '2B6CB0',
    accentLight: '4299E1',
    accentDark: '1A4971',
    text: '1A202C',
    textSecondary: '4A5568',
    textMuted: '718096',
  },
  forestDark: {
    name: 'Forest Dark',
    bg: '1A2E1D',
    bgAlt: '243528',
    card: '2A3F2E',
    cardBorder: '3D5442',
    accent: 'A8C5A0',
    accentLight: 'C5DBC0',
    accentDark: '7DA576',
    text: 'F5F7F5',
    textSecondary: 'C8D4C6',
    textMuted: '8FA48D',
  },
  warmMinimal: {
    name: 'Warm Minimal',
    bg: 'FDFCFA',
    bgAlt: 'F5F2EE',
    card: 'FFFFFF',
    cardBorder: 'E8E4DD',
    accent: 'C65D3B',
    accentLight: 'E07A5F',
    accentDark: '9A462C',
    text: '2D2926',
    textSecondary: '5C554F',
    textMuted: '9A938A',
  },
  navyProfessional: {
    name: 'Navy Professional',
    bg: 'F8F9FA',
    bgAlt: 'EDF0F2',
    card: 'FFFFFF',
    cardBorder: 'D1D5DB',
    accent: '1E3A5F',
    accentLight: '2C5282',
    accentDark: '152A45',
    text: '111827',
    textSecondary: '374151',
    textMuted: '6B7280',
  },
  // Professional red theme
  crimsonBold: {
    name: 'Crimson Bold',
    bg: 'FDF8F8',
    bgAlt: 'F5EAEA',
    card: 'FFFFFF',
    cardBorder: 'E8D4D4',
    accent: 'B91C1C',
    accentLight: 'DC2626',
    accentDark: '7F1D1D',
    text: '1F1717',
    textSecondary: '4A3F3F',
    textMuted: '8B7E7E',
  },

  charcoalDark: {
    name: 'Charcoal Dark',
    bg: '18181B',
    bgAlt: '27272A',
    card: '3F3F46',
    cardBorder: '52525B',
    accent: 'E4E4E7',
    accentLight: 'FAFAFA',
    accentDark: 'A1A1AA',
    text: 'FAFAFA',
    textSecondary: 'D4D4D8',
    textMuted: '71717A',
  }
};

let activeTheme = THEMES.cleanBlue;

// ============================================================
// INITIALIZATION
// ============================================================
function initTheme(pptx, themeName = 'cleanBlue') {
  activeTheme = THEMES[themeName] || THEMES.cleanBlue;
  
  // Set slide size to Google Slides dimensions
  pptx.defineLayout({ name: 'CUSTOM', width: SLIDE_W, height: SLIDE_H });
  pptx.layout = 'CUSTOM';
  
  pptx.defineSlideMaster({
    title: 'MASTER',
    background: { color: activeTheme.bg }
  });
  
  return activeTheme;
}

function getThemeNames() {
  return Object.keys(THEMES).map(key => ({
    id: key,
    name: THEMES[key].name
  }));
}

// ============================================================
// HELPER: Truncate text
// ============================================================
function truncateText(text, maxChars) {
  if (!text || text.length <= maxChars) return text;
  return text.substring(0, maxChars - 3) + '...';
}

// ============================================================
// TEMPLATE 1: TITLE SLIDE
// Centered layout with title in middle
// ============================================================
function titleSlide(pptx, options = {}) {
  const {
    title = 'Presentation Title',
    subtitle = '',
    author = '',
    date = ''
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Bottom accent line (thin)
  slide.addShape('rect', {
    x: 0, y: SLIDE_H - 0.06, w: SLIDE_W, h: 0.06,
    fill: { color: activeTheme.accent }
  });
  
  // Main title - centered
  slide.addText(truncateText(title.toUpperCase(), 35), {
    x: MARGIN,
    y: 1.8,
    w: CONTENT_W,
    h: 0.8,
    fontSize: 32,
    bold: true,
    color: activeTheme.text,
    fontFace: 'Arial',
    align: 'center',
    valign: 'middle'
  });
  
  // Subtitle - centered below title
  if (subtitle) {
    slide.addText(truncateText(subtitle, 60), {
      x: MARGIN + 1,
      y: 2.7,
      w: CONTENT_W - 2,
      h: 0.5,
      fontSize: 14,
      color: activeTheme.accent,
      italic: true,
      fontFace: 'Georgia',
      align: 'center',
      valign: 'middle'
    });
  }
  
  // Author and date - bottom area
  const meta = [author, date].filter(Boolean).join(' • ');
  if (meta) {
    slide.addText(meta, {
      x: MARGIN,
      y: 3.5,
      w: CONTENT_W,
      h: 0.35,
      fontSize: 10,
      color: activeTheme.textMuted,
      fontFace: 'Arial',
      align: 'center'
    });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 2: SECTION DIVIDER
// Large number on left, title on right
// ============================================================
function sectionDivider(pptx, options = {}) {
  const {
    sectionNumber = '01',
    title = 'Section Title',
    subtitle = ''
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Left accent bar
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: SLIDE_H,
    fill: { color: activeTheme.accent }
  });
  
  // Section number - left side
  slide.addText(sectionNumber, {
    x: 0.4,
    y: 1.5,
    w: 1.8,
    h: 1,
    fontSize: 56,
    bold: true,
    color: activeTheme.accent,
    fontFace: 'Arial',
    valign: 'middle'
  });
  
  // Title - right of number
  slide.addText(truncateText(title.toUpperCase(), 35), {
    x: 0.4,
    y: 2.6,
    w: CONTENT_W,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: activeTheme.text,
    fontFace: 'Arial'
  });
  
  // Subtitle
  if (subtitle) {
    slide.addText(truncateText(subtitle, 70), {
      x: 0.4,
      y: 3.2,
      w: CONTENT_W - 1,
      h: 0.4,
      fontSize: 12,
      color: activeTheme.textSecondary,
      italic: true,
      fontFace: 'Georgia'
    });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 3: CONTENT CARDS (2-4 cards)
// ============================================================
function contentCards(pptx, options = {}) {
  const {
    title = 'Key Points',
    subtitle = '',
    cards = []
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN,
    y: 0.3,
    w: CONTENT_W,
    h: 0.5,
    fontSize: 18,
    bold: true,
    color: activeTheme.text,
    fontFace: 'Arial'
  });
  
  // Subtitle
  if (subtitle) {
    slide.addText(truncateText(subtitle, 80), {
      x: MARGIN,
      y: 0.8,
      w: CONTENT_W,
      h: 0.3,
      fontSize: 10,
      color: activeTheme.textSecondary,
      fontFace: 'Arial'
    });
  }
  
  // Cards - calculate positions
  const numCards = Math.min(cards.length, 3);
  const cardGap = 0.25;
  const cardW = (CONTENT_W - (cardGap * (numCards - 1))) / numCards;
  const cardH = 3.8;
  const cardY = 1.2;
  
  cards.slice(0, numCards).forEach((card, i) => {
    const x = MARGIN + i * (cardW + cardGap);
    
    // Card background
    slide.addShape('rect', {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: activeTheme.card },
      line: { color: activeTheme.cardBorder, width: 1 },
      shadow: { type: 'outer', blur: 3, offset: 1, angle: 45, color: '000000', opacity: 0.08 }
    });
    
    // Card accent bar at top
    slide.addShape('rect', {
      x, y: cardY, w: cardW, h: 0.05,
      fill: { color: activeTheme.accent }
    });
    
    // Card title
    slide.addText(truncateText(card.title || '', 25), {
      x: x + 0.2,
      y: cardY + 0.2,
      w: cardW - 0.4,
      h: 0.35,
      fontSize: 11,
      bold: true,
      color: activeTheme.accent,
      fontFace: 'Arial'
    });
    
    // Card content
    slide.addText(truncateText(card.content || '', 200), {
      x: x + 0.2,
      y: cardY + 0.6,
      w: cardW - 0.4,
      h: cardH - 0.9,
      fontSize: 9,
      color: activeTheme.textSecondary,
      fontFace: 'Arial',
      valign: 'top'
    });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 4: COMPARISON (2 columns)
// ============================================================
function comparison(pptx, options = {}) {
  const {
    title = 'Comparison',
    leftTitle = 'Option A',
    leftContent = '',
    rightTitle = 'Option B',
    rightContent = ''
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN,
    y: 0.3,
    w: CONTENT_W,
    h: 0.5,
    fontSize: 18,
    bold: true,
    color: activeTheme.text,
    fontFace: 'Arial'
  });
  
  const cardW = (CONTENT_W - 0.3) / 2;
  const cardH = 4.2;
  const cardY = 0.95;
  
  // Left card
  slide.addShape('rect', {
    x: MARGIN, y: cardY, w: cardW, h: cardH,
    fill: { color: activeTheme.card },
    line: { color: activeTheme.accent, width: 1 }
  });
  
  // Left header
  slide.addShape('rect', {
    x: MARGIN, y: cardY, w: cardW, h: 0.4,
    fill: { color: activeTheme.accent }
  });
  
  slide.addText(truncateText(leftTitle, 30), {
    x: MARGIN + 0.15,
    y: cardY + 0.08,
    w: cardW - 0.3,
    h: 0.28,
    fontSize: 11,
    bold: true,
    color: activeTheme.bg,
    fontFace: 'Arial'
  });
  
  slide.addText(truncateText(leftContent, 350), {
    x: MARGIN + 0.15,
    y: cardY + 0.55,
    w: cardW - 0.3,
    h: cardH - 0.7,
    fontSize: 9,
    color: activeTheme.textSecondary,
    fontFace: 'Arial',
    valign: 'top'
  });
  
  // Right card
  const rightX = MARGIN + cardW + 0.3;
  
  slide.addShape('rect', {
    x: rightX, y: cardY, w: cardW, h: cardH,
    fill: { color: activeTheme.card },
    line: { color: activeTheme.accentDark, width: 1 }
  });
  
  // Right header
  slide.addShape('rect', {
    x: rightX, y: cardY, w: cardW, h: 0.4,
    fill: { color: activeTheme.accentDark }
  });
  
  slide.addText(truncateText(rightTitle, 30), {
    x: rightX + 0.15,
    y: cardY + 0.08,
    w: cardW - 0.3,
    h: 0.28,
    fontSize: 11,
    bold: true,
    color: activeTheme.bg,
    fontFace: 'Arial'
  });
  
  slide.addText(truncateText(rightContent, 350), {
    x: rightX + 0.15,
    y: cardY + 0.55,
    w: cardW - 0.3,
    h: cardH - 0.7,
    fontSize: 9,
    color: activeTheme.textSecondary,
    fontFace: 'Arial',
    valign: 'top'
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 5: STATISTICS (2-4 big numbers)
// ============================================================
function statistics(pptx, options = {}) {
  const {
    title = 'Key Metrics',
    stats = []
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN,
    y: 0.3,
    w: CONTENT_W,
    h: 0.5,
    fontSize: 18,
    bold: true,
    color: activeTheme.text,
    fontFace: 'Arial'
  });
  
  const numStats = Math.min(stats.length, 4);
  const statGap = 0.3;
  const statW = (CONTENT_W - (statGap * (numStats - 1))) / numStats;
  const statH = 2.8;
  const statY = 1.5;
  
  stats.slice(0, numStats).forEach((stat, i) => {
    const x = MARGIN + i * (statW + statGap);
    
    // Stat card
    slide.addShape('rect', {
      x, y: statY, w: statW, h: statH,
      fill: { color: activeTheme.card },
      line: { color: activeTheme.cardBorder, width: 1 }
    });
    
    // Value (big number)
    slide.addText(truncateText(stat.value || '', 10), {
      x, y: statY + 0.5, w: statW, h: 0.9,
      fontSize: 28,
      bold: true,
      color: activeTheme.accent,
      fontFace: 'Arial',
      align: 'center',
      valign: 'middle'
    });
    
    // Label
    slide.addText(truncateText(stat.label || '', 20), {
      x, y: statY + 1.5, w: statW, h: 0.4,
      fontSize: 10,
      bold: true,
      color: activeTheme.text,
      fontFace: 'Arial',
      align: 'center'
    });
    
    // Change indicator
    if (stat.change) {
      slide.addText(stat.change, {
        x, y: statY + 2, w: statW, h: 0.3,
        fontSize: 9,
        color: activeTheme.textMuted,
        fontFace: 'Arial',
        align: 'center'
      });
    }
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 6: TIMELINE (horizontal)
// ============================================================
function timeline(pptx, options = {}) {
  const {
    title = 'Timeline',
    events = []
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN,
    y: 0.3,
    w: CONTENT_W,
    h: 0.5,
    fontSize: 18,
    bold: true,
    color: activeTheme.text,
    fontFace: 'Arial'
  });
  
  const numEvents = Math.min(events.length, 5);
  const lineY = 2.8;
  const eventW = CONTENT_W / numEvents;
  
  // Timeline line
  slide.addShape('rect', {
    x: MARGIN, y: lineY, w: CONTENT_W, h: 0.025,
    fill: { color: activeTheme.accent }
  });
  
  events.slice(0, numEvents).forEach((event, i) => {
    const centerX = MARGIN + (i + 0.5) * eventW;
    const isTop = i % 2 === 0;
    
    // Node circle
    slide.addShape('ellipse', {
      x: centerX - 0.15, y: lineY - 0.1, w: 0.3, h: 0.22,
      fill: { color: activeTheme.accent }
    });
    
    // Date inside node
    slide.addText(truncateText(event.date || '', 6), {
      x: centerX - 0.4, y: lineY - 0.06, w: 0.8, h: 0.16,
      fontSize: 7,
      bold: true,
      color: activeTheme.bg,
      fontFace: 'Arial',
      align: 'center'
    });
    
    // Content position
    const textY = isTop ? lineY - 1.5 : lineY + 0.35;
    
    // Event title
    slide.addText(truncateText(event.title || '', 18), {
      x: centerX - eventW/2 + 0.1,
      y: textY,
      w: eventW - 0.2,
      h: 0.35,
      fontSize: 9,
      bold: true,
      color: activeTheme.text,
      fontFace: 'Arial',
      align: 'center'
    });
    
    // Event description
    if (event.description) {
      slide.addText(truncateText(event.description, 40), {
        x: centerX - eventW/2 + 0.1,
        y: textY + 0.35,
        w: eventW - 0.2,
        h: 0.6,
        fontSize: 8,
        color: activeTheme.textSecondary,
        fontFace: 'Arial',
        align: 'center',
        valign: 'top'
      });
    }
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 7: BULLET LIST
// ============================================================
function bulletList(pptx, options = {}) {
  const {
    title = 'Key Points',
    items = []
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN,
    y: 0.3,
    w: CONTENT_W,
    h: 0.5,
    fontSize: 18,
    bold: true,
    color: activeTheme.text,
    fontFace: 'Arial'
  });
  
  const numItems = Math.min(items.length, 5);
  const itemH = 0.7;
  const startY = 1;
  
  items.slice(0, numItems).forEach((item, i) => {
    const y = startY + i * itemH;
    
    // Number circle
    slide.addShape('ellipse', {
      x: MARGIN, y: y + 0.05, w: 0.3, h: 0.3,
      fill: { color: activeTheme.accent }
    });
    
    slide.addText(String(i + 1), {
      x: MARGIN, y: y + 0.08, w: 0.3, h: 0.24,
      fontSize: 10,
      bold: true,
      color: activeTheme.bg,
      fontFace: 'Arial',
      align: 'center'
    });
    
    // Main text
    const itemText = typeof item === 'string' ? item : item.text;
    slide.addText(truncateText(itemText || '', 70), {
      x: MARGIN + 0.45,
      y: y + 0.02,
      w: CONTENT_W - 0.6,
      h: 0.3,
      fontSize: 11,
      bold: true,
      color: activeTheme.text,
      fontFace: 'Arial'
    });
    
    // Subtext
    if (item.subtext) {
      slide.addText(truncateText(item.subtext, 90), {
        x: MARGIN + 0.45,
        y: y + 0.32,
        w: CONTENT_W - 0.6,
        h: 0.3,
        fontSize: 9,
        color: activeTheme.textSecondary,
        fontFace: 'Arial'
      });
    }
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 8: QUOTE
// ============================================================
function quote(pptx, options = {}) {
  const {
    quoteText = 'Quote text here',
    author = '',
    role = ''
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Quote card
  const cardX = 0.8;
  const cardY = 1;
  const cardW = SLIDE_W - 1.6;
  const cardH = 3.6;
  
  slide.addShape('rect', {
    x: cardX, y: cardY, w: cardW, h: cardH,
    fill: { color: activeTheme.card },
    line: { color: activeTheme.cardBorder, width: 1 },
    shadow: { type: 'outer', blur: 4, offset: 2, angle: 45, color: '000000', opacity: 0.08 }
  });
  
  // Left accent bar
  slide.addShape('rect', {
    x: cardX, y: cardY, w: 0.06, h: cardH,
    fill: { color: activeTheme.accent }
  });
  
  // Large quote mark
  slide.addText('"', {
    x: cardX + 0.2, y: cardY - 0.1, w: 1, h: 1,
    fontSize: 60,
    color: activeTheme.accent,
    fontFace: 'Georgia'
  });
  
  // Quote text
  slide.addText(truncateText(quoteText, 250), {
    x: cardX + 0.4, y: cardY + 0.7, w: cardW - 0.8, h: 1.6,
    fontSize: 14,
    color: activeTheme.text,
    italic: true,
    fontFace: 'Georgia',
    valign: 'top'
  });
  
  // Divider line
  slide.addShape('rect', {
    x: cardX + 0.4, y: cardY + 2.6, w: 1.5, h: 0.015,
    fill: { color: activeTheme.accent }
  });
  
  // Author
  if (author) {
    slide.addText(truncateText(author, 35), {
      x: cardX + 0.4, y: cardY + 2.75, w: cardW - 0.8, h: 0.35,
      fontSize: 11,
      bold: true,
      color: activeTheme.accent,
      fontFace: 'Arial'
    });
  }
  
  // Role
  if (role) {
    slide.addText(truncateText(role, 50), {
      x: cardX + 0.4, y: cardY + 3.1, w: cardW - 0.8, h: 0.3,
      fontSize: 9,
      color: activeTheme.textMuted,
      fontFace: 'Arial'
    });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 9: DATA TABLE
// ============================================================
function dataTable(pptx, options = {}) {
  const {
    title = 'Data',
    headers = [],
    rows = []
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN,
    y: 0.3,
    w: CONTENT_W,
    h: 0.5,
    fontSize: 18,
    bold: true,
    color: activeTheme.text,
    fontFace: 'Arial'
  });
  
  const tableX = MARGIN;
  const tableY = 0.95;
  const tableW = CONTENT_W;
  const colW = tableW / Math.max(headers.length, 1);
  const rowH = 0.4;
  const maxRows = Math.min(rows.length, 7);
  
  // Header row
  slide.addShape('rect', {
    x: tableX, y: tableY, w: tableW, h: rowH,
    fill: { color: activeTheme.accent }
  });
  
  headers.forEach((h, i) => {
    slide.addText(truncateText(h, 15), {
      x: tableX + i * colW, y: tableY + 0.08, w: colW, h: 0.26,
      fontSize: 9,
      bold: true,
      color: activeTheme.bg,
      fontFace: 'Arial',
      align: 'center'
    });
  });
  
  // Data rows
  rows.slice(0, maxRows).forEach((row, ri) => {
    const y = tableY + (ri + 1) * rowH;
    const bgColor = ri % 2 === 0 ? activeTheme.card : activeTheme.bg;
    
    slide.addShape('rect', {
      x: tableX, y, w: tableW, h: rowH,
      fill: { color: bgColor },
      line: { color: activeTheme.cardBorder, width: 0.5 }
    });
    
    row.forEach((cell, ci) => {
      slide.addText(truncateText(String(cell), 15), {
        x: tableX + ci * colW, y: y + 0.08, w: colW, h: 0.26,
        fontSize: 8,
        color: activeTheme.textSecondary,
        fontFace: 'Arial',
        align: 'center'
      });
    });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 10: CONCLUSION
// ============================================================
function conclusion(pptx, options = {}) {
  const {
    title = 'Key Takeaways',
    takeaways = [],
    callToAction = ''
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Left accent bar
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: SLIDE_H,
    fill: { color: activeTheme.accent }
  });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 35), {
    x: 0.35,
    y: 0.3,
    w: CONTENT_W,
    h: 0.5,
    fontSize: 20,
    bold: true,
    color: activeTheme.text,
    fontFace: 'Arial'
  });
  
  const numTakeaways = Math.min(takeaways.length, 4);
  const itemH = 0.55;
  
  takeaways.slice(0, numTakeaways).forEach((t, i) => {
    const y = 1 + i * itemH;
    
    // Number circle
    slide.addShape('ellipse', {
      x: 0.35, y, w: 0.28, h: 0.28,
      fill: { color: activeTheme.accent }
    });
    
    slide.addText(String(i + 1), {
      x: 0.35, y: y + 0.02, w: 0.28, h: 0.22,
      fontSize: 9,
      bold: true,
      color: activeTheme.bg,
      fontFace: 'Arial',
      align: 'center'
    });
    
    // Takeaway text
    slide.addText(truncateText(t, 85), {
      x: 0.75, y: y - 0.02, w: CONTENT_W - 0.5, h: 0.35,
      fontSize: 10,
      color: activeTheme.textSecondary,
      fontFace: 'Arial',
      valign: 'middle'
    });
  });
  
  // Call to action box
  if (callToAction) {
    const ctaY = 1 + numTakeaways * itemH + 0.3;
    
    slide.addShape('rect', {
      x: 0.3, y: ctaY, w: CONTENT_W, h: 0.85,
      fill: { color: activeTheme.card },
      line: { color: activeTheme.accent, width: 1.5 }
    });
    
    slide.addText(truncateText(callToAction, 120), {
      x: 0.45, y: ctaY + 0.2, w: CONTENT_W - 0.3, h: 0.5,
      fontSize: 11,
      bold: true,
      color: activeTheme.accent,
      fontFace: 'Arial'
    });
  }
  
  return slide;
}

// ============================================================
// EXPORTS
// ============================================================
module.exports = {
  // New templates
  chartSlide,
  processFlow,
  statisticsDashboard,
  initTheme,
  getThemeNames,
  THEMES,
  titleSlide,
  sectionDivider,
  contentCards,
  comparison,
  statistics,
  timeline,
  bulletList,
  quote,
  dataTable,
  conclusion,
  truncateText,
  SLIDE_W,
  SLIDE_H,
  MARGIN,
  CONTENT_W,
  CONTENT_H
};

// ============================================================
// TEMPLATE 11: CHART SLIDE (with sidebar)
// ============================================================
function chartSlide(pptx, options = {}) {
  const {
    title = 'Data Visualization',
    chartTitle = '',
    chartType = 'bar',
    chartData = [],
    description = ''
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN,
    y: 0.3,
    w: CONTENT_W,
    h: 0.5,
    fontSize: 18,
    bold: true,
    color: activeTheme.text,
    fontFace: 'Arial'
  });
  
  // Chart area
  const chartX = MARGIN;
  const chartY = 0.95;
  const chartW = 6;
  const chartH = 4.2;
  
  slide.addShape('rect', {
    x: chartX, y: chartY, w: chartW, h: chartH,
    fill: { color: activeTheme.card },
    line: { color: activeTheme.cardBorder, width: 1 }
  });
  
  // Add chart if data provided
  if (chartData.length > 0) {
    const chartOpts = {
      x: chartX + 0.15, y: chartY + 0.15, w: chartW - 0.3, h: chartH - 0.3,
      chartColors: [activeTheme.accent, activeTheme.accentLight, activeTheme.accentDark],
      showLegend: true,
      legendPos: 'b'
    };
    slide.addChart(pptx.ChartType[chartType], chartData, chartOpts);
  } else {
    slide.addText('[ Chart Area ]', {
      x: chartX, y: chartY + chartH/2 - 0.3, w: chartW, h: 0.6,
      fontSize: 14, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center'
    });
  }
  
  // Description sidebar
  const sideX = MARGIN + chartW + 0.25;
  const sideW = CONTENT_W - chartW - 0.25;
  
  slide.addShape('rect', {
    x: sideX, y: chartY, w: sideW, h: chartH,
    fill: { color: activeTheme.card },
    line: { color: activeTheme.accent, width: 1 }
  });
  
  // Accent bar at top
  slide.addShape('rect', {
    x: sideX, y: chartY, w: sideW, h: 0.05,
    fill: { color: activeTheme.accent }
  });
  
  if (chartTitle) {
    slide.addText(truncateText(chartTitle, 25), {
      x: sideX + 0.15, y: chartY + 0.2, w: sideW - 0.3, h: 0.4,
      fontSize: 11, bold: true, color: activeTheme.accent, fontFace: 'Arial'
    });
  }
  
  if (description) {
    slide.addText(truncateText(description, 300), {
      x: sideX + 0.15, y: chartY + 0.7, w: sideW - 0.3, h: chartH - 0.9,
      fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top'
    });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 12: PROCESS FLOW (circles with arrows)
// ============================================================
function processFlow(pptx, options = {}) {
  const {
    title = 'Process',
    steps = []
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN,
    y: 0.3,
    w: CONTENT_W,
    h: 0.5,
    fontSize: 18,
    bold: true,
    color: activeTheme.text,
    fontFace: 'Arial'
  });
  
  const numSteps = Math.min(steps.length, 5);
  const stepW = 1.5;
  const arrowW = 0.4;
  const totalW = numSteps * stepW + (numSteps - 1) * arrowW;
  const startX = (SLIDE_W - totalW) / 2;
  const circleY = 1.5;
  
  steps.slice(0, numSteps).forEach((step, i) => {
    const x = startX + i * (stepW + arrowW);
    
    // Step circle
    slide.addShape('ellipse', {
      x: x + stepW/2 - 0.4, y: circleY, w: 0.8, h: 0.8,
      fill: { color: activeTheme.accent },
      line: { color: activeTheme.accentLight, width: 2 }
    });
    
    // Step number
    slide.addText(step.number || String(i + 1), {
      x: x + stepW/2 - 0.4, y: circleY + 0.15, w: 0.8, h: 0.5,
      fontSize: 18, bold: true, color: activeTheme.bg,
      fontFace: 'Arial', align: 'center'
    });
    
    // Arrow to next step
    if (i < numSteps - 1) {
      slide.addShape('rightArrow', {
        x: x + stepW - 0.1, y: circleY + 0.3, w: arrowW + 0.2, h: 0.2,
        fill: { color: activeTheme.accentDark }
      });
    }
    
    // Step title
    slide.addText(truncateText(step.title || '', 18), {
      x: x, y: circleY + 1, w: stepW, h: 0.35,
      fontSize: 10, bold: true, color: activeTheme.text,
      fontFace: 'Arial', align: 'center'
    });
    
    // Step description
    if (step.description) {
      slide.addText(truncateText(step.description, 60), {
        x: x, y: circleY + 1.35, w: stepW, h: 1.5,
        fontSize: 8, color: activeTheme.textSecondary,
        fontFace: 'Arial', align: 'center', valign: 'top'
      });
    }
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 13: STATISTICS DASHBOARD (improved grid)
// ============================================================
function statisticsDashboard(pptx, options = {}) {
  const {
    title = 'Key Metrics',
    stats = []
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN,
    y: 0.3,
    w: CONTENT_W,
    h: 0.5,
    fontSize: 18,
    bold: true,
    color: activeTheme.text,
    fontFace: 'Arial'
  });
  
  const numStats = Math.min(stats.length, 6);
  const cols = numStats <= 3 ? numStats : 3;
  const rows = Math.ceil(numStats / cols);
  const cardGap = 0.2;
  const cardW = (CONTENT_W - (cols - 1) * cardGap) / cols;
  const cardH = rows === 1 ? 3.5 : 1.8;
  const startY = 1;
  
  stats.slice(0, numStats).forEach((stat, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = MARGIN + col * (cardW + cardGap);
    const y = startY + row * (cardH + cardGap);
    
    // Card background
    slide.addShape('rect', {
      x, y, w: cardW, h: cardH,
      fill: { color: activeTheme.card },
      line: { color: activeTheme.accent, width: 1 }
    });
    
    // Big value
    slide.addText(truncateText(stat.value || '', 10), {
      x, y: y + (rows === 1 ? 0.6 : 0.2), w: cardW, h: rows === 1 ? 1.2 : 0.7,
      fontSize: rows === 1 ? 36 : 22, bold: true, color: activeTheme.accent,
      fontFace: 'Arial', align: 'center', valign: 'middle'
    });
    
    // Label
    slide.addText(truncateText(stat.label || '', 20), {
      x, y: y + (rows === 1 ? 2 : 1), w: cardW, h: 0.35,
      fontSize: 10, bold: true, color: activeTheme.text,
      fontFace: 'Arial', align: 'center'
    });
    
    // Change indicator
    if (stat.change) {
      const isPositive = stat.change.includes('+');
      const isNegative = stat.change.includes('-');
      // Use accent color variations for change indicators
      slide.addText(stat.change, {
        x, y: y + (rows === 1 ? 2.5 : 1.35), w: cardW, h: 0.3,
        fontSize: 9, color: activeTheme.textMuted,
        fontFace: 'Arial', align: 'center'
      });
    }
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 14: IMAGE TEXT SPLIT (50/50)
// ============================================================
function imageTextSplit(pptx, options = {}) {
  const {
    title = '',
    content = '',
    imagePath = null,
    imageOnLeft = true
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  const halfW = SLIDE_W / 2;
  const imgX = imageOnLeft ? 0 : halfW;
  const textX = imageOnLeft ? halfW : 0;
  
  // Image area (placeholder or actual image)
  if (imagePath) {
    slide.addImage({
      path: imagePath,
      x: imgX, y: 0, w: halfW, h: SLIDE_H,
      sizing: { type: 'cover', w: halfW, h: SLIDE_H }
    });
  } else {
    slide.addShape('rect', {
      x: imgX, y: 0, w: halfW, h: SLIDE_H,
      fill: { color: activeTheme.bgAlt }
    });
    slide.addText('[ Image ]', {
      x: imgX, y: SLIDE_H/2 - 0.3, w: halfW, h: 0.6,
      fontSize: 16, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center'
    });
  }
  
  // Text area
  slide.addShape('rect', {
    x: textX, y: 0, w: halfW, h: SLIDE_H,
    fill: { color: activeTheme.card }
  });
  
  // Title
  if (title) {
    slide.addText(truncateText(title.toUpperCase(), 30), {
      x: textX + 0.4, y: 1.5, w: halfW - 0.8, h: 0.6,
      fontSize: 20, bold: true, color: activeTheme.text, fontFace: 'Arial'
    });
  }
  
  // Accent line
  slide.addShape('rect', {
    x: textX + 0.4, y: 2.2, w: 1, h: 0.04,
    fill: { color: activeTheme.accent }
  });
  
  // Content
  if (content) {
    slide.addText(truncateText(content, 400), {
      x: textX + 0.4, y: 2.5, w: halfW - 0.8, h: 2.5,
      fontSize: 11, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top'
    });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 15: FULL BLEED IMAGE WITH OVERLAY
// ============================================================
function fullBleedImage(pptx, options = {}) {
  const {
    title = 'Title',
    subtitle = '',
    imagePath = null,
    overlayOpacity = 0.5,
    textPosition = 'center' // 'center', 'bottomLeft', 'bottomRight'
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Image or placeholder
  if (imagePath) {
    slide.addImage({
      path: imagePath,
      x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
      sizing: { type: 'cover', w: SLIDE_W, h: SLIDE_H }
    });
  } else {
    slide.addShape('rect', {
      x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
      fill: { color: activeTheme.bgAlt }
    });
  }
  
  // Dark overlay
  slide.addShape('rect', {
    x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
    fill: { color: '000000', transparency: (1 - overlayOpacity) * 100 }
  });
  
  // Text positioning
  let textX, textY, textW, textAlign;
  if (textPosition === 'bottomLeft') {
    textX = 0.5; textY = 3.5; textW = 6; textAlign = 'left';
  } else if (textPosition === 'bottomRight') {
    textX = 3.5; textY = 3.5; textW = 6; textAlign = 'right';
  } else {
    textX = 1; textY = 2; textW = SLIDE_W - 2; textAlign = 'center';
  }
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 35), {
    x: textX, y: textY, w: textW, h: 0.8,
    fontSize: 28, bold: true, color: 'FFFFFF', fontFace: 'Arial', align: textAlign
  });
  
  // Subtitle
  if (subtitle) {
    slide.addText(truncateText(subtitle, 80), {
      x: textX, y: textY + 0.9, w: textW, h: 0.5,
      fontSize: 14, color: 'EEEEEE', fontFace: 'Georgia', italic: true, align: textAlign
    });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 16: IMAGE GALLERY (2-4 images)
// ============================================================
function imageGallery(pptx, options = {}) {
  const {
    title = 'Gallery',
    images = [] // Array of {path, caption}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.3, w: CONTENT_W, h: 0.5,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const numImages = Math.min(images.length || 4, 4);
  const cols = numImages <= 2 ? numImages : 2;
  const rows = Math.ceil(numImages / cols);
  const gap = 0.2;
  const imgW = (CONTENT_W - gap) / cols;
  const imgH = rows === 1 ? 4.3 : 2;
  const startY = 0.95;
  
  for (let i = 0; i < numImages; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = MARGIN + col * (imgW + gap);
    const y = startY + row * (imgH + 0.5);
    const img = images[i] || {};
    
    // Image placeholder or actual
    if (img.path) {
      slide.addImage({
        path: img.path,
        x, y, w: imgW, h: imgH,
        sizing: { type: 'cover', w: imgW, h: imgH }
      });
    } else {
      slide.addShape('rect', {
        x, y, w: imgW, h: imgH,
        fill: { color: activeTheme.bgAlt },
        line: { color: activeTheme.cardBorder, width: 1 }
      });
      slide.addText(`[ Image ${i + 1} ]`, {
        x, y: y + imgH/2 - 0.2, w: imgW, h: 0.4,
        fontSize: 12, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center'
      });
    }
    
    // Caption
    if (img.caption) {
      slide.addText(truncateText(img.caption, 40), {
        x, y: y + imgH + 0.05, w: imgW, h: 0.3,
        fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center'
      });
    }
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 17: FEATURE SHOWCASE (image + features list)
// ============================================================
function featureShowcase(pptx, options = {}) {
  const {
    title = 'Features',
    imagePath = null,
    features = [] // Array of {title, description}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.3, w: CONTENT_W, h: 0.5,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  // Image area (left side)
  const imgW = 4;
  const imgH = 4.2;
  const imgY = 0.95;
  
  if (imagePath) {
    slide.addImage({
      path: imagePath,
      x: MARGIN, y: imgY, w: imgW, h: imgH,
      sizing: { type: 'cover', w: imgW, h: imgH }
    });
  } else {
    slide.addShape('rect', {
      x: MARGIN, y: imgY, w: imgW, h: imgH,
      fill: { color: activeTheme.bgAlt },
      line: { color: activeTheme.cardBorder, width: 1 }
    });
    slide.addText('[ Product Image ]', {
      x: MARGIN, y: imgY + imgH/2 - 0.2, w: imgW, h: 0.4,
      fontSize: 12, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center'
    });
  }
  
  // Features list (right side)
  const featX = MARGIN + imgW + 0.3;
  const featW = CONTENT_W - imgW - 0.3;
  const numFeatures = Math.min(features.length, 4);
  const featH = imgH / numFeatures;
  
  features.slice(0, numFeatures).forEach((feat, i) => {
    const y = imgY + i * featH;
    
    // Feature number circle
    slide.addShape('ellipse', {
      x: featX, y: y + 0.1, w: 0.35, h: 0.35,
      fill: { color: activeTheme.accent }
    });
    slide.addText(String(i + 1), {
      x: featX, y: y + 0.13, w: 0.35, h: 0.28,
      fontSize: 11, bold: true, color: activeTheme.bg, fontFace: 'Arial', align: 'center'
    });
    
    // Feature title
    slide.addText(truncateText(feat.title || '', 35), {
      x: featX + 0.5, y: y + 0.05, w: featW - 0.6, h: 0.35,
      fontSize: 11, bold: true, color: activeTheme.text, fontFace: 'Arial'
    });
    
    // Feature description
    if (feat.description) {
      slide.addText(truncateText(feat.description, 80), {
        x: featX + 0.5, y: y + 0.4, w: featW - 0.6, h: featH - 0.55,
        fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top'
      });
    }
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 18: TEAM GRID (with photo placeholders)
// ============================================================
function teamGrid(pptx, options = {}) {
  const {
    title = 'Our Team',
    members = [] // Array of {name, role, imagePath}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.3, w: CONTENT_W, h: 0.5,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const numMembers = Math.min(members.length, 4);
  const gap = 0.3;
  const cardW = (CONTENT_W - (numMembers - 1) * gap) / numMembers;
  const cardH = 4.2;
  const startY = 0.95;
  const photoSize = Math.min(cardW * 0.7, 1.2);
  
  members.slice(0, numMembers).forEach((member, i) => {
    const x = MARGIN + i * (cardW + gap);
    
    // Card background
    slide.addShape('rect', {
      x, y: startY, w: cardW, h: cardH,
      fill: { color: activeTheme.card },
      line: { color: activeTheme.cardBorder, width: 1 }
    });
    
    // Photo placeholder (circle)
    const photoX = x + (cardW - photoSize) / 2;
    const photoY = startY + 0.4;
    
    if (member.imagePath) {
      slide.addImage({
        path: member.imagePath,
        x: photoX, y: photoY, w: photoSize, h: photoSize,
        rounding: true
      });
    } else {
      slide.addShape('ellipse', {
        x: photoX, y: photoY, w: photoSize, h: photoSize,
        fill: { color: activeTheme.bgAlt },
        line: { color: activeTheme.cardBorder, width: 1 }
      });
      slide.addText('👤', {
        x: photoX, y: photoY + photoSize/2 - 0.3, w: photoSize, h: 0.6,
        fontSize: 24, align: 'center'
      });
    }
    
    // Name
    slide.addText(truncateText(member.name || 'Name', 20), {
      x, y: photoY + photoSize + 0.3, w: cardW, h: 0.4,
      fontSize: 12, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
    });
    
    // Role
    slide.addText(truncateText(member.role || 'Role', 25), {
      x, y: photoY + photoSize + 0.7, w: cardW, h: 0.35,
      fontSize: 9, color: activeTheme.accent, fontFace: 'Arial', align: 'center'
    });
    
    // Bio
    if (member.bio) {
      slide.addText(truncateText(member.bio, 80), {
        x: x + 0.15, y: photoY + photoSize + 1.1, w: cardW - 0.3, h: 1,
        fontSize: 8, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center', valign: 'top'
      });
    }
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 19: CHART COMPARISON (2 charts side by side)
// ============================================================
function chartComparison(pptx, options = {}) {
  const {
    title = 'Chart Comparison',
    leftTitle = 'Chart A',
    rightTitle = 'Chart B',
    leftData = [],
    rightData = [],
    chartType = 'bar'
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.3, w: CONTENT_W, h: 0.5,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const chartW = (CONTENT_W - 0.3) / 2;
  const chartH = 3.8;
  const chartY = 1.2;
  
  // Left chart area
  slide.addShape('rect', {
    x: MARGIN, y: chartY, w: chartW, h: chartH,
    fill: { color: activeTheme.card },
    line: { color: activeTheme.cardBorder, width: 1 }
  });
  
  slide.addText(truncateText(leftTitle, 25), {
    x: MARGIN, y: chartY - 0.35, w: chartW, h: 0.3,
    fontSize: 11, bold: true, color: activeTheme.accent, fontFace: 'Arial', align: 'center'
  });
  
  if (leftData.length > 0) {
    slide.addChart(pptx.ChartType[chartType], leftData, {
      x: MARGIN + 0.1, y: chartY + 0.1, w: chartW - 0.2, h: chartH - 0.2,
      chartColors: [activeTheme.accent, activeTheme.accentLight],
      showLegend: false
    });
  } else {
    slide.addText('[ Chart A ]', {
      x: MARGIN, y: chartY + chartH/2 - 0.2, w: chartW, h: 0.4,
      fontSize: 12, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center'
    });
  }
  
  // Right chart area
  const rightX = MARGIN + chartW + 0.3;
  
  slide.addShape('rect', {
    x: rightX, y: chartY, w: chartW, h: chartH,
    fill: { color: activeTheme.card },
    line: { color: activeTheme.cardBorder, width: 1 }
  });
  
  slide.addText(truncateText(rightTitle, 25), {
    x: rightX, y: chartY - 0.35, w: chartW, h: 0.3,
    fontSize: 11, bold: true, color: activeTheme.accentDark, fontFace: 'Arial', align: 'center'
  });
  
  if (rightData.length > 0) {
    slide.addChart(pptx.ChartType[chartType], rightData, {
      x: rightX + 0.1, y: chartY + 0.1, w: chartW - 0.2, h: chartH - 0.2,
      chartColors: [activeTheme.accentDark, activeTheme.accentLight],
      showLegend: false
    });
  } else {
    slide.addText('[ Chart B ]', {
      x: rightX, y: chartY + chartH/2 - 0.2, w: chartW, h: 0.4,
      fontSize: 12, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center'
    });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 20: BIG NUMBER HERO
// ============================================================
function bigNumberHero(pptx, options = {}) {
  const {
    value = '100%',
    label = 'Key Metric',
    description = '',
    trend = '',
    supportingStats = [] // Array of {value, label}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Main big number
  slide.addText(value, {
    x: MARGIN, y: 0.8, w: CONTENT_W, h: 1.5,
    fontSize: 72, bold: true, color: activeTheme.accent, fontFace: 'Arial', align: 'center'
  });
  
  // Label
  slide.addText(truncateText(label.toUpperCase(), 40), {
    x: MARGIN, y: 2.4, w: CONTENT_W, h: 0.5,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
  });
  
  // Trend
  if (trend) {
    slide.addText(trend, {
      x: MARGIN, y: 2.95, w: CONTENT_W, h: 0.35,
      fontSize: 12, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center'
    });
  }
  
  // Description
  if (description) {
    slide.addText(truncateText(description, 150), {
      x: 1.5, y: 3.4, w: SLIDE_W - 3, h: 0.6,
      fontSize: 10, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center'
    });
  }
  
  // Supporting stats
  if (supportingStats.length > 0) {
    const numStats = Math.min(supportingStats.length, 3);
    const statW = (CONTENT_W - 0.4) / numStats;
    const statY = 4.3;
    
    supportingStats.slice(0, numStats).forEach((stat, i) => {
      const x = MARGIN + i * (statW + 0.2);
      
      slide.addShape('rect', {
        x, y: statY, w: statW, h: 1,
        fill: { color: activeTheme.card },
        line: { color: activeTheme.cardBorder, width: 1 }
      });
      
      slide.addText(stat.value, {
        x, y: statY + 0.15, w: statW, h: 0.45,
        fontSize: 18, bold: true, color: activeTheme.accent, fontFace: 'Arial', align: 'center'
      });
      
      slide.addText(truncateText(stat.label, 18), {
        x, y: statY + 0.6, w: statW, h: 0.3,
        fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center'
      });
    });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 21: BEFORE/AFTER COMPARISON
// ============================================================
function beforeAfter(pptx, options = {}) {
  const {
    title = 'Before & After',
    beforeImage = null,
    afterImage = null,
    beforeLabel = 'Before',
    afterLabel = 'After',
    beforeStats = [],
    afterStats = []
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.3, w: CONTENT_W, h: 0.5,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const halfW = (CONTENT_W - 0.3) / 2;
  const imgH = 3;
  const imgY = 1.1;
  
  // Before section
  slide.addText(beforeLabel, {
    x: MARGIN, y: imgY - 0.35, w: halfW, h: 0.3,
    fontSize: 12, bold: true, color: activeTheme.accentDark, fontFace: 'Arial', align: 'center'
  });
  
  if (beforeImage) {
    slide.addImage({
      path: beforeImage,
      x: MARGIN, y: imgY, w: halfW, h: imgH,
      sizing: { type: 'cover', w: halfW, h: imgH }
    });
  } else {
    slide.addShape('rect', {
      x: MARGIN, y: imgY, w: halfW, h: imgH,
      fill: { color: activeTheme.bgAlt },
      line: { color: activeTheme.cardBorder, width: 1 }
    });
    slide.addText('[ Before ]', {
      x: MARGIN, y: imgY + imgH/2 - 0.2, w: halfW, h: 0.4,
      fontSize: 12, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center'
    });
  }
  
  // Before stats
  if (beforeStats.length > 0) {
    beforeStats.slice(0, 2).forEach((stat, i) => {
      slide.addText(`${stat.value} ${stat.label}`, {
        x: MARGIN, y: imgY + imgH + 0.15 + i * 0.3, w: halfW, h: 0.28,
        fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center'
      });
    });
  }
  
  // Arrow in center
  slide.addShape('rightArrow', {
    x: MARGIN + halfW + 0.05, y: imgY + imgH/2 - 0.15, w: 0.2, h: 0.3,
    fill: { color: activeTheme.accent }
  });
  
  // After section
  const afterX = MARGIN + halfW + 0.3;
  
  slide.addText(afterLabel, {
    x: afterX, y: imgY - 0.35, w: halfW, h: 0.3,
    fontSize: 12, bold: true, color: activeTheme.accent, fontFace: 'Arial', align: 'center'
  });
  
  if (afterImage) {
    slide.addImage({
      path: afterImage,
      x: afterX, y: imgY, w: halfW, h: imgH,
      sizing: { type: 'cover', w: halfW, h: imgH }
    });
  } else {
    slide.addShape('rect', {
      x: afterX, y: imgY, w: halfW, h: imgH,
      fill: { color: activeTheme.bgAlt },
      line: { color: activeTheme.accent, width: 2 }
    });
    slide.addText('[ After ]', {
      x: afterX, y: imgY + imgH/2 - 0.2, w: halfW, h: 0.4,
      fontSize: 12, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center'
    });
  }
  
  // After stats
  if (afterStats.length > 0) {
    afterStats.slice(0, 2).forEach((stat, i) => {
      slide.addText(`${stat.value} ${stat.label}`, {
        x: afterX, y: imgY + imgH + 0.15 + i * 0.3, w: halfW, h: 0.28,
        fontSize: 9, bold: true, color: activeTheme.accent, fontFace: 'Arial', align: 'center'
      });
    });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 22: ICON FEATURES GRID
// ============================================================
function iconFeatures(pptx, options = {}) {
  const {
    title = 'Features',
    features = [] // Array of {icon, title, description}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.3, w: CONTENT_W, h: 0.5,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const numFeatures = Math.min(features.length, 6);
  const cols = numFeatures <= 3 ? numFeatures : 3;
  const rows = Math.ceil(numFeatures / cols);
  const gap = 0.25;
  const cellW = (CONTENT_W - (cols - 1) * gap) / cols;
  const cellH = rows === 1 ? 4 : 1.9;
  const startY = 1;
  
  features.slice(0, numFeatures).forEach((feat, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = MARGIN + col * (cellW + gap);
    const y = startY + row * (cellH + gap);
    
    // Card
    slide.addShape('rect', {
      x, y, w: cellW, h: cellH,
      fill: { color: activeTheme.card },
      line: { color: activeTheme.cardBorder, width: 1 }
    });
    
    // Icon circle
    const iconSize = rows === 1 ? 0.7 : 0.5;
    slide.addShape('ellipse', {
      x: x + cellW/2 - iconSize/2, y: y + 0.25, w: iconSize, h: iconSize,
      fill: { color: activeTheme.accent }
    });
    
    // Icon placeholder (emoji or text)
    slide.addText(feat.icon || '★', {
      x: x + cellW/2 - iconSize/2, y: y + 0.25 + iconSize/2 - 0.2, w: iconSize, h: 0.4,
      fontSize: rows === 1 ? 20 : 14, color: activeTheme.bg, fontFace: 'Arial', align: 'center'
    });
    
    // Title
    slide.addText(truncateText(feat.title || '', 25), {
      x: x + 0.1, y: y + iconSize + 0.4, w: cellW - 0.2, h: 0.35,
      fontSize: 10, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
    });
    
    // Description
    if (feat.description) {
      slide.addText(truncateText(feat.description, rows === 1 ? 120 : 60), {
        x: x + 0.1, y: y + iconSize + 0.75, w: cellW - 0.2, h: cellH - iconSize - 1,
        fontSize: 8, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center', valign: 'top'
      });
    }
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 23: MULTI-CHART DASHBOARD
// ============================================================
function multiChartDashboard(pptx, options = {}) {
  const {
    title = 'Dashboard',
    charts = [] // Array of {title, type, data}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.2, w: CONTENT_W, h: 0.4,
    fontSize: 16, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const numCharts = Math.min(charts.length || 4, 4);
  const gap = 0.2;
  const chartW = (CONTENT_W - gap) / 2;
  const chartH = 2.3;
  const startY = 0.7;
  
  for (let i = 0; i < numCharts; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = MARGIN + col * (chartW + gap);
    const y = startY + row * (chartH + 0.35);
    const chart = charts[i] || {};
    
    // Chart container
    slide.addShape('rect', {
      x, y, w: chartW, h: chartH,
      fill: { color: activeTheme.card },
      line: { color: activeTheme.cardBorder, width: 1 }
    });
    
    // Chart title
    slide.addText(truncateText(chart.title || `Chart ${i + 1}`, 25), {
      x: x + 0.1, y: y + 0.08, w: chartW - 0.2, h: 0.28,
      fontSize: 9, bold: true, color: activeTheme.accent, fontFace: 'Arial'
    });
    
    // Chart or placeholder
    if (chart.data && chart.data.length > 0) {
      slide.addChart(pptx.ChartType[chart.type || 'bar'], chart.data, {
        x: x + 0.1, y: y + 0.4, w: chartW - 0.2, h: chartH - 0.5,
        chartColors: [activeTheme.accent, activeTheme.accentLight, activeTheme.accentDark],
        showLegend: false
      });
    } else {
      slide.addText('[ Chart ]', {
        x, y: y + chartH/2, w: chartW, h: 0.3,
        fontSize: 10, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center'
      });
    }
  }
  
  return slide;
}

// Update module.exports with all new templates
const allExports = {
  // Setup
  initTheme,
  getThemeNames,
  THEMES,
  
  // Original templates (1-10)
  titleSlide,
  sectionDivider,
  contentCards,
  comparison,
  statistics,
  timeline,
  bulletList,
  quote,
  dataTable,
  conclusion,
  
  // Added templates (11-13)
  chartSlide,
  processFlow,
  statisticsDashboard,
  
  // NEW Image/Chart templates (14-23)
  imageTextSplit,
  fullBleedImage,
  imageGallery,
  featureShowcase,
  teamGrid,
  chartComparison,
  bigNumberHero,
  beforeAfter,
  iconFeatures,
  multiChartDashboard,
  
  // Utilities
  truncateText,
  SLIDE_W,
  SLIDE_H,
  MARGIN,
  CONTENT_W,
  CONTENT_H
};

// Re-export everything
Object.assign(module.exports, allExports);

// ============================================================
// TEMPLATE 24: IMAGE MOSAIC (1 large + 2 small)
// ============================================================
function imageMosaic(pptx, options = {}) {
  const {
    title = 'Gallery',
    images = [], // Array of {path, caption}
    layout = 'leftLarge' // 'leftLarge' or 'rightLarge'
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.25, w: CONTENT_W, h: 0.4,
    fontSize: 16, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const startY = 0.75;
  const totalH = 4.5;
  const gap = 0.15;
  const largeW = CONTENT_W * 0.6;
  const smallW = CONTENT_W - largeW - gap;
  const smallH = (totalH - gap) / 2;
  
  const largeX = layout === 'leftLarge' ? MARGIN : MARGIN + smallW + gap;
  const smallX = layout === 'leftLarge' ? MARGIN + largeW + gap : MARGIN;
  
  // Large image
  const img0 = images[0] || {};
  if (img0.path) {
    slide.addImage({ path: img0.path, x: largeX, y: startY, w: largeW, h: totalH, sizing: { type: 'cover', w: largeW, h: totalH } });
  } else {
    slide.addShape('rect', { x: largeX, y: startY, w: largeW, h: totalH, fill: { color: activeTheme.bgAlt }, line: { color: activeTheme.cardBorder, width: 1 } });
    slide.addText('[ Main Image ]', { x: largeX, y: startY + totalH/2 - 0.2, w: largeW, h: 0.4, fontSize: 14, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Top small image
  const img1 = images[1] || {};
  if (img1.path) {
    slide.addImage({ path: img1.path, x: smallX, y: startY, w: smallW, h: smallH, sizing: { type: 'cover', w: smallW, h: smallH } });
  } else {
    slide.addShape('rect', { x: smallX, y: startY, w: smallW, h: smallH, fill: { color: activeTheme.bgAlt }, line: { color: activeTheme.cardBorder, width: 1 } });
    slide.addText('[ Image 2 ]', { x: smallX, y: startY + smallH/2 - 0.15, w: smallW, h: 0.3, fontSize: 11, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Bottom small image
  const img2 = images[2] || {};
  const bottomY = startY + smallH + gap;
  if (img2.path) {
    slide.addImage({ path: img2.path, x: smallX, y: bottomY, w: smallW, h: smallH, sizing: { type: 'cover', w: smallW, h: smallH } });
  } else {
    slide.addShape('rect', { x: smallX, y: bottomY, w: smallW, h: smallH, fill: { color: activeTheme.bgAlt }, line: { color: activeTheme.cardBorder, width: 1 } });
    slide.addText('[ Image 3 ]', { x: smallX, y: bottomY + smallH/2 - 0.15, w: smallW, h: 0.3, fontSize: 11, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 25: SCREENSHOT SHOWCASE (device mockup style)
// ============================================================
function screenshotShowcase(pptx, options = {}) {
  const {
    title = 'Product Demo',
    subtitle = '',
    screenshotPath = null,
    features = [] // Array of strings shown as bullets
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 35), {
    x: MARGIN, y: 0.25, w: CONTENT_W, h: 0.45,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  if (subtitle) {
    slide.addText(truncateText(subtitle, 70), {
      x: MARGIN, y: 0.7, w: CONTENT_W, h: 0.3,
      fontSize: 10, color: activeTheme.textSecondary, fontFace: 'Arial'
    });
  }
  
  // Device frame (browser mockup)
  const frameX = 1.5;
  const frameY = 1.15;
  const frameW = 5;
  const frameH = 3.5;
  
  // Browser chrome
  slide.addShape('rect', {
    x: frameX, y: frameY, w: frameW, h: 0.3,
    fill: { color: activeTheme.bgAlt },
    line: { color: activeTheme.cardBorder, width: 1 }
  });
  
  // Browser dots
  const dotY = frameY + 0.1;
  slide.addShape('ellipse', { x: frameX + 0.15, y: dotY, w: 0.1, h: 0.1, fill: { color: activeTheme.textMuted } });
  slide.addShape('ellipse', { x: frameX + 0.3, y: dotY, w: 0.1, h: 0.1, fill: { color: activeTheme.textMuted } });
  slide.addShape('ellipse', { x: frameX + 0.45, y: dotY, w: 0.1, h: 0.1, fill: { color: activeTheme.textMuted } });
  
  // Screenshot area
  const screenY = frameY + 0.3;
  const screenH = frameH - 0.3;
  
  if (screenshotPath) {
    slide.addImage({ path: screenshotPath, x: frameX, y: screenY, w: frameW, h: screenH, sizing: { type: 'cover', w: frameW, h: screenH } });
  } else {
    slide.addShape('rect', { x: frameX, y: screenY, w: frameW, h: screenH, fill: { color: activeTheme.card }, line: { color: activeTheme.cardBorder, width: 1 } });
    slide.addText('[ Screenshot ]', { x: frameX, y: screenY + screenH/2 - 0.2, w: frameW, h: 0.4, fontSize: 14, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Features list on right
  const featX = frameX + frameW + 0.4;
  const featW = CONTENT_W - frameW - 1.4;
  
  features.slice(0, 5).forEach((feat, i) => {
    const y = 1.5 + i * 0.6;
    slide.addShape('ellipse', { x: featX, y: y + 0.05, w: 0.2, h: 0.2, fill: { color: activeTheme.accent } });
    slide.addText(truncateText(feat, 35), { x: featX + 0.3, y, w: featW - 0.3, h: 0.5, fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'middle' });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 26: PIE CHART SLIDE
// ============================================================
function pieChartSlide(pptx, options = {}) {
  const {
    title = 'Distribution',
    chartData = [],
    insights = [] // Array of insight strings
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.25, w: CONTENT_W, h: 0.45,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const chartSize = 3.5;
  const chartX = MARGIN + 0.5;
  const chartY = 1;
  
  if (chartData.length > 0) {
    slide.addChart(pptx.ChartType.pie, chartData, {
      x: chartX, y: chartY, w: chartSize, h: chartSize,
      chartColors: [activeTheme.accent, activeTheme.accentLight, activeTheme.accentDark, activeTheme.textMuted],
      showLegend: true, legendPos: 'b'
    });
  } else {
    slide.addShape('ellipse', { x: chartX + 0.25, y: chartY + 0.25, w: chartSize - 0.5, h: chartSize - 0.5, fill: { color: activeTheme.bgAlt }, line: { color: activeTheme.cardBorder, width: 1 } });
    slide.addText('[ Pie Chart ]', { x: chartX, y: chartY + chartSize/2 - 0.2, w: chartSize, h: 0.4, fontSize: 12, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Insights panel
  const insightX = chartX + chartSize + 0.5;
  const insightW = CONTENT_W - chartSize - 1.2;
  
  slide.addShape('rect', {
    x: insightX, y: chartY, w: insightW, h: chartSize,
    fill: { color: activeTheme.card }, line: { color: activeTheme.accent, width: 1 }
  });
  
  slide.addText('Key Insights', {
    x: insightX + 0.2, y: chartY + 0.15, w: insightW - 0.4, h: 0.35,
    fontSize: 11, bold: true, color: activeTheme.accent, fontFace: 'Arial'
  });
  
  insights.slice(0, 4).forEach((insight, i) => {
    slide.addText('• ' + truncateText(insight, 45), {
      x: insightX + 0.2, y: chartY + 0.6 + i * 0.55, w: insightW - 0.4, h: 0.5,
      fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top'
    });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 27: LINE CHART WITH ANNOTATIONS
// ============================================================
function lineChartAnnotated(pptx, options = {}) {
  const {
    title = 'Trend Analysis',
    chartData = [],
    annotations = [] // Array of {label, description}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.25, w: CONTENT_W, h: 0.45,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const chartW = CONTENT_W;
  const chartH = 3.2;
  const chartY = 0.85;
  
  slide.addShape('rect', {
    x: MARGIN, y: chartY, w: chartW, h: chartH,
    fill: { color: activeTheme.card }, line: { color: activeTheme.cardBorder, width: 1 }
  });
  
  if (chartData.length > 0) {
    slide.addChart(pptx.ChartType.line, chartData, {
      x: MARGIN + 0.1, y: chartY + 0.1, w: chartW - 0.2, h: chartH - 0.2,
      chartColors: [activeTheme.accent, activeTheme.accentLight],
      showLegend: true, legendPos: 'b', lineSmooth: true
    });
  } else {
    slide.addText('[ Line Chart ]', { x: MARGIN, y: chartY + chartH/2 - 0.2, w: chartW, h: 0.4, fontSize: 14, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Annotation cards below
  const numAnnotations = Math.min(annotations.length, 3);
  const annotW = (CONTENT_W - 0.3) / 3;
  const annotY = chartY + chartH + 0.2;
  
  annotations.slice(0, numAnnotations).forEach((ann, i) => {
    const x = MARGIN + i * (annotW + 0.15);
    slide.addShape('rect', { x, y: annotY, w: annotW, h: 0.9, fill: { color: activeTheme.card }, line: { color: activeTheme.accent, width: 1 } });
    slide.addText(truncateText(ann.label || '', 20), { x: x + 0.1, y: annotY + 0.1, w: annotW - 0.2, h: 0.3, fontSize: 10, bold: true, color: activeTheme.accent, fontFace: 'Arial' });
    slide.addText(truncateText(ann.description || '', 50), { x: x + 0.1, y: annotY + 0.4, w: annotW - 0.2, h: 0.45, fontSize: 8, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top' });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 28: FUNNEL CHART
// ============================================================
function funnelChart(pptx, options = {}) {
  const {
    title = 'Conversion Funnel',
    stages = [] // Array of {label, value, percent}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.25, w: CONTENT_W, h: 0.45,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const numStages = Math.min(stages.length || 5, 5);
  const startY = 0.9;
  const stageH = 0.75;
  const maxW = CONTENT_W - 2;
  const centerX = SLIDE_W / 2;
  
  for (let i = 0; i < numStages; i++) {
    const stage = stages[i] || { label: `Stage ${i + 1}`, value: '', percent: '' };
    const widthRatio = 1 - (i * 0.15);
    const w = maxW * widthRatio;
    const x = centerX - w / 2;
    const y = startY + i * stageH;
    
    // Funnel segment
    slide.addShape('rect', {
      x, y, w, h: stageH - 0.08,
      fill: { color: activeTheme.accent, transparency: i * 15 },
      line: { color: activeTheme.accentDark, width: 1 }
    });
    
    // Label
    slide.addText(truncateText(stage.label, 20), {
      x, y: y + 0.12, w: w * 0.5, h: 0.35,
      fontSize: 10, bold: true, color: activeTheme.bg, fontFace: 'Arial', align: 'center'
    });
    
    // Value on right side
    slide.addText(stage.value || '', {
      x: x + w * 0.5, y: y + 0.12, w: w * 0.3, h: 0.35,
      fontSize: 14, bold: true, color: activeTheme.bg, fontFace: 'Arial', align: 'center'
    });
    
    // Percent
    if (stage.percent) {
      slide.addText(stage.percent, {
        x: x + w * 0.8, y: y + 0.12, w: w * 0.18, h: 0.35,
        fontSize: 9, color: activeTheme.bg, fontFace: 'Arial', align: 'center'
      });
    }
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 29: PROGRESS BARS
// ============================================================
function progressBars(pptx, options = {}) {
  const {
    title = 'Progress',
    metrics = [] // Array of {label, value, percent, target}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.25, w: CONTENT_W, h: 0.45,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const numMetrics = Math.min(metrics.length, 5);
  const barH = 0.35;
  const rowH = 0.85;
  const barW = CONTENT_W - 2;
  const startY = 0.9;
  
  metrics.slice(0, numMetrics).forEach((metric, i) => {
    const y = startY + i * rowH;
    const percent = parseInt(metric.percent) || 50;
    const fillW = (barW * percent) / 100;
    
    // Label
    slide.addText(truncateText(metric.label || '', 30), {
      x: MARGIN, y, w: barW, h: 0.3,
      fontSize: 10, bold: true, color: activeTheme.text, fontFace: 'Arial'
    });
    
    // Value on right
    slide.addText(metric.value || `${percent}%`, {
      x: MARGIN + barW - 1, y, w: 1.5, h: 0.3,
      fontSize: 10, bold: true, color: activeTheme.accent, fontFace: 'Arial', align: 'right'
    });
    
    // Bar background
    slide.addShape('rect', {
      x: MARGIN, y: y + 0.35, w: barW, h: barH,
      fill: { color: activeTheme.bgAlt }, line: { color: activeTheme.cardBorder, width: 0.5 }
    });
    
    // Bar fill
    slide.addShape('rect', {
      x: MARGIN, y: y + 0.35, w: fillW, h: barH,
      fill: { color: activeTheme.accent }
    });
    
    // Target marker if provided
    if (metric.target) {
      const targetX = MARGIN + (barW * parseInt(metric.target)) / 100;
      slide.addShape('rect', { x: targetX - 0.02, y: y + 0.32, w: 0.04, h: barH + 0.06, fill: { color: activeTheme.accentDark } });
    }
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 30: IMAGE WITH STATS SIDEBAR
// ============================================================
function imageWithStats(pptx, options = {}) {
  const {
    title = '',
    imagePath = null,
    stats = [] // Array of {value, label}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  const imgW = SLIDE_W * 0.6;
  const sideW = SLIDE_W - imgW;
  
  // Image (left 60%)
  if (imagePath) {
    slide.addImage({ path: imagePath, x: 0, y: 0, w: imgW, h: SLIDE_H, sizing: { type: 'cover', w: imgW, h: SLIDE_H } });
  } else {
    slide.addShape('rect', { x: 0, y: 0, w: imgW, h: SLIDE_H, fill: { color: activeTheme.bgAlt } });
    slide.addText('[ Image ]', { x: 0, y: SLIDE_H/2 - 0.2, w: imgW, h: 0.4, fontSize: 16, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Stats sidebar (right 40%)
  slide.addShape('rect', { x: imgW, y: 0, w: sideW, h: SLIDE_H, fill: { color: activeTheme.card } });
  
  // Title in sidebar
  if (title) {
    slide.addText(truncateText(title.toUpperCase(), 25), {
      x: imgW + 0.3, y: 0.5, w: sideW - 0.6, h: 0.5,
      fontSize: 14, bold: true, color: activeTheme.text, fontFace: 'Arial'
    });
  }
  
  // Stats
  const numStats = Math.min(stats.length, 4);
  const statH = (SLIDE_H - 1.5) / numStats;
  
  stats.slice(0, numStats).forEach((stat, i) => {
    const y = 1.2 + i * statH;
    
    slide.addText(stat.value || '', {
      x: imgW + 0.3, y, w: sideW - 0.6, h: statH * 0.5,
      fontSize: 24, bold: true, color: activeTheme.accent, fontFace: 'Arial'
    });
    
    slide.addText(truncateText(stat.label || '', 25), {
      x: imgW + 0.3, y: y + statH * 0.45, w: sideW - 0.6, h: statH * 0.35,
      fontSize: 10, color: activeTheme.textSecondary, fontFace: 'Arial'
    });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 31: TESTIMONIAL WITH PHOTO
// ============================================================
function testimonialWithPhoto(pptx, options = {}) {
  const {
    quote = 'Testimonial text here',
    name = 'Customer Name',
    role = 'Position, Company',
    photoPath = null,
    rating = 5
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Large photo on left
  const photoW = 3.5;
  
  if (photoPath) {
    slide.addImage({ path: photoPath, x: MARGIN, y: 0.8, w: photoW, h: 4, sizing: { type: 'cover', w: photoW, h: 4 } });
  } else {
    slide.addShape('rect', { x: MARGIN, y: 0.8, w: photoW, h: 4, fill: { color: activeTheme.bgAlt }, line: { color: activeTheme.cardBorder, width: 1 } });
    slide.addText('[ Photo ]', { x: MARGIN, y: 2.6, w: photoW, h: 0.4, fontSize: 14, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Quote area on right
  const quoteX = MARGIN + photoW + 0.4;
  const quoteW = CONTENT_W - photoW - 0.4;
  
  // Large quote mark
  slide.addText('"', {
    x: quoteX, y: 0.6, w: 1, h: 1,
    fontSize: 60, color: activeTheme.accent, fontFace: 'Georgia'
  });
  
  // Quote text
  slide.addText(truncateText(quote, 300), {
    x: quoteX + 0.3, y: 1.4, w: quoteW - 0.3, h: 2,
    fontSize: 13, color: activeTheme.text, italic: true, fontFace: 'Georgia', valign: 'top'
  });
  
  // Rating stars
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  slide.addText(stars, {
    x: quoteX, y: 3.5, w: quoteW, h: 0.4,
    fontSize: 16, color: activeTheme.accent, fontFace: 'Arial'
  });
  
  // Name and role
  slide.addText(name, {
    x: quoteX, y: 4, w: quoteW, h: 0.35,
    fontSize: 12, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  slide.addText(truncateText(role, 40), {
    x: quoteX, y: 4.35, w: quoteW, h: 0.3,
    fontSize: 10, color: activeTheme.textSecondary, fontFace: 'Arial'
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 32: CASE STUDY LAYOUT
// ============================================================
function caseStudy(pptx, options = {}) {
  const {
    title = 'Case Study',
    clientLogo = null,
    problem = '',
    solution = '',
    results = [] // Array of {value, label}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title bar
  slide.addShape('rect', { x: 0, y: 0, w: SLIDE_W, h: 0.7, fill: { color: activeTheme.accent } });
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.18, w: CONTENT_W - 2, h: 0.4,
    fontSize: 16, bold: true, color: activeTheme.bg, fontFace: 'Arial'
  });
  
  // Client logo placeholder
  if (clientLogo) {
    slide.addImage({ path: clientLogo, x: CONTENT_W - 1, y: 0.15, w: 1.5, h: 0.4, sizing: { type: 'contain' } });
  }
  
  // Problem section
  const sectionW = (CONTENT_W - 0.2) / 2;
  
  slide.addText('THE CHALLENGE', {
    x: MARGIN, y: 0.85, w: sectionW, h: 0.3,
    fontSize: 9, bold: true, color: activeTheme.accent, fontFace: 'Arial'
  });
  
  slide.addShape('rect', {
    x: MARGIN, y: 1.15, w: sectionW, h: 1.6,
    fill: { color: activeTheme.card }, line: { color: activeTheme.cardBorder, width: 1 }
  });
  
  slide.addText(truncateText(problem, 200), {
    x: MARGIN + 0.15, y: 1.25, w: sectionW - 0.3, h: 1.4,
    fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top'
  });
  
  // Solution section
  slide.addText('THE SOLUTION', {
    x: MARGIN + sectionW + 0.2, y: 0.85, w: sectionW, h: 0.3,
    fontSize: 9, bold: true, color: activeTheme.accent, fontFace: 'Arial'
  });
  
  slide.addShape('rect', {
    x: MARGIN + sectionW + 0.2, y: 1.15, w: sectionW, h: 1.6,
    fill: { color: activeTheme.card }, line: { color: activeTheme.cardBorder, width: 1 }
  });
  
  slide.addText(truncateText(solution, 200), {
    x: MARGIN + sectionW + 0.35, y: 1.25, w: sectionW - 0.3, h: 1.4,
    fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top'
  });
  
  // Results section
  slide.addText('THE RESULTS', {
    x: MARGIN, y: 2.95, w: CONTENT_W, h: 0.3,
    fontSize: 9, bold: true, color: activeTheme.accent, fontFace: 'Arial'
  });
  
  const numResults = Math.min(results.length, 4);
  const resultW = (CONTENT_W - (numResults - 1) * 0.15) / numResults;
  
  results.slice(0, numResults).forEach((result, i) => {
    const x = MARGIN + i * (resultW + 0.15);
    
    slide.addShape('rect', {
      x, y: 3.25, w: resultW, h: 1.9,
      fill: { color: activeTheme.accent }
    });
    
    slide.addText(result.value || '', {
      x, y: 3.5, w: resultW, h: 0.7,
      fontSize: 22, bold: true, color: activeTheme.bg, fontFace: 'Arial', align: 'center'
    });
    
    slide.addText(truncateText(result.label || '', 20), {
      x, y: 4.3, w: resultW, h: 0.6,
      fontSize: 9, color: activeTheme.bg, fontFace: 'Arial', align: 'center', valign: 'top'
    });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 33: PRICING TABLE
// ============================================================
function pricingTable(pptx, options = {}) {
  const {
    title = 'Pricing Plans',
    plans = [] // Array of {name, price, period, features[], highlighted}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.2, w: CONTENT_W, h: 0.4,
    fontSize: 16, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
  });
  
  const numPlans = Math.min(plans.length, 3);
  const gap = 0.25;
  const planW = (CONTENT_W - (numPlans - 1) * gap) / numPlans;
  const planH = 4.7;
  const startY = 0.7;
  
  plans.slice(0, numPlans).forEach((plan, i) => {
    const x = MARGIN + i * (planW + gap);
    const isHighlighted = plan.highlighted;
    
    // Card
    slide.addShape('rect', {
      x, y: startY, w: planW, h: planH,
      fill: { color: isHighlighted ? activeTheme.accent : activeTheme.card },
      line: { color: isHighlighted ? activeTheme.accentDark : activeTheme.cardBorder, width: isHighlighted ? 2 : 1 }
    });
    
    const textColor = isHighlighted ? activeTheme.bg : activeTheme.text;
    const subColor = isHighlighted ? activeTheme.bg : activeTheme.textSecondary;
    
    // Plan name
    slide.addText(truncateText(plan.name || '', 15), {
      x, y: startY + 0.2, w: planW, h: 0.35,
      fontSize: 11, bold: true, color: textColor, fontFace: 'Arial', align: 'center'
    });
    
    // Price
    slide.addText(plan.price || '$0', {
      x, y: startY + 0.6, w: planW, h: 0.6,
      fontSize: 28, bold: true, color: textColor, fontFace: 'Arial', align: 'center'
    });
    
    // Period
    slide.addText(plan.period || '/month', {
      x, y: startY + 1.15, w: planW, h: 0.25,
      fontSize: 9, color: subColor, fontFace: 'Arial', align: 'center'
    });
    
    // Features
    const features = plan.features || [];
    features.slice(0, 5).forEach((feat, fi) => {
      slide.addText('✓ ' + truncateText(feat, 25), {
        x: x + 0.2, y: startY + 1.6 + fi * 0.4, w: planW - 0.4, h: 0.35,
        fontSize: 8, color: subColor, fontFace: 'Arial'
      });
    });
    
    // CTA button
    slide.addShape('rect', {
      x: x + 0.3, y: startY + planH - 0.6, w: planW - 0.6, h: 0.4,
      fill: { color: isHighlighted ? activeTheme.bg : activeTheme.accent }
    });
    
    slide.addText('Get Started', {
      x: x + 0.3, y: startY + planH - 0.55, w: planW - 0.6, h: 0.3,
      fontSize: 9, bold: true, color: isHighlighted ? activeTheme.accent : activeTheme.bg, fontFace: 'Arial', align: 'center'
    });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 34: SWOT ANALYSIS
// ============================================================
function swotAnalysis(pptx, options = {}) {
  const {
    title = 'SWOT Analysis',
    strengths = [],
    weaknesses = [],
    opportunities = [],
    threats = []
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.2, w: CONTENT_W, h: 0.4,
    fontSize: 16, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
  });
  
  const gap = 0.15;
  const quadW = (CONTENT_W - gap) / 2;
  const quadH = 2.3;
  const startY = 0.7;
  
  const quadrants = [
    { label: 'STRENGTHS', items: strengths, x: MARGIN, y: startY, color: activeTheme.accent },
    { label: 'WEAKNESSES', items: weaknesses, x: MARGIN + quadW + gap, y: startY, color: activeTheme.accentDark },
    { label: 'OPPORTUNITIES', items: opportunities, x: MARGIN, y: startY + quadH + gap, color: activeTheme.accentLight },
    { label: 'THREATS', items: threats, x: MARGIN + quadW + gap, y: startY + quadH + gap, color: activeTheme.textMuted }
  ];
  
  quadrants.forEach(q => {
    // Quadrant box
    slide.addShape('rect', {
      x: q.x, y: q.y, w: quadW, h: quadH,
      fill: { color: activeTheme.card },
      line: { color: q.color, width: 2 }
    });
    
    // Header
    slide.addShape('rect', {
      x: q.x, y: q.y, w: quadW, h: 0.35,
      fill: { color: q.color }
    });
    
    slide.addText(q.label, {
      x: q.x, y: q.y + 0.05, w: quadW, h: 0.28,
      fontSize: 10, bold: true, color: 'FFFFFF', fontFace: 'Arial', align: 'center'
    });
    
    // Items
    q.items.slice(0, 4).forEach((item, i) => {
      slide.addText('• ' + truncateText(item, 35), {
        x: q.x + 0.15, y: q.y + 0.5 + i * 0.42, w: quadW - 0.3, h: 0.4,
        fontSize: 8, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top'
      });
    });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 35: ROADMAP VISUAL
// ============================================================
function roadmapVisual(pptx, options = {}) {
  const {
    title = 'Product Roadmap',
    quarters = [] // Array of {label, items[]}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.2, w: CONTENT_W, h: 0.4,
    fontSize: 16, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const numQuarters = Math.min(quarters.length, 4);
  const laneW = CONTENT_W / numQuarters;
  const laneY = 0.9;
  const laneH = 4.3;
  
  // Timeline line
  slide.addShape('rect', {
    x: MARGIN, y: laneY - 0.15, w: CONTENT_W, h: 0.04,
    fill: { color: activeTheme.accent }
  });
  
  quarters.slice(0, numQuarters).forEach((quarter, i) => {
    const x = MARGIN + i * laneW;
    
    // Quarter marker
    slide.addShape('ellipse', {
      x: x + laneW/2 - 0.2, y: laneY - 0.27, w: 0.4, h: 0.28,
      fill: { color: activeTheme.accent }
    });
    
    // Quarter label
    slide.addText(truncateText(quarter.label || '', 10), {
      x: x, y: laneY + 0.15, w: laneW, h: 0.3,
      fontSize: 11, bold: true, color: activeTheme.accent, fontFace: 'Arial', align: 'center'
    });
    
    // Items
    const items = quarter.items || [];
    items.slice(0, 4).forEach((item, ii) => {
      const itemY = laneY + 0.55 + ii * 0.9;
      
      slide.addShape('rect', {
        x: x + 0.1, y: itemY, w: laneW - 0.2, h: 0.75,
        fill: { color: activeTheme.card },
        line: { color: activeTheme.cardBorder, width: 1 }
      });
      
      slide.addText(truncateText(item.title || item, 25), {
        x: x + 0.2, y: itemY + 0.1, w: laneW - 0.4, h: 0.3,
        fontSize: 9, bold: true, color: activeTheme.text, fontFace: 'Arial'
      });
      
      if (item.description) {
        slide.addText(truncateText(item.description, 40), {
          x: x + 0.2, y: itemY + 0.4, w: laneW - 0.4, h: 0.3,
          fontSize: 7, color: activeTheme.textSecondary, fontFace: 'Arial'
        });
      }
    });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 36: PHONE MOCKUP
// ============================================================
function phoneMockup(pptx, options = {}) {
  const {
    title = 'Mobile Experience',
    subtitle = '',
    screenshotPath = null,
    features = []
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 35), {
    x: MARGIN, y: 0.25, w: CONTENT_W, h: 0.45,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
  });
  
  if (subtitle) {
    slide.addText(truncateText(subtitle, 60), {
      x: MARGIN, y: 0.7, w: CONTENT_W, h: 0.3,
      fontSize: 10, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center'
    });
  }
  
  // Phone frame (center)
  const phoneW = 2;
  const phoneH = 4;
  const phoneX = SLIDE_W/2 - phoneW/2;
  const phoneY = 1.1;
  
  // Phone body
  slide.addShape('roundRect', {
    x: phoneX, y: phoneY, w: phoneW, h: phoneH,
    fill: { color: '1A1A1A' },
    line: { color: '333333', width: 2 }
  });
  
  // Screen area
  const screenMargin = 0.1;
  const screenW = phoneW - screenMargin * 2;
  const screenH = phoneH - 0.4;
  
  if (screenshotPath) {
    slide.addImage({
      path: screenshotPath,
      x: phoneX + screenMargin, y: phoneY + 0.25, w: screenW, h: screenH,
      sizing: { type: 'cover', w: screenW, h: screenH }
    });
  } else {
    slide.addShape('rect', {
      x: phoneX + screenMargin, y: phoneY + 0.25, w: screenW, h: screenH,
      fill: { color: activeTheme.card }
    });
    slide.addText('[ App Screen ]', {
      x: phoneX + screenMargin, y: phoneY + screenH/2, w: screenW, h: 0.3,
      fontSize: 9, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center'
    });
  }
  
  // Features on left
  const leftFeatures = features.slice(0, 2);
  leftFeatures.forEach((feat, i) => {
    const y = 1.8 + i * 1.2;
    slide.addShape('rect', {
      x: MARGIN, y, w: 2.8, h: 0.9,
      fill: { color: activeTheme.card },
      line: { color: activeTheme.cardBorder, width: 1 }
    });
    slide.addText(truncateText(feat.title || feat, 25), {
      x: MARGIN + 0.15, y: y + 0.15, w: 2.5, h: 0.3,
      fontSize: 9, bold: true, color: activeTheme.text, fontFace: 'Arial'
    });
    if (feat.description) {
      slide.addText(truncateText(feat.description, 40), {
        x: MARGIN + 0.15, y: y + 0.45, w: 2.5, h: 0.35,
        fontSize: 7, color: activeTheme.textSecondary, fontFace: 'Arial'
      });
    }
    // Connector line
    slide.addShape('line', {
      x: MARGIN + 2.8, y: y + 0.45, w: phoneX - MARGIN - 2.9, h: 0,
      line: { color: activeTheme.accent, width: 1, dashType: 'dash' }
    });
  });
  
  // Features on right
  const rightFeatures = features.slice(2, 4);
  rightFeatures.forEach((feat, i) => {
    const y = 1.8 + i * 1.2;
    const rightX = phoneX + phoneW + 0.3;
    slide.addShape('rect', {
      x: rightX, y, w: 2.8, h: 0.9,
      fill: { color: activeTheme.card },
      line: { color: activeTheme.cardBorder, width: 1 }
    });
    slide.addText(truncateText(feat.title || feat, 25), {
      x: rightX + 0.15, y: y + 0.15, w: 2.5, h: 0.3,
      fontSize: 9, bold: true, color: activeTheme.text, fontFace: 'Arial'
    });
    if (feat.description) {
      slide.addText(truncateText(feat.description, 40), {
        x: rightX + 0.15, y: y + 0.45, w: 2.5, h: 0.35,
        fontSize: 7, color: activeTheme.textSecondary, fontFace: 'Arial'
      });
    }
    // Connector line
    slide.addShape('line', {
      x: phoneX + phoneW, y: y + 0.45, w: 0.2, h: 0,
      line: { color: activeTheme.accent, width: 1, dashType: 'dash' }
    });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 37: ICON GRID (simple icons with labels)
// ============================================================
function iconGrid(pptx, options = {}) {
  const {
    title = 'Our Services',
    icons = [] // Array of {icon, label}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.25, w: CONTENT_W, h: 0.45,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
  });
  
  const numIcons = Math.min(icons.length, 8);
  const cols = numIcons <= 4 ? numIcons : 4;
  const rows = Math.ceil(numIcons / cols);
  const cellW = CONTENT_W / cols;
  const cellH = rows === 1 ? 3.5 : 1.8;
  const startY = 1;
  
  icons.slice(0, numIcons).forEach((item, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = MARGIN + col * cellW;
    const y = startY + row * cellH;
    const iconSize = rows === 1 ? 1 : 0.7;
    
    // Icon circle
    slide.addShape('ellipse', {
      x: x + cellW/2 - iconSize/2, y: y + 0.2, w: iconSize, h: iconSize,
      fill: { color: activeTheme.accent }
    });
    
    // Icon emoji
    slide.addText(item.icon || '★', {
      x: x + cellW/2 - iconSize/2, y: y + 0.2 + iconSize/2 - 0.25, w: iconSize, h: 0.5,
      fontSize: rows === 1 ? 28 : 20, color: activeTheme.bg, fontFace: 'Arial', align: 'center'
    });
    
    // Label
    slide.addText(truncateText(item.label || '', 20), {
      x: x, y: y + iconSize + 0.4, w: cellW, h: 0.4,
      fontSize: 10, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
    });
  });
  
  return slide;
}

// Final exports with ALL templates (1-37)
const finalExports = {
  initTheme, getThemeNames, THEMES, truncateText,
  SLIDE_W, SLIDE_H, MARGIN, CONTENT_W, CONTENT_H,
  
  // Text templates (1-10)
  titleSlide, sectionDivider, contentCards, comparison, statistics,
  timeline, bulletList, quote, dataTable, conclusion,
  
  // Data templates (11-13)
  chartSlide, processFlow, statisticsDashboard,
  
  // Image templates (14-23)
  imageTextSplit, fullBleedImage, imageGallery, featureShowcase,
  teamGrid, chartComparison, bigNumberHero, beforeAfter,
  iconFeatures, multiChartDashboard,
  
  // NEW templates (24-37)
  imageMosaic, screenshotShowcase, pieChartSlide, lineChartAnnotated,
  funnelChart, progressBars, imageWithStats, testimonialWithPhoto,
  caseStudy, pricingTable, swotAnalysis, roadmapVisual,
  phoneMockup, iconGrid
};

Object.assign(module.exports, finalExports);

// ============================================================
// TEMPLATE 38: DONUT CHART WITH CENTER STAT
// ============================================================
function donutWithStat(pptx, options = {}) {
  const {
    title = 'Performance',
    centerValue = '85%',
    centerLabel = 'Complete',
    chartData = [],
    legend = [] // Array of {label, value, color}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.25, w: CONTENT_W, h: 0.45,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const chartSize = 3.2;
  const chartX = MARGIN + 0.8;
  const chartY = 1;
  
  // Donut chart or placeholder
  if (chartData.length > 0) {
    slide.addChart(pptx.ChartType.doughnut, chartData, {
      x: chartX, y: chartY, w: chartSize, h: chartSize,
      chartColors: [activeTheme.accent, activeTheme.bgAlt, activeTheme.accentLight],
      holeSize: 65, showLegend: false
    });
  } else {
    slide.addShape('ellipse', { x: chartX + 0.3, y: chartY + 0.3, w: chartSize - 0.6, h: chartSize - 0.6, fill: { color: activeTheme.bgAlt }, line: { color: activeTheme.accent, width: 8 } });
  }
  
  // Center stat
  slide.addText(centerValue, {
    x: chartX, y: chartY + chartSize/2 - 0.45, w: chartSize, h: 0.7,
    fontSize: 32, bold: true, color: activeTheme.accent, fontFace: 'Arial', align: 'center'
  });
  slide.addText(centerLabel, {
    x: chartX, y: chartY + chartSize/2 + 0.2, w: chartSize, h: 0.35,
    fontSize: 10, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center'
  });
  
  // Legend on right
  const legendX = chartX + chartSize + 0.5;
  const legendW = CONTENT_W - chartSize - 1.8;
  
  legend.slice(0, 5).forEach((item, i) => {
    const y = chartY + 0.3 + i * 0.55;
    slide.addShape('rect', { x: legendX, y: y + 0.05, w: 0.25, h: 0.25, fill: { color: item.color || activeTheme.accent } });
    slide.addText(truncateText(item.label || '', 20), { x: legendX + 0.35, y, w: legendW - 1, h: 0.35, fontSize: 10, color: activeTheme.text, fontFace: 'Arial' });
    slide.addText(item.value || '', { x: legendX + legendW - 0.8, y, w: 0.8, h: 0.35, fontSize: 10, bold: true, color: activeTheme.accent, fontFace: 'Arial', align: 'right' });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 39: HORIZONTAL BAR CHART
// ============================================================
function horizontalBarChart(pptx, options = {}) {
  const {
    title = 'Rankings',
    bars = [] // Array of {label, value, percent}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.25, w: CONTENT_W, h: 0.45,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const numBars = Math.min(bars.length, 6);
  const barH = 0.5;
  const rowH = 0.75;
  const labelW = 2;
  const barMaxW = CONTENT_W - labelW - 1.2;
  const startY = 0.95;
  
  bars.slice(0, numBars).forEach((bar, i) => {
    const y = startY + i * rowH;
    const percent = parseInt(bar.percent) || 50;
    const fillW = (barMaxW * percent) / 100;
    
    // Label
    slide.addText(truncateText(bar.label || '', 20), {
      x: MARGIN, y: y + 0.08, w: labelW, h: barH,
      fontSize: 10, color: activeTheme.text, fontFace: 'Arial', align: 'right', valign: 'middle'
    });
    
    // Bar background
    slide.addShape('rect', {
      x: MARGIN + labelW + 0.15, y: y + 0.05, w: barMaxW, h: barH,
      fill: { color: activeTheme.bgAlt }
    });
    
    // Bar fill
    slide.addShape('rect', {
      x: MARGIN + labelW + 0.15, y: y + 0.05, w: fillW, h: barH,
      fill: { color: activeTheme.accent }
    });
    
    // Value
    slide.addText(bar.value || `${percent}%`, {
      x: MARGIN + labelW + 0.25, y: y + 0.08, w: fillW > 0.8 ? fillW - 0.1 : 0.8, h: barH,
      fontSize: 10, bold: true, color: fillW > 0.8 ? activeTheme.bg : activeTheme.accent, fontFace: 'Arial', valign: 'middle'
    });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 40: KPI SCORECARD
// ============================================================
function kpiScorecard(pptx, options = {}) {
  const {
    title = 'KPI Scorecard',
    period = 'Q4 2025',
    kpis = [] // Array of {name, actual, target, status}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 30), {
    x: MARGIN, y: 0.2, w: CONTENT_W - 2, h: 0.4,
    fontSize: 16, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  slide.addText(period, {
    x: CONTENT_W - 1.5, y: 0.2, w: 2, h: 0.4,
    fontSize: 12, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'right'
  });
  
  // Header row
  const colWidths = [3, 1.5, 1.5, 1.5, 1.5];
  const headers = ['KPI', 'Actual', 'Target', 'Variance', 'Status'];
  let xPos = MARGIN;
  
  slide.addShape('rect', { x: MARGIN, y: 0.7, w: CONTENT_W, h: 0.45, fill: { color: activeTheme.accent } });
  
  headers.forEach((h, i) => {
    slide.addText(h, {
      x: xPos, y: 0.75, w: colWidths[i], h: 0.35,
      fontSize: 9, bold: true, color: activeTheme.bg, fontFace: 'Arial', align: i === 0 ? 'left' : 'center'
    });
    xPos += colWidths[i];
  });
  
  // Data rows
  const numKpis = Math.min(kpis.length, 7);
  kpis.slice(0, numKpis).forEach((kpi, i) => {
    const y = 1.2 + i * 0.55;
    const isEven = i % 2 === 0;
    
    slide.addShape('rect', { x: MARGIN, y, w: CONTENT_W, h: 0.5, fill: { color: isEven ? activeTheme.card : activeTheme.bg } });
    
    xPos = MARGIN;
    const variance = kpi.actual && kpi.target ? ((parseFloat(kpi.actual) - parseFloat(kpi.target)) / parseFloat(kpi.target) * 100).toFixed(1) + '%' : '';
    const rowData = [kpi.name, kpi.actual, kpi.target, variance, ''];
    
    rowData.forEach((val, ci) => {
      if (ci < 4) {
        slide.addText(truncateText(val || '', 25), {
          x: xPos + 0.1, y: y + 0.08, w: colWidths[ci] - 0.2, h: 0.35,
          fontSize: 9, color: activeTheme.text, fontFace: 'Arial', align: ci === 0 ? 'left' : 'center'
        });
      }
      xPos += colWidths[ci];
    });
    
    // Status indicator
    const statusColor = kpi.status === 'green' ? '4CAF50' : kpi.status === 'yellow' ? 'FFC107' : kpi.status === 'red' ? 'F44336' : activeTheme.textMuted;
    slide.addShape('ellipse', { x: xPos - 1.1, y: y + 0.15, w: 0.25, h: 0.25, fill: { color: statusColor } });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 41: AREA CHART
// ============================================================
function areaChart(pptx, options = {}) {
  const {
    title = 'Growth Trend',
    subtitle = '',
    chartData = [],
    highlights = [] // Array of {value, label}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.25, w: CONTENT_W, h: 0.45,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  if (subtitle) {
    slide.addText(truncateText(subtitle, 60), {
      x: MARGIN, y: 0.65, w: CONTENT_W, h: 0.3,
      fontSize: 10, color: activeTheme.textSecondary, fontFace: 'Arial'
    });
  }
  
  const chartY = subtitle ? 1 : 0.85;
  const chartH = 3.3;
  
  slide.addShape('rect', {
    x: MARGIN, y: chartY, w: CONTENT_W, h: chartH,
    fill: { color: activeTheme.card }, line: { color: activeTheme.cardBorder, width: 1 }
  });
  
  if (chartData.length > 0) {
    slide.addChart(pptx.ChartType.area, chartData, {
      x: MARGIN + 0.1, y: chartY + 0.1, w: CONTENT_W - 0.2, h: chartH - 0.2,
      chartColors: [activeTheme.accent], showLegend: false, lineSmooth: true
    });
  } else {
    slide.addText('[ Area Chart ]', { x: MARGIN, y: chartY + chartH/2 - 0.2, w: CONTENT_W, h: 0.4, fontSize: 14, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Highlight cards below
  const numHighlights = Math.min(highlights.length, 4);
  if (numHighlights > 0) {
    const hlW = (CONTENT_W - (numHighlights - 1) * 0.2) / numHighlights;
    const hlY = chartY + chartH + 0.2;
    
    highlights.slice(0, numHighlights).forEach((hl, i) => {
      const x = MARGIN + i * (hlW + 0.2);
      slide.addShape('rect', { x, y: hlY, w: hlW, h: 0.8, fill: { color: activeTheme.card }, line: { color: activeTheme.accent, width: 1 } });
      slide.addText(hl.value || '', { x, y: hlY + 0.1, w: hlW, h: 0.4, fontSize: 16, bold: true, color: activeTheme.accent, fontFace: 'Arial', align: 'center' });
      slide.addText(truncateText(hl.label || '', 18), { x, y: hlY + 0.48, w: hlW, h: 0.25, fontSize: 8, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center' });
    });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 42: LAPTOP MOCKUP
// ============================================================
function laptopMockup(pptx, options = {}) {
  const {
    title = 'Desktop Experience',
    screenshotPath = null,
    caption = ''
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.2, w: CONTENT_W, h: 0.4,
    fontSize: 16, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
  });
  
  // Laptop screen
  const screenW = 7;
  const screenH = 4;
  const screenX = (SLIDE_W - screenW) / 2;
  const screenY = 0.7;
  
  // Screen bezel
  slide.addShape('rect', {
    x: screenX - 0.15, y: screenY - 0.1, w: screenW + 0.3, h: screenH + 0.2,
    fill: { color: '1A1A1A' }
  });
  
  // Camera dot
  slide.addShape('ellipse', { x: screenX + screenW/2 - 0.04, y: screenY - 0.06, w: 0.08, h: 0.06, fill: { color: '333333' } });
  
  // Screen content
  if (screenshotPath) {
    slide.addImage({ path: screenshotPath, x: screenX, y: screenY, w: screenW, h: screenH, sizing: { type: 'cover', w: screenW, h: screenH } });
  } else {
    slide.addShape('rect', { x: screenX, y: screenY, w: screenW, h: screenH, fill: { color: activeTheme.card } });
    slide.addText('[ Screenshot ]', { x: screenX, y: screenY + screenH/2 - 0.2, w: screenW, h: 0.4, fontSize: 14, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Laptop base
  slide.addShape('trapezoid', {
    x: screenX - 0.5, y: screenY + screenH + 0.1, w: screenW + 1, h: 0.25,
    fill: { color: '2A2A2A' }
  });
  
  // Keyboard area hint
  slide.addShape('rect', {
    x: screenX + screenW/2 - 1, y: screenY + screenH + 0.15, w: 2, h: 0.08,
    fill: { color: '404040' }
  });
  
  // Caption
  if (caption) {
    slide.addText(truncateText(caption, 80), {
      x: MARGIN, y: screenY + screenH + 0.5, w: CONTENT_W, h: 0.35,
      fontSize: 10, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center'
    });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 43: MULTI-DEVICE MOCKUP
// ============================================================
function multiDeviceMockup(pptx, options = {}) {
  const {
    title = 'Responsive Design',
    desktopPath = null,
    tabletPath = null,
    phonePath = null
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.15, w: CONTENT_W, h: 0.35,
    fontSize: 14, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
  });
  
  // Desktop (back, left)
  const deskW = 5; const deskH = 3; const deskX = 0.8; const deskY = 0.8;
  slide.addShape('rect', { x: deskX - 0.1, y: deskY - 0.08, w: deskW + 0.2, h: deskH + 0.16, fill: { color: '1A1A1A' } });
  if (desktopPath) {
    slide.addImage({ path: desktopPath, x: deskX, y: deskY, w: deskW, h: deskH, sizing: { type: 'cover', w: deskW, h: deskH } });
  } else {
    slide.addShape('rect', { x: deskX, y: deskY, w: deskW, h: deskH, fill: { color: activeTheme.card } });
    slide.addText('Desktop', { x: deskX, y: deskY + deskH/2 - 0.15, w: deskW, h: 0.3, fontSize: 12, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  slide.addText('Desktop', { x: deskX, y: deskY + deskH + 0.15, w: deskW, h: 0.25, fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center' });
  
  // Tablet (middle)
  const tabW = 2.5; const tabH = 3.3; const tabX = 5.2; const tabY = 1.2;
  slide.addShape('rect', { x: tabX - 0.08, y: tabY - 0.1, w: tabW + 0.16, h: tabH + 0.2, fill: { color: '1A1A1A' } });
  if (tabletPath) {
    slide.addImage({ path: tabletPath, x: tabX, y: tabY, w: tabW, h: tabH, sizing: { type: 'cover', w: tabW, h: tabH } });
  } else {
    slide.addShape('rect', { x: tabX, y: tabY, w: tabW, h: tabH, fill: { color: activeTheme.card } });
    slide.addText('Tablet', { x: tabX, y: tabY + tabH/2 - 0.15, w: tabW, h: 0.3, fontSize: 11, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  slide.addText('Tablet', { x: tabX, y: tabY + tabH + 0.15, w: tabW, h: 0.25, fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center' });
  
  // Phone (front, right)
  const phoneW = 1.4; const phoneH = 2.8; const phoneX = 7.8; const phoneY = 1.8;
  slide.addShape('roundRect', { x: phoneX - 0.06, y: phoneY - 0.1, w: phoneW + 0.12, h: phoneH + 0.2, fill: { color: '1A1A1A' } });
  if (phonePath) {
    slide.addImage({ path: phonePath, x: phoneX, y: phoneY, w: phoneW, h: phoneH, sizing: { type: 'cover', w: phoneW, h: phoneH } });
  } else {
    slide.addShape('rect', { x: phoneX, y: phoneY, w: phoneW, h: phoneH, fill: { color: activeTheme.card } });
    slide.addText('Phone', { x: phoneX, y: phoneY + phoneH/2 - 0.12, w: phoneW, h: 0.24, fontSize: 9, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  slide.addText('Mobile', { x: phoneX - 0.3, y: phoneY + phoneH + 0.15, w: phoneW + 0.6, h: 0.25, fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center' });
  
  return slide;
}

// ============================================================
// TEMPLATE 44: IMAGE GRID 6-UP
// ============================================================
function imageGrid6(pptx, options = {}) {
  const {
    title = 'Gallery',
    images = [] // Array of {path, caption}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.2, w: CONTENT_W, h: 0.35,
    fontSize: 14, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const cols = 3; const rows = 2;
  const gap = 0.15;
  const imgW = (CONTENT_W - (cols - 1) * gap) / cols;
  const imgH = 2.3;
  const startY = 0.65;
  
  for (let i = 0; i < 6; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = MARGIN + col * (imgW + gap);
    const y = startY + row * (imgH + gap + 0.25);
    const img = images[i] || {};
    
    if (img.path) {
      slide.addImage({ path: img.path, x, y, w: imgW, h: imgH, sizing: { type: 'cover', w: imgW, h: imgH } });
    } else {
      slide.addShape('rect', { x, y, w: imgW, h: imgH, fill: { color: activeTheme.bgAlt }, line: { color: activeTheme.cardBorder, width: 1 } });
      slide.addText(`[ ${i + 1} ]`, { x, y: y + imgH/2 - 0.15, w: imgW, h: 0.3, fontSize: 12, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
    }
    
    if (img.caption) {
      slide.addText(truncateText(img.caption, 25), { x, y: y + imgH + 0.02, w: imgW, h: 0.22, fontSize: 8, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center' });
    }
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 45: IMAGE WITH CALLOUTS
// ============================================================
function imageWithCallouts(pptx, options = {}) {
  const {
    title = 'Product Details',
    imagePath = null,
    callouts = [] // Array of {number, text, position: 'left'|'right'}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.2, w: CONTENT_W, h: 0.35,
    fontSize: 14, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
  });
  
  // Center image
  const imgW = 4.5; const imgH = 4;
  const imgX = (SLIDE_W - imgW) / 2;
  const imgY = 0.75;
  
  if (imagePath) {
    slide.addImage({ path: imagePath, x: imgX, y: imgY, w: imgW, h: imgH, sizing: { type: 'cover', w: imgW, h: imgH } });
  } else {
    slide.addShape('rect', { x: imgX, y: imgY, w: imgW, h: imgH, fill: { color: activeTheme.bgAlt }, line: { color: activeTheme.cardBorder, width: 1 } });
    slide.addText('[ Product Image ]', { x: imgX, y: imgY + imgH/2 - 0.2, w: imgW, h: 0.4, fontSize: 12, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Callouts
  const leftCallouts = callouts.filter(c => c.position !== 'right').slice(0, 3);
  const rightCallouts = callouts.filter(c => c.position === 'right').slice(0, 3);
  
  leftCallouts.forEach((c, i) => {
    const y = imgY + 0.5 + i * 1.1;
    // Callout box
    slide.addShape('rect', { x: MARGIN, y, w: 2, h: 0.8, fill: { color: activeTheme.card }, line: { color: activeTheme.accent, width: 1 } });
    // Number circle
    slide.addShape('ellipse', { x: MARGIN + 0.1, y: y + 0.1, w: 0.3, h: 0.3, fill: { color: activeTheme.accent } });
    slide.addText(String(c.number || i + 1), { x: MARGIN + 0.1, y: y + 0.12, w: 0.3, h: 0.25, fontSize: 10, bold: true, color: activeTheme.bg, fontFace: 'Arial', align: 'center' });
    // Text
    slide.addText(truncateText(c.text || '', 35), { x: MARGIN + 0.5, y: y + 0.15, w: 1.4, h: 0.55, fontSize: 8, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top' });
    // Line to image
    slide.addShape('line', { x: MARGIN + 2, y: y + 0.4, w: imgX - MARGIN - 2.1, h: 0, line: { color: activeTheme.accent, width: 1, dashType: 'dash' } });
  });
  
  rightCallouts.forEach((c, i) => {
    const y = imgY + 0.5 + i * 1.1;
    const boxX = imgX + imgW + 0.4;
    slide.addShape('rect', { x: boxX, y, w: 2, h: 0.8, fill: { color: activeTheme.card }, line: { color: activeTheme.accent, width: 1 } });
    slide.addShape('ellipse', { x: boxX + 1.6, y: y + 0.1, w: 0.3, h: 0.3, fill: { color: activeTheme.accent } });
    slide.addText(String(c.number || i + 4), { x: boxX + 1.6, y: y + 0.12, w: 0.3, h: 0.25, fontSize: 10, bold: true, color: activeTheme.bg, fontFace: 'Arial', align: 'center' });
    slide.addText(truncateText(c.text || '', 35), { x: boxX + 0.1, y: y + 0.15, w: 1.4, h: 0.55, fontSize: 8, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top' });
    slide.addShape('line', { x: imgX + imgW, y: y + 0.4, w: 0.35, h: 0, line: { color: activeTheme.accent, width: 1, dashType: 'dash' } });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 46: HERO IMAGE WITH CTA
// ============================================================
function heroImageCta(pptx, options = {}) {
  const {
    headline = 'Your Headline Here',
    subheadline = '',
    ctaText = 'Get Started',
    imagePath = null
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Full background image
  if (imagePath) {
    slide.addImage({ path: imagePath, x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, sizing: { type: 'cover', w: SLIDE_W, h: SLIDE_H } });
  } else {
    slide.addShape('rect', { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: activeTheme.bgAlt } });
  }
  
  // Gradient overlay
  slide.addShape('rect', { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: '000000', transparency: 50 } });
  
  // Content box
  const boxW = 6; const boxH = 3;
  const boxX = (SLIDE_W - boxW) / 2;
  const boxY = (SLIDE_H - boxH) / 2;
  
  slide.addShape('rect', { x: boxX, y: boxY, w: boxW, h: boxH, fill: { color: 'FFFFFF', transparency: 10 }, line: { color: 'FFFFFF', width: 1 } });
  
  // Headline
  slide.addText(truncateText(headline, 40), {
    x: boxX + 0.3, y: boxY + 0.4, w: boxW - 0.6, h: 0.8,
    fontSize: 24, bold: true, color: 'FFFFFF', fontFace: 'Arial', align: 'center'
  });
  
  // Subheadline
  if (subheadline) {
    slide.addText(truncateText(subheadline, 80), {
      x: boxX + 0.3, y: boxY + 1.3, w: boxW - 0.6, h: 0.5,
      fontSize: 12, color: 'EEEEEE', fontFace: 'Arial', align: 'center'
    });
  }
  
  // CTA Button
  const btnW = 2; const btnH = 0.45;
  slide.addShape('rect', { x: boxX + (boxW - btnW) / 2, y: boxY + boxH - 0.8, w: btnW, h: btnH, fill: { color: activeTheme.accent } });
  slide.addText(ctaText, { x: boxX + (boxW - btnW) / 2, y: boxY + boxH - 0.75, w: btnW, h: 0.35, fontSize: 11, bold: true, color: activeTheme.bg, fontFace: 'Arial', align: 'center' });
  
  return slide;
}

// ============================================================
// TEMPLATE 47: GAUGE CHART
// ============================================================
function gaugeChart(pptx, options = {}) {
  const {
    title = 'Performance Score',
    value = 75,
    maxValue = 100,
    label = 'Score',
    ranges = [] // Array of {min, max, color, label}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.25, w: CONTENT_W, h: 0.45,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
  });
  
  // Gauge placeholder (semi-circle representation)
  const gaugeX = SLIDE_W / 2;
  const gaugeY = 2.8;
  const gaugeR = 1.8;
  
  // Background arc (as series of segments)
  for (let i = 0; i < 10; i++) {
    const segmentColor = i < 3 ? activeTheme.accentDark : i < 7 ? activeTheme.textMuted : activeTheme.accent;
    const angle = Math.PI + (i / 10) * Math.PI;
    const x = gaugeX + Math.cos(angle) * gaugeR - 0.15;
    const y = gaugeY + Math.sin(angle) * gaugeR * 0.6 - 0.1;
    slide.addShape('ellipse', { x, y, w: 0.3, h: 0.2, fill: { color: segmentColor, transparency: 60 } });
  }
  
  // Center value
  slide.addText(String(value), {
    x: gaugeX - 1, y: gaugeY - 0.4, w: 2, h: 0.8,
    fontSize: 48, bold: true, color: activeTheme.accent, fontFace: 'Arial', align: 'center'
  });
  
  slide.addText(label, {
    x: gaugeX - 1, y: gaugeY + 0.4, w: 2, h: 0.35,
    fontSize: 12, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center'
  });
  
  // Range legend
  const defaultRanges = ranges.length ? ranges : [
    { label: 'Low (0-30)', color: activeTheme.accentDark },
    { label: 'Medium (31-70)', color: activeTheme.textMuted },
    { label: 'High (71-100)', color: activeTheme.accent }
  ];
  
  const legendY = gaugeY + 1.2;
  const legendW = CONTENT_W / defaultRanges.length;
  
  defaultRanges.forEach((r, i) => {
    const x = MARGIN + i * legendW;
    slide.addShape('rect', { x: x + legendW/2 - 0.6, y: legendY, w: 0.25, h: 0.25, fill: { color: r.color } });
    slide.addText(r.label, { x: x + legendW/2 - 0.3, y: legendY, w: 1.5, h: 0.3, fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial' });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 48: COMPARISON MATRIX
// ============================================================
function comparisonMatrix(pptx, options = {}) {
  const {
    title = 'Feature Comparison',
    columns = [], // Array of column headers
    rows = [] // Array of {feature, values: []}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.2, w: CONTENT_W, h: 0.35,
    fontSize: 14, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const numCols = Math.min(columns.length, 4);
  const featureColW = 2.5;
  const dataColW = (CONTENT_W - featureColW) / numCols;
  const rowH = 0.55;
  const startY = 0.65;
  
  // Header row
  slide.addShape('rect', { x: MARGIN, y: startY, w: CONTENT_W, h: rowH, fill: { color: activeTheme.accent } });
  slide.addText('Feature', { x: MARGIN + 0.1, y: startY + 0.12, w: featureColW - 0.2, h: 0.35, fontSize: 10, bold: true, color: activeTheme.bg, fontFace: 'Arial' });
  
  columns.slice(0, numCols).forEach((col, i) => {
    slide.addText(truncateText(col, 15), {
      x: MARGIN + featureColW + i * dataColW, y: startY + 0.12, w: dataColW, h: 0.35,
      fontSize: 10, bold: true, color: activeTheme.bg, fontFace: 'Arial', align: 'center'
    });
  });
  
  // Data rows
  const numRows = Math.min(rows.length, 7);
  rows.slice(0, numRows).forEach((row, ri) => {
    const y = startY + rowH + ri * rowH;
    const isEven = ri % 2 === 0;
    
    slide.addShape('rect', { x: MARGIN, y, w: CONTENT_W, h: rowH, fill: { color: isEven ? activeTheme.card : activeTheme.bg } });
    slide.addText(truncateText(row.feature || '', 25), { x: MARGIN + 0.1, y: y + 0.12, w: featureColW - 0.2, h: 0.35, fontSize: 9, color: activeTheme.text, fontFace: 'Arial' });
    
    (row.values || []).slice(0, numCols).forEach((val, ci) => {
      const cellX = MARGIN + featureColW + ci * dataColW;
      if (val === true || val === '✓') {
        slide.addText('✓', { x: cellX, y: y + 0.08, w: dataColW, h: 0.4, fontSize: 14, color: activeTheme.accent, fontFace: 'Arial', align: 'center' });
      } else if (val === false || val === '✗') {
        slide.addText('✗', { x: cellX, y: y + 0.08, w: dataColW, h: 0.4, fontSize: 14, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
      } else {
        slide.addText(truncateText(String(val || ''), 12), { x: cellX, y: y + 0.12, w: dataColW, h: 0.35, fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center' });
      }
    });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 49: CUSTOMER JOURNEY MAP
// ============================================================
function customerJourney(pptx, options = {}) {
  const {
    title = 'Customer Journey',
    stages = [] // Array of {name, touchpoints, emotion, actions}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.15, w: CONTENT_W, h: 0.35,
    fontSize: 14, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const numStages = Math.min(stages.length, 5);
  const stageW = CONTENT_W / numStages;
  const startY = 0.55;
  
  // Journey line
  slide.addShape('rect', { x: MARGIN, y: startY + 1, w: CONTENT_W, h: 0.03, fill: { color: activeTheme.accent } });
  
  stages.slice(0, numStages).forEach((stage, i) => {
    const x = MARGIN + i * stageW;
    
    // Stage header
    slide.addShape('rect', { x: x + 0.1, y: startY, w: stageW - 0.2, h: 0.45, fill: { color: activeTheme.accent } });
    slide.addText(truncateText(stage.name || '', 12), { x: x + 0.1, y: startY + 0.08, w: stageW - 0.2, h: 0.35, fontSize: 10, bold: true, color: activeTheme.bg, fontFace: 'Arial', align: 'center' });
    
    // Connection dot
    slide.addShape('ellipse', { x: x + stageW/2 - 0.12, y: startY + 0.9, w: 0.24, h: 0.24, fill: { color: activeTheme.accent } });
    
    // Stage content card
    slide.addShape('rect', { x: x + 0.1, y: startY + 1.3, w: stageW - 0.2, h: 3.5, fill: { color: activeTheme.card }, line: { color: activeTheme.cardBorder, width: 1 } });
    
    // Emotion indicator
    const emotion = stage.emotion || 'neutral';
    const emotionIcon = emotion === 'happy' ? '😊' : emotion === 'sad' ? '😞' : '😐';
    slide.addText(emotionIcon, { x: x + 0.15, y: startY + 1.4, w: 0.4, h: 0.4, fontSize: 18 });
    
    // Touchpoints
    slide.addText('Touchpoints:', { x: x + 0.15, y: startY + 1.9, w: stageW - 0.3, h: 0.25, fontSize: 8, bold: true, color: activeTheme.accent, fontFace: 'Arial' });
    slide.addText(truncateText(stage.touchpoints || '', 60), { x: x + 0.15, y: startY + 2.15, w: stageW - 0.3, h: 0.8, fontSize: 7, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top' });
    
    // Actions
    slide.addText('Actions:', { x: x + 0.15, y: startY + 3, w: stageW - 0.3, h: 0.25, fontSize: 8, bold: true, color: activeTheme.accent, fontFace: 'Arial' });
    slide.addText(truncateText(stage.actions || '', 60), { x: x + 0.15, y: startY + 3.25, w: stageW - 0.3, h: 0.8, fontSize: 7, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top' });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 50: PHOTO STRIP (3 horizontal images with text)
// ============================================================
function photoStrip(pptx, options = {}) {
  const {
    title = '',
    photos = [] // Array of {path, title, description}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  if (title) {
    slide.addText(truncateText(title.toUpperCase(), 40), {
      x: MARGIN, y: 0.2, w: CONTENT_W, h: 0.35,
      fontSize: 14, bold: true, color: activeTheme.text, fontFace: 'Arial'
    });
  }
  
  const numPhotos = Math.min(photos.length || 3, 3);
  const photoW = (CONTENT_W - 0.3) / numPhotos;
  const photoH = 3;
  const startY = title ? 0.65 : 0.5;
  
  for (let i = 0; i < numPhotos; i++) {
    const x = MARGIN + i * (photoW + 0.15);
    const photo = photos[i] || {};
    
    // Photo
    if (photo.path) {
      slide.addImage({ path: photo.path, x, y: startY, w: photoW, h: photoH, sizing: { type: 'cover', w: photoW, h: photoH } });
    } else {
      slide.addShape('rect', { x, y: startY, w: photoW, h: photoH, fill: { color: activeTheme.bgAlt }, line: { color: activeTheme.cardBorder, width: 1 } });
      slide.addText(`[ Photo ${i + 1} ]`, { x, y: startY + photoH/2 - 0.15, w: photoW, h: 0.3, fontSize: 12, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
    }
    
    // Text below
    if (photo.title) {
      slide.addText(truncateText(photo.title, 25), { x, y: startY + photoH + 0.15, w: photoW, h: 0.35, fontSize: 11, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center' });
    }
    if (photo.description) {
      slide.addText(truncateText(photo.description, 60), { x, y: startY + photoH + 0.5, w: photoW, h: 0.6, fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center', valign: 'top' });
    }
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 51: SPLIT SCREEN COMPARISON (2 large images side by side)
// ============================================================
function splitScreenImages(pptx, options = {}) {
  const {
    leftImage = null,
    rightImage = null,
    leftLabel = '',
    rightLabel = ''
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  const halfW = SLIDE_W / 2 - 0.05;
  
  // Left image
  if (leftImage) {
    slide.addImage({ path: leftImage, x: 0, y: 0, w: halfW, h: SLIDE_H, sizing: { type: 'cover', w: halfW, h: SLIDE_H } });
  } else {
    slide.addShape('rect', { x: 0, y: 0, w: halfW, h: SLIDE_H, fill: { color: activeTheme.bgAlt } });
    slide.addText('[ Left Image ]', { x: 0, y: SLIDE_H/2 - 0.2, w: halfW, h: 0.4, fontSize: 14, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Right image
  if (rightImage) {
    slide.addImage({ path: rightImage, x: halfW + 0.1, y: 0, w: halfW, h: SLIDE_H, sizing: { type: 'cover', w: halfW, h: SLIDE_H } });
  } else {
    slide.addShape('rect', { x: halfW + 0.1, y: 0, w: halfW, h: SLIDE_H, fill: { color: activeTheme.accent, transparency: 80 } });
    slide.addText('[ Right Image ]', { x: halfW + 0.1, y: SLIDE_H/2 - 0.2, w: halfW, h: 0.4, fontSize: 14, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Labels at bottom
  if (leftLabel) {
    slide.addShape('rect', { x: 0, y: SLIDE_H - 0.6, w: halfW, h: 0.6, fill: { color: '000000', transparency: 40 } });
    slide.addText(leftLabel, { x: 0.2, y: SLIDE_H - 0.5, w: halfW - 0.4, h: 0.4, fontSize: 12, bold: true, color: 'FFFFFF', fontFace: 'Arial' });
  }
  if (rightLabel) {
    slide.addShape('rect', { x: halfW + 0.1, y: SLIDE_H - 0.6, w: halfW, h: 0.6, fill: { color: '000000', transparency: 40 } });
    slide.addText(rightLabel, { x: halfW + 0.3, y: SLIDE_H - 0.5, w: halfW - 0.4, h: 0.4, fontSize: 12, bold: true, color: 'FFFFFF', fontFace: 'Arial' });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 52: STACKED BAR CHART
// ============================================================
function stackedBarChart(pptx, options = {}) {
  const {
    title = 'Breakdown Analysis',
    chartData = [],
    description = ''
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.25, w: CONTENT_W, h: 0.45,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const chartW = description ? 6 : CONTENT_W;
  const chartH = 4;
  const chartY = 0.9;
  
  slide.addShape('rect', { x: MARGIN, y: chartY, w: chartW, h: chartH, fill: { color: activeTheme.card }, line: { color: activeTheme.cardBorder, width: 1 } });
  
  if (chartData.length > 0) {
    slide.addChart(pptx.ChartType.bar, chartData, {
      x: MARGIN + 0.1, y: chartY + 0.1, w: chartW - 0.2, h: chartH - 0.2,
      chartColors: [activeTheme.accent, activeTheme.accentLight, activeTheme.accentDark, activeTheme.textMuted],
      barGrouping: 'stacked', showLegend: true, legendPos: 'b'
    });
  } else {
    slide.addText('[ Stacked Bar Chart ]', { x: MARGIN, y: chartY + chartH/2 - 0.2, w: chartW, h: 0.4, fontSize: 14, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Description sidebar
  if (description) {
    const descX = MARGIN + chartW + 0.25;
    const descW = CONTENT_W - chartW - 0.25;
    slide.addShape('rect', { x: descX, y: chartY, w: descW, h: chartH, fill: { color: activeTheme.card }, line: { color: activeTheme.accent, width: 1 } });
    slide.addText('Key Takeaways', { x: descX + 0.15, y: chartY + 0.15, w: descW - 0.3, h: 0.35, fontSize: 11, bold: true, color: activeTheme.accent, fontFace: 'Arial' });
    slide.addText(truncateText(description, 250), { x: descX + 0.15, y: chartY + 0.55, w: descW - 0.3, h: chartH - 0.7, fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top' });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 53: METRICS STRIP (horizontal row of big numbers)
// ============================================================
function metricsStrip(pptx, options = {}) {
  const {
    title = '',
    metrics = [], // Array of {value, label, sublabel}
    style = 'cards' // 'cards' or 'minimal'
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  const startY = title ? 1.2 : 0.8;
  
  if (title) {
    slide.addText(truncateText(title.toUpperCase(), 50), {
      x: MARGIN, y: 0.4, w: CONTENT_W, h: 0.5,
      fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
    });
  }
  
  const numMetrics = Math.min(metrics.length, 5);
  const gap = style === 'cards' ? 0.2 : 0;
  const metricW = (CONTENT_W - (numMetrics - 1) * gap) / numMetrics;
  const metricH = 3.2;
  
  metrics.slice(0, numMetrics).forEach((m, i) => {
    const x = MARGIN + i * (metricW + gap);
    
    if (style === 'cards') {
      slide.addShape('rect', { x, y: startY, w: metricW, h: metricH, fill: { color: activeTheme.card }, line: { color: activeTheme.cardBorder, width: 1 } });
    }
    
    // Accent bar at top
    slide.addShape('rect', { x: x + 0.2, y: startY + 0.2, w: metricW - 0.4, h: 0.05, fill: { color: activeTheme.accent } });
    
    // Big value
    slide.addText(truncateText(m.value || '', 10), {
      x, y: startY + 0.5, w: metricW, h: 1.2,
      fontSize: 36, bold: true, color: activeTheme.accent, fontFace: 'Arial', align: 'center', valign: 'middle'
    });
    
    // Label
    slide.addText(truncateText(m.label || '', 20), {
      x, y: startY + 1.8, w: metricW, h: 0.4,
      fontSize: 11, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
    });
    
    // Sublabel
    if (m.sublabel) {
      slide.addText(truncateText(m.sublabel, 25), {
        x, y: startY + 2.25, w: metricW, h: 0.35,
        fontSize: 9, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center'
      });
    }
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 54: IMAGE OVERLAY TEXT (text over darkened image)
// ============================================================
function imageOverlayText(pptx, options = {}) {
  const {
    imagePath = null,
    title = 'Title Here',
    bullets = [],
    position = 'left' // 'left', 'right', 'center'
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  // Full background image
  if (imagePath) {
    slide.addImage({ path: imagePath, x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, sizing: { type: 'cover', w: SLIDE_W, h: SLIDE_H } });
  } else {
    slide.addShape('rect', { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: activeTheme.bgAlt } });
  }
  
  // Overlay
  slide.addShape('rect', { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: '000000', transparency: 45 } });
  
  // Content positioning
  let textX, textW;
  if (position === 'left') { textX = MARGIN; textW = 5; }
  else if (position === 'right') { textX = SLIDE_W - 5.5; textW = 5; }
  else { textX = 1.5; textW = SLIDE_W - 3; }
  
  // Title
  slide.addText(truncateText(title.toUpperCase(), 35), {
    x: textX, y: 1, w: textW, h: 0.7,
    fontSize: 22, bold: true, color: 'FFFFFF', fontFace: 'Arial'
  });
  
  // Accent line
  slide.addShape('rect', { x: textX, y: 1.8, w: 1.5, h: 0.05, fill: { color: activeTheme.accent } });
  
  // Bullets
  bullets.slice(0, 5).forEach((bullet, i) => {
    slide.addText('• ' + truncateText(bullet, 50), {
      x: textX, y: 2.1 + i * 0.55, w: textW, h: 0.5,
      fontSize: 12, color: 'EEEEEE', fontFace: 'Arial'
    });
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 55: TIMELINE VERTICAL
// ============================================================
function timelineVertical(pptx, options = {}) {
  const {
    title = 'Timeline',
    events = [] // Array of {date, title, description}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.2, w: CONTENT_W, h: 0.35,
    fontSize: 14, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  const numEvents = Math.min(events.length, 5);
  const lineX = MARGIN + 1.5;
  const startY = 0.7;
  const eventH = (SLIDE_H - startY - 0.3) / numEvents;
  
  // Vertical line
  slide.addShape('rect', { x: lineX - 0.02, y: startY, w: 0.04, h: numEvents * eventH - 0.3, fill: { color: activeTheme.accent } });
  
  events.slice(0, numEvents).forEach((event, i) => {
    const y = startY + i * eventH;
    
    // Date on left
    slide.addText(truncateText(event.date || '', 10), {
      x: MARGIN, y: y + 0.1, w: 1.3, h: 0.35,
      fontSize: 10, bold: true, color: activeTheme.accent, fontFace: 'Arial', align: 'right'
    });
    
    // Node
    slide.addShape('ellipse', { x: lineX - 0.12, y: y + 0.12, w: 0.24, h: 0.24, fill: { color: activeTheme.accent } });
    
    // Content card on right
    slide.addShape('rect', { x: lineX + 0.3, y, w: CONTENT_W - 2.3, h: eventH - 0.15, fill: { color: activeTheme.card }, line: { color: activeTheme.cardBorder, width: 1 } });
    
    slide.addText(truncateText(event.title || '', 35), {
      x: lineX + 0.4, y: y + 0.1, w: CONTENT_W - 2.6, h: 0.35,
      fontSize: 10, bold: true, color: activeTheme.text, fontFace: 'Arial'
    });
    
    if (event.description) {
      slide.addText(truncateText(event.description, 100), {
        x: lineX + 0.4, y: y + 0.45, w: CONTENT_W - 2.6, h: eventH - 0.65,
        fontSize: 8, color: activeTheme.textSecondary, fontFace: 'Arial', valign: 'top'
      });
    }
  });
  
  return slide;
}

// ============================================================
// TEMPLATE 56: QUOTE WITH IMAGE
// ============================================================
function quoteWithImage(pptx, options = {}) {
  const {
    quote = 'Your quote here',
    author = '',
    role = '',
    imagePath = null,
    imageOnRight = true
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  const imgW = 4;
  const textW = SLIDE_W - imgW;
  const imgX = imageOnRight ? SLIDE_W - imgW : 0;
  const textX = imageOnRight ? 0 : imgW;
  
  // Image
  if (imagePath) {
    slide.addImage({ path: imagePath, x: imgX, y: 0, w: imgW, h: SLIDE_H, sizing: { type: 'cover', w: imgW, h: SLIDE_H } });
  } else {
    slide.addShape('rect', { x: imgX, y: 0, w: imgW, h: SLIDE_H, fill: { color: activeTheme.bgAlt } });
    slide.addText('[ Image ]', { x: imgX, y: SLIDE_H/2 - 0.2, w: imgW, h: 0.4, fontSize: 14, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
  }
  
  // Quote area
  slide.addShape('rect', { x: textX, y: 0, w: textW, h: SLIDE_H, fill: { color: activeTheme.card } });
  
  // Large quote mark
  slide.addText('"', { x: textX + 0.5, y: 0.8, w: 1, h: 1.2, fontSize: 72, color: activeTheme.accent, fontFace: 'Georgia' });
  
  // Quote text
  slide.addText(truncateText(quote, 300), {
    x: textX + 0.6, y: 1.8, w: textW - 1.2, h: 2.2,
    fontSize: 14, color: activeTheme.text, italic: true, fontFace: 'Georgia', valign: 'top'
  });
  
  // Author
  slide.addText(author, {
    x: textX + 0.6, y: 4.2, w: textW - 1.2, h: 0.4,
    fontSize: 12, bold: true, color: activeTheme.text, fontFace: 'Arial'
  });
  
  // Role
  if (role) {
    slide.addText(role, {
      x: textX + 0.6, y: 4.55, w: textW - 1.2, h: 0.35,
      fontSize: 10, color: activeTheme.textSecondary, fontFace: 'Arial'
    });
  }
  
  return slide;
}

// ============================================================
// TEMPLATE 57: LOGO GRID (partner/client logos)
// ============================================================
function logoGrid(pptx, options = {}) {
  const {
    title = 'Our Partners',
    subtitle = '',
    logos = [] // Array of {path, name}
  } = options;
  
  const slide = pptx.addSlide({ masterName: 'MASTER' });
  
  slide.addText(truncateText(title.toUpperCase(), 40), {
    x: MARGIN, y: 0.3, w: CONTENT_W, h: 0.5,
    fontSize: 18, bold: true, color: activeTheme.text, fontFace: 'Arial', align: 'center'
  });
  
  if (subtitle) {
    slide.addText(truncateText(subtitle, 60), {
      x: MARGIN, y: 0.8, w: CONTENT_W, h: 0.35,
      fontSize: 11, color: activeTheme.textSecondary, fontFace: 'Arial', align: 'center'
    });
  }
  
  const numLogos = Math.min(logos.length || 8, 8);
  const cols = numLogos <= 4 ? numLogos : 4;
  const rows = Math.ceil(numLogos / cols);
  const logoW = (CONTENT_W - 0.6) / cols;
  const logoH = rows === 1 ? 2.5 : 1.5;
  const startY = subtitle ? 1.3 : 1.1;
  
  for (let i = 0; i < numLogos; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = MARGIN + col * (logoW + 0.2);
    const y = startY + row * (logoH + 0.4);
    const logo = logos[i] || {};
    
    slide.addShape('rect', { x, y, w: logoW, h: logoH, fill: { color: activeTheme.card }, line: { color: activeTheme.cardBorder, width: 1 } });
    
    if (logo.path) {
      slide.addImage({ path: logo.path, x: x + 0.2, y: y + 0.2, w: logoW - 0.4, h: logoH - 0.4, sizing: { type: 'contain' } });
    } else {
      slide.addText(logo.name || `Logo ${i + 1}`, { x, y: y + logoH/2 - 0.15, w: logoW, h: 0.3, fontSize: 10, color: activeTheme.textMuted, fontFace: 'Arial', align: 'center' });
    }
  }
  
  return slide;
}

// ============================================================
// COMPLETE EXPORTS - ALL 57 TEMPLATES
// ============================================================
const completeExports = {
  // Setup & utilities
  initTheme, getThemeNames, THEMES, truncateText,
  SLIDE_W, SLIDE_H, MARGIN, CONTENT_W, CONTENT_H,
  
  // Core templates (1-13)
  titleSlide, sectionDivider, contentCards, comparison, statistics,
  timeline, bulletList, quote, dataTable, conclusion,
  chartSlide, processFlow, statisticsDashboard,
  
  // Image templates (14-23)
  imageTextSplit, fullBleedImage, imageGallery, featureShowcase,
  teamGrid, chartComparison, bigNumberHero, beforeAfter,
  iconFeatures, multiChartDashboard,
  
  // Visual templates (24-37)
  imageMosaic, screenshotShowcase, pieChartSlide, lineChartAnnotated,
  funnelChart, progressBars, imageWithStats, testimonialWithPhoto,
  caseStudy, pricingTable, swotAnalysis, roadmapVisual,
  phoneMockup, iconGrid,
  
  // Chart templates (38-42)
  donutWithStat, horizontalBarChart, kpiScorecard, areaChart, laptopMockup,
  
  // Advanced templates (43-50)
  multiDeviceMockup, imageGrid6, imageWithCallouts, heroImageCta,
  gaugeChart, comparisonMatrix, customerJourney, photoStrip,
  
  // Pro templates (51-57)
  splitScreenImages, stackedBarChart, metricsStrip, imageOverlayText,
  timelineVertical, quoteWithImage, logoGrid
};

Object.assign(module.exports, completeExports);
