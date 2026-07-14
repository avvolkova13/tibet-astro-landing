# Phone-section title objects and motion

## Goal

Integrate the existing right-side decorative SVGs and sparkle asset into the four phone-section titles, following the approved Sutera-inspired composition without changing the landing page’s visual system.

## Implementation

1. Add a reusable `PhoneTitle` component in `src/App.tsx`.
   - Keep titles left-aligned and two-line.
   - Place the decorative SVG inside the requested title phrase for each screen.
   - Place sparkles beside the first title line.
   - Reuse existing in-view reveal timing.
2. Replace standalone decorative SVGs and sparkle images in the four phone sections with the new title composition.
3. Add scoped CSS in `src/App.module.css` for title-line layout, proportional SVG sizing, and calm floating/glow motion.
   - No rotational movement.
   - Respect `prefers-reduced-motion`.
   - Preserve mobile readability.
4. Add a structural verification script, run it before and after implementation, then run the production build.

## Verification

- Four titles include their intended SVG and sparkle.
- No standalone duplicate decorative images remain.
- `npm run build` passes.
- Local preview remains available at the existing Vite address for visual review.
