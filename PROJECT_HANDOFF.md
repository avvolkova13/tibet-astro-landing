# Tibet Astro Landing - Project Handoff

## Workspace

- Root: `/Users/anastasiavolkova/Documents/Codex/2026-06-17/files-mentioned-by-the-user-logo`
- Stack: React 19, TypeScript, Vite 7, Framer Motion 12, CSS Modules.
- This directory is not a Git repository.
- Current preview: `http://127.0.0.1:5173/?preview=today-figma-1`
- Latest verified command: `npm run build`
- Current build passes.

## Non-negotiable Product Constraints

- Do not rewrite or add Russian landing-page copy.
- Do not alter the app UI or source screenshots internally.
- Follow supplied Figma frames as the source of truth.
- Use CSS Modules only.
- Use Framer Motion for reveal and interaction motion.
- Motion must be calm, premium, cinematic, and subtle.
- Avoid generic SaaS composition, excessive bouncing, aggressive 3D motion,
  fantasy decoration, neon, harsh shadows, and AI-poster aesthetics.
- Phone rotation must remain subtle and readable.
- Preserve responsive behavior and test desktop/mobile.

## Source Files

- Main React implementation: `src/App.tsx`
- Main CSS Module: `src/App.module.css`
- Global CSS: `src/styles/global.css`
- Entry: `src/main.tsx`
- CSS/query declarations: `src/vite-env.d.ts`
- HTML entry: `index.html`

## Assets

All are under `public/assets/`.

- `logo.svg`: supplied Tibet Astro logo.
- `02_Block_Today.png`: original Today screenshot, 1560x3376.
- `03_Block_Calendar.png`: original Calendar screenshot, 1560x3688.
- `03_Block_Clock.png`: original Clock screenshot, 1560x3888.
- `04_Block_LA.png`: original LA screenshot, 1560x3776.
- `00_Visual_Style_Reference.png`: supplied full reference artwork.
- `hero-girl.png`: prepared during the latest turn by cropping the right half of
  `00_Visual_Style_Reference.png`; 2224x3388. It contains the full luminous girl
  on a burgundy background and is intended for the new Hero.

Original external references:

- `/Users/anastasiavolkova/Downloads/Desktop - 6.png`: final Hero visual
  reference, 1440x864.
- `/Users/anastasiavolkova/Downloads/00_Visual_Style_Reference.png`
- `/Users/anastasiavolkova/Downloads/logo.svg`

## Figma

File:

- `https://www.figma.com/design/WtpYZTFRJvVC7CjCnZRieb/Tibet-Astro`

Important nodes:

- Hero source of truth: `717:11672`
- Section 2 / Today screen source of truth: `443:8373`
- Another linked project node: `463:4655`

Figma access has been intermittent. It requested reauthentication, accepted it,
then long metadata/screenshot calls were interrupted or timed out. Retry direct
Figma calls if needed. The supplied `Desktop - 6.png` clearly shows the final
Hero composition and can be used together with the node.

## Current Page Structure

1. Hero: still the OLD implementation with headline, text, buttons, and a Today
   phone. This must be replaced.
2. Section 2: "Что сегодня за день?" - implemented as a living Figma-faithful
   app screen inside the transparent phone.
3. Planning section: Calendar and Clock phones.
4. LA section.
5. Final CTA.

Do not change page structure outside the requested section.

## Completed Section 2 Implementation

`LivingTodayScreen` in `src/App.tsx`:

- Uses the supplied Today screenshot as exact visual source.
- Header/status/navigation are taken from the original image.
- Day selector is rebuilt as a real animated layer.
- Starts with Wednesday selected, smoothly changes to Thursday.
- Active capsule changes width/height using Framer Motion layout animation.
- Main card, secondary card, recommendations, and tab bar reveal in priority
  order with overlapping delays.
- Active green dot receives a subtle recurring pulse.
- Final resting state matches the supplied Figma Today frame.
- Desktop and 390x844 mobile were visually verified.
- No horizontal overflow or local runtime errors were found.

Motion references reviewed:

- Day selector Pinterest reference:
  `https://ru.pinterest.com/pin/893331276104267262/`
- Card reveal Pinterest reference:
  `https://ru.pinterest.com/pin/4644405860847210/`

The useful principles extracted were shared-geometry selection movement,
restrained easing, short vertical card travel, and importance-based stagger.

## Transparent Phone System

`TransparentPhoneMockup` is reusable for Today, Calendar, Clock, and LA.

It includes:

- Translucent outer contour.
- Warm metallic/glass rim.
- Recessed dark inner glass.
- Soft reflections and ambient glow.
- Side hardware details.
- Burgundy/golden contour lines.
- Screen-specific focus/signal effects for static screenshot phones.

Section 2 passes `LivingTodayScreen` as children, so its UI is genuinely layered
and animated rather than handled by generic screenshot masks.

## Hero - Required Next Work

The latest user request is to completely implement the Hero from Figma node
`717:11672`.

The supplied final composition (`Desktop - 6.png`) is:

