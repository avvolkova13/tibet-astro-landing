import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/App.module.css', import.meta.url), 'utf8');

const expectations = [
  ['Today', 'assets.todayOrnament'],
  ['Calendar', 'assets.planningCloud'],
  ['Hours', 'assets.planningKnot'],
  ['LA', 'assets.laFlower'],
];

for (const [name, asset] of expectations) {
  if (!source.includes(asset)) {
    throw new Error(`${name}: missing inline title asset ${asset}`);
  }
}

const phoneTitleUses = (source.match(/<PhoneTitle/g) ?? []).length;
if (phoneTitleUses !== 4) {
  throw new Error(`Expected 4 PhoneTitle instances, found ${phoneTitleUses}`);
}

if (
  !source.includes('styles.titleInlineObject') ||
  !source.includes('styles.titleObjectSlot') ||
  !source.includes('styles.titleMovingWord') ||
  !source.includes("'--title-object-width': objectWidth") ||
  !source.includes("'--title-slot-width': slotWidth") ||
  !source.includes("data-active={inView ? 'true' : 'false'}")
) {
  throw new Error('Title object styling hook is missing');
}

if (
  !source.includes('styles.descriptionRevealWord') ||
  !source.includes('styles.descriptionRevealSpace') ||
  !source.includes('--word-index') ||
  !source.includes('--description-light-delay') ||
  !source.includes('lightDelay = 2.08')
) {
  throw new Error('Description light typing hooks are missing');
}

if (
  !css.includes('--description-final-color') ||
  !css.includes('--description-light-delay: 2.08s;') ||
  !css.includes('calc(var(--description-light-delay) + (0.026s * var(--word-index)))') ||
  !css.includes('--phone-description-frame-width') ||
  !css.includes('font-weight: 500;') ||
  !css.includes('font-weight: 500 !important;') ||
  !css.includes('color: var(--description-final-color);')
) {
  throw new Error('Description reveal final brightness or weight is missing');
}

if (
  !css.includes('--hero-title-first-line-top') ||
  !css.includes('--hero-title-second-line-top') ||
  !css.includes('.heroScrubHero .heroTitleLeft') ||
  !css.includes('top: var(--hero-title-first-line-top) !important;') ||
  !css.includes('.heroScrubHero .heroTitleRight') ||
  !css.includes('top: var(--hero-title-second-line-top) !important;')
) {
  throw new Error('Hero title line spacing override is missing');
}

if (
  !css.includes('--adaptive-title-object-scale') ||
  !css.includes('calc(var(--title-object-width) * var(--adaptive-title-object-scale))') ||
  !css.includes('height: auto !important;') ||
  !css.includes('title-object-glow-flicker')
) {
  throw new Error('Adaptive title SVG proportional sizing override is missing');
}

if (
  !source.includes('delay: 0.82') ||
  (source.match(/getOuterRevealProps\([^,]+, 1\.28\)/g) ?? []).length < 4 ||
  !source.includes('const slotWidth = `calc((${objectWidth} * var(--adaptive-title-object-scale, 1)) + 32px)`') ||
  !css.includes('padding-inline: 16px;')
) {
  throw new Error('Sequential title, SVG, and subtitle reveal timing is missing');
}

if (css.includes('title-word-spread') || css.includes('--title-word-shift')) {
  throw new Error('Title word spread should use a single slot expansion, not word transform animation');
}

console.log('Phone title object structure verified');
