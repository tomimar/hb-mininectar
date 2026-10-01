Mini Nectar is where Hummingbird prototypes, designs and experiments. It follows Nectar, the production design system that lives in Storybook and ships in the product, closely enough that a prototype reads as the real thing, and freely enough to try what Nectar does not have yet. It is not a production contract: when an idea becomes a feature, it is built with Nectar.

Hummingbird is an anti-money-laundering platform. Its users are compliance analysts who read dense evidence for hours at a time and then have to justify a decision to a regulator. Build for that reader: quiet surfaces, color only where it carries meaning, information ahead of ornament.

## Principles

- **The data is the interface.** Chrome recedes. A screen is mostly text and tables on white; color appears where it carries meaning, and nowhere else.
- **Weight before size.** The type scale has three sizes. Hierarchy comes from `font-weight-bold` and `ui-text-secondary`, not from bigger text.
- **Every state is a token pair.** A status is a `-soft` ground with its `-contrast` ink, plus a word. Never hue alone.
- **Accessible by construction.** Analysts work under procurement-grade accessibility requirements. Drag is never the only way; a row is never the control; an icon-only button always has a name.

## Content

Sentence case everywhere — buttons, labels, headings, table columns, menu items. Only proper nouns and regulatory terms keep their capitals (SAR, OFAC, KYC, Case, Alert when it names the object).

Buttons are verbs on the object: `Add note`, `Escalate case`, `Download CSV`. Never `Submit`, `OK`, `Click here`. A cancel is `Cancel`.

Address the analyst as *you*; the platform is never *I*, *we* or *Hummingbird* in product copy. Empty states say what the screen would hold and what to do next — "No alerts match these filters. Clear filters to see all 412." Errors say what happened and what to do, in that order, and never blame: "This file is over 25 MB. Split it or upload a CSV." No exclamation marks, no emoji, no jokes in a regulated workflow.

Numbers stay exact: amounts with currency and two decimals, dates as `12 Mar 2026`, times with the zone. Truncate a long value with an ellipsis and keep the whole value in a tooltip — never round money for layout.

## Color

Set text in `ui-text` on `ui-bg` or `ui-bg-secondary`; `ui-text-secondary` for labels and captions; `ui-text-tertiary` for placeholders and timestamps and nothing that matters. Knockout text (`ui-text-knockout`) belongs on saturated fills only: `ui-interaction`, `ui-status-danger`, `ui-status-success`, an avatar.

Every hue comes in three parts — base, `-soft`, `-contrast`. The base is a fill or a mark; `-soft` is a tinted ground; `-contrast` is the ink that goes on `-soft`. Pair them as shipped and the contrast holds in both themes; mix across pairs and it does not. `ui-status-warning` is light in both themes and never carries knockout text.

Status colors say what happened: danger, success, warning. Expressive colors say what something *is*: entity types, tags, chart series. `ui-expressive-blue` and `ui-interaction` are the same hex — reach for the expressive name when the blue is a category rather than an action, so a later retheme can move one without the other.

Success and danger in this palette are told apart by hue as well as lightness, so every status also carries an icon and a word. Never ship a red/green dot alone.

Dark mode flips `-soft` and `-contrast` for every hue, rather than re-tinting: what was a pale ground becomes a deep one and the ink lightens. Use the token names, never the hex, and a component follows automatically.

## Type

One family: Inter, at 12, 14 and 16 pixels. `hb-text-body` (14/1.6/400) is the default and covers most of the product. Labels, help text and metadata take `hb-text-caption` in `ui-text-secondary`. Panel titles take `hb-text-heading`; a section inside a panel takes `hb-text-heading-small`, which is the same size as body and separated by weight alone.

`hb-text-all-caps` (12px, `tracking-1`, uppercase) marks a group heading above a list or nav section. Never set a sentence in it.

`--font-mono` is for values that are read character by character — hashes, account numbers, API keys — not for code-flavored decoration.

## Space and shape

A 4px base: `spacing-4` binds an icon to its label, `spacing-8` separates controls in a row, `spacing-12` is the inner padding of an input or a button, `spacing-16` the padding of a card or alert, `spacing-24` the padding of a page panel, `spacing-32` the gap between page sections. `spacing-2` is only ever an optical nudge inside a control.

Radius carries meaning: `border-radius-4` on things you type into or tick, `border-radius-8` on buttons and surfaces, `border-radius-16` on modals, `border-radius-round` on avatars, tags, toggles and floating actions.

## Elevation and borders

Three shadows, no more. `shadow-overlay` for attached overlays (menus, popovers), `shadow-floating` for detached surfaces (modals, toasts, the peeking sidenav), `shadow-action` for a floating action. An elevated surface uses `ui-bg-overlay` and a shadow — never a border as well.

Borders do the opposite job: `ui-border` draws structure the eye reads past (table rules, dividers, card outlines), `ui-border-secondary` draws the edge of something interactive. If a border is both, it is interactive.

## States

Focus is a `2px solid ui-interaction` outline, on every focusable thing (set just outside the control, or inset where an outside ring would be clipped), always visible — never removed, never replaced with color alone. Controls also carry a soft halo in `ui-interaction-soft` on focus.

Hover moves to the `-highlighted` step of the same hue. Disabled is `ui-disabled` text on `ui-bg-tertiary` with `ui-disabled-soft` edges, and is deliberately low contrast: a disabled control is exempt from the contrast floor, and the dimness is the message. Never disable a button without saying nearby why.

Loading is `hb-loader`: circular inside a component, linear across a page or section.

## Iconography

Material Icons, Outlined by default; Rounded (`hb-icon--rounded`) for prominent actions and important menus. Write the ligature name as the element's text — `<span class="hb-icon">edit</span>`. Sizes are `icon-size-sm` (16px, dense controls), `icon-size-md` (20px, the default) and `icon-size-lg` (24px, standalone).

An icon defaults to `ui-icon`; inside a button or link it inherits that control's color. Any icon-only control needs an `aria-label` naming the object it acts on — "More actions for AML review", not "More".

The Hummingbird logomark (`assets/Logos/logomark.png` in the Claude Design artifact) is single-ink line art. It is the only mark; there is no wordmark file — set "Hummingbird" in Inter at `font-weight-bolder` beside it.

## Building with this system

Load `tokens.css`, then the components stylesheet — `components.css` from the repo (`https://tomimar.github.io/hb-mininectar/`), or `components/bundle.css` in the Claude Design artifact — and write plain HTML with the `hb-` classes. Add `hb.js` (`https://tomimar.github.io/hb-mininectar/hb.js`) so components open, close and update themselves from their markup. Add Tailwind for layout utilities only — never its colors or type. Alpine.js is optional, for the prototype's own logic only. Prototypes are static files opened over `file://`. For dark mode, add `data-theme="dark"` to `<html>`.

Every value in this system is a token. If you are about to write a hex, a pixel or a font size by hand, the token is missing and that is worth saying out loud.
