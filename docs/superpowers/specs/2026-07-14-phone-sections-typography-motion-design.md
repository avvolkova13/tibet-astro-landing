# Phone sections: typography and descriptive-text motion

## Scope

Apply one shared typography and text-reveal system to the four phone sections:

- «Что сегодня за день?»
- «Ваш календарь»
- «Находите удачные часы»
- «Что такое энергия ЛА?»

Do not alter the phone components, internal phone animations, section layout, decorative assets, Russian copy, curtain transitions, or mobile composition beyond responsive typography.

## Typography

- Desktop section titles become visibly larger and are constrained to two visual lines in each section.
- Supporting labels (for example, «Будьте на шаг впереди») increase to a clearly distinct middle hierarchy level.
- Descriptive paragraphs use Inter at 20px on desktop, with responsive scaling on narrow viewports.
- Existing Literata titles and the existing burgundy / cream / gold palette remain unchanged.

## Description reveal

Descriptions use a calm reading-reveal inspired by the Wembi reference:

1. When the section enters the viewport, the paragraph begins muted in the section’s dark burgundy palette.
2. A left-to-right gradient sweep reveals the final warm cream text colour with a restrained gold highlight.
3. The effect runs once together with the current section reveal timing.
4. Once complete, the paragraph remains fully opaque and stable. There is no loop, cursor, shimmer, or movement after settling.

The implementation will use a reusable React wrapper/class system rather than independent per-section animations, so timing and style are identical across all four sections.

## Verification

- Check the four sections at desktop and mobile widths.
- Confirm all titles remain exactly two visual lines at desktop.
- Confirm description text renders at 20px desktop and remains readable responsively.
- Confirm the four reveal animations play once on viewport entry and do not affect phone animation timing.
- Run `npm run build` before completion.
