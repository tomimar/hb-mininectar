A person, as initials or a photograph.

## Sizes

Always add a size modifier. `--md` is the default choice.

| Size | Class | Dimensions | Use for |
|---|---|---|---|
| Small | `--sm` | 24px | Dense tables and chips. |
| Medium | `--md` | 32px | The default: sidebars, cards, list rows. |
| Large | `--lg` | 40px | Top nav and comment threads. |

```html preview
<div style="display: flex; align-items: center; gap: var(--spacing-12);">
  <div class="hb-avatar hb-avatar--sm">EC</div>
  <div class="hb-avatar hb-avatar--md">EC</div>
  <div class="hb-avatar hb-avatar--lg">EC</div>
</div>
```

## Color

- The default ground is `ui-interaction`, with knockout (white) initials.
- Override it per person with the `--hb-avatar-bg` custom property.
- Use an expressive token so the initials stay knockout-readable.
- Give each person the same color everywhere, so they stay recognizable.

```html preview
<div style="display: flex; align-items: center; gap: var(--spacing-12);">
  <div class="hb-avatar hb-avatar--md">EC</div>
  <div class="hb-avatar hb-avatar--md" style="--hb-avatar-bg: var(--ui-expressive-purple)">DO</div>
  <div class="hb-avatar hb-avatar--md" style="--hb-avatar-bg: var(--ui-expressive-green)">MR</div>
  <div class="hb-avatar hb-avatar--md" style="--hb-avatar-bg: var(--ui-interaction-contrast)">JP</div>
</div>
```

## Muted

`--muted` drops the whole avatar's opacity (ground and initials). Use it to de-emphasize someone who is no longer active on the case, or everyone but the active person in a group. It works with any `--hb-avatar-bg`.

```html preview
<div style="display: flex; align-items: center; gap: var(--spacing-12);">
  <div class="hb-avatar hb-avatar--md" style="--hb-avatar-bg: var(--ui-interaction-contrast)">EC</div>
  <div class="hb-avatar hb-avatar--md hb-avatar--muted">AL</div>
  <div class="hb-avatar hb-avatar--md hb-avatar--muted" style="--hb-avatar-bg: var(--ui-expressive-purple)">DO</div>
  <div class="hb-avatar hb-avatar--md hb-avatar--muted" style="--hb-avatar-bg: var(--ui-expressive-green)">MR</div>
</div>
```

## Structure

- Initials: two letters (first and last name) as the element's text.
- Photo: an `<img>` with the same classes and a real `alt`.

```html
<div class="hb-avatar hb-avatar--md">EC</div>
<img class="hb-avatar hb-avatar--md" src="…" alt="Elena Cruz">
```

## Avatar group

- Wrap several avatars in `hb-avatar-group` to overlap them.
- The group masks a 2px transparent gap into each overlap, so it sits on any surface without configuration.
- Show at most three or four avatars.
- Put the remainder in a final `hb-avatar-group__overflow` counter ("+3"). Its accessible name lists who it stands for.

```html preview
<div class="hb-avatar-group">
  <div class="hb-avatar hb-avatar--md">EC</div>
  <div class="hb-avatar hb-avatar--md" style="--hb-avatar-bg: var(--ui-expressive-purple)">DO</div>
  <div class="hb-avatar hb-avatar--md" style="--hb-avatar-bg: var(--ui-expressive-green)">MR</div>
  <span class="hb-avatar-group__overflow">+3<span class="hb-visually-hidden">: Ana Lee, Jon Park, Sara Diaz</span></span>
</div>
```

## Do

- Pair the avatar with the person's name wherever the name fits. An avatar is never the only identification of a person.
- Keep avatars the same size within one context.

## Don't

- Don't use sizes other than `--sm`, `--md` and `--lg`.
- Don't mix sizes in the same row or group.
- Don't use an avatar as a primary navigation trigger without a clear affordance.

## Example

```html preview
<div style="display: flex; align-items: center; gap: var(--spacing-8);">
  <div class="hb-avatar-group">
    <div class="hb-avatar hb-avatar--sm" style="--hb-avatar-bg: var(--ui-expressive-purple)">EC</div>
    <div class="hb-avatar hb-avatar--sm" style="--hb-avatar-bg: var(--ui-expressive-green)">DO</div>
    <div class="hb-avatar hb-avatar--sm hb-avatar--muted">MR</div>
    <span class="hb-avatar-group__overflow">+2<span class="hb-visually-hidden">: Ana Lee, Jon Park</span></span>
  </div>
  <span>Elena Cruz and 4 others are reviewing this case</span>
</div>
```
