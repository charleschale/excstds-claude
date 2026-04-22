---
name: presentation-builder
description: Create research-backed, fact-checked PowerPoint presentations using 57 professional templates and 7 color themes. Use when Claude needs to create presentations (.pptx files) with professional layouts, charts, images, and data visualization. Enforces deep research, iterative quality review, source citations, and hallucination prevention.
---

# Professional Presentation Skill v2

Create research-backed, fact-checked PowerPoint presentations using 57 professional templates and 7 color themes. This skill enforces deep research, iterative quality review, and hallucination prevention.

## CRITICAL: THE COMPLETE WORKFLOW

```
RESEARCH → PLAN → RESEARCH AGAIN → BUILD → VISUALS → REVIEW (loop) → FACT-CHECK (loop) → SOURCES → DELIVER
```

**EVERY REVIEW STEP IS ITERATIVE** - Keep looping until ALL checks pass.

## FILE LOCATIONS

```
Templates:     ./scripts/slide-templates-fixed.js (relative to this skill)
Output:        /mnt/user-data/outputs/
Working:       /home/claude/
Sources Doc:   /home/claude/sources.md (create this during research)
```

## PHASE 1: DEEP RESEARCH

**Do NOT skip this. Do NOT start outlining without research.**

Use web search to deeply research the topic:

```
RESEARCH CHECKLIST:
[ ] Search for overview/background on topic
[ ] Search for recent news/developments
[ ] Search for statistics and data
[ ] Search for expert opinions/quotes
[ ] Search for case studies/examples
[ ] Search for images/visuals that exist
[ ] Search for competing viewpoints
```

**Create a sources document immediately** at `/home/claude/sources.md`:

```markdown
# Sources for [Presentation Title]

## Background
- [Source 1 title](URL) - Key fact: "..."

## Statistics
- [Source 3 title](URL) - Stat: X% of Y do Z

## Quotes
- [Source 5 title](URL) - "[Quote]" - Person, Title
```

Before moving to Phase 2, you should have:
- 10+ sources documented
- 5+ statistics with citations
- 2+ expert quotes
- Understanding of key themes

## PHASE 2: INITIAL PLANNING

Create an outline identifying DATA GAPS:

```markdown
# Presentation Outline: [Title]

## Theme Selection: [theme name]

## Section 1: [Name]
- Slide: [template] - [content]
  - DATA NEEDED: [specific stat needed]
  - IMAGE NEEDED: [description]

## DATA GAPS SUMMARY:
1. [ ] Need: Market size for X
2. [ ] Need: Growth rate for Y
```

## PHASE 3: RESEARCH AGAIN (Fill Gaps)

For EACH data gap identified, research and fill:

```
DATA GAP: Market size for renewable energy
SEARCH: "renewable energy market size 2024 statistics"
FOUND: $1.2 trillion (Source: IEA)
ADDED TO: sources.md
```

**NEVER use made-up chart data. Every number needs a source.**

## PHASE 4: FINALIZE PLAN

Create the final outline with ALL data included, every slide planned, every statistic sourced.

## PHASE 5: BUILD THE PRESENTATION

```javascript
const PptxGenJS = require('pptxgenjs');
const templates = require('./scripts/slide-templates-fixed.js');

async function createPresentation() {
  const pptx = new PptxGenJS();
  pptx.title = 'YOUR TITLE';
  
  const THEME = 'elegantSage';
  templates.initTheme(pptx, THEME);
  
  // === SLIDES GO HERE ===
  
  await pptx.writeFile({ fileName: '/mnt/user-data/outputs/presentation.pptx' });
}

createPresentation();
```

### Building Rules
1. Follow your finalized plan exactly
2. Use REAL data from your research
3. Include source citations
4. Never use placeholder text
5. Never repeat the same template back-to-back

### NO EMOJIS AS VISUALS
If you cannot generate a real image, use a different template that doesn't require icons.

## PHASE 6: GENERATE VISUALS

For EVERY image placeholder, generate real images. For charts, use researched data only.

