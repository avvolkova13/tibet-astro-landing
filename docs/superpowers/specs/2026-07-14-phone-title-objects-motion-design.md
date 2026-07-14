# Phone titles: embedded decorative SVG and motion

## Scope

Update the same four phone sections:

- «Что сегодня за день?»
- «Ваш календарь»
- «Находите удачные часы»
- «Что такое энергия ЛА?»

Retain the current left-aligned copy and phone placement. Reuse each section’s existing right-side decorative SVG as an inline object inside the title, removing the old standalone right-side duplicate.

## Title composition

Desktop headings remain two visual lines:

- `ЧТО СЕГОДНЯ` / `ЗА [today ornament] ДЕНЬ?`
- `ВАШ` / `[planning cloud] КАЛЕНДАРЬ`
- `НАХОДИТЕ` / `УДАЧНЫЕ [clock knot] ЧАСЫ`
- `ЧТО ТАКОЕ` / `ЭНЕРГИЯ [LA flower] ЛА?`

The object must scale to the title line and behave as an inline visual glyph, not as a large independent illustration. It must not force a third title line.

## Decorative treatment and motion

- Existing sparkle SVG moves to the upper-line title area, matching the visual role of the star beside “PAGE” in the Sutera reference.
- Sparkles use a restrained opacity/scale twinkle and a tiny vertical drift.
- Embedded objects reveal with the heading, then hold a 2–3px vertical breathing movement plus a soft gold opacity/glow shift.
- No rotation, bounce, looped entry, or aggressive scaling.
- Objects and sparkles animate only after their section enters the viewport. The internal phone animations remain unchanged.

## Responsive behaviour

- Desktop gets the full inline-object composition.
- At tablet/mobile widths the objects scale down with the title without creating a third line or horizontal overflow.
- If a title line can no longer contain its object at the narrowest width, the object becomes a compact absolute ornament beside the same title line rather than changing title copy or the phone layout.

## Verification

- Inspect all four sections at 1440px, 1280px, 1024px, 768px, 430px, and 390px.
- Confirm every title remains two visual lines at desktop.
- Confirm no duplicate standalone right decorative SVG remains.
- Confirm stars and inline objects animate subtly and never rotate.
- Confirm descriptions retain the current reading reveal and 20px desktop size.
- Run `npm run build`.
