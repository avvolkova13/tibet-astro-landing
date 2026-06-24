# CalendarScreenAnimation Integration

Copy these files into the target project:

- `CalendarScreenAnimation.tsx`
- `CalendarScreenAnimation.module.css`
- `CalendarScreenAnimation.module.css.d.ts` if the target TypeScript setup does not already type CSS modules

## Import

```tsx
import CalendarScreenAnimation from "./CalendarScreenAnimation";
```

## Usage

```tsx
<CalendarScreenAnimation />
```

Optional props:

```tsx
<CalendarScreenAnimation className="calendarPreview" scale={0.78} autoPlay />
```

## Props

- `className?: string` adds a class to the outer wrapper.
- `scale?: number` scales the complete phone mockup. Default: `1`.
- `autoPlay?: boolean` runs the reveal animation. Default: `true`. Set to `false` to render the fully revealed static calendar screen.

## Dependencies

- React 18+
- CSS Modules support
- No animation library is required
- No external image files are required

## Assets Used

All assets are embedded as data URLs inside `CalendarScreenAnimation.tsx`:

- `dragonImage`: Figma-exported dragon image, 63x31 PNG.
- `lotusImage`: Figma-exported lotus image, 30x30 PNG.
- `arrowLeftImage`: Figma-exported left arrow circle image, 24x24 PNG.
- `arrowRightImage`: Figma-exported right arrow circle image, 24x24 PNG.
- `closeImage`: Figma-exported active filter close image, 24x24 PNG.

The status icons, tab icons, phone frame, rails, calendar grid, cards, dots, shadows, and home indicator are CSS/markup-based and do not require separate assets.

## Notes

This component contains only the Calendar reveal sequence. It does not include day switching, interactions, slideshow logic, preview wrappers, or standalone page styling.
