# CURRICULUMIQ V2 — COMPLETE UI/UX SPECIFICATION

> This document specifies EVERY visual and interactive detail. Any AI using this
> spec can rebuild the UI identically. No detail omitted.

---

## PART 1: DESIGN TOKENS

### 1.1 Color System

#### Base Palette (Dark Theme — used on 95% of pages)

```
BACKGROUNDS
  bg-root:      #0A0A0F    ← page body (purest dark)
  bg-surface:   #13131C    ← cards, inputs, overlays (70% opacity: #13131C/70)
  bg-elevated:  #1C1C2A    ← hover states, skeleton shimmer
  bg-hover:     #232336    ← deep hover, active states

PRIMARY (Indigo — the main accent)
  primary:      #6366F1    ← links, active states, badges, icons
  primary-600:  #4F46E5    ← primary hover
  primary-400:  #818CF8    ← lighter primary text
  primary-transparent variants used throughout:
    bg-[#6366F1]/10  ← icon container backgrounds
    bg-[#6366F1]/20  ← active nav, badge backgrounds
    bg-[#6366F1]/40  ← hover borders

SECONDARY (Red — auth pages and special accents only)
  red-500:      #ff0033    ← primary CTA gradient start
  red-400:      #ff3366    ← gradient mid
  red-600:      #DC2626    ← danger variant
  red-700:      #B91C1C    ← danger hover

SEMANTIC COLORS
  success:      #10B981 / #22C55E    ← matched skills, "done" states
  danger:       #EF4444 / #f87171    ← gaps, errors
  warning:      #F59E0B / #fbbf24    ← medium priority, in-progress
  info:         #3B82F6 / #60a5fa    ← informational badges

NEUTRALS (all white alpha variants)
  text-primary:    #FFFFFF           ← headings
  text-secondary:  rgba(255,255,255,0.7)  ← body text
  text-tertiary:   rgba(255,255,255,0.5)  ← labels, meta info
  text-quaternary: rgba(255,255,255,0.3)  ← placeholders
  text-hint:       rgba(255,255,255,0.4)  ← subtitles, hints
  border-default:  rgba(255,255,255,0.08) ← card borders
  border-hover:    rgba(255,255,255,0.15) ← hover borders
  border-strong:   rgba(255,255,255,0.25) ← active borders
```

#### Glass Variable System (CSS Custom Properties)

```css
--glass-bg:            rgba(19, 19, 28, 0.6)
--glass-bg-light:      rgba(19, 19, 28, 0.4)
--glass-border:        rgba(255, 255, 255, 0.08)
--glass-border-strong: rgba(255, 255, 255, 0.15)
--glass-bg-solid:      rgba(15, 15, 15, 0.8)
```

#### Color-Coded Demand System

```
Demand Score  →  Badge Color  →  Progress Bar Color
─────────────────────────────────────────────────────
  ≥80%         →  indigo bg    →  #6366F1 (indigo bar)
  60-79%       →  white/10 bg  →  #818CF8 (light indigo)
  <60%         →  white/5 bg   →  rgba(255,255,255,0.2) (grey)
  ≥85% (live)  →  danger red   →  red bar
  ≥70% (live)  →  warning      →  amber bar
  <70% (live)  →  success      →  green bar

Readiness Score → Gauge Color
  ≥70%          →  #10B981 (green/emerald)
  ≥50%          →  #F59E0B (amber/yellow)
  <50%          →  #EF4444 (red)
```

#### Skill Gradient System (15 deterministic pairs)

Skills cards get a gradient determined by a hash of the skill name.
Each card gets: dark-from → lighter-to.

```javascript
GRADIENT_PAIRS (applied as linear-gradient(135deg, from, to)):
  ["#312E81", "#6366F1"]   ← dark indigo → indigo
  ["#0F766E", "#14B8A6"]   ← teal
  ["#4338CA", "#818CF8"]   ← indigo → light indigo
  ["#BE185D", "#EC4899"]   ← pink
  ["#7C3AED", "#A78BFA"]   ← violet → lavender
  ["#0369A1", "#38BDF8"]   ← sky blue
  ["#B45309", "#FBBF24"]   ← amber
  ["#047857", "#34D399"]   ← emerald
  ["#701A75", "#D946EF"]   ← fuchsia
  ["#1F2937", "#6B7280"]   ← slate → grey
  ["#B91C1C", "#F87171"]   ← red → light red
  ["#3730A3", "#A5B4FC"]   ← indigo → blue
  ["#065F46", "#6EE7B7"]   ← green → mint
  ["#92400E", "#FB923C"]   ← orange
  ["#4B5563", "#9CA3AF"]   ← grey → light grey

Hash algorithm: FNV-1a hash of skill name string, modulo 15.
```

---

### 1.2 Typography

```
Font Stack:
  Primary:    'Inter', var(--font-inter), sans-serif
  Serif:      'Source Serif 4', serif         ← Bloom page only
  Brand:      'TT Norms Pro'                   ← Halo page only

Font Sizes:
  Page title:     text-2xl   (24px)  font-semibold
  Section title:  text-lg    (18px)  font-semibold
  Card title:     text-xl    (20px)  font-bold
  Card subtitle:  text-sm    (14px)  font-medium
  Body text:      text-sm    (14px)  text-white/70
  Label text:     text-xs    (12px)  text-white/50
  Badge text:     text-xs    (12px)  font-semibold
  Button text:    text-sm    (14px)  font-semibold (md)
  Button text:    text-base  (16px)  font-semibold (lg)
  Hero heading:   up to text-5xl (48px) font-bold
  Hero sub:       text-lg    (18px)  text-white/50

Font Weights:
  400: body text
  500: labels, buttons
  600: semibold (subheadings, nav items)
  700: bold (card titles)
  Font display class: font-display text-xl font-bold tracking-tight

Line Heights:
  Body:      leading-relaxed (1.625)
  Headings:  tight (1.25)
  Buttons:   normal (1.5)

Letter Spacing:
  Card titles: tracking-tight
  Badges:      normal (letter-spacing: 0)
```

---

### 1.3 Spacing System

```
Component padding:
  Card inner:         p-6   (24px)
  Card inner (tight): p-5   (20px)
  Card inner (dense): p-4   (16px)
  Button padding:     px-6 py-3  (md)
  Button padding:     px-4 py-2  (sm)
  Input padding:      px-4 py-3   ← 16px horizontal, 12px vertical
  Input inner:        pl-10  (for icon inputs)  pr-10  (for toggle icons)

Page padding:
  Dashboard content:  p-8 pb-24   (32px sides, 96px bottom for floating nav)
  Content max-width:  max-w-6xl   or max-w-7xl  or max-w-6xl mx-auto

Gaps:
  Section gap:        space-y-8   (32px between major sections)
  Card grid gap:      gap-4       (16px)
  Card grid gap lg:   gap-6       (24px)
  Element gap:        gap-2, gap-3, gap-4 as needed

Border radius:
  Cards:             rounded-xl   (12px)
  Cards (tight):     rounded-lg   (8px)
  Cards (hero):      rounded-2xl  (16px)
  Buttons:           rounded-xl   (12px)
  Buttons (lg):      rounded-2xl  (16px)
  Buttons (sm):      rounded-lg   (8px)
  Badges:            rounded-sm   (4px)
  Bottom nav:        rounded-2xl  (16px)
  Inputs:            rounded-lg   (8px)

Shadows:
  Card default:      var(--shadow-sm)  = 0 1px 3px rgba(0,0,0,0.3)
  Card hover:        var(--shadow-md)  = 0 4px 12px rgba(0,0,0,0.4)
  Card elevated:     var(--shadow-lg)  = 0 8px 24px rgba(0,0,0,0.5)
  Glow buttons:      shadow-[0_0_30px_rgba(255,0,51,0.4)]    ← hover up to 50px
```

---

### 1.4 Animation System (Framer Motion)

#### Spring Physics Presets

```javascript
// Standard spring — used for card entrance, page transitions
spring: {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 1,
  restDelta: 0.001,
  restSpeed: 0.01
}

// Bouncy spring — used for button hover/tap
springBouncy: {
  type: "spring",
  stiffness: 600,
  damping: 15,
  mass: 0.8
}

// Gentle spring — used for soft entrance animations
springGentle: {
  type: "spring",
  stiffness: 200,
  damping: 30,
  mass: 1.2
}

// Snap transition — used for button tap feedback
snap: { duration: 0.2, ease: [0.5, 0, 0.5, 1] }

// Smooth ease — used for page transitions
smooth: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }
```

#### Entrance Animation (every card/page uses one of these)

```javascript
// Standard card entrance
{
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }        // or spring for bouncier feel
}

// With stagger (grid of cards — 50ms between each)
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  {items.map((item, i) => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1, y: 0,
          transition: { duration: 0.4, delay: i * 0.05 }
        }
      }}
    />
  ))}
</motion.div>

// Page-level entrance (full page components)
{
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: smooth
}
```

#### Hover Animation (every interactive card)

```javascript
// Card hover (the standard)
whileHover: { scale: 1.02, y: -8 }    // lift 8px + scale 1.02
whileTap:  { scale: 0.98 }             // shrink on click

// Button hover
whileHover: { scale: 1.05 }            // scale up 5%
whileTap:  { scale: 0.95 }             // scale down 5%

// Nav item hover
whileHover: { scale: 1.05 }            // bottom nav items

// Skill card image on hover
group-hover:scale-105 duration-500      ← CSS class on inner div
```

#### Special Animations

```javascript
// Infinite float (used for decorative elements on landing)
float: {
  animate: {
    y: [-10, 10, -10],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
  }
}

// Large float (heavier elements)
floatLarge: {
  animate: {
    y: [-20, 20, -20],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  }
}

// Blur reveal (skill radar chart, page sections)
blurReveal: {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5 } }
}

// Continuous rotation (icons, decorative)
rotate: {
  animate: { rotate: 360, transition: { duration: 2, repeat: Infinity, ease: "linear" } }
}

// Rotation oscillation
rotateGentle: {
  animate: {
    rotate: [-5, 5, -5],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
}

// Scale pulse (notification badges, live indicators)
scalePulse: {
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
  }
}

// Error state animated enter/exit (AnimatePresence)
{
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 }
}
```

---

### 1.5 Skeleton Loading System

Every loading state uses a specific skeleton that matches the final content shape.

```css
/* Base shimmer animation */
@keyframes skeleton-shine {
  0%   { transform: translateX(-100%) }
  100% { transform: translateX(100%) }
}

@keyframes shimmer {
  0%   { background-position: -200% 0 }
  100% { background-position: 200% 0 }
}

/* Skeleton base */
background: #1C1C2A
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
border-radius: varies by shape (see below)

/* Shimmer overlay (optional for special cards) */
.shimmer {
  background: linear-gradient(90deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.05) 50%,
    rgba(255,255,255,0) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

#### Skeleton Variants (exact shapes)

**StatCardSkeleton** (dashboard stat cards):
```
┌─────────────────────────────┐
│ [36x36 rounded]    [16x16]  │  ← icon + arrow
│ [width 64px height 28px]    │  ← value placeholder
│ [width 96px height 14px]    │  ← label
│ [width 80px height 12px]    │  ← sublabel
└─────────────────────────────┘
bg: #13131C rounded-xl p-5
```

**SkillCardSkeleton** (trending skill cards):
```
┌─────────────────────────────┐
│ [full-width height 160]     │  ← gradient hero placeholder
│ ─────────────────────────── │
│ [width 128px height 16px]   │  ← skill name
│ [width 48px  height 12px]   │  ← location
│ [width 80px  height 12px]   │  ← openings
│ [full-width height 6px]     │  ← progress bar
└─────────────────────────────┘
bg: #13131C rounded-xl overflow-hidden
```

**ChartSkeleton** (chart placeholders):
```
┌─────────────────────────────┐
│ [width 40% height 20px]     │  ← title
│                             │
│  ▌ ▌ ▌  ▌ ▌  │             │  ← bar chart shape (8 bars, random heights)
│                               inside bg: #13131C rounded-xl p-6
└─────────────────────────────┘
```

**PageSkeleton** (full page loading):
```
space-y-8, animate-pulse container
├── header placeholder (2 shimmer lines)
├── stats grid (4x StatCardSkeleton)
├── content grid
│   ├── main: CardSkeleton with image + 3 lines
│   └── sidebar: Skeleton title + ListSkeleton(4)
```

**TableSkeleton**: header row (N columns) + N data rows with evenly distributed widths.

**ListSkeleton**: N rows, each with optional avatar (40x40 circle) + text lines + optional pill.

---

### 1.6 Border & Shadow Reference

```css
/* Card borders by variant */
Card "default":     border: 1px solid rgba(255,255,255,0.08)
Card "glass":       border: 1px solid rgba(255,255,255,0.08)   + backdrop-blur-xl
Card "glass-pro":   border: 1px solid rgba(255,255,255,0.15)   + backdrop-blur-[40px]
Card "gradient":    border: 1px solid rgba(255,255,255,0.10)
Card "floating":    border: 1px solid rgba(255,255,255,0.08)   + backdrop-blur-xl shadow-xl
Card "holographic": border: 1px solid rgba(255,255,255,0.10)   + hover changes to red
Card "depth":       border: 1px solid rgba(255,255,255,0.15)   + inset box-shadows for 3D

/* Focus states */
Input focus:  border-color: #6366F1  +  box-shadow: 0 0 0 3px rgba(99,102,241,0.1)
Button glow:  shadow: 0 0 30px rgba(255,0,51,0.4)  hover: 0 0 50px rgba(255,0,51,0.6)