## PHASE 7: VISUAL REVIEW (Iterative)

### The 6-Point Visual Checklist

For EVERY slide, check:

| # | Check | If FAIL |
|---|-------|---------|
| 1 | Color scheme adherence? | Remove hardcoded colors, regenerate |
| 2 | Any text overlap? | Shorten text, regenerate, re-check |
| 3 | Any text cut off? | Reduce content, regenerate, re-check |
| 4 | Can anything be added? | Add content, regenerate, re-check |
| 5 | Visually pleasing? | Adjust template, regenerate, re-check |
| 6 | Charts/images make sense? | Replace with appropriate visual, re-check |

**Do NOT proceed until ALL slides pass ALL checks.**

## PHASE 8: FACT-CHECK (Iterative)

Go through EVERY slide and verify EVERY claim against sources:

```
- Claim: "Market size $1.2 trillion"
  Source: IEA World Energy Outlook 2024
  Verify: Search "IEA renewable energy market size 2024"
  Result: CONFIRMED
  Status: ✓ ACCURATE
```

### Common Hallucination Patterns to Check
- Round numbers that seem too perfect
- Percentages (very commonly hallucinated)
- Dates and timelines
- Quote attributions
- Market sizes and valuations
- Growth rates
- Rankings ("largest", "first", "only")

## PHASE 9: ADD SOURCES

Add a sources slide at the END of your presentation listing all citations.

## PHASE 10: FINAL DELIVERY

Provide to user:
1. `presentation.pptx` - The final presentation
2. `sources.md` - Complete source documentation

## THEME SELECTION

| Content About... | Use Theme |
|------------------|-----------|
| Nature, sustainability, wellness | `elegantSage` |
| Water, ocean, tech, corporate | `cleanBlue` |
| Luxury, premium, environmental | `forestDark` |
| Creative, lifestyle, food | `warmMinimal` |
| Legal, consulting, business | `navyProfessional` |
| Energy, sports, bold | `crimsonBold` |
| Modern tech, startups | `charcoalDark` |

## TEMPLATE CATEGORIES

**Data/Charts:** `statistics`, `statisticsDashboard`, `bigNumberHero`, `chartSlide`, `pieChartSlide`, `funnelChart`, `progressBars`, `horizontalBarChart`, `kpiScorecard`, `dataTable`, `donutWithStat`, `areaChart`, `stackedBarChart`, `gaugeChart`, `lineChartAnnotated`, `comparisonMatrix`, `metricsStrip`

**Images:** `imageTextSplit`, `fullBleedImage`, `imageGallery`, `screenshotShowcase`, `beforeAfter`, `imageMosaic`, `imageGrid6`, `imageWithStats`, `imageWithCallouts`, `splitScreenImages`, `photoStrip`, `imageOverlayText`, `heroImageCta`, `laptopMockup`, `phoneMockup`, `multiDeviceMockup`, `quoteWithImage`

**Text/Content:** `titleSlide`, `sectionDivider`, `contentCards`, `comparison`, `bulletList`, `quote`, `conclusion`, `processFlow`, `timeline`, `timelineVertical`

**Business:** `caseStudy`, `teamGrid`, `testimonialWithPhoto`, `roadmapVisual`, `pricingTable`, `swotAnalysis`, `customerJourney`, `logoGrid`, `iconFeatures`, `iconGrid`, `featureShowcase`, `chartComparison`, `multiChartDashboard`

## REMEMBER

1. **RESEARCH FIRST** - No outline without deep research
2. **IDENTIFY DATA GAPS** - Plan what you need, then get it
3. **RESEARCH AGAIN** - Fill all gaps before building
4. **SOURCE EVERYTHING** - Every stat needs a citation
5. **NO EMOJIS** - Generate real images or use different template
6. **REAL CHART DATA** - Never make up numbers
7. **ITERATIVE REVIEW** - Loop until ALL checks pass
8. **FACT-CHECK** - Verify every claim against sources
9. **CITE SOURCES** - Add sources slide at end
10. **NO HALLUCINATIONS** - If unsure, research more
