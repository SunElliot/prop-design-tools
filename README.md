# PropTools — Satellite Propulsion & Mass Budget Calculators

Free, browser-based propulsion and system-budget design calculators. Sixth member of
the SatTools family, alongside
[SatTools](https://sunelliot.github.io/link-budget-calculator/) (communications),
[OrbitTools](https://sunelliot.github.io/orbit-design-tools/) (orbit design),
[EPSTools](https://sunelliot.github.io/eps-design-tools/) (power),
[ThermTools](https://sunelliot.github.io/thermal-design-tools/) (thermal) and
[ADCSTools](https://sunelliot.github.io/adcs-design-tools/) (attitude control). Same
architecture: static multi-page site, shared `styles.css` / `i18n.js` (EN/中文) /
`share.js`, PWA service worker, zero backend — nothing leaves the browser.

## Tools

| Category | Tool | What it computes |
|---|---|---|
| Δv & Propellant | `dv-budget.html` | Itemized mission Δv with margin (injection, drag, SK, CA, deorbit) |
| Δv & Propellant | `propellant.html` | Rocket equation: propellant from Δv/Isp and dry or wet mass |
| Thrusters | `thruster.html` | Burn time, mass flow, total impulse, finite-burn arc check |
| Thrusters | `ep-power.html` | EP thrust ↔ power (F = 2ηP/ve), propellant & thrusting days |
| Tanks | `tank.html` | Volume with ullage, spherical diameter, tank mass estimate |
| System Budgets | `mass-budget.html` | Payload → dry via SMAD fractions, margin, wet mass, launch check |
| Reference | `reference.html` | Propellant Isp/density, thruster classes, typical Δv, mass fractions |

## Design flow

Δv Budget (items from OrbitTools) → Propellant Mass → Tank Sizing; chemical burns
checked in Thruster, EP demand fed to EPSTools' power budget; Mass Budget rolls
payload + fractions + margin + propellant into the launch mass. This closes the
concept-phase loop across the six-site family: payload → orbit → ADCS →
propulsion/mass → power → thermal → comms.

## Conventions (shared with the family)

- `?v=N` cache-busting on shared assets; `sw.js` `CACHE` bumped whenever any
  shipped file changes (cache-first service worker).
- EN/中文: static text via `DICT` in `i18n.js`, dynamic text via `t(en, zh)`,
  block content via `.en-only` / `.zh-only`.
- `share.js` serializes all id'd inputs into the URL for shareable calculations.

## Models & accuracy

Ideal rocket equation, first-order EP relations and SMAD-class statistical fractions —
for concept and preliminary design. Iterate wet mass ↔ propellant, and replace
fractions with real equipment masses as the design matures.
