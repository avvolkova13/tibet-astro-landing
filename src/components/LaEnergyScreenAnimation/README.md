# LaEnergyScreenAnimation

Reusable React component for the Tibet Astro LA Energy phone-screen reveal animation.

## Files To Copy

Copy this whole folder into the landing project:

```txt
LaEnergyScreenAnimation/
  LaEnergyScreenAnimation.tsx
  LaEnergyScreenAnimation.module.css
  LaEnergyScreenAnimation.module.css.d.ts
  LaEnergyScreenAnimation.assets/
    la-body.png
    la-card-dot-gold.svg
    la-card-dot-green.svg
    la-point-gold-left.svg
    la-point-gold-right.svg
    la-point-green.svg
    la-tab-calendar-1.svg
    la-tab-calendar-2.svg
    la-tab-clock.svg
    la-tab-cog.svg
    la-tab-fire.svg
    la-tab-sun.svg
```

## Import

```tsx
import LaEnergyScreenAnimation from "./LaEnergyScreenAnimation/LaEnergyScreenAnimation";
```

Adjust the import path to match where the folder is placed in the landing project.

## Required Dependencies

- React
- CSS Modules support
- A bundler that supports `new URL("./asset", import.meta.url).href` for local image assets, such as Vite, Next.js, or a compatible Webpack setup.

No animation library is required.

## Props

```ts
type LaEnergyScreenAnimationProps = {
  className?: string;
  autoPlay?: boolean;
  scale?: number;
};
```

- `className`: optional wrapper class.
- `autoPlay`: starts the reveal animation automatically. Defaults to `true`.
- `scale`: scales the full phone mockup. Defaults to `1`.

## Usage

```tsx
export function LandingSection() {
  return (
    <section>
      <LaEnergyScreenAnimation scale={0.78} />
    </section>
  );
}
```

## Assets Used

- `LaEnergyScreenAnimation.assets/la-body.png`
- `LaEnergyScreenAnimation.assets/la-point-gold-left.svg`
- `LaEnergyScreenAnimation.assets/la-point-gold-right.svg`
- `LaEnergyScreenAnimation.assets/la-point-green.svg`
- `LaEnergyScreenAnimation.assets/la-card-dot-gold.svg`
- `LaEnergyScreenAnimation.assets/la-card-dot-green.svg`
- `LaEnergyScreenAnimation.assets/la-tab-sun.svg`
- `LaEnergyScreenAnimation.assets/la-tab-calendar-1.svg`
- `LaEnergyScreenAnimation.assets/la-tab-calendar-2.svg`
- `LaEnergyScreenAnimation.assets/la-tab-clock.svg`
- `LaEnergyScreenAnimation.assets/la-tab-fire.svg`
- `LaEnergyScreenAnimation.assets/la-tab-cog.svg`

## Notes

- The component is self-contained and has no preview page dependency.
- Keep the asset folder next to `LaEnergyScreenAnimation.tsx`; the component imports assets by relative path.
- The animation is reveal-only and does not include interactions, switching states, or auto-changing positions.
