# Phone Section Typography and Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the four phone sections larger two-line headings, larger labels, and one calm description-reading reveal system.

**Architecture:** `src/App.tsx` will get a small `DescriptionReveal` component powered by the existing Framer Motion viewport booleans. `src/App.module.css` will own all visual behaviour: 20px Inter descriptions on desktop, a burgundy-to-cream/gold sweep, and shared desktop title/label rules.

**Tech Stack:** React, TypeScript, Framer Motion, CSS Modules, Vite.

## Global Constraints

- Preserve Russian copy, phone components, phone internal animations, curtain transitions, decorative assets, and section positions.
- Keep Literata for titles and Inter for labels/descriptions.
- Desktop descriptions are 20px.
- The effect plays once on section entry and remains stable.
- Run `npm run build` before completion.

---

### Task 1: Build the shared description reveal

**Files:**
- Modify: `src/App.tsx:351-377, 1012-1083`
- Modify: `src/App.module.css:1260-1370, 2380-2465, 2620-2705`

**Interfaces:**
- Produces `DescriptionReveal({ inView, children, delay? })`, a reusable Framer Motion paragraph wrapper.

- [ ] **Step 1: Confirm no existing component conflicts**

Run: `rg -n "DescriptionReveal|descriptionReveal" src/App.tsx src/App.module.css`

Expected: no matches.

- [ ] **Step 2: Add the component beside `TodayCopy`**

```tsx
function DescriptionReveal({ inView, children, delay = 0.24 }: {
  inView: boolean;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.p
      className={styles.descriptionReveal}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.72, delay, ease: outerRevealEase }}
      data-revealed={inView ? 'true' : 'false'}
    >
      {children}
    </motion.p>
  );
}
```

- [ ] **Step 3: Replace the four existing description paragraph wrappers**

Use this exact shape for Today, Calendar, Hours and LA, retaining each existing text string exactly:

```tsx
<DescriptionReveal inView={planningSectionInView}>
  Планируйте не наугад, а с ясной картиной месяца. Удачные дни и праздники традиций Бон и буддизма уже отмечены, остаётся выбрать дело и увидеть лучшие даты для него
</DescriptionReveal>
```

- [ ] **Step 4: Add the shared sweep CSS**

```css
.descriptionReveal {
  margin: 0;
  color: transparent;
  background: linear-gradient(90deg, #8e5a48 0%, #8e5a48 28%, #d7a966 46%, #f3e8dd 58%, #f3e8dd 100%);
  background-size: 260% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  font-family: Inter, system-ui, sans-serif;
  font-size: 20px;
  line-height: 1.35;
}
.descriptionReveal[data-revealed='true'] { animation: description-reading-reveal 1.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes description-reading-reveal { from { background-position: 100% 0; } to { background-position: 0 0; } }
```

- [ ] **Step 5: Build and commit the task**

Run: `npm run build`

Expected: Vite production build succeeds.

Then run: `git add src/App.tsx src/App.module.css && git commit -m "Animate phone section descriptions"`

### Task 2: Apply shared two-line hierarchy

**Files:**
- Modify: `src/App.tsx:351-377, 1012-1083`
- Modify: `src/App.module.css:1344-1354, 2402-2440, 2640-2684, 4580-4800`

**Interfaces:**
- Consumes existing `.todayStandaloneCopy`, `.planningCopy`, `.clockCopy`, and `.laCopy`.
- Produces shared desktop heading and label sizing.

- [ ] **Step 1: Add deterministic desktop breaks for the current headings**

Use title words only; do not rewrite copy. Example:

```tsx
<motion.h2 {...getOuterRevealProps(planningSectionInView, 0.08)}>
  Ваш<br />календарь
</motion.h2>
```

- [ ] **Step 2: Add the hierarchy CSS**

```css
@media (min-width: 981px) {
  .todayStandaloneCopy h2, .planningCopy h2, .clockCopy h2, .laCopy h2 {
    width: min(31vw, 31rem);
    font-size: clamp(3.35rem, 4.1vw, 4.8rem);
    line-height: 0.98;
  }
  .todayStandaloneCopy .kicker, .planningCopy span, .clockCopy span, .laCopy span {
    font-size: clamp(1.15rem, 1.35vw, 1.4rem);
    line-height: 1.2;
  }
}
@media (max-width: 980px) { .descriptionReveal { font-size: clamp(1rem, 4.3vw, 1.25rem); } }
```

- [ ] **Step 3: Verify and commit the task**

Run: `npm run build`

Expected: Vite production build succeeds.

Then run: `git add src/App.tsx src/App.module.css && git commit -m "Refine phone section type hierarchy"`

### Task 3: Verify all four sections

**Files:**
- Verify only: `src/App.tsx`, `src/App.module.css`

- [ ] **Step 1: Confirm shared usage**

Run: `rg -n "<DescriptionReveal" src/App.tsx`

Expected: four results for Today, Calendar, Hours and LA.

- [ ] **Step 2: Check desktop and mobile layouts**

Check each section at 1440px and 390px. Expected: two-line desktop headings, enlarged labels, 20px desktop descriptions, no phone overlap, and one reading reveal per viewport entry.

- [ ] **Step 3: Run the final build**

Run: `npm run build`

Expected: Vite production build succeeds without errors.