- 1440x864 full-viewport burgundy scene.
- Tibet Astro logo at upper left, approximately x=50, y=50, width about 100.
- Large luminous girl centered, extending beyond the bottom viewport.
- Split display title across the girl:
  - Left: `ТИБЕТСКИЙ`
  - Right: `КАЛЕНДАРЬ`
- Left supporting copy:
  `Узнавайте особенности дня,`
  `находите благоприятные даты`
- Right supporting copy:
  `и следите за жизненной энергией`
  `ЛА в одном приложении.`
- Transparent center down-arrow between the split title.
- Two wide pill-shaped store buttons along the bottom:
  - Google Play on the left.
  - App Store on the right.
- Figure is the emotional center and must not be replaced by a phone.

Required Hero motion:

- Girl: almost imperceptible breathing, contour shimmer, slow glow modulation,
  tiny hair-line movement.
- Background: moving ambient blooms, sparse tiny particles, delicate depth.
- Reveal order: logo, title, supporting copy, buttons, scroll arrow.
- Buttons: glass reflection, subtle hover lift/depth/glow.
- Arrow: continuous slow opacity/scale breathing.
- Arrow click: custom smoothly eased scroll to Section 2.
- Add `id="today"` to Section 2 for the arrow target.
- Respect `prefers-reduced-motion`.

Important: a large patch attempting the Hero replacement FAILED validation and
was not applied. Therefore:

- `hero-girl.png` exists.
- No new Hero React/CSS implementation exists yet.
- Current `src/App.tsx` still contains `heroY`, `heroRotate`, `heroScale` and the
  old Hero phone.
- Current CSS still contains old `.hero`, `.brand`, `.heroText`, `.heroPhone`
  rules.

## Suggested Hero Implementation Shape

Create a dedicated `HeroScene` component in `src/App.tsx`.

Suggested layers:

1. `.heroAtmosphere`
   - 2-3 radial bloom spans.
   - 8-12 tiny particle spans with CSS variables.
2. `.heroGirl`
   - Base `hero-girl.png`.
   - Second clipped duplicate for hair-only micro movement.
   - Overlay shimmer sweep or masked contour highlight.
3. `.heroLogo`
4. Split title clips:
   - `.heroTitleLeftClip`
   - `.heroTitleRightClip`
5. Supporting copy left/right.
6. `.heroStoreRow` with dedicated Figma-style store buttons.
7. `.heroScrollArrow`

Use absolute positioning at desktop to mirror the 1440x864 frame. Add a
purposeful responsive composition under 980px rather than shrinking the desktop
scene blindly.

For store marks, do not add a library. CSS/SVG is sufficient:

- Google Play: small CSS triangle mark plus exact visible label structure.
- Apple: simple inline SVG silhouette plus label structure.

## Cache-Busting Convention

The existing Vite dev server served stale transformed modules, so temporary
query imports are currently used:

- `src/App.tsx` imports:
  `./App.module.css?today-figma-css-1`
- `src/main.tsx` imports:
  `./App?today-figma-app-1`
- `index.html` loads:
  `/src/main.tsx?v=today-figma-1`
- Matching declarations exist in `src/vite-env.d.ts`.

When changing Hero, increment all three query labels consistently, for example:

- `hero-figma-css-1`
- `hero-figma-app-1`
- `hero-figma-1`

Also update matching declarations in `src/vite-env.d.ts`.

## Verification Workflow

1. Run `npm run build`.
2. Reload or navigate the in-app browser to a new query URL.
3. Check browser console only for localhost-origin errors; Pinterest tabs can
   leave irrelevant errors in the shared log.
4. Verify desktop around 1440x900.
5. Verify mobile at 390x844.
6. Ensure `document.documentElement.scrollWidth === clientWidth`.
7. Reset temporary browser viewport override before finishing.
8. Leave the updated localhost preview visible.

## Current Build State

As of the handoff:

- `npm run build` passes.
- Output bundle:
  - CSS about 21.45 kB.
  - JS about 344.52 kB.
- No Git repository is present.
- The current visible preview may still be:
  `http://127.0.0.1:5173/?preview=today-figma-1`

## Ready-to-Paste Prompt for the Next Chat

Continue the Tibet Astro landing implementation in:

`/Users/anastasiavolkova/Documents/Codex/2026-06-17/files-mentioned-by-the-user-logo`

Read `PROJECT_HANDOFF.md` first and treat it as authoritative project context.

Implement the Hero completely from Figma node `717:11672` and the supplied
`/Users/anastasiavolkova/Downloads/Desktop - 6.png`.

Do not redesign. Match the exact composition, proportions, hierarchy, spacing,
split title, centered girl, supporting copy, center arrow, and bottom store
buttons. Use `public/assets/hero-girl.png` as the animated central figure layer.

Add subtle breathing, hair-line movement, contour shimmer, ambient blooms,
particles, staggered logo/title/copy/button/arrow reveals, breathing arrow, and
custom smooth scroll to Section 2. Respect reduced motion.

Do not modify the completed Section 2 implementation or other sections.

After implementation:

- increment the Vite cache-busting query imports consistently,
- run `npm run build`,
- update the in-app localhost preview,
- verify desktop and 390x844 mobile,
- ensure no horizontal overflow or local runtime errors.