/* Navigation active state */
Active nav:   bg-[#6366F1]/20 text-[#6366F1] border border-[#6366F1]/30

/* Selection */
::selection:  background: rgba(99,102,241,0.3)  color: white
```

---

### 1.7 Scrollbar

```css
/* Custom thin scrollbar (all pages) */
::-webkit-scrollbar:        width: 6px; height: 6px
::-webkit-scrollbar-track:  background: #13131C
::-webkit-scrollbar-thumb:  background: rgba(255,255,255,0.08)
                           border-radius: 3px
::-webkit-scrollbar-thumb-hover: background: rgba(255,255,255,0.15)
```

---

## PART 2: COMPONENT SPECIFICATIONS

### 2.1 Card Component

```
Component: components/ui/card.tsx
Base element: motion.div (Framer Motion)
Default variant: "glass"

VARIANTS (7):
┌──────────┬──────────────────────────────────────────────────────────────┐
│ Variant  │ Classes                                                      │
├──────────┼──────────────────────────────────────────────────────────────┤
│ default  │ bg-surface border border-border                              │
│ glass    │ bg-surface/70 backdrop-blur-xl border border-borderLight       │
│ glass-pro│ bg-glass-bg backdrop-blur-[40px] border border-glass-border-strong│
│ gradient │ bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border white/10│
│ floating │ bg-glass-bg backdrop-blur-xl border border-glass-border shadow-xl│
│holographic│ bg-transparent backdrop-blur-xl border white/10            │
│ depth    │ bg-glass-bg backdrop-blur-xl border border-glass-border-strong│
└──────────┴──────────────────────────────────────────────────────────────┘

PROPS:
  variant:   "default" | "glass" | "glass-pro" | "gradient"
             "floating" | "holographic" | "depth"  ← default: "glass"
  hover:     boolean  ← enables hover animation (scale + lift)
  glow:      boolean  ← adds red glow shadow
  tilt:      boolean  ← adds 3D tilt effect
  className: string   ← additional classes

ANIMATIONS (automatic):
  Entrance:  initial={{ opacity:0, y:40, scale:0.95 }}
             animate={{ opacity:1, y:0, scale:1 }}
             transition: spring (stiffness:400, damping:25)
  Hover:     whileHover={{ y:-8, scale:1.02 }}  (only if hover=true)
  Tap:       whileTap={{ scale:0.98 }}

SPECIAL EFFECTS BY VARIANT:
  glass-pro / floating:
    → Mouse-tracking spotlight (radial gradient follows cursor)
    → CSS custom props: --mouse-x, --mouse-y
    → Radial gradient: rgba(255,0,51,0.1) at mouse position, 600px radius

  holographic:
    → On hover: multi-color gradient overlay (red→blue→purple)
    → background-size: 400% 400% with gradient-shift animation

  depth:
    → Multi-layer box-shadow for 3D depth:
       box-shadow:
         0 1px 0 rgba(255,255,255,0.1),
         0 2px 0 rgba(255,255,255,0.05),
         0 4px 8px rgba(0,0,0,0.3),
         0 8px 16px rgba(0,0,0,0.4);

SUB-COMPONENTS:
  CardHeader:  <div class="mb-4">
  CardTitle:   <h3 class="font-display text-xl font-bold text-text-primary tracking-tight">
  CardContent: <div class="text-text-secondary">
  CardFooter:  <div class="mt-4 pt-4 border-t border-glass-border text-sm text-text-tertiary">
```

### 2.2 Button Component

```
Component: components/ui/button.tsx
Base element: motion.button (Framer Motion)
Default variant: "primary"
Default size: "md"

VARIANTS (8):
┌──────────┬─────────────────────────────────────────────────────────────┐
│ Variant  │ Classes                                                     │
├──────────┼─────────────────────────────────────────────────────────────┤
│ primary  │ bg-gradient-to-r from-[#ff0033] to-[#ff6699] text-white     │
│ secondary│ bg-surface border border-borderLight text-text-primary       │
│ outline  │ border-2 border-[#ff0033] text-[#ff0033]                    │
│ ghost    │ text-text-secondary hover:text-primary hover:bg-surface      │
│ danger   │ bg-gradient-to-r from-red-600 to-red-700 text-white         │
│ vision   │ bg-glass-bg backdrop-blur-xl border glass-border-strong     │
│ linear   │ bg-[#1a1a1a] border border-white/10 text-white             │
│ hologram │ bg-transparent border border-white/20 text-white            │
└──────────┴─────────────────────────────────────────────────────────────┘

SIZES (4):
  sm:  px-4 py-2 text-sm rounded-lg     ← height ≈ 36px
  md:  px-6 py-3 text-base              ← height ≈ 40px  (DEFAULT)
  lg:  px-8 py-4 text-lg rounded-xl     ← height ≈ 48px
  xl:  px-10 py-5 text-xl rounded-2xl   ← height ≈ 56px

PROPS:
  variant:   8 variants, default "primary"
  size:      "sm" | "md" | "lg" | "xl", default "md"
  loading:   boolean ← shows spinner + disables button
  leftIcon:  ReactNode ← rendered before text
  rightIcon: ReactNode ← rendered after text
  glow:      boolean ← adds shadow glow (red, 30px→50px)
  disabled:  boolean
  onClick:   () => void | Promise<void>
  className: string

BASE STYLES (always applied):
  inline-flex items-center justify-center
  font-semibold rounded-xl
  transition-all duration-300
  disabled:opacity-50 disabled:cursor-not-allowed
  relative overflow-hidden  ← for shimmer effect

ANIMATIONS:
  whileHover: { scale: loading ? 1 : 1.02, transition: springBouncy }
  whileTap:   { scale: loading ? 1 : 0.98, transition: snap }

SPECIAL EFFECTS:
  hologram / linear variant: ← shimmer sweep on hover
    <div class="absolute inset-0 bg-gradient-to-r
      from-transparent via-white/5 to-transparent
      -translate-x-full hover:translate-x-full
      transition-transform duration-700" />

  vision variant:
    ← Inner glow on hover (opacity 0→100, rgba(255,0,51,0.05))
    ← Corner dot particles (4x 4px circles at corners in red/pink)

LOADING STATE:
  ← Replaces children + icons with animated SVG spinner (h-4 w-4, 1s rotation)
  ← Sets disabled=true

GLOW STATE (when glow=true):
  shadow-[0_0_30px_rgba(255,0,51,0.4)] hover:shadow-[0_0_50px_rgba(255,0,51,0.6)]
```

### 2.3 Badge Component

```
Component: components/ui/badge.tsx
Base element: motion.span (Framer Motion)

VARIANTS (7):
  primary:    bg-primary/20 text-primary border border-primary/30
  secondary:  bg-secondary/20 text-secondary border border-secondary/30
  outline:    bg-transparent border border-white/20 text-white hover:bg-white/5
  danger:     bg-danger/20 text-danger border border-danger/30
  success:    bg-success/20 text-success border border-success/30
  warning:    bg-warning/20 text-warning border border-warning/30
  info:       bg-blue-500/20 text-blue-400 border border-blue-500/30

SIZES (3):
  sm:  px-2 py-0.5 text-xs
  md:  px-3 py-1 text-xs   (DEFAULT)
  lg:  px-4 py-1.5 text-sm

PROPS:
  variant:  7 variants, default "primary"
  size:     "sm" | "md" | "lg", default "md"
  icon:     ReactNode ← optional left icon
  children: ReactNode
  className: string

BASE STYLES:
  inline-flex items-center gap-1.5 font-semibold rounded-sm

ANIMATION:
  initial: { opacity:0, scale:0.8 }
  animate: { opacity:1, scale:1 }
  transition: { duration: 0.2 }

SEMANTIC USAGE ACROSS APP:
  "danger"   → CRITICAL priority, gaps, errors, low readiness <50%
  "success"  → HIGH demand ≥80%, matched skills, "done" status
  "warning"  → MEDIUM priority, in-progress, demand 60-79%
  "primary"  → indigo badges, active states
  "secondary"→ neutral tags, skill badges
  "outline"  → minimal tags, clickable pills
  "info"     → informational, live analysis source tags
```

### 2.4 Skeleton Component (6 variants)

```
Component: components/ui/skeleton.tsx

BASE:
  className: cn("animate-pulse rounded-lg bg-[#1C1C2A]", ...)
  Animation: pulse (CSS, 2s infinite cubic-bezier)

VARIANTS:
┌────────┬────────────────────────────────────────┐
│ Variant│ Shape                                  │
├────────┼────────────────────────────────────────┤
│ rect   │ square/rectangular                    │
│ circle │ rounded-full                          │
│ text   │ h-4 rounded (paragraph line)         │
│ rounded│ rounded-xl                            │
└────────┴────────────────────────────────────────┘

COMPOSED SKELETONS:
  StatCardSkeleton:  icon(36x36) + chevron(16x16) + value(64px×28px) + label(96px×14px) + sublabel(80px×12px)
  CardSkeleton:      optional image(h-40) + title(70%×20px) + N lines of text
  TableSkeleton:     header row + N data rows with column widths
  ListSkeleton:      N items with optional avatar(40x40) + text + optional pill
  TextBlockSkeleton: N lines, last line partial width
  ChartSkeleton:     title(40%×20px) + 8 bars with random heights (h-48 container)
  PageSkeleton:      header + 4x stat cards + main content area
```

### 2.5 Toast Notifications

```
Component: components/ui/toast.tsx
Position: Fixed top-right
Types: success (green) | error (red) | warning (amber) | info (blue)
Auto-dismiss: 4 seconds
Animation: Framer Motion enter/exit
```

### 2.6 Empty State

```
Component: components/ui/empty-state.tsx
Layout: Centered glass card
Parts: large icon area, title (text-lg font-semibold), description (text-sm text-muted),
       optional action button
Used when: no skills data, no reports, empty results
Example:
  <EmptyState
    icon="database"
    title="No skills data yet"
    description="Check back later for trending skill updates."
    action={<button>Explore Analysis</button>}
  />
```

---

## PART 3: LAYOUT ARCHITECTURE

### 3.1 Layout Hierarchy

```
App Root
├── Landing Pages (NO dashboard layout):
│   ├── /  (landing page)
│   ├── /login
│   ├── /register
│   ├── /signup
│   ├── /bloom
│   └── /halo
│
└── Authenticated Pages (ALL use DashboardLayout):
    ├── /dashboard       (home)
    ├── /industry
    ├── /gap-analysis    (skill gap)
    ├── /analysis        (detailed analysis V2)
    ├── /live-analysis
    ├── /demand
    ├── /forecast
    ├── /performance
    ├── /reports
    ├── /settings
    └── Any future pages
```

### 3.2 DashboardLayout (applies to ALL authenticated pages)

```
┌──────────────────────────────────────────────────────────────────┐
│ TOP NAV (sticky, z-50)                                          │
│ backdrop-blur-md bg-root/80 border-b border-white/5             │
│ height: h-16 (64px)                                             │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ ← ArrowLeft  [Brain icon CurriculumIQ]  [search] [🔔] [👤] │  │
│ └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│ ← 32px top padding (p-8) — main starts below nav             │
│ ↓ 24px bottom padding (pb-24) — floating nav clearance       │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                                                        │    │
│  │              PAGE CONTENT (max-w-7xl)                  │    │
│  │                                                        │    │
│  │                                                        │    │
│  │                                                        │    │
│  │                                                        │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │           FLOATING BOTTOM NAVIGATION BAR               │    │
│  │  [🏠Home]  [📊Skills]  [🔍Analyze]  [📰Industry] ...  │    │  │
│  │  fixed bottom-4, h-20, backdrop-blur-2xl, rounded-2xl  │    │
│  └────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

**DashboardLayout implementation details:**
- `ThemeProvider` wraps the entire layout
- `TopNav` at top (fixed/sticky)
- `<main class="mt-32">` — reserves space for TopNav
- `<div class="p-8 pb-24">` — padding, extra bottom for floating nav
- `Sidebar` as a floating bottom bar (NOT a side column!)
- `AiChatAssistant` floats in bottom-right

### 3.3 TopNav (Top Navigation Bar)

```
Position:     sticky top-0, z-50
Height:       h-16 (64px)
Background:   bg-root/80 backdrop-blur-md
Border:       border-b border-white/5

Left section:
  ArrowLeft icon (h-5) → /dashboard link
  [Brain icon: h-6 w-6 text-red-500]
  [Brain icon: h-6 w-6 text-[#6366F1]] ← alternate
  "CurriculumIQ" or "Curriculum<span class=text-red-500>IQ</span>"
  Label chip: [Sparkles h-4 text-red-500] "Settings" (on settings page)

Right section:
  Search input (hidden on some pages)
  Notification bell icon
  User avatar (circular, gradient or image)
```

### 3.4 Floating Bottom Navigation (Sidebar component)

```
Position:     fixed bottom-4 left-1/2 -translate-x-1/2, z-40
Height:       h-20 (80px)
Background:   bg-root/90 backdrop-blur-2xl
Border:       border border-white/10
Border radius: rounded-2xl (16px)
Shadow:       shadow-lg

Structure:
  <nav class="flex items-center justify-around px-2 py-2">
    {items.map(item => (
      <Link href={item.href}>
        <motion.div
          class="flex flex-col items-center justify-center
                 px-3 py-2 rounded-xl
                 min-w-[64px]
                 transition-all duration-200"
          class:isActive="bg-[#6366F1]/20 text-[#6366F1]
                         border border-[#6366F1]/30"
          class:inactive="text-gray-400 hover:text-white hover:bg-white/5"
          whileHover={{ scale:1.05 }}
          transition={{ duration:0.2 }}
        >
          <span class="shrink-0 [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
          <span class="font-medium text-xs mt-1 whitespace-nowrap">{name}</span>
        </motion.div>
      </Link>
    ))}
  </nav>
```

**Navigation items (in dashboard-layout.tsx):**
```
Name         href              Icon
──────────────────────────────────────────────────
Overview     /dashboard        BarChart3
Industry     /industry         TrendingUp
Skill Gap    /analysis         FileText     ← note: named "Skill Gap" but links to /analysis
Analysis     /gap-analysis     Activity
Current Demand /demand         Briefcase
Your Performance /performance  Activity
Future Forecast /forecast      Calendar
Settings     /settings         SettingsIcon
```

**Active detection logic:**
```javascript
const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
```

### 3.5 Page Content Area (inside DashboardLayout)

```
Main tag:
  <main class="mt-32 min-h-[calc(100vh-8rem)]">
    <div class="p-8 pb-24 max-w-7xl mx-auto">
      {children}
    </div>
  </main>
```

`mt-32` = 128px clearance for the TopNav. `pb-24` = 96px bottom padding for floating nav. Content is max-width constrained and centered.

---

## PART 4: PAGE-BY-PAGE UI SPECIFICATIONS

### 4.1 Landing Page (`/` — app/page.tsx)

```
LAYOUT: Standalone (NO DashboardLayout)

Structure:
┌──────────────────────────────────────────────────────────────┐
│ NAV (fixed top-0, z-50, backdrop-blur-md)                    │
│ bg-root/80, border-b border-white/5, h-16                    │
│ Logo: [Brain #6366F1] CurriculumIQ                           │
│ Links: [Features] [Impact]  |  [Sign In] [Get Started btn]   │
│        hidden md:flex                                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  HERO SECTION                                                │
│  bg-root, centered, min-h-screen minus nav                   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  [FadeIn animation wrapper]                          │   │
│  │                                                      │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Gradient text: "Know Your Industry"           │  │   │
│  │  │  bg-gradient-to-r from-white to-white/60       │  │   │
│  │  │  bg-clip-text text-transparent                 │  │   │
│  │  │  text-5xl md:text-6xl font-bold               │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                                                      │   │
│  │  "AI-powered curriculum intelligence platform"       │   │
│  │  text-white/50 text-lg, max-w-xl mx-auto            │   │
│  │                                                      │   │
│  │  [Get Started → #6366F1 btn, full]  [Learn More ↓]  │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  FEATURES SECTION (3 cards, grid)                   │   │
│  │  Container: max-w-6xl mx-auto px-6 py-24            │   │
│  │                                                      │   │
│  │  "Features" heading (text-3xl font-bold)            │   │
│  │  Subtitle (text-white/50)                            │   │
│  │                                                      │   │
│  │  grid grid-cols-1 md:grid-cols-3 gap-6:             │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐             │   │
│  │  │ [icon]   │ │ [icon]   │ │ [icon]   │             │   │
│  │  │ bg-[#13131C] │ │ bg-[#13131C] │ │ bg-[#13131C] │   │   │
│  │  │ rounded-xl │ │ rounded-xl │ │ rounded-xl │       │   │
│  │  │ p-6      │ │ p-6      │ │ p-6      │             │   │
│  │  │ hover:bg │ │ hover:bg │ │ hover:bg │             │   │
│  │  │  -[#1C1C2A]│ -[#1C1C2A]│ -[#1C1C2A]│         │   │
│  │  │          │ │          │ │          │             │   │
│  │  │ Title    │ │ Title    │ │ Title    │             │   │
│  │  │ text-lg  │ │ text-lg  │ │ text-lg  │             │   │
│  │  │ font-semi│ │ font-semi│ │ font-semi│             │   │
│  │  │ bold     │ │ bold     │ │ bold     │             │   │
│  │  │          │ │          │ │          │             │   │
│  │  │ Desc     │ │ Desc     │ │ Desc     │             │   │
│  │  │ text-sm  │ │ text-sm  │ │ text-sm  │             │   │
│  │  │ text-    │ │ text-    │ │ text-    │             │   │
│  │  │ white/70 │ │ white/70 │ │ white/70 │             │   │
│  │  └──────────┘ └──────────┘ └──────────┘             │   │
│  │                                                      │   │
│  │  Card icon area:                                     │   │
│  │  w-10 h-10 rounded-lg bg-[#6366F1]/10               │   │
│  │  flex items-center justify-center mb-4               │   │
│  │  icon: lucide-react, text-[#6366F1], w-5 h-5       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  STATS SECTION                                        │   │
│  │  grid grid-cols-2 md:grid-cols-4 gap-8               │   │
│  │  Each stat: text-center                              │   │
│  │  Value: text-3xl md:text-4xl font-bold text-white   │   │
│  │  Label: text-white/50 text-sm                        │   │
│  │  50K+ Students | 120+ Universities |                 │   │
│  │  500+ Companies | 98% Accuracy                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  CTA SECTION                                          │   │
│  │  Centered, py-24                                      │   │
│  │  "Ready to get started?" heading                      │   │
│  │  [Get Started →] button                               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  FOOTER:                                                     │
│  bg-surface/50 border-t border-white/5 py-8                │
│  max-w-6xl mx-auto px-6 flex justify-between              │
│  "CurriculumIQ" + copyright + links                        │
└──────────────────────────────────────────────────────────────┘

ANIMATIONS: FadeIn with scroll-trigger (whileInView), stagger delays.
           Feature cards: delay: index * 0.1
```

### 4.2 Login Page (`/login` — app/login/page.tsx)

```
LAYOUT: Standalone (NO DashboardLayout)

Structure:
┌───────────────────────────────────────────────────────────────┐
│ BACKGROUND:                                                  │
│  min-h-screen bg-[#0A0A0F] flex items-center justify-center   │
│                                                               │
│  Fixed decorative element:                                   │
│  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 │
│  w-[600px] h-[600px] bg-[#6366F1]/3 (very subtle indigo glow)│
│  rounded-full blur-[120px]                                    │
│                                                               │
│  CARD (max-w-md, centered):                                  │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Back button (absolute, -top-16, left-0)                 │ │
│  │ [ArrowLeft] Back → router.push("/")                     │ │
│  │                                                         │ │
│  │ ┌───────────────────────────────────────────────────┐  │ │
│  │ │ Logo: [Brain h-6 w-6 #6366F1] CurriculumIQ      │  │ │
│  │ │ text-center mb-10                                 │  │ │
│  │ └───────────────────────────────────────────────────┘  │ │
│  │                                                         │ │
│  │ "Welcome back" text-2xl font-semibold text-white mb-2  │ │
│  │ "Sign in to access your dashboard" text-white/50 text-sm│ │
│  │ mb-8                                                    │ │
│  │                                                         │ │
│  │ [ERROR BAR — conditional]                               │ │
│  │ bg-red-500/10 border-red-500/20 text-red-300           │ │
│  │ rounded-lg text-sm p-3 mb-6                            │ │ │
│  │                                                         │ │
│  │ FORM:                                                   │ │
│  │                                                         │ │
│  │ EMAIL FIELD:                                            │ │
│  │ label: "Email" text-sm text-white/70 mb-2              │ │
│  │ ┌───────────────────────────────────────────────┐      │ │
│  │ │ [Mail icon: absolute left-3.5 top-1/2]        │      │ │
│  │ │ text-white/30 w-4 h-4                         │      │ │
│  │ │                                               │      │ │
│  │ │ input type=email                              │      │ │
│  │ │ w-full pl-10 pr-4 py-3                        │      │ │
│  │ │ bg-[#0A0A0F] border border-white/5            │      │ │
│  │ │ rounded-lg text-white text-sm                 │      │ │
│  │ │ placeholder:text-white/20                     │      │ │
│  │ │ outline-none                                   │      │ │
│  │ │ focus:border-[#6366F1]/30                     │      │ │
│  │ │ transition-colors                              │      │ │
│  │ └───────────────────────────────────────────────┘      │ │
│  │                                                         │ │
│  │ PASSWORD FIELD:                                         │ │
│  │ label: "Password" text-sm text-white/70 mb-2           │ │ │
│  │ ┌───────────────────────────────────────────────┐      │ │
│  │ │ [Lock icon: absolute left-3.5 top-1/2]        │      │ │
│  │ │ text-white/30 w-4 h-4                         │      │ │
│  │ │                                               │      │ │
│  │ │ input type=password/text                      │      │ │
│  │ │ w-full pl-10 pr-10 py-3                       │      │ │
│  │ │ bg-[#0A0A0F] border border-white/5            │      │ │
│  │ │ (same as email but type toggles)              │      │ │
│  │ │                                               │      │ │
│  │ │ [Eye/EyeOff btn: absolute right-3.5 top-1/2] │      │ │
│  │ │ text-white/30 hover:text-white/50             │      │ │
│  │ └───────────────────────────────────────────────┘      │ │
│  │                                                         │ │
│  │ [Forgot password?] right-aligned text-sm              │ │
│  │ text-[#6366F1] hover:text-[#818CF8]                   │ │
│  │                                                         │ │
│  │ [SIGN IN BUTTON] full-width:                           │ │
│  │ w-full py-3 rounded-lg bg-[#6366F1]                   │ │
│  │ hover:bg-[#4F46E5] text-white                         │ │
│  │ font-medium text-sm                                    │ │
│  │ disabled:opacity-50                                    │ │
│  │ flex items-center justify-center gap-2                 │ │
│  │ Loading → spinning circle (border-2 indigo)            │ │
│  │ Idle → "Sign In [ChevronRight w-4]"                   │ │
│  │                                                         │ │
│  │ ── divider ──                                          │ │
│  │ <div class="relative my-6">                           │ │
│  │   <div class="absolute inset-0 border-t white/5" />  │ │
│  │   <span class="relative text-center px-3             │ │
│  │     bg-[#13131C] text-white/30 text-xs">or</span>    │ │
│  │ </div>                                                 │ │
│  │                                                         │ │
│  │ SOCIAL LOGIN: 2-column grid                            │ │
│  │ grid grid-cols-2 gap-3:                                │ │
│  │ ┌──────────────┐  ┌──────────────┐                     │ │
│  │ │ [G svg]      │  │ [Apple svg]  │                     │ │
│  │ │ Google       │  │ Apple        │                     │ │
│  │ │ py-2.5       │  │ py-2.5       │                     │ │
│  │ │ rounded-lg   │  │ rounded-lg   │                     │ │
│  │ │ bg-[#0A0A0F] │  │ bg-[#0A0A0F] │                     │ │
│  │ │ border white/5│ │ border white/5│                     │ │
│  │ │ hover:border │  │ hover:border │                     │ │
│  │ │ white/10     │  │ white/10     │                     │ │
│  │ └──────────────┘  └──────────────┘                     │ │
│  │                                                         │ │
│  │ FOOTER LINK:                                           │ │
│  │ text-center mt-6 text-sm text-white/40                │ │
│  │ "Don't have an account? [Sign up → #6366F1]"          │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│ Auth guard: onAuthStateChanged → if user exists → /dashboard │
│ Loading state: centered spinner (w-10 h-10, border-2 indigo) │
└───────────────────────────────────────────────────────────────┘

ANIMATIONS: FadeIn (motion.div): initial opacity:0, y:20 → animate opacity:1, y:0, 400ms
```

### 4.3 Signup Page (`/signup` — app/signup/page.tsx)

```
LAYOUT: Standalone (NO DashboardLayout)

STRUCTURE:
┌───────────────────────────────────────────────────────────────────┐
│ ANIMATED CANVAS BACKGROUND (full screen, behind everything):    │
│  <canvas> with 150+ particles + connecting lines                │
│  Gradient overlay on top                                        │
│  Grid pattern overlay (subtle dot grid)                         │
│                                                               │
│ FLOATING DECORATIVE ELEMENTS (absolute positioned):           │
│  [Brain icon]   → glass circle, float animation, top-left     │
│  [Sparkles]     → glass circle, float animation, top-right    │
│  [Zap]          → glass circle, float animation, bottom-left  │
│  [Shield]       → glass circle, float animation, bottom-right │
│                                                               │
│  Each:                                                         │
│    w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-xl          │
│    border border-white/10                                     │
│    flex items-center justify-center                           │
│    animate: y[-5→5→-5] over 3s (or 4-6s for larger)         │
│    OR animate: y[-20→20→-20] floatLarge (6s)                 │
│                                                               │
│ PULSE GLOW BACKGROUND:                                        │
│  absolute inset-0                                             │
│  bg-gradient-to-r from-indigo-600/20 via-purple-600/10       │
│    to-transparent                                              │
│  animate: pulse 4s ease-in-out infinite                      │
│                                                               │
│ CENTERED FORM CARD:                                           │
│  ┌───────────────────────────────────────────────────────────┐│
│  │ max-w-md mx-auto                                          ││
│  │ bg-[#0A0A0F]/80 backdrop-blur-xl                         ││
│  │ rounded-xl p-8 border border-white/10                     ││
│  │ dark:bg-white/5 (supports light too — but dark default)  ││
│  │                                                          ││
│  │ FORM FIELDS (space-y-5):                               ││
│  │                                                          ││
│  │ NAME FIELD:                                              ││
│  │ label: "Full Name" text-sm text-white/70 mb-2           ││
│  │ ┌────────────────────────────────────────────────┐     ││
│  │ │ [User icon left-3.5]                            │     ││
│  │ │ input type=text                                 │     ││
│  │ │ pl-10 pr-4 py-3 bg-[#0A0A0F]                   │     ││
│  │ │ border-white/5 rounded-lg                       │     ││
│  │ │ text-white text-sm                              │     ││
│  │ │ placeholder:text-white/20                       │     ││
│  │ │ focus:border-[#6366F1]/30                       │     ││
│  │ └────────────────────────────────────────────────┘     ││
│  │                                                          ││
│  │ EMAIL FIELD: (same pattern, Mail icon instead of User) ││
│  │                                                          ││
│  │ PASSWORD FIELD:                                          ││
│  │ (same as login — with Lock icon + Eye toggle)           ││
│  │                                                          ││
│  │ CONFIRM PASSWORD FIELD:                                  ││
│  │ (same as password field — with Eye toggle)              ││
│  │                                                          ││
│  │ ERROR: [conditional]                                     ││
│  │ bg-red-500/10 border-red-500/20 text-red-300           ││
│  │ rounded-lg text-sm p-3 mb-4 animate: fadeIn            ││
│  │                                                          ││
│  │ SUBMIT BUTTON:                                           ││
│  │ w-full py-3 rounded-lg                                  ││
│  │ bg-gradient-to-r from-red-600 to-pink-600               ││
│  │ text-white font-medium text-sm                          ││
│  │ hover:shadow-lg hover:shadow-red-500/25                 ││
│  │ transition-all disabled:opacity-50                       ││
│  │ active:scale-95                                         ││
│  │ shimmer effect on hover:                                ││
│  │   bg-gradient-to-r from-red-600 via-red-500 to-pink-600││
│  │   bg-[length:200%_100%] hover:bg-[position:100%_0]     ││
│  │   transition: background-position 0.5s                 ││
│  │                                                          ││
│  │ FEATURE HIGHLIGHTS (3 items in a row):                  ││
│  │ flex gap-4 mt-6 justify-center text-xs                 ││
│  │ [Shield icon] "Secure"                                  ││
│  │ [Zap icon] "Free"                                       ││
│  │ [Brain icon] "AI Powered"                               ││
│  │ text-white/50                                           ││
│  │                                                          ││
│  │ SOCIAL SIGNUP:                                          ││
│  │ grid grid-cols-2 gap-3 mt-6                             ││
│  │ Same button style as login (bg-[#0A0A0F],             ││
│  │ border-white/5, hover:border-white/10)                 ││
│  │ Google + Apple with spring animation on hover          ││
│  │                                                          ││
│  │ FOOTER:                                                 ││
│  │ text-center mt-6 text-sm text-white/40                 ││
│  │ "Already have an account? [Sign In #6366F1]"           ││
│  └───────────────────────────────────────────────────────────┘│
│                                                               │
│ ALL decorative elements animate with float (infinite loop)    │
│ Form card has FadeIn entrance                                │
└───────────────────────────────────────────────────────────────────┘

NOTE: This is the MOST visually rich page — animated canvas, floating icons,
      gradient submit button with shimmer, pulse background glow.
      The signup and login pages share the same red-indigo visual identity.
```

### 4.4 Register Page (`/register` — app/register/page.tsx)

```
LAYOUT: Standalone (NO DashboardLayout)

Structure:
┌───────────────────────────────────────────────────────────────┐
│ BACKGROUND:  min-h-screen bg-[#0A0A0F] flex items-center      │
│                                                               │
│ FORM CARD:                                                    │
│  max-w-md mx-auto w-full                                      │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ CENTERED:                                               │ │
│  │                                                         │ │
│  │ Avatar circle (center):                                 │ │
│  │ w-24 h-24 rounded-full mx-auto mb-6                    │ │
│  │ bg-gradient-to-r from-[#6366F1] to-[#818CF8]          │ │
│  │ flex items-center justify-center                        │ │
│  │ [User icon: h-12 w-12 text-white]                      │ │
│  │                                                         │ │
│  │ "Create Account" text-2xl font-semibold text-white     │ │
│  │ "Sign up to get started" text-white/50 text-sm mt-1   │ │
│  │ mb-8                                                    │ │
│  │                                                         │ │
│  │ [ERROR — conditional]:                                  │ │
│  │ bg-red-500/10 border-red-500/20 text-red-300          │ │
│  │ rounded-lg text-sm p-3 mb-4                            │ │
│  │                                                         │ │
│  │ FORM (space-y-5):                                    │ │
│  │                                                         │ │
│  │ Full Name   → text input, same style as login         │ │
│  │ Email       → email input, same style                 │ │
│  │ Role        → select dropdown                          │ │
│  │              bg-[#0A0A0F] border border-white/5       │ │
│  │              rounded-lg text-white px-4 py-3          │ │
│  │              Options: Student / Faculty / Admin        │ │
│  │              focus:border-[#6366F1]/30                │ │
│  │ Password    → password input                           │ │
│  │ Confirm     → confirm password input                   │ │
│  │              (validates match + min 6 chars)           │ │
│  │                                                         │ │
│  │ [CREATE ACCOUNT BUTTON]:                               │ │
│  │ w-full py-3 rounded-lg bg-[#6366F1]                   │ │
│  │ hover:bg-[#4F46E5] text-white font-medium text-sm     │ │
│  │ flex items-center justify-center                       │ │
│  │ Loading → spinner                                     │ │
│  │                                                         │ │
│  │ FOOTER:                                                │ │
│  │ text-center mt-6 text-white/50 text-sm                │ │
│  │ "Already have an account? [Sign in → #6366F1]"        │ │
│  └─────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘

Animation: simple fadeIn (opacity 0→1, y 20→0, 400ms)
```

### 4.5 Dashboard Home (`/dashboard`)

```
LAYOUT: Uses DashboardLayout wrapper

CONTENT STRUCTURE (space-y-8 between major sections):

SECTION 1 — Welcome Header:
  ┌────────────────────────────────────────────────────┐
  │ motion.div entrance animation                      │
  │ "Welcome back{user?.displayName?.split(" ")[0]}"  │
  │ text-2xl font-semibold text-white mb-1             │
  │ "Here's what's happening..." text-white/50 text-sm │
  └────────────────────────────────────────────────────┘

SECTION 2 — 4 Stat Cards (grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4):
  Each card:
  ┌────────────────────┐
  │ bg-[#13131C] rounded-xl p-5                     │
  │ hover:bg-[#1C1C2A] transition-colors            │
  │ cursor-pointer group                            │
  │                                                 │
  │ flex items-start justify-between mb-3:          │
  │  [Icon container: w-9 h-9 rounded-lg           │
  │   bg-[#6366F1]/10 flex items-center justify-center│
  │   icon: w-4 h-4 text-[#6366F1]]                 │
  │  [ArrowUpRight: w-4 h-4 text-white/30            │
  │   group-hover:text-[#6366F1] transition-colors]  │
  │                                                 │
  │ text-2xl font-semibold text-white mb-1          │
  │ text-sm text-white/70 mb-0.5                    │
  │ text-xs text-white/40                           │
  └─────────────────────────────────────────────────┘

  Cards:
  ┌─────────────────┐ ┌─────────────────┐ ┌────────────────┐ ┌──────────────────┐
  │ [Target icon]   │ │ [Briefcase]     │ │ [Activity]     │ │ [TrendingUp]      │
  │ Skills Tracked  │ │ High Demand     │ │ Open Positions │ │ Trending          │
  │ {skills.length} │ │ {highDemand}    │ │ {sum open}     │ │ {medDemand}       │
  │ Across ind.     │ │ Above 80% dmd   │ │ Active listings│ │ Emerging skills   │
  │ ← CLICKABLE →   │ │ ← CLICKABLE →   │ │                │ │ ← CLICKABLE →     │
  └─────────────────┘ └─────────────────┘ └────────────────┘ └──────────────────┘

SECTION 3 — Error State (AnimatePresence):
  Height-animated error bar:
  bg-[#EF4444]/10 border-[#EF4444]/20 rounded-xl px-4 py-3
  [Zap icon text-[#EF4444]] + error message text-sm text-[#EF4444]

SECTION 4 — Trending Skills:
  Header row: "Trending Skills" text-lg font-semibold
              [View all →] text-sm #6366F1 + ArrowUpRight

  Empty state: EmptyState component (if no skills)

  Grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4):
  ┌────────────────────────────┐
  │ SKILL CARD:                 │
  │ ┌────────────────────────┐ │
  │ │ GRADIENT HERO (h-40):  │ │
  │ │ relative overflow-hidden│ │
  │ │ bg-[#1C1C2A]           │ │
  │ │                        │ │
  │ │ Inner gradient layer:  │ │
  │ │ absolute inset-0       │ │
  │ │ transition-transform    │ │
  │ │ duration-500            │ │
  │ │ group-hover:scale-105   │ │
  │ │ style={linear-gradient  │ │
  │ │   (135deg, from, to)}  │ │
  │ │ ← hash-derived colors  │ │
  │ │                        │ │
  │ │ Bottom fade overlay:   │ │
  │ │ absolute inset-0       │ │
  │ │ bg-gradient-to-t       │ │
  │ │ from-[#13131C]/30      │ │
  │ │ via-transparent         │ │
  │ │ to-transparent          │ │
  │ │                        │ │
  │ │ Demand badge:          │ │
  │ │ absolute bottom-3      │ │
  │ │ left-3 right-3        │ │
  │ │ text-xs font-medium    │ │
  │ │ px-2 py-0.5 rounded-full│ │
  │ │ ≥80%: bg-[#6366F1]/20 │ │
  │ │   text-[#818CF8]       │ │
  │ │ else: bg-white/10      │ │
  │ │   text-white/70        │ │
  │ │ "{score}% Demand"      │ │
  │ └────────────────────────┘ │
  │ p-4:                       │
  │ h3 text-white font-medium  │
  │   text-sm mb-1 truncate    │
  │   ← skill.name             │
  │ flex items-center gap-3    │
  │   text-xs text-white/50:   │
  │   [MapPin w-3 h-3] {loc}  │
  │   {(openings).toLocaleString()} openings │
  │ Progress bar:              │
  │ mt-3 w-full bg-white/5     │
  │ rounded-full h-1.5         │
  │ [indigo bar, width = score%]│
  └────────────────────────────┘

  Stagger: each card animates with delay: i * 0.05 (50ms apart)

SECTION 5 — 3-Column Analytics (grid grid-cols-1 md:grid-cols-3 gap-4):
  ┌────────────────────┐ ┌──────────────────┐ ┌──────────────────┐
  │ Demand Distribution│ │ Top Locations    │ │ Top Companies    │
  │ bg-[#13131C] p-5   │ │ bg-[#13131C] p-5 │ │ bg-[#13131C] p-5 │
  │ rounded-xl         │ │ rounded-xl       │ │ rounded-xl       │
  │                    │ │                  │ │                  │
  │ h3 font-medium     │ │ h3 font-medium   │ │ h3 font-medium   │
  │ text-white/70      │ │ text-white/70    │ │ text-white/70    │
  │ mb-4               │ │ mb-4             │ │ mb-4             │
  │                    │ │                  │ │                  │
  │ High (80%+): count │ │ [1] Bangalore 90%│ │ [✓] Microsoft   │
  │ [blue bar]         │ │ [2] Hyderabad 80%│ │ [✓] Google      │
  │ Medium (60-79%): n │ │ [3] Chennai 70%  │ │ [✓] Amazon      │
  │ [lighter bar]      │ │ [4] Gurgaon 60%  │ │ [✓] TCS         │
  │ Low (<60%): n      │ │ [5] Pune 50%     │ │ [✓] Infosys     │
  │ [grey bar]         │ │                  │ │                  │
  │                    │ │ Each row: flex   │ │ Each: flex       │
  │ Each row:          │ │   justify-between│ │   justify-between│
  │   flex justify-    │ │   text-white/50  │ │   text-white/70  │
  │   between text-sm  │ │   + text-[#6366F1]│ │   + Hiring badge │
  │                    │ │   text-xs font-m │ │   bg-[#6366F1]/10│
  │                    │ │                  │ │   text-[#818CF8] │
  └────────────────────┘ └──────────────────┘ └──────────────────┘

  Bars: w-full bg-white/5 rounded-full h-2, filled div rounded-full h-2
```

### 4.6 Skill Gap Analysis (`/gap-analysis`)

```
LAYOUT: Uses DashboardLayout

STRUCTURE (2-column on desktop: left = upload form, right = results):

LEFT PANEL — Upload Section:
┌──────────────────────────────┐
│ bg-[#13131C] rounded-xl p-6 │
│                              │
│ "Skill Gap Analysis"         │
│ text-xl font-bold mb-1       │
│ "Upload your documents"      │
│ text-sm text-white/50 mb-6   │
│                              │
│ "Upload Files" text-sm       │
│ text-white/70 mb-3           │
│                              │
│ 3×2 GRID of upload cards:   │
│ grid grid-cols-2 gap-3:      │
│                              │
│ Each card (h-36):            │
│ ┌──────────────────────────┐ │
│ │ bg-[#0A0A0F] border      │ │
│ │ border-dashed border-    │ │
│ │ white/10 rounded-xl      │ │
│ │ flex flex-col items-     │ │
│ │ center justify-center    │ │
│ │ transition-all           │ │
│ │ hover:border-[#6366F1]/30│ │
│ │ cursor-pointer           │ │
│ │                          │ │
│ │ EMPTY STATE:             │ │
│ │ [Upload icon w-8 h-8     │ │
│ │  text-white/30 mb-2]     │ │
│ │ "Click or drag to upload"│ │
│ │ text-xs text-white/30    │ │
│ │ "PDF, DOCX, XLSX..."     │ │
│ │                          │ │
│ │ UPLOADED STATE:          │ │
│ │ [CheckCircle w-6 h-6     │ │
│ │  text-emerald-500        │ │
│ │  mx-auto mb-1]           │ │
│ │ filename text-sm         │ │
│ │ text-white/70            │ │
│ │ size text-xs             │ │
│ │ text-white/40            │ │
│ └──────────────────────────┘ │
│                              │
│ Card labels:                 │
│ Resume, Syllabus, Projects,  │
│ Certificates, Experience,    │
│ Achievements                 │
│                              │
│ TARGET ROLE:                 │
│ label mt-6 "Target Role"     │
│ select with 16 options:      │
│ ┌───────────────────────────────┐
│ │ AI Engineer ▼                 │
│ │ bg-[#0A0A0F] border           │
│ │ border-white/10 rounded-lg    │
│ │ text-white px-4 py-3          │
│ └───────────────────────────────┘
│                              │
│ [ANALYZE NOW BUTTON]:        │
│ w-full py-3 rounded-lg       │
│ bg-gradient-to-r from-[#6366F1] │
│   to-[#818CF8]               │
│ text-white font-medium       │
│ hover:shadow-lg              │
│ hover:shadow-indigo-500/25   │
│ transition-all               │
│ Loading → "Analyzing..."     │
│   + spinning circle          │
└──────────────────────────────┘

RIGHT PANEL — Results (shown after analysis):
┌─────────────────────────────────────────┐
│ bg-[#13131C] rounded-xl p-6             │
│                                          │
│ READINESS SCORE:                         │
│ ┌──────────────────────────────────────┐ │
│ │ Large SVG circular gauge (center):   │ │
│ │ viewBox=0 0 200 200                  │ │
│ │ cx=100 cy=100 r=85                   │ │
│ │                                      │ │
│ │ Background circle:                   │ │
│ │ stroke=white/5 fill=none             │ │
│ │ stroke-width=10                      │ │
│ │                                      │ │
│ │ Score arc:                           │ │
│ │ stroke=green/amber/red (score-based) │ │
│ │ fill=none stroke-width=10            │ │
│ │ stroke-linecap=round                 │ │
│ │ dasharray = circumference            │ │
│ │ dashoffset = percentage               │ │
│ │                                      │ │
│ │ Center text:                         │ │
│ │ "{score}%" text-2xl font-bold       │ │
│ │ "Readiness Score" text-xs text-muted│ │
│ │                                      │ │
│ │ Below: "{matched} matched,          │ │
│ │  {missing} missing" text-xs        │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ STRONG SKILLS (flex wrap, gap-2):        │
│ Green badges:                            │
│ bg-emerald-500/10 text-emerald-400      │
│ border-emerald-500/20                   │
│ "Python", "SQL", "Data Structures"...   │
│                                          │
│ CRITICAL SKILL GAPS:                      │
│ space-y-3:                               │
│ Each gap item:                           │
│ ┌─────────────────────────────────────┐  │
│ │ "Skill Name"                        │  │
│ │ [CRITICAL badge/text-red-500]       │  │
│ │ Source: "LinkedIn 2026"            │  │
│ │ Demand: 92% [demand badge]         │  │
│ │ [View proof →] link               │  │
│ └─────────────────────────────────────┘  │
│ Priority colors:                         │
│ CRITICAL → danger/red | HIGH → warning  │
│ MEDIUM → info/blue | LOW → secondary    │
│                                          │
│ COMPANY-WISE READINESS:                  │
│ grid grid-cols-1 md:grid-cols-2 gap-3:  │
│ Each company card:                       │
│ ┌──────────────────────────────────────┐ │
│ │ "Microsoft" text-white font-medium  │ │
│ │ "68% Ready" text-right             │ │
│ │ bg-white/5 rounded-full h-2        │ │
│ │ [filled bar % width]               │ │
│ │ Missing skills: [badge] [badge]... │ │
│ │ max-3 shown                         │ │
│ │ Proof panel:                        │ │
│ │ "Source: LinkedIn..."               │ │
│ │ Description text-sm text-white/50  │ │
│ │ [View Original →] link             │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ AI CAREER ROADMAP:                       │
│ "Recommended Learning Path"              │
│ space-y-4:                               │
│ Each road item:                          │
│ ┌──────────────────────────────────────┐ │
│ │ Skill name text-white font-medium   │ │
│ │ "Why: explanation"                  │ │
│ │ text-white/50 text-sm               │ │
│ │ Impact: text                        │ │
│ │ [Course icon] [Practice] [Video]   │ │
│ │ [Cert icon]  ← resource links       │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ACTION BUTTONS:                          │
│ flex gap-3:                              │
│ [Download PDF Report → primary #6366F1] │
│ [Analyze Another → secondary outline]   │
└─────────────────────────────────────────┘
```

### 4.7 Detailed Analysis (`/analysis`)

```
LAYOUT: Uses DashboardLayout

INPUT SECTION (top of page):
┌──────────────────────────────────────────────────────────┐
│ bg-[#13131C] rounded-xl p-6 space-y-4                    │
│                                                          │
│ URL INPUTS (grid grid-cols-1 md:grid-cols-2 gap-4):     │
│                                                          │
│ GitHub URL:                                              │
│ ┌──────────────────────────────────────────────────────┐│
│ │ [Github icon: absolute left-3.5]                     ││
│ │ input placeholder="https://github.com/..."            ││
│ │ pl-10 pr-4 py-3 bg-[#0A0A0F]                        ││
│ │ border-white/5 rounded-lg text-white                  ││
│ │ focus:border-[#6366F1]/30                            ││
│ └──────────────────────────────────────────────────────┘│
│                                                          │
│ LeetCode URL: (same with Code icon)                      │
│                                                          │
│ TARGET ROLE:                                             │
│ select dropdown (13 roles, same style as gap-analysis)   │
│                                                          │
│ FILE UPLOAD (drag-drop style):                           │
│ ┌──────────────────────────────────────────────────────┐│
│ │ [FileUp icon m-auto mb-2 text-white/30]              ││
│ │ "Drag & drop files here or click to browse"          ││
│ │ text-sm text-white/40                                 ││
│ │ "PDF, DOCX, XLSX up to 10MB"                         ││
│ │ bg-[#0A0A0F] border-dashed border-white/10           ││
│ │ rounded-xl p-8 text-center                            ││
│ │ hover:border-[#6366F1]/30                            ││
│ │ Uploaded files shown as badges:                       ││
│ │ [filename.pdf ×] with remove button                   ││
│ └──────────────────────────────────────────────────────┘│
│                                                          │
│ [RUN ANALYSIS BUTTON]:                                   │
│ w-full py-3.5 rounded-lg                                │
│ bg-gradient-to-r from-[#6366F1] to-[#818CF8]            │
│ hover:shadow-lg hover:shadow-indigo-500/25              │
│ text-white font-medium text-sm +16px                    │
│ group-hover glow effect                                  │
└──────────────────────────────────────────────────────────┘

RESULTS SECTION (10 sections, all staggered animation):

SECTION 1 — Summary:
  ┌──────────────────────────────────────────────────────┐
  │ flex flex-col md:flex-row gap-6 items-center        │
  │                                                    │
  │ SVG Gauge (center, 200x200 viewBox):               │
  │ Same as gap-analysis gauge but with                 │
  │ dual rings:                                        │
  │  Outer: total skills (grey)                        │
  │  Inner: matched skills (emerald/red)               │
  │  Center label: "{matchPercentage}% Match"          │
  │                                                    │
  │ Ready badge (right of gauge):                      │
  │ px-4 py-1.5 rounded-full text-sm font-bold        │
  │ "Industry Ready" → bg-emerald-500/20 #10B981      │
  │ "Almost Ready"   → bg-blue-500/20  #3B82F6       │
  │ "Developing"     → bg-amber-500/20  #F59E0B      │
  │ "Beginner"       → bg-red-500/20    #EF4444       │
  │                                                    │
  │ 3 stat boxes (horizontal):                         │
  │ [Matched: {n}] [Missing: {n}] [Total: {n}]       │
  │ Each: text-center p-4 bg-[#0A0A0F] rounded-lg    │
  │ Value: text-2xl font-bold text-white              │
  │ Label: text-xs text-white/50                      │
  └──────────────────────────────────────────────────────┘

SECTION 2 — GitHub Analysis (conditional):
  flex gap-4 cards: repositories count + top languages
  Each language: colored bar (hash-colored like skill cards)

SECTION 3 — Score Breakdown (conditional):
  Side-by-side comparison cards for GitHub vs LeetCode
  Score bars with color coding

SECTION 4 — Skill Coverage:
  ┌──────────────────────┐
  │ Dual donut chart     │
  │ (Doughnut from       │
  │ react-chartjs-2):   │
  │ Center:              │
  │ emerald = matched    │
  │ red = missing        │
  │ Plus skill badges    │
  │ below in flex-wrap:  │
  │ [Python ✓] [SQL ✓]  │
  │ [React ✗] [Docker ✗]│
  └──────────────────────┘

SECTION 5 — Skills Lists:
  Grid of skill cards, organized by category:
  Technical | Soft Skills | Projects | Certifications
  Each: text-xs bg-emerald-500/10 text-emerald-400
        border border-emerald-500/20 px-2 py-1 rounded

SECTION 6 — Gap Insights:
  Per-skill cards in a list:
  ┌────────────────────────────────────────────┐
  │ SKILL NAME              [HIGH priority]    │
  │ ─────────────────────────────────────────  │
  │ Why it matters:          "explanation..." │
  │ For your role:           "role context"   │
  │ Impact on employability: "+40% hiring"    │
  │ Learning path:          step 1, 2, 3...  │
  │ Priority: [HIGH badge]                    │
  └────────────────────────────────────────────┘
  bg-[#13131C] rounded-xl p-5 border-l-2 border-[#6366F1]

SECTION 7 — Roadmap:
  "Your Learning Roadmap" heading
  3 Phase cards in grid:
  ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ Phase 1  │ │ Phase 2  │ │ Phase 3  │
  │ bg-surface│ │bg-surface│ │bg-surface│
  │ rounded-xl│ │rounded-xl│ │rounded-xl│
  │ p-5      │ │p-5      │ │p-5      │
  │          │ │          │ │          │
  │ "Found." │ │ "Inter." │ │ "Adv."  │
  │ title    │ │ title    │ │ title    │
  │ text-xs  │ │ text-xs  │ │ text-xs  │
  │ text-    │ │ text-    │ │ text-    │
  │ white/50 │ │ white/50 │ │ white/50 │
  │          │ │          │ │          │
  │ Skills:  │ │ Skills:  │ │ Skills:  │
  │ [badge]  │ │ [badge]  │ │ [badge]  │
  │ "~3 mo"  │ │ "~4 mo"  │ │ "~2 mo"  │
  │ desc text│ │ desc text│ │ desc text│
  └──────────┘ └──────────┘ └──────────┘

SECTION 8 — Project Recommendations:
  grid grid-cols-1 md:grid-cols-2 gap-4
  Each project card:
  ┌─────────────────────────────────────────┐
  │ [Rocket icon] text-[#6366F1]            │
  │ Title: text-white font-medium mb-2      │
  │ [Difficulty badge:                    │
  │  Beginner → bg-emerald-500/20           │
  │  Intermediate → bg-blue-500/20          │
  │  Advanced → bg-red-500/20]              │
  │ Skills: [Python] [TensorFlow] [badges] │
  │ Duration: "~2 weeks" text-xs text-muted│
  │ Description text-sm text-white/70       │
  └─────────────────────────────────────────┘

SECTION 9 — Course Recommendations:
  Each course:                                                    │
  ┌──────────────────────────────────────────────────────────┐  │
  │ [BookOpen icon] [Platform badge: Coursera/Udemy/etc]     │  │
  │ Course title text-white font-medium                     │  │
  │ [Beginner/Intermediate/Advanced badge]                   │  │
  │ "Covers: skill name" text-xs text-white/50              │  │
  │ ⭐ 4.5 (star rating, yellow)                            │  │
  │ "6 weeks" duration text-xs text-white/30                │  │
  └──────────────────────────────────────────────────────────┘  │

SECTION 10 — Export:
  flex gap-3:
  [Download PDF → primary]
  [Save → secondary]
  [New Analysis → ghost/outline]
```

**SkillRadarChart Component (inline SVG):**
```
<svg viewBox="0 0 300 300" class="w-full max-w-[300px] mx-auto">
  <defs>
    <linearGradient id="userGrad">     ← green gradient
    <linearGradient id="industryGrad"> ← amber gradient
    <filter id="glow">                 ← blur for data points
  </defs>

  Background (5 concentric hexagons):
    stroke=white/5 fill=none
    Each at radius: 24, 48, 72, 96, 120

  Axis lines (6): from center to each vertex
    stroke=white/10

  Labels (6): category names at each vertex
    text-anchor=middle, text-white/50, text-xs

  Industry polygon (amber, behind):
    Points calculated from industryBenchmark scores
    fill=url(#industryGrad) stroke=#f59e0b stroke-width=1.5
    opacity=0.3

  User polygon (green, in front):
    Points calculated from userScore scores
    fill=url(#userGrad) stroke=#10b981 stroke-width=2
    opacity=0.6

  Data points (circles at each vertex):
    r=4 fill=#10b981 (user) or #f59e0b (industry)
    filter=url(#glow)
```

### 4.8 Live Analysis (`/live-analysis`)

```
LAYOUT: Uses DashboardLayout

STRUCTURE:
┌──────────────────────────────────────────────────────────────┐
│ CENTERED SEARCH AREA:                                        │
│ max-w-2xl mx-auto, space-y-6                               │
│                                                              │
│ SEARCH HEADER:                                               │
│ [Sparkles icon h-6 w-6 text-[#6366F1]]                     │
│ "What skills are you curious about?"                        │
│ text-2xl font-bold text-white text-center                   │
│                                                              │
│ SEARCH BOX:                                                  │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ [Sparkles icon absolute left-4]                        │  │
│ │ bg-[#13131C] rounded-2xl                                │  │
│ │ border border-white/10                                  │  │
│ │ hover:border-[#6366F1]/30                              │  │
│ │ focus-within:border-[#6366F1]/50                       │  │
│ │ focus-within:shadow-[0_0_30px_rgba(99,102,241,0.2)]   │  │
│ │                                                         │  │
│ │ input type=text                                        │  │
│ │ w-full pl-12 pr-4 py-4 text-white                      │  │
│ │ placeholder:text-white/30 "Search skills, roles..."    │  │
│ │                                                         │  │
│ │ [Analyze button]:                                       │  │
│ │ absolute right-2 top-1/2 -translate-y-1/2             │  │
│ │ px-5 py-2 rounded-xl                                   │  │
│ │ bg-gradient-to-r from-[#6366F1] to-[#818CF8]           │  │
│ │ text-white text-sm font-medium                        │  │
│ │ disabled:opacity-50                                    │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ STATUS INDICATOR:                                            │
│ flex items-center gap-2 justify-center mb-6                 │
│ [dot] w-2 h-2 rounded-full                                 │
│ connected → bg-emerald-500 animate-pulse                   │
│ disconnected → bg-red-500                                  │
│ "SLM Agent {status}" text-xs text-white/50                │
│                                                              │
│ QUICK QUERY BUTTONS:                                         │
│ flex flex-wrap gap-2 justify-center:                        │
│ Each button:                                                │
│ px-4 py-2 rounded-full bg-[#13131C] border border-white/10 │
│ text-sm text-white/70 hover:text-white                    │
│ hover:border-[#6366F1]/30 transition-all                  │
│ "Generative AI" "Data Science"                             │
│ "Cloud Computing" "Cybersecurity"                          │
│ "MLOps" "Full Stack Development"                           │
│                                                              │
│ ── after clicking Analyze ──                                 │
│                                                              │
│ LOADING STATE:                                               │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ flex flex-col items-center justify-center py-12       │  │
│ │                                                        │  │
│ │ Animated spinner:                                      │  │
│ │ w-12 h-12 border-4 border-[#6366F1]/30               │  │
│ │ border-t-[#6366F1] rounded-full animate-spin         │  │
│ │                                                        │  │
│ │ "SLM Agent is analyzing..."                            │  │
│ │ text-lg font-medium text-white mt-4                   │  │
│ │                                                        │  │
│ │ "Searching the web • Extracting insights •"           │  │
│ │ "Generating report"                                    │  │
│ │ text-sm text-white/40 mt-2                             │  │
│ │ with animated dot dots (.) cycling                     │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ RESULTS:                                                     │
│ space-y-6 max-w-4xl mx-auto:                               │
│                                                              │
│ SUMMARY CARD:                                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ "Analysis: {query}" text-lg font-bold text-white       │ │
│ │ flex gap-3 mt-2:                                       │ │
│ │ [skills-count badge: "{n} skills found"]               │ │
│ │ [method badge: "SLM Analysis" outline]                 │ │
│ │                                                         │ │
│ │ AI-generated summary text                               │ │
│ │ text-sm text-white/70 leading-relaxed                  │ │
│ │ "Based on real-time data from web sources..."          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ SKILLS GRID (staggered, containerVariants):                 │
│ grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4:     │
│                                                              │
│ Each skill card (motion.div):                               │
│ ┌───────────────────────────────────────────────────────┐  │
│ │ bg-[#13131C] rounded-xl p-5 border border-white/5    │  │
│ │ hover:border-[#6366F1]/30                           │  │
│ │ whileHover={{ scale:1.02, y:-4 }}                   │  │
│ │ cursor-pointer                                        │  │
│ │ onClick → opens source_url in new tab                │  │
│ │                                                       │  │
│ │ Header:                                               │  │
│ │ flex items-center justify-between mb-3               │  │
│ │ "Skill Name" text-white font-medium                  │  │
│ │ [Category badge: text-xs text-white/50               │  │
│ │  bg-white/5 px-2 py-0.5 rounded]                     │  │
│ │                                                       │  │
│ │ Demand bar:                                           │  │
│ │ flex items-center gap-3 mb-2                          │  │
│ │ "{demand}%" demand badge:                             │  │
│ │   ≥85% → bg-danger/20 text-danger                    │  │
│ │   ≥70% → bg-warning/20 text-warning                  │  │
│ │   <70% → bg-success/20 text-success                  │  │
│ │                                                       │  │
│ │ Animated progress bar:                                │  │
│ │ bg-white/5 rounded-full h-1.5                         │  │
│ │ [colored fill: width=demand%]                         │  │
│ │ transition-all duration-1000                           │  │
│ │                                                       │  │
│ │ "Source: linkedin.com" text-xs text-white/30          │  │
│ │ [ExternalLink w-3 h-3] icon → opens URL              │  │
│ │                                                       │  │
│ │ Bottom bar: gradient (color matches demand level):    │  │
│ │ ≥85%: from-red-500/10 to-red-600/10                  │  │
│ │ ≥70%: from-amber-500/10                              │  │
│ │ <70%: from-emerald-500/10                            │  │
│ └───────────────────────────────────────────────────────┘  │
│                                                              │
│ [FETCH LIVE JOBS BUTTON]:                                   │
│ flex items-center gap-2 px-6 py-3                          │
│ mx-auto                                                      │
│ bg-[#6366F1] hover:bg-[#4F46E5]                          │
│ rounded-xl text-white font-medium text-sm                  │
│ transition-all                                              │
│                                                              │
│ JOB CARDS (2-col grid, after fetching):                     │
│ grid grid-cols-1 md:grid-cols-2 gap-4:                    │
│ ┌──────────────────────────────────────────┐               │
│ │ bg-[#13131C] rounded-xl p-5               │               │
│ │ border-l-2 border-[#6366F1]              │               │
│ │ hover:border-purple-400                    │               │
│ │ transition-all cursor-pointer             │               │
│ │                                            │               │
│ │ "Job Title" text-white font-medium        │               │
│ │ "Company Name" text-white/50 text-sm      │               │
│ │ [MapPin] Location text-xs text-white/40  │               │
│ │ "Posted: date" text-xs text-white/30      │               │
│ │ [ExternalLink icon] opens source_url      │               │
│ └──────────────────────────────────────────┘               │
│                                                              │
│ FEATURE CARDS (shown when idle, no results):                 │
│ grid grid-cols-1 md:grid-cols-3 gap-4:                     │
│ Each: icon + title + description                            │
│ Live Web Search | SLM Analysis | Gap Detection              │
│ bg-[#13131C] rounded-xl p-6 border border-white/5          │
└──────────────────────────────────────────────────────────────┘
```

### 4.9 Industry Insights (`/industry`)

```
LAYOUT: Uses DashboardLayout

STRUCTURE:
┌──────────────────────────────────────────────────────────────┐
│ GRADIENT HEADER BANNER:                                       │
│ relative h-64 overflow-hidden rounded-xl                    │
│ bg-gradient-to-r from-[#6366F1]/20 to-[#818CF8]/10         │
│                                                              │
│ Background image (absolute, cover, opacity-20):             │
│ tech office / data center photo                              │
│                                                              │
│ Content:                                                     │
│ p-8 relative z-10                                            │
│                                                              │
│ "Industry Insights" text-3xl font-bold text-white          │
│ "Real-time industry hiring trends..." text-white/60        │
│                                                              │
│ 4 STAT CARDS (in-header, grid grid-cols-2 lg:grid-cols-4): │
│ Each:                                                        │
│ bg-white/5 backdrop-blur-xl rounded-xl p-4 border           │
│ border-white/10                                             │
│ Icon + value text-2xl font-bold text-white                 │
│ label text-xs text-white/50                                │
│                                                              │
│ Stats:                                                       │
│ "43K+ Active Openings"  "340% GenAI Demand Growth"         │
│ "15+ Companies Tracking" "12 Latest Updates"                │
└──────────────────────────────────────────────────────────────┘

FIXED SEARCH BAR (sticky, below header):
  position: sticky top-0 z-30
  bg-root/90 backdrop-blur-xl
  border-b border-white/5
  py-4
  max-w-7xl mx-auto px-8
  ┌─────────────────────────────────────────────────┐
  │ bg-[#13131C]/80 border border-[#6366F1]/20      │
  │ rounded-full px-6 py-3 flex items-center gap-3  │
  │ focus-within:border-[#6366F1]/50               │
  │ focus-within:shadow-[0_0_30px_rgba(99,102,241,  │
  │   0.15)] ← red indigo glow                      │
  │                                                 │
  │ [Search icon: text-white/30]                    │
  │ input: bg-transparent text-white                │
  │ placeholder:text-white/30                       │
  │ "Search industry news..."                       │
  │ [Clear button ×]                                │
  └─────────────────────────────────────────────────┘

TAB FILTERS:
  flex gap-2 mb-6
  Each tab:
  px-4 py-2 rounded-lg text-sm font-medium
  transition-all
  inactive: text-white/50 hover:text-white hover:bg-white/5
  active: bg-[#6366F1]/20 text-[#6366F1]
          border border-[#6366F1]/30
  Tabs: All | Hiring | Skill Demand | News | Reports

NEWS FEED (grid grid-cols-1 lg:grid-cols-2 gap-6):

Each POST CARD:
  ┌──────────────────────────────────────────────────────────┐
  │ bg-[#13131C] rounded-xl overflow-hidden                  │
  │ border border-white/5                                    │
  │ hover:border-[#ff0033]/20                               │
  │ transition-all cursor-pointer                           │
  │                                                          │
  │ flex flex-col md:flex-row                                │
  │                                                          │
  │ LEFT — THUMBNAIL (if imageUrl exists):                  │
  │ w-full md:w-64 h-48 relative shrink-0                  │
  │ bg-[#1C1C2A]                                            │
  │                                                          │
  │ Image overlay (absolute):                                │
  │ absolute inset-0 bg-gradient-to-t                     │
  │   from-black/60 to-transparent                          │
  │                                                          │
  │ Category badge (absolute top-3 left-3):                 │
  │ bg-{color}/20 text-{color} border                     │
  │ border-{color}/30 px-2 py-1 rounded-full text-xs     │
  │ hiring → emerald | skill → red                          │
  │ news → amber | report → secondary                       │
  │                                                          │
  │ Source badge (absolute bottom-3 right-3):               │
  │ bg-black/50 backdrop-blur-sm text-white                 │
  │ px-2 py-1 rounded text-xs                               │
  │ [Linkedin/AICTE/NASSCOM/Globe icon + name]             │
  │                                                          │
  │ RIGHT — CONTENT:                                         │
  │ flex-1 p-5                                               │
  │                                                          │
  │ Title: text-white font-semibold text-base                │
  │ hover:text-[#ff0033] transition-colors                  │
  │ line-clamp-2                                             │
  │                                                          │
  │ Content text: text-white/60 text-sm                     │
  │ line-clamp-3 leading-relaxed                             │
  │                                                          │
  │ CEO QUOTE (conditional, if ceoQuote exists):            │
  │ ┌────────────────────────────────────────────────────┐  │
  │ │ bg-gradient-to-r from-[#6366F1]/10 to-transparent  │  │
  │ │ rounded-lg p-4 mt-3 border-l-2 border-[#6366F1]  │  │
  │ │                                                     │  │
  │ │ flex gap-3:                                         │  │
  │ │ [CEO photo: w-10 h-10 rounded-full]                │  │
  │ │ Quote text: text-sm text-white/80 italic           │  │
  │ │ "press quote text..."                              │  │
  │ │ CEO name: text-xs text-[#6366F1] mt-1             │  │
  │ └────────────────────────────────────────────────────┘  │
  │                                                          │
  │ META INFO GRID (grid grid-cols-2 md:grid-cols-4):      │
  │ Each row item (flex items-center gap-1.5):              │
  │ [Building2 icon] Company: {company}                    │
  │ text-white/50 text-xs                                    │
  │ [MapPin icon] {location}                                │
  │ [Briefcase icon] {openings} openings                   │
  │ [Calendar icon] {formattedDate}                        │
  │                                                          │
  │ SKILLS BADGES (flex flex-wrap gap-1.5 mt-3):          │
  │ bg-white/5 text-white/70 border border-red-500/20     │
  │ px-2 py-0.5 rounded text-xs                            │
  │ Each required skill as a badge                          │
  └──────────────────────────────────────────────────────────┘

ANIMATION: FadeIn + slideUp staggered (staggerChildren: 0.1)
```

### 4.10 Skill Demand (`/demand`)

```
LAYOUT: Uses DashboardLayout

HEADER:
  "Current Skill Demand" text-2xl font-bold text-white
  "Real-time skill demand across top tech companies"
  text-white/50 text-sm

FILTER BAR:
  flex flex-col sm:flex-row gap-3 mb-8
  ┌────────────────────┐ ┌─────────────────────────────────────┐
  │ bg-[#13131C] border │ │ bg-[#13131C] border                 │
  │ border-white/10     │ │ border-white/10                     │
  │ rounded-xl px-4 py-3│ │ rounded-xl px-4 py-3               │
  │ flex items-center    │ │                                     │
  │   gap-2             │ │                                     │
  │ [Search icon        │ │ "All Locations ▼"                   │
  │  text-white/30]      │ │ text-white text-sm                  │
  │ input text-white    │ │ select with 6 location options:     │
  │ placeholder       │ │ All, Bangalore, Chennai,             │
  │ "Search skills..."  │ │ Hyderabad, Pune, Gurgaon, Mumbai   │
  └────────────────────┘ └─────────────────────────────────────┘

4 CHARTS (grid grid-cols-1 lg:grid-cols-2 gap-6):
  Each in bg-[#13131C] rounded-xl p-6

  ┌────────────────────────────┐ ┌────────────────────────────┐
  │ Skills Demand Score        │ │ Growth Trends (%)           │
  │ Heading + icon             │ │ Heading + icon              │
  │                            │ │                             │
  │ Recharts Horizontal Bar:   │ │ Recharts AreaChart:         │
  │ - 8 skills                 │ │ - 6-8 skills                │
  │ - Red bars (#6366F1)       │ │ - Green gradient fill       │
  │ - demand scores 0-100      │ │ - percentage change lines   │
  │ - Y: skill names           │ │ - X: months/periods         │
  │ - X: score 0-100           │ │ - Y: percentage             │
  │                            │ │ - Grid: white/5             │
  │ Tooltip: bg-[#13131C]      │ │ Tooltip: bg-[#13131C]      │
  │ border border-white/10     │ │ border border-white/10      │
  └────────────────────────────┘ └────────────────────────────┘

  ┌────────────────────────────┐ ┌────────────────────────────┐
  │ Job Postings Comparison    │ │ Demand Distribution         │
  │ Heading + icon             │ │ Heading + icon              │
  │                            │ │                             │
  │ Recharts BarChart:         │ │ Recharts PieChart           │
  │ - 6 skills                 │ │ - 4 segments               │
  │ - Blue bars                │ │ - Color-coded cells:       │
  │ - X: skills                │ │   ≥80% → red (#EF4444)    │
  │ - Y: job count (thousands) │ │   ≥60% → yellow (#F59E0B)│
  │                            │ │   <60% → green (#10B981)   │
  └────────────────────────────┘ └────────────────────────────┘

TOP SKILLS LIST (below charts):
  ┌──────────────────────────────────────────────────────────┐
  │ bg-[#13131C] rounded-xl p-6                              │
  │ "Top Skills by Demand" heading                           │
  │                                                          │
  │ Each skill row (flex items-center gap-4 p-3):            │
  │ ┌──────────────────────────────────────────────────────┐ │
  │ │ Rank # text-white/30 text-xs w-5                    │ │
  │ │                                                      │ │
  │ │ Skill name text-white font-medium flex-1             │ │
  │ │                                                      │ │
  │ │ Progress bar (hidden, shows on hover):              │ │
  │ │ w-24 h-2 bg-white/5 rounded-full                    │ │
  │ │ [colored fill] → group-hover:translate-x-0          │ │
  │ │ translate-x-8 opacity-0                              │ │
  │ │ group-hover:opacity-100                              │ │
  │ │ transition-all duration-500                           │ │
  │ │                                                      │ │
  │ │ {demand} text-lg font-bold                          │ │
  │ │ text-white w-12 text-right                          │ │
  │ │                                                      │ │
  │ │ Group hover (entire row):                            │ │
  │ │ bg-white/5 rounded-lg -mx-2 px-2 py-2               │ │
  │ │                                                      │ │
  │ │ ── HOVER EXPAND (appears below row): ──              │ │
  │ │ flex gap-6 text-xs text-white/50 pl-8:              │ │
  │ │ 📊 {n}K jobs  📍 {locations}  💰 {salary}          │ │
  │ │ 🏢 [Microsoft] [Google] [Amazon] badges              │ │
  │ └──────────────────────────────────────────────────────┘ │
  └──────────────────────────────────────────────────────────┘

REGIONAL HEATMAP:
  ┌──────────────────────────────────────────────────────────┐
  │ bg-[#13131C] rounded-xl p-6                              │
  │ "Regional Demand" heading                                │
  │                                                          │
  │ grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4:   │
  │                                                          │
  │ Each city card:                                          │
  │ ┌──────────────────────────────────────────────────────┐ │
  │ │ flex items-center justify-between mb-3:              │ │
  │ │ "Bangalore" text-white font-medium                  │ │
  │ │ [{score}% demand badge:                             │ │
  │ │  bg-[#6366F1]/20 text-[#818CF8]                     │ │
  │ │  px-2 py-0.5 rounded-full text-xs font-bold]        │ │
  │ │                                                      │ │
  │ │ space-y-2 text-xs:                                   │ │
  │ │ Top: GenAI / LLM    text-white/60                    │ │
  │ │ Jobs: 12.5K         text-white/60                    │ │
  │ │ ↑ 340%             text-emerald-400                  │ │
  │ │                                                      │ │
  │ │ bg-[#0A0A0F]/50 rounded-lg p-3                      │ │
  │ │ hover:border-[#6366F1]/20 hover:bg-[#0A0A0F]       │ │
  │ │ transition-all                                        │ │
  │ └──────────────────────────────────────────────────────┘ │
  │                                                          │
  │ Cities: Bangalore, Chennai, Hyderabad,                   │
  │         Pune, Gurgaon, Mumbai                            │
  └──────────────────────────────────────────────────────────┘

TRENDING THIS WEEK:
  ┌──────────────────────────────────────────────────────────┐
  │ grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4:   │
  │                                                          │
  │ Each trending card:                                      │
  │ ┌──────────────────────────────────────────────────────┐ │
  │ │ "🔥 Trending" text-xs text-red-400 mb-2             │ │
  │ │ "o3-mini Integration" text-white font-medium         │ │
  │ │ "+180%" text-lg font-bold text-emerald-400           │ │
  │ │ "vs last week" text-xs text-white/40                 │ │
  │ │ bg-[#13131C] rounded-xl p-4                          │ │
  │ │ border border-red-500/20                              │ │
  │ └──────────────────────────────────────────────────────┘ │
  │                                                          │
  │ Trending: o3-mini Integration (+180%)                    │
  │           Agentic AI (+145%)                             │
  │           AI Governance (+92%)                           │
  │           Multimodal AI (+88%)                           │
  └──────────────────────────────────────────────────────────┘
```

### 4.11 Future Forecast (`/forecast`)

```
LAYOUT: Uses DashboardLayout

YEAR SELECTOR:
  flex gap-2 mb-8
  Each year tab:
  px-6 py-2.5 rounded-xl text-sm font-medium
  inactive: bg-[#13131C] text-white/50 border border-white/10
            hover:text-white hover:border-white/20
  active:   bg-[#6366F1] text-white
  Years: 2026, 2027, 2028, 2029, 2030

SKILL DEMAND GROWTH SECTION:
  bg-[#13131C] rounded-xl p-6 mb-8
  "Skill Demand Growth Projection" heading

  Each skill row (space-y-4):
  ┌──────────────────────────────────────────────────────────┐
  │ "Agentic AI" text-white font-medium w-48 shrink-0      │
  │                                                          │
  │ Dual progress bars (flex-1):                            │
  │ Current: bg-white/10 rounded-full h-8                   │
  │   [inner div: w-{current}% bg-white/20]                 │
  │   + text-xs text-white/50 "Current {current}%"         │
  │                                                          │
  │ Projected: bg-white/5 rounded-full h-8                 │
  │   [inner div: w-{future}%                                  │
  │    bg-gradient-to-r from-[#6366F1] to-[#818CF8]]        │
  │   + text-xs text-white "[→{future}%]"                   │
  │                                                          │
  │ Growth badge (right):                                    │
  │ "+340%" text-lg font-bold text-red-400                  │
  └──────────────────────────────────────────────────────────┘

  8 Skills tracked:
  Agentic AI (+340%), MLOps (+280%), AI Security (+220%),
  LLM Fine-tuning (+250%), Prompt Engineering (+190%),
  Data Engineering (+175%), Cloud Architecture (+160%),
  AI Ethics & Governance (+140%)

EMERGING ROLES (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6):
  "Emerging Roles by 2030" heading

  Each role card:
  ┌──────────────────────────────────────────────────────────┐
  │ bg-[#13131C] rounded-xl p-6 border border-white/5        │
  │ hover:border-[#6366F1]/20 transition-all                │
  │                                                          │
  │ [Role Icon — 40x40 rounded-xl flex center]:             │
  │ bg-[#6366F1]/10                                          │
  │ icon: lucide-react icon text-[#6366F1] w-5 h-5         │
  │                                                          │
  │ Role title text-white font-semibold mb-1                 │
  │                                                          │
  │ Description text-sm text-white/60 mb-4                   │
  │ "Designs autonomous AI agent systems..."                 │
  │                                                          │
  │ Source attribution:                                      │
  │ "Source: LinkedIn Economic Graph 2026"                   │
  │ text-xs text-white/30 mb-4                               │
  │                                                          │
  │ Required Skills (flex flex-wrap gap-1.5):               │
  │ bg-white/5 text-white/70 border border-white/10         │
  │ px-2 py-0.5 rounded text-xs                              │
  │ ["Agentic AI"][Multi-Agent Systems]...                   │
  │                                                          │
  │ Expected Hiring:                                         │
  │ text-xs text-white/40 mt-3                               │
  │ "OpenAI · Anthropic · Startups"                          │
  │ (each as text-white/60 text-xs, separated by ·)          │
  └──────────────────────────────────────────────────────────┘

SKILL HEATMAP TABLE:
  bg-[#13131C] rounded-xl p-6 overflow-x-auto
  "Skill Demand Heatmap (2025–2030)" heading

  HTML table:
  ┌────────────────┬──────┬──────┬──────┬──────┬──────┬──────┐
  │ Skill          │ 2026 │ 2027 │ 2028 │ 2029 │ 2030 │ Trend│
  ├────────────────┼──────┼──────┼──────┼──────┼──────┼──────┤
  │ Agentic AI     │  25  │  45  │  65  │  78  │  85  │ +340%│
  │ MLOps          │  40  │  55  │  70  │  82  │  90  │ +280%│
  │ AI Security    │  20  │  35  │  52  │  65  │  75  │ +220%│
  │ ...            │      │      │      │      │      │      │
  └────────────────┴──────┴──────┴──────┴──────┴──────┴──────┘

  Cell styling (percentage-based):
  ≥80% → bg-danger/10 text-danger (red)
  60-79% → bg-warning/10 text-warning (amber)
  40-59% → bg-primary/10 text-primary (indigo)
  <40% → bg-white/5 text-white/30 (grey)

  Table classes:
  w-full text-sm
  th: text-white/50 font-medium py-3 px-4 border-b border-white/5 text-left
  td: text-white py-3 px-4 border-b border-white/5 text-center
  tr: hover:bg-white/5 transition-colors

KEY INSIGHTS:
  bg-[#13131C] rounded-xl p-6
  "Key Industry Insights" heading

  grid grid-cols-1 md:grid-cols-2 gap-4:

  Each insight card:
  ┌──────────────────────────────────────────────────────────┐
  │ bg-[#0A0A0F]/50 rounded-lg p-4                          │
  │ border-l-2 border-[#6366F1]                              │
  │ flex gap-3                                               │
  │ [icon: w-5 h-5 text-[#6366F1] shrink-0]                 │
  │                                                          │
  │ Fact text text-white font-semibold mb-1                  │
  │ "50% of workers need reskilling"                         │
  │                                                          │
  │ Source text-xs text-white/40                            │
  │ "OECD Skills Outlook 2025"                               │
  └──────────────────────────────────────────────────────────┘
```

### 4.12 Performance (`/performance`)

```
LAYOUT: Uses DashboardLayout

OVERVIEW STATS (4 cards, grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4):
  ┌──────────────────┐ ┌──────────────────┐
  │ Readiness Score  │ │ Skills Completed │
  │ 72%              │ │ 12               │
  │ [TrendingUp icon]│ │ [CheckCircle]    │
  │ +27% from start  │ │ 5 in progress    │
  │ text-emerald-400 │ │ text-primary     │
  │ bg-emerald-500/5 │ │ bg-primary/5     │
  │ border-emerald-  │ │ border-primary/10│
  │ 500/10           │ │                  │
  ├──────────────────┼┼──────────────────┤
  │ Gap Reduction    │ │ Milestones       │
  │ -29%             │ │ 3/5              │
  │ [Target icon]    │ │ [Award icon]     │
  │ text-amber-400   │ │ text-secondary   │
  │ bg-amber-500/5   │ │ bg-white/5       │
  │ border-amber-    │ │ border-white/10  │
  │ 500/10           │ │                  │
  └──────────────────┘ └──────────────────┘

  Each card: bg-[#13131C] rounded-xl p-5
             flex items-start gap-3
             Value: text-3xl font-bold text-white
             Delta: text-xs with arrow + percentage color

READINESS SCORE CHART:
  bg-[#13131C] rounded-xl p-6
  Recharts BarChart:
  - X axis: Jan, Feb, Mar, Apr, May, Jun
  - Y axis: 0-100 (score)
  - One bar per month, animated entrance
  - Bar color: gradient from #6366F1 to #818CF8
  - Tooltip: custom styled, bg-[#13131C] border white/10

SKILLS PROGRESS:
  bg-[#13131C] rounded-xl p-6
  "Skills Progress" heading

  Each skill row:
  ┌──────────────────────────────────────────────────────────┐
  │ flex items-center justify-between mb-3:                  │
  │                                                        │ │
  │ "Python" text-white font-medium                         │ │
  │ [Completed badge: bg-emerald-500/20 #10B981             │ │
  │  text-emerald-400 px-2 py-0.5 rounded text-xs]         │ │
  │                                                        │ │
  │ progress bar:                                          │ │
  │ w-full bg-white/5 rounded-full h-2                      │ │
  │ [fill div: w-100% bg-emerald-500 / w-75% bg-amber-500  │ │
  │  / w-0% bg-white/10 transition-all duration-1000]      │ │
  │                                                        │ │
  │ Skills: Python(✓100%), Data Structures(✓100%),         │ │
  │         SQL(✓100%), ML(75%-amber), AWS(40%-amber),     │ │
  │         GenAI(0%-grey)                                  │ │
  └──────────────────────────────────────────────────────────┘

COMPANY READINESS:
  bg-[#13131C] rounded-xl p-6
  "Company Readiness Improvement" heading

  Each company:
  ┌──────────────────────────────────────────────────────────┐
  │ "Microsoft" text-white font-medium mb-2                 │
  │ flex gap-1:                                             │
  │ Before bar (grey):  ████████░░░░░░░░░░░  52%            │
  │ After bar (indigo): ████████████████░░░  68%            │
  │                                                          │
  │ "+16% improvement"                                      │
  │ bg-emerald-500/10 text-emerald-400                      │
  │ px-2 py-0.5 rounded-full text-xs font-bold              │
  │                                                          │
  │ Microsoft 52→68, Google 48→62,                          │
  │ Amazon 55→71, Infosys 62→78                             │
  └──────────────────────────────────────────────────────────┘

ACTIVITY HEATMAP:
  bg-[#13131C] rounded-xl p-6
  "Learning Activity" heading

  52-week grid (7 columns × ~15 rows):
  Each cell: w-3 h-3 rounded-sm
  5 intensity levels of #6366F1:
  Level 0: bg-white/5        (no activity)
  Level 1: bg-[#6366F1]/20
  Level 2: bg-[#6366F1]/40
  Level 3: bg-[#6366F1]/60
  Level 4: bg-[#6366F1]/80
  Level 5: bg-[#6366F1]      (max activity)

  Month labels above: Jan-Dec
  Day labels on left: Mon, Wed, Fri

MILESTONES & ACHIEVEMENTS:
  bg-[#13131C] rounded-xl p-6
  "Milestones & Achievements" heading

  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4:

  Each milestone:
  ┌──────────────────────────────────────────────────────────┐
  │ bg-[#0A0A0F]/50 rounded-xl p-4                         │
  │ achieved → border-l-2 border-emerald-500                │
  │             + box-shadow:                                  │
  │               0 0 20px rgba(16,185,129,0.15)           │
  │ in-progress → border-l-2 border-white/10               │
  │               opacity: 0.5                              │
  │                                                          │
  │ Icon (emoji): text-2xl mb-2                             │
  │ 🎯 📈 📚 🏆 ⭐                                          │
  │                                                          │
  │ Title text-white font-medium text-sm                    │
  │ "First Analysis Complete"                                │
  │                                                          │
  │ Date (if achieved):                                      │
  │ text-xs text-emerald-400                                 │
  │ "Completed Jan 10, 2025"                                │
  │                                                          │
  │ "In Progress" label (if not achieved):                  │
  │ text-xs text-white/30                                    │
  └──────────────────────────────────────────────────────────┘

  5 Milestones:
  1. 🎯 First Analysis Complete     → Jan 10, 2025  ✓
  2. 📈 Gap Reduced by 10%          → Feb 15, 2025  ✓
  3. 📚 5 Skills Learned            → Apr 20, 2025  ✓
  4. 🏆 Microsoft Ready 70%+        →     —          ⟳
  5. ⭐ All Core Skills Mastered    →     —          ⟳
```

### 4.13 Reports (`/reports`)

```
LAYOUT: Uses DashboardLayout — BUT USES LIGHT THEME (unique!)

Note: This is the ONLY dashboard page using light styling:
  Background: white/light grey
  Cards: white
  Text: dark
  This is a notable exception to the dark theme rule.

STRUCTURE:
┌──────────────────────────────────────────────────────────────┐
│ STATS HEADER (3 cards, grid grid-cols-3 gap-4):            │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐   │
│ │ Total Reports  │ │ Well Covered   │ │ Needs Improve  │   │
│ │ {count}        │ │ {count} ≥70%  │ │ {count} <70%   │   │
│ │ [FileText icon]│ │ [✓ icon]      │ │ [! icon]       │   │
│ │ text-lg bold   │ │ text-emerald   │ │ text-red-600    │   │
│ │ bg-gray-50     │ │ bg-emerald-50 │ │ bg-red-50      │   │
│ │ rounded-xl p-4 │ │ rounded-xl p-4│ │ rounded-xl p-4│   │
│ │ border border  │ │ border border  │ │ border border  │   │
│ │ gray-200       │ │ emerald-200   │ │ red-200        │   │
│ └────────────────┘ └────────────────┘ └────────────────┘   │
│                                                              │
│ REPORTS LIST (space-y-4):                                   │
│                                                              │
│ Each REPORT CARD:                                           │
│ ┌──────────────────────────────────────────────────────────┐│
│ │ bg-white rounded-xl p-5 shadow-sm                      ││
│ │ border border-gray-200                                  ││
│ │ hover:shadow-md transition-all                          ││
│ │                                                          ││
│ │ Header row (flex justify-between items-start):          ││
│ │ Left:                                                   ││
│ │  "Data Structures & Algorithms Analysis"               ││
│ │  text-gray-900 font-semibold text-base                  ││
│ │  "Jan 15, 2025 · 24 skills analyzed"                   ││
│ │  text-gray-500 text-sm                                  ││
│ │                                                          ││
│ │ Right: Coverage badge:                                  ││
│ │  ≥80%: bg-emerald-100 text-emerald-700                 ││
│ │  ≥60%: bg-amber-100 text-amber-700                     ││
│ │  <60%: bg-red-100 text-red-700                          ││
│ │  px-3 py-1 rounded-full text-sm font-semibold           ││
│ │  "{coverage}% Covered"                                  ││
│ │                                                          ││
│ │ Taught Skills (flex flex-wrap gap-1.5 mb-3):           ││
│ │ bg-emerald-50 text-emerald-700                          ││
│ │ border border-emerald-200                               ││
│ │ px-2 py-0.5 rounded text-xs                             ││
│ │ [Python] [SQL] [C++] [Java] [+3 more]                  ││
│ │                                                          ││
│ │ Missing Skills (flex flex-wrap gap-1.5):               ││
│ │ bg-red-50 text-red-700                                  ││
│ │ border border-red-200                                   ││
│ │ px-2 py-0.5 rounded text-xs                             ││
│ │ [TensorFlow 95% demand] [Kubernetes 88% demand]       ││
│ │                                                          ││
│ │ ACTIONS (flex gap-2 mt-4):                             ││
│ │ [View Details → outline btn]                            ││
│ │ border gray-300 text-gray-700                          ││
│ │ [Download PDF → primary btn]                            ││
│ │ bg-[#6366F1] text-white hover:bg-[#4F46E5]            ││
│ └──────────────────────────────────────────────────────────┘│
│                                                              │
│ EMPTY STATE (when no reports):                              │
│ flex flex-col items-center justify-center py-16           │
│ [BarChart3 icon w-16 h-16 text-gray-300 mb-4]            │
│ "No Reports Yet" text-lg font-medium text-gray-900        │
│ "Upload a syllabus to generate your first report"         │
│ text-gray-500 text-sm mb-4                                 │
│ [Start Analysis → #6366F1 button → /analysis]            │
└──────────────────────────────────────────────────────────────┘
```

### 4.14 Settings (`/settings`)

```
LAYOUT: Uses DashboardLayout (with red gradient theme)

STICKY TOP NAVBAR:
  sticky top-0 z-50
  bg-[#0A0A0F]/80 backdrop-blur-md
  border-b border-white/5
  flex items-center justify-between h-16
  px-6

  Left:  [ArrowLeft → /dashboard] + Logo + "Settings" chip
  Right: (user avatar or empty)

MAIN LAYOUT (max-w-6xl mx-auto px-6 py-8):
  grid lg:grid-cols-3 gap-8

LEFT SIDEBAR (lg:col-span-1):
  ┌──────────────────────────────┐
  │ bg-[#0a0a0a]/60 backdrop-blur│
  │ rounded-2xl border border-   │
  │ white/10 p-6 shadow-lg       │
  │ shadow-red-500/5             │
  │                              │
  │ ┌──────────────────────────┐ │
  │ │ Avatar (center):         │ │
  │ │ w-24 h-24 rounded-full   │ │
  │ │ mx-auto relative mb-4    │ │
  │ │                          │ │
  │ │ Glow ring:               │ │
  │ │ absolute inset-0         │ │
  │ │ bg-gradient-to-r         │ │
  │ │ from-red-600 to-pink-600 │ │
  │ │ blur-lg opacity-50       │ │
  │ │ animate-pulse            │ │
  │ │                          │ │
  │ │ Inner circle:            │ │
  │ │ relative w-24 h-24       │ │
  │ │ bg-gradient-to-r         │ │
  │ │ from-red-600 to-pink-600 │ │
  │ │ rounded-full flex items- │ │
  │ │ center justify-center    │ │
  │ │ border border-white/20   │ │
  │ │ [User icon h-12 text-w]  │ │
  │ └──────────────────────────┘ │
  │                              │
  │ User name: text-center        │
  │ "User" font-bold text-xl     │
  │ user?.email text-gray-400    │
  │ text-sm                      │
  │                              │
  │ Role badge (center):          │
  │ inline-block mt-3            │
  │ px-3 py-1                    │
  │ bg-red-500/20 text-red-400   │
  │ border border-red-500/30     │
  │ rounded-full text-xs          │
  │ font-semibold capitalize     │
  │ "student" / "faculty" /      │
  │ "admin"                      │
  │                              │
  │ ── separator ──              │
  │ border-t border-white/10 mt-6│
  │ pt-6                         │
  │                              │
  │ Quick Stats (2-col grid):    │
  │ ┌───────────┐ ┌────────────┐ │
  │ │ [Zap icon]│ │ [Brain  ]  │ │
  │ │ "12"       │ │ "156"      │ │
  │ │ "Skills"    │ │ "Tracked"  │ │
  │ └───────────┘ └────────────┘ │
  │ Each: text-center, p-3,     │
  │ bg-white/5 rounded-xl       │
  │ icon: text-yellow-500 /     │
  │       text-red-500          │
  └──────────────────────────────┘

RIGHT CONTENT (lg:col-span-2, space-y-6):

  SUCCESS MESSAGE (conditional, AnimatePresence):
    bg-green-900/30 border border-green-500/50
    text-green-300 rounded-xl backdrop-blur-sm p-4

  ERROR MESSAGE (conditional):
    bg-red-900/30 border border-red-500/50
    text-red-300 rounded-xl backdrop-blur-sm p-4

  ┌──────────────────────────────────────────────────────────┐
  │ PROFILE SETTINGS CARD:                                   │
  │ bg-[#0a0a0a]/60 backdrop-blur-2xl                      │
  │ rounded-2xl border border-white/10 p-6                 │
  │ shadow-lg shadow-red-500/5                             │
  │                                                          │
  │ Header: [User icon bg-red-500/20 p-2 rounded-lg]       │
  │         [User icon h-5 w-5 text-red-500]               │
  │         icon + "Profile Settings" text-xl font-bold     │
  │                                                          │
  │ FORM (space-y-4):                                      │
  │                                                          │
  │ Full Name:                                              │
  │ label: text-sm font-medium text-gray-400 mb-2          │
  │ input:                                                  │
  │   w-full px-4 py-3                                      │
  │   bg-[#0f0f0f]/80 border border-white/10               │
  │   rounded-xl text-white                                │
  │   placeholder:text-gray-600                            │
  │   focus:outline-none                                   │
  │   focus:border-red-500/50                              │
  │   focus:shadow-[0_0_20px_rgba(255,0,51,0.2)]           │
  │   transition-all backdrop-blur-sm                       │
  │                                                          │
  │ Email:                                                  │
  │ (same styling but DISABLED, cursor-not-allowed,         │
  │  text-gray-500 bg-[#0f0f0f]/50)                        │
  │ note: "Email cannot be changed" text-xs text-gray-500  │
  │                                                          │
  │ Role: select dropdown                                   │
  │ (same input styling)                                    │
  │ Options: Student / Faculty / Admin                      │
  │                                                          │
  │ [Save Changes →]:                                        │
  │ flex items-center gap-2 px-6 py-3                       │
  │ bg-gradient-to-r from-red-600 to-pink-600               │
  │ text-white rounded-xl font-semibold                     │
  │ hover:shadow-lg hover:shadow-red-500/25                 │
  │ transition-all disabled:opacity-50                       │
  │ [Save icon h-4 w-4] "Saving..." / "Save Changes"       │
  └──────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────┐
  │ CHANGE PASSWORD CARD: (same wrapper styling)             │
  │ Header: [Lock icon bg-red-500/20] + "Change Password"  │
  │                                                          │
  │ Current Password: input type=password                    │
  │ New Password: input type=password                        │
  │ Confirm Password: input type=password                    │
  │                                                          │
  │ [Change Password →] (same red gradient button)           │
  │ Validation: min 6 chars + must match                     │
  └──────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────┐
  │ NOTIFICATIONS CARD: (same wrapper styling)               │
  │ Header: [Bell icon bg-red-500/20] + "Notifications"     │
  │                                                          │
  │ Each toggle item (space-y-3):                          │ │
  │ ┌─────────────────────────────────────────────────────┐ │
  │ │ bg-[#0f0f0f]/50 rounded-xl                          │ │
  │ │ border border-white/5                               │ │
  │ │ hover:border-red-500/20                             │ │
  │ │ p-4 flex items-center justify-between               │ │
  │ │ transition-all                                      │ │
  │ │                                                      │ │
  │ │ Left:                                                 │ │
  │ │ h4 font-semibold "Email Alerts"                     │ │
  │ │ p text-sm text-gray-500 "Receive..."                │ │
  │ │                                                      │ │
  │ │ Right: Toggle switch (custom component):            │ │
  │ │ w-14 h-8 rounded-full                               │ │
  │ │ ON:  bg-gradient-to-r from-red-600 to-pink-600     │ │
  │ │      transition-all                                  │ │
  │ │ OFF: bg-gray-700                                    │ │
  │ │                                                      │ │
  │ │ Knob:                                                │ │
  │ │ absolute top-1 left-1 w-6 h-6                        │ │
  │ │ bg-white rounded-full                                │ │
  │ │ shadow-lg                                           │ │
  │ │ ON:  translate-x-6                                   │ │
  │ │ OFF: translate-x-0                                   │ │
  │ │ transition-transform                                 │ │
  │ └─────────────────────────────────────────────────────┘ │
  │                                                          │
  │ 4 toggles:                                               │
  │ Email Alerts ✓ | Skill Updates ✓                        │
  │ News Updates ✗ | Weekly Report ✓                        │
  └──────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────┐
  │ DANGER ZONE:                                             │
  │ bg-[#0a0a0a]/60 rounded-2xl                             │
  │ border-2 border-red-500/30 (thicker border!)            │
  │ p-6 shadow-lg shadow-red-500/10                         │
  │                                                          │
  │ Header: [Trash2 icon bg-red-500/20 p-2 rounded-lg]     │
  │         [Trash2 h-5 text-red-500]                       │
  │         icon + "Danger Zone" text-xl text-red-500      │
  │                                                          │
  │ "Once you delete your account, there is no going       │
  │  back. Please be certain."                               │
  │ text-gray-400 mb-4                                       │
  │                                                          │
  │ [Delete Account →]:                                      │
  │ px-6 py-3 rounded-xl                                    │
  │ bg-gradient-to-r from-red-600 to-red-800                │
  │ text-white font-semibold                                 │
  │ hover:shadow-lg hover:shadow-red-500/25                 │
  │ transition-all                                           │
  └──────────────────────────────────────────────────────────┘
```

### 4.15 Bloom's Taxonomy (`/bloom`)

```
LAYOUT: Standalone (NO DashboardLayout)
Special page — FULL white/light video background design.

STRUCTURE:
┌───────────────────────────────────────────────────────────────────┐
│ FULL-SCREEN VIDEO BACKGROUND:                                     │
│ <video autoplay loop muted playsInline poster="...">              │
│   class="fixed inset-0 w-full h-full object-cover                 │
│          opacity-40 brightness-50"                                 │
│                                                                    │
│ LIQUID GLASS OVERLAY (custom CSS):                                │
│ .liquid-glass {                                                    │
│   background: rgba(255,255,255,0.03);                             │
│   backdrop-filter: blur(60px) saturate(180%);                    │
│   -webkit-backdrop-filter: blur(60px) saturate(180%);            │
│   border: 1px solid rgba(255,255,255,0.15);                      │
│   box-shadow:                                                      │
│     inset 0 1px 0 rgba(255,255,255,0.3),                         │
│     inset 0 -1px 0 rgba(255,255,255,0.1),                        │
│     0 20px 50px rgba(0,0,0,0.3);                                  │
│   mask-image: linear-gradient(                                     │
│     black 80%, transparent 100%                                  │
│   );                                                              │
│   -webkit-mask-image: linear-gradient(                            │
│     black 80%, transparent 100%                                  │
│   );                                                              │
│   mask-composite: intersect;                                      │
│ }                                                                  │
│                                                                    │
│ DUAL PANEL LAYOUT:                                                │
│ ┌─────────────────────────┬──────────────────────────────┐       │
│ │ LEFT PANEL (52%)          │ RIGHT PANEL (48%)            │       │
│ │                            │                              │       │
│ │ Liquid glass container:   │ Social links:                │       │
│ │ @apply liquid-glass       │ flex gap-4 mb-6             │       │
│ │ bg-white/5 rounded-3xl    │ [Twitter][LinkedIn]         │       │
│ │ p-12 md:p-16              │ [Instagram]                  │       │
│ │ h-screen flex flex-       │ text-white/50 hover:text-   │       │
│ │  justify-center           │ white transition-colors     │       │
│ │  items-center             │                              │       │
│ │                            │ Account:                    │       │
│ │ Logo + "bloom"            │ [Sparkles icon]             │       │
│ │ text-center               │ "Account" text-sm           │       │
│ │ text-4xl font-bold        │ text-white/50               │       │
│ │ tracking-tight            │                              │       │
│ │ italic text-white/50      │ Community:                  │       │
│ │                            │ bg-[#13131C] rounded-xl    │       │
│ │ ── animated fade-in-up ── │ border border-white/10      │       │
│ │ initial: opacity 0, y 30  │ p-4                         │       │
│ │ animate: opacity 1, y 0   │ "Enter our ecosystem"      │       │
│ │                            │ text-white font-medium     │       │
│ │ Large heading:            │ "50K+ designers"           │       │
│ │ "Innovating the         │ text-white/40               │       │
│ │  spirit of bloom AI"      │                              │       │
│ │ text-3xl/4xl font-bold   │ Feature cards grid:         │       │
│ │                            │ grid grid-cols-2 gap-3     │       │
│ │ Subtitle:                  │                              │       │
│ │ text-white/50 text-lg     │ Processing card:            │       │
│ │                            │ [Processing icon]           │       │
│ │ CTA Button:                │ "AI-driven transformations" │       │
│ │ "Explore Now"              │ text-xs text-white/50      │       │
│ │ px-8 py-4 rounded-xl      │                              │       │
│ │ bg-white/10 border        │ Growth Archive:             │       │
│ │ border-white/20          │ [Archive icon]               │       │
│ │ text-white font-semibold  │ "Historical data"           │       │
│ │ hover:bg-white/15         │                              │       │
│ │ backdrop-blur-xl         │ Bottom card:                 │       │
│ │                            │ thumbnail image +           │       │
│ │ Feature pills (flex):     │ "Advanced Plant             │       │
│ │ [🎨 AI Art]              │  Sculpting" text             │       │
│ │ [✨ Gen]                 │ + [+] add button             │       │
│ │ [🌿 3D Struct]           │                              │       │
│ │                            │ Mobile nav (md:hidden):    │       │
│ │ Quote section:            │ fixed bottom-0             │       │
│ │ bg-[#13131C]/60           │ bg-[#0A0A0F]/90            │       │
│ │ rounded-xl p-6           │ backdrop-blur-2xl           │       │
│ │ border-l-2 border-white/10│ h-16 flex items-center     │       │
│ │ border-white/20          │ justify-around              │       │
│ │ "We believe in the      │ [Home][Create]               │       │
│ │  future where..."        │ [Gallery][New] icons        │       │
│ │ text-white/70 italic     │                              │       │
│ │ text-lg mb-2             │                              │       │
│ │ "— Bloom Team"          │                              │       │
│ │ text-white/40 text-sm   │                              │       │
│ └─────────────────────────┴──────────────────────────────┘       │
│                                                                    │
│ Custom CSS Animations:                                            │
│ @keyframes fade-in-up {                                           │
│   from: { opacity: 0, transform: translateY(30px) }               │
│   to:   { opacity: 1, transform: translateY(0) }                  │
│ }  (duration: 0.8s, ease-out)                                    │
│                                                                    │
│ @keyframes gradient-shift {                                       │
│   0%   { background-position: 0% 50%; }                           │
│   50%  { background-position: 100% 50%; }                         │
│   100% { background-position: 0% 50%; }                           │
│ }  (for holographic effect)                                       │
│                                                                    │
│ Font loading:                                                      │
│ @import url('https://fonts.googleapis.com/css2?family=           │
│   Poppins:wght@400;500;600;700&family=                          │
│   Source+Serif+4:ital,wght@0,400;1,400&display=swap');          │
└───────────────────────────────────────────────────────────────────┘
```

### 4.16 Halo Effect (`/halo`)

```
LAYOUT: Standalone (NO DashboardLayout)
Special page — FULL light-themed video background.
NOTE: This is the ONLY page with a light (white) background theme.
      Completely different visual identity from the dark app.

STRUCTURE:
┌───────────────────────────────────────────────────────────────────┐
│ FULL-SCREEN VIDEO BACKGROUND:                                     │
│ <video autoplay loop muted playsinline>                           │
│   class="fixed inset-0 w-full h-full                              │
│          object-cover object-center opacity-60"                   │
│ (light / financial / abstract tech video)                        │
│                                                                    │
│ OVERLAY: white/80 gradient overlay (light version):              │
│ bg-gradient-to-b from-white/80 via-white/60 to-white           │
│                                                                    │
│ NAVBAR:                                                           │
│ ┌────────────────────────────────────────────────────────────┐   │
│ │ Logo: Custom SVG "Halo" icon (diamond shape)               │   │
│ │        + "Halo" text (custom font, bold)                   │   │
│ │                                                            │   │
│ │ Nav links (hidden md:flex gap-8):                          │   │
│ │ Network | Ecosystem | Rewards | Help | News                │   │
│ │ text-gray-700 hover:text-gray-900 font-medium             │   │
│ │ text-sm transition-colors                                  │   │
│ │                                                            │   │
│ │ [Open Wallet →] button:                                    │   │
│ │ bg-gray-900 text-white px-6 py-2.5                        │   │
│ │ rounded-full text-sm font-medium                          │   │
│ │ hover:bg-gray-800 transition-colors                        │   │
│ └────────────────────────────────────────────────────────────┘   │
│                                                                    │
│ HERO:                                                             │
│ pt-32 pb-20 px-6 text-center max-w-4xl mx-auto                 │
│                                                                    │
│ "Your Wealth Works"                                               │
│ text-5xl md:text-7xl font-bold text-gray-900                    │
│ tracking-tight                                                     │
│                                                                    │
│ "The stablecoin that bridges your digital and physical..."       │
│ text-gray-500 text-lg leading-relaxed mt-4                       │
│                                                                    │
│ CTA buttons (flex gap-4 justify-center):                         │
│ [Get Started →]: bg-gray-900 text-white px-8 py-3 rounded-full │
│ [Learn More]:    border-2 border-gray-900 text-gray-900 px-8    │
│                  py-3 rounded-full                                │
│                                                                    │
│ BRAND MARQUEE:                                                    │
│ overflow-hidden py-8 border-y border-gray-200                    │
│                                                                    │
│ Inner track (infinite scroll animation):                         │
│ @keyframes marquee {                                              │
│   0%   { transform: translateX(0); }                             │
│   100% { transform: translateX(-50%); }                          │
│ }  (duration: 20s, linear, infinite)                             │
│                                                                    │
│ flex gap-12 items-center whitespace-nowrap                       │
│ animate: marquee                                                  │
│                                                                    │
│ Brands (text-xl font-bold text-gray-400):                        │
│ Stripe · Coinbase · Uniswap · Aave · Compound ·                  │
│ MakerDAO · Chainlink                                              │
│ (duplicated for seamless loop)                                    │
│                                                                    │
│ BACKERS MARQUEE:                                                  │
│ overflow-hidden py-6                                              │
│ flex gap-12 items-center                                          │
│ animate: marquee (30s duration — slower)                         │
│                                                                    │
│ backers-marquee text-sm text-gray-400:                           │
│ Fundamental Labs · KUCOIN · NGC · NxGen ·                       │
│ Matter Labs · DEXTools · NGRAVE · Polychain                      │
│                                                                    │
│ "Meet USD Halo" SECTION:                                         │
│ max-w-6xl mx-auto px-6 py-20                                    │
│ grid grid-cols-1 md:grid-cols-2 gap-12 items-center             │
│                                                                    │
│ Left text:                                                        │
│ "Meet USD Halo" text-3xl font-bold text-gray-900 mb-4         │
│ Description paragraphs text-gray-600 leading-relaxed            │
│ [Discover it →] link text-gray-900 font-medium                 │
│   underline decoration-gray-300 hover:decoration-gray-600      │
│                                                                    │
│ Right: abstract illustration card                                │
│ bg-gradient-to-br from-gray-100 to-gray-200                     │
│ rounded-3xl p-12 flex items-center justify-center              │
│ [diamond icon: 48x48, text-gray-900]                            │
│                                                                    │
│ FEATURE CARDS (grid grid-cols-1 md:grid-cols-3 gap-6):          │
│ 3 cards (2+1 layout on md, first two span 50%):                │
│                                                                    │
│ "Savings that bloom":                                             │
│ bg-gradient-to-br from-indigo-500 to-purple-600                 │
│ rounded-2xl p-8 text-white h-64 flex flex-col                   │
│ justify-end relative overflow-hidden                             │
│ "Always fluid, always pegged":                                    │
│ bg-gradient-to-br from-teal-500 to-emerald-600                 │
│ (same layout)                                                     │
│ "Fully automated":                                                │
│ md:col-span-1 bg-gradient-to-br from-amber-500 to-orange-600   │
│ (same layout)                                                     │
│                                                                    │
│ Each card with icon, title, description text-white/80         │
│                                                                    │
│ CTA SECTION:                                                      │
│ bg-gray-50 rounded-3xl p-12 text-center                        │
│ "Start earning with USD Halo" text-2xl font-bold               │
│ [Sign Up →] [Log In →] buttons                                  │
│                                                                    │
│ FOOTER:                                                           │
│ bg-white border-t border-gray-200 py-12                        │
│ max-w-6xl mx-auto px-6                                         │
│ Logo + description + social links                               │
│ "© 2026 Halo. All rights reserved."                             │
└───────────────────────────────────────────────────────────────────┘
```

### 4.17 Settings Page — full (already in section 4.14 above)

(Already fully specified — see section 4.14)

---

## PART 5: AI CHAT ASSISTANT SPECIFICATION

```
Component: components/ai-chat-assistant.tsx
Position: fixed bottom-20 right-6 (above floating nav)
Z-index: z-50

STRUCTURE:
┌───────────────────────────────────────────────────┐
│ Floating chat widget (collapsible)                │
│                                                   │
│ CLOSED STATE:                                     │
│ Round button: w-14 h-14 rounded-full             │
│ bg-gradient-to-r from-[#6366F1] to-[#818CF8]    │
│ shadow-lg shadow-indigo-500/25                   │
│ flex items-center justify-center                  │
│ [MessageCircle or Sparkles icon, text-white]     │
│ onClick → toggle open                            │
│                                                   │
│ OPEN STATE:                                       │
│ bg-[#0A0A0F] rounded-2xl border border-white/10  │
│ shadow-2xl backdrop-blur-xl                      │
│ w-96 max-h-[500px] flex flex-col                 │
│                                                   │
│ HEADER:                                           │
│ bg-gradient-to-r from-[#6366F1]/20 to-transparent  │
│ px-4 py-3 border-b border-white/5                 │
│ "AI Assistant" text-white font-semibold          │
│ [X button] text-white/50 hover:text-white       │
│                                                   │
│ MESSAGES AREA:                                    │
│ flex-1 overflow-y-auto p-4 space-y-4            │
│ max-h-80                                         │
│                                                   │
│ User message:                                     │
│ self-end bg-[#6366F1] text-white                  │
│ rounded-2xl rounded-br-sm px-4 py-2             │
│ text-sm max-w-[80%]                               │
│                                                   │
│ Assistant message:                                │
│ self-start bg-white/5 text-white/80             │
│ rounded-2xl rounded-bl-sm px-4 py-2             │
│ text-sm max-w-[80%]                               │
│                                                   │
│ SUGGESTIONS (flex flex-wrap gap-2 mt-4):        │
│ chip buttons:                                     │
│ px-3 py-1.5 rounded-full                          │
│ bg-white/5 border border-white/10                 │
│ text-xs text-white/60 hover:text-white            │
│ hover:border-[#6366F1]/30 transition-all        │
│ [Sparkles icon] + text label                     │
│                                                   │
│ "Suggested for you:" text-xs text-white/30 mt-2  │
│                                                   │
│ Quick actions (horizontal):                       │
│ flex gap-2 px-4 py-2 border-t border-white/5   │
│ each: text-xs text-white/50 hover:text-[#6366F1]│
│ p-2 rounded-lg hover:bg-white/5                 │
│ [icon] + "Industry News" / "Demand" etc.       │
│                                                   │
│ INPUT BAR (if chat enabled):                      │
│ px-4 py-3 border-t border-white/5                │
│ flex gap-2:                                       │
│ [input] bg-white/5 border-0 rounded-lg          │
│ text-white text-sm flex-1                       │
│ placeholder:text-white/30                        │
│ [Send button] text-[#6366F1]                    │
│                                                   │
│ PAGE-AWARE NAVIGATION (PAGE_MAP):                │
│ Keyword detection triggers navigation chips:     │
│ "industry news" → Industry page (Newspaper icon)│
│ "demand" → Demand (TrendingUp)                   │
│ "skills" → Live Analysis (BarChart3)             │
│ "reports" → Reports (FileText)                   │
│ "gap" → Gap Analysis (Target)                    │
│ "jobs" → Live Analysis (Briefcase)               │
│                                                   │
│ Each chip/action:                                 │
│ arrow-right icon + label text-xs                  │
│ onClick → router.push(href)                      │
└───────────────────────────────────────────────────┘

DESIGN NOTES:
- No full AI chat backend required for MVP — use keyword matching
- Each suggestion chip has a Sparkles icon
- On click of page-aware suggestion, navigate + show brief transition
- Panel has max-height with internal scroll
- Smooth open/close animation (Framer Motion)
```

---

## PART 6: ANIMATION REFERENCE TABLE

```
Every animation used in the app, exact parameters:

┌──────────────────┬──────────────────────────────────────────────────────┐
│ Animation        │ Exact Definition                                    │
├──────────────────┼──────────────────────────────────────────────────────┤
│ Page entrance    │ opacity 0→1, y 20→0, scale 0.98→1, 400ms smooth  │
│ Card entrance    │ opacity 0→1, y 40→0, scale 0.95→1, spring preset  │
│ Stagger (grid)   │ Each child: delay = index × 50ms (staggerContainer)│
│ Card hover       │ scale 1.02, y -8px, spring preset                 │
│ Card tap         │ scale 0.98, snap preset                           │
│ Button hover     │ scale 1.05, springBouncy preset                   │
│ Button tap       │ scale 0.95, snap preset                           │
│ Button shimmer   │ translateX(-100%) → translateX(100%), 700ms       │
│ Badge appear     │ opacity 0→1, scale 0.8→1, 200ms                  │
│ Nav hover        │ scale 1.05, 200ms                                │
│ Float            │ y [-10,10,-10], 5s, easeInOut, infinite          │
│ Float large      │ y [-20,20,-20], 6s, easeInOut, infinite          │
│ Error enter/exit │ height 0→auto, opacity 0→1 → 1→0                │
│ Blur reveal      │ opacity 0→1, blur 10→0, 500ms                    │
│ Rotate infinite  │ rotate 0→360, 2s, linear, infinite               │
│ Rotate gentle    │ rotate [-5,5,-5], 4s, easeInOut, infinite        │
│ Scale pulse      │ scale [1,1.05,1], 1.5s, easeInOut, infinite     │
│ Skill card zoom  │ scale 1→1.05 on image, 500ms duration            │
│ Progress bar     │ width 0→target%, transition-all, 500ms-1000ms   │
│ Demand bar fill  │ width 0→target%, duration-1000                   │
│ Loading spinner  │ rotate 360, 1s, linear, infinite (SVG)           │
│ Skeleton pulse   │ CSS animate-pulse, 2s, ease-in-out              │
│ Toast enter      │ opacity 0→1 + y -20→0, 300ms                    │
│ Toast exit       │ opacity 1→0 + y 0→-20, 200ms                    │
│ SLM loader dots  │ "• • •" cycling animation                       │
└──────────────────┴──────────────────────────────────────────────────────┘
```

---

## PART 7: RESPONSIVE BEHAVIOR TABLE

```
┌────────────┬──────────────┬─────────────────────────────────────────┐
│ Breakpoint │ Width        │ Changes                                 │
├────────────┼──────────────┼─────────────────────────────────────────┤
│ Default    │ < 640px      │ Single column everywhere               │
│ sm         │ ≥ 640px      │ Stat cards: 2-column                    │
│ md         │ ≥ 768px      │ Bottom nav visible, 3-col analytics    │
│ lg         │ ≥ 1024px     │ Dashboard skills: 3-col                 │
│            │              │ Demand charts: 2×2 grid                │
│            │              │ Settings: 3-col layout (1+2 sidebar)   │
│            │              │ Industry: 2-col news feed              │
│ xl         │ ≥ 1280px     │ Dashboard skills: 4-col max             │
└────────────┴──────────────┴─────────────────────────────────────────┘

Grid patterns used:
  Stat cards:      grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
  Skills grid:     grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
  Charts:          grid-cols-1 lg:grid-cols-2
  Feature cards:   grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  Settings layout: grid lg:grid-cols-3 (1 sidebar + 2 content)
  News feed:       grid-cols-1 lg:grid-cols-2
  Job cards:       grid-cols-1 md:grid-cols-2
  Milestones:      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  Heatmap cities:  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  Trending:        grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
  Upload cards:    grid-cols-2 (fixed 2-col)
  Emerging roles:  grid-cols-1 md:grid-cols-2 lg:grid-cols-3

Mobile-specific:
  Bottom nav always visible on mobile (fixed bottom-4)
  Sidebar (if used) collapses to hamburger below md
  Bloom page: right panel hidden below md, mobile bottom nav shown
  Halo page: nav links hidden, simplified layout
  All touch targets: minimum 44px
  Input fields: full-width on mobile
```

---

## PART 8: ERROR & EMPTY STATE SPECIFICATIONS

```
ERROR BANNER (used for fetch errors):
  bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl px-4 py-3
  flex items-center gap-3
  [Zap icon: w-5 h-5 text-[#EF4444] shrink-0]
  Message: text-sm text-[#EF4444]
  Animation: AnimatePresence with height 0→auto → auto→0

SUCCESS TOAST:
  bg-green-900/30 border border-green-500/50
  text-green-300 rounded-xl backdrop-blur-sm
  p-4

EMPTY STATE (EmptyState component):
  flex flex-col items-center justify-center py-16
  [Icon: w-16 h-16 text-gray-300 mb-4]
  "No ... Yet" text-lg font-medium text-gray-900
  Description text-sm text-gray-500 text-center max-w-sm
  [Optional action button]

Specific empty states:
  No skills:    [Database icon] "No skills data yet"
                 "Check back for trending updates."
                 [Explore Analysis button]
  No reports:   [BarChart3 icon] "No Reports Yet"
                 "Upload a syllabus to generate your first report."
                 [Start Analysis button → /analysis]
```

---

## PART 7: COMPLETE TYPOGRAPHY SCALE

```
Display text (hero heading):    text-5xl (48px) md:text-6xl (60px) font-bold
Page title:                     text-2xl (24px) font-semibold
Section heading:                text-lg (18px) font-semibold
Card title:                     text-xl (20px) font-bold
Card subtitle/small heading:    text-sm (14px) font-medium
Body text:                      text-sm (14px) text-white/70
Label text:                     text-xs (12px) text-white/50
Help text / placeholder:        text-xs (12px) text-white/30 or text-white/40
Badge text:                     text-xs (12px) font-semibold
Button text:                    text-sm (14px) font-semibold
Button text (lg):               text-lg (18px) font-semibold
Nav label text:                 text-xs (12px) font-medium
Meta info:                      text-xs (12px) text-white/40
Stat value:                     text-2xl (24px) font-semibold or text-3xl (30px)
Stat label:                     text-sm (14px) text-white/70
Stat sublabel:                  text-xs (12px) text-white/40

Letter spacing:
  Card titles:  tracking-tight
  Others:       normal (no custom tracking)

Font weights:
  400: body text, paragraphs
  500: labels, button text, nav items
  600: semibold (section titles, card headers)
  700: bold (hero text, card titles, stat values)

Line heights:
  Body:      leading-relaxed (1.625)
  Headings:  tight (1.25)
  CRITICAL:  Never use text-gray-* in dark mode — always use text-white with opacity
```
