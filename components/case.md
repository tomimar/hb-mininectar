The case layout: a case header above the paper with the case's name, tags, people and actions, and browser-like case tabs at the top of the paper for the views and documents the analyst has open.

## Structure

```html
<body class="hb-app">
  <nav class="hb-global-nav" aria-label="Main">…</nav>
  <main class="hb-app__main">
    <header class="hb-case-header">…</header>
    <div class="hb-paper">
      <div class="hb-case-tabs">…</div>
      <div class="hb-paper__body">…</div>
    </div>
  </main>
</body>
```

- The case header sits on the grey ground, not on the paper. It belongs to the whole case, whichever tab is open.
- Right under a case header the paper drops its top margin.
- The case tabs replace the page header: a case page has no `hb-page-header`.

```html preview
<div class="hb-app">
  <nav class="hb-global-nav" aria-label="Main">
    <div class="hb-global-nav__top">
      <a class="hb-global-nav__logo" href="#" aria-label="Hummingbird home"><svg aria-hidden="true" viewBox="0 0 40 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M40 3.23149L39.5553 2.59264L31.2933 7.83063C30.4007 7.54842 28.6001 7.12045 26.784 7.5143C25.1533 7.86785 23.9518 8.81993 23.1025 10.4295C22.6515 11.2885 22.3427 12.2623 21.9875 13.3881C21.8238 13.906 21.6539 14.4425 21.4593 15.0038C21.3296 15.3728 21.1999 15.7295 21.0671 16.0799C14.2784 14.7433 10.6803 9.17967 11.4215 1.09474L11.5234 0L10.461 0.263605C10.3776 0.285314 8.4009 0.787715 6.24199 2.45928C2.27318 5.53571 0 10.1473 0 15.1092C0 18.7966 1.26013 22.1894 3.36654 24.8906L3.34492 24.9061C3.48699 25.089 3.64451 25.2627 3.80202 25.4271C6.70836 28.8353 11.0169 31 15.8227 31C19.9367 31 23.6522 29.5548 26.2837 26.9281C28.4148 24.8037 29.99 22.0126 30.966 18.6354C31.7474 15.9404 32.1643 12.7957 32.2137 9.29132L40 3.23149ZM4.91699 24.3261C3.79276 22.9864 2.90634 21.4358 2.32878 19.7425C4.87067 21.6715 8.3731 22.7631 12.2215 22.7631C12.416 22.7631 12.6106 22.76 12.8052 22.7538C14.8313 22.6949 16.6968 22.3413 18.1855 21.7707C16.4991 24.1556 14.5564 25.5325 12.274 25.9946C8.08277 26.8474 5.83121 25.2565 4.91699 24.3261ZM7.19327 3.70288C8.16925 2.94618 9.10818 2.45928 9.78766 2.16777C9.61161 6.33893 10.566 9.93637 12.5705 12.6345C14.3742 15.0596 16.9717 16.7188 20.122 17.4786C16.9439 18.2539 12.9658 17.5251 9.73516 15.5217C6.55393 13.5493 4.49695 10.6342 3.89468 7.27241C4.76874 5.92957 5.87754 4.72319 7.19327 3.70288ZM2.79206 9.29132C3.78967 12.3522 5.90534 14.9852 8.9136 16.8521C11.5358 18.4803 14.6244 19.3424 17.4967 19.3424C18.2071 19.3424 18.902 19.2897 19.5753 19.1812C18.4387 20.2945 15.7486 21.1039 12.762 21.1877C8.11675 21.3241 3.98734 19.7518 1.68636 16.9886C1.60605 16.3714 1.55973 15.745 1.55973 15.1061C1.55973 13.0686 1.98904 11.0993 2.79206 9.29132ZM25.1872 25.8178C22.8492 28.15 19.5259 29.4339 15.8227 29.4339C13.4105 29.4339 11.1374 28.826 9.14215 27.7623C9.42939 27.784 9.71971 27.7995 10.0162 27.7995C10.8409 27.7995 11.6995 27.7127 12.5797 27.5328C17.1045 26.6148 20.3907 22.8003 22.9264 15.5248C23.1303 14.9418 23.3032 14.3929 23.47 13.8656C23.8036 12.8112 24.0939 11.8995 24.48 11.1645C25.1069 9.97359 25.9409 9.30062 27.1083 9.04632C28.4704 8.7517 29.8757 9.04942 30.654 9.27581C30.6077 12.6376 30.2093 15.6427 29.468 18.2012C28.5692 21.321 27.13 23.8827 25.1872 25.8178Z"/></svg></a>
      <div class="hb-global-nav__group">
        <a class="hb-global-nav__item" href="#" aria-label="Inbox"><span class="hb-icon" aria-hidden="true">inbox</span></a>
        <a class="hb-global-nav__item" href="#" aria-label="Cases" aria-current="page"><span class="hb-icon" aria-hidden="true">group</span></a>
        <a class="hb-global-nav__item" href="#" aria-label="Requests"><span class="hb-icon" aria-hidden="true">forward_to_inbox</span></a>
        <a class="hb-global-nav__item" href="#" aria-label="Dashboards"><span class="hb-icon" aria-hidden="true">bar_chart</span></a>
        <a class="hb-global-nav__item" href="#" aria-label="Search"><span class="hb-icon" aria-hidden="true">search</span></a>
        <a class="hb-global-nav__item" href="#" aria-label="Intelligence"><span class="hb-icon" aria-hidden="true">account_tree</span></a>
        <a class="hb-global-nav__item" href="#" aria-label="Approvals, 10 waiting"><span class="hb-icon" aria-hidden="true">approval</span><span class="hb-global-nav__badge" aria-hidden="true">10</span></a>
      </div>
    </div>
    <div class="hb-global-nav__group">
      <button type="button" class="hb-global-nav__item" aria-label="Dark mode" aria-pressed="false" data-hb-theme-toggle><span class="hb-icon" aria-hidden="true">dark_mode</span></button>
      <a class="hb-global-nav__item" href="#" aria-label="Notifications"><span class="hb-icon" aria-hidden="true">notifications</span></a>
      <button type="button" class="hb-global-nav__account" aria-label="Your account"><span class="hb-avatar hb-avatar--md" aria-hidden="true">JD</span></button>
    </div>
  </nav>
  <main class="hb-app__main">
    <header class="hb-case-header">
      <div class="hb-case-header__info">
        <h1 class="hb-case-header__title">Aurora Holdings LLC</h1>
        <div class="hb-case-header__tags">
          <span class="hb-tag hb-tag--red">High risk</span>
          <span class="hb-tag hb-tag--blue">Shell company</span>
          <button type="button" class="hb-tag hb-tag--add" aria-label="Add tag"><span class="hb-icon hb-icon--sm" aria-hidden="true">add</span></button>
        </div>
      </div>
      <div class="hb-case-header__actions">
        <div class="hb-avatar-group" role="group" aria-label="4 people on this case">
          <span class="hb-avatar hb-avatar--sm">JD</span>
          <span class="hb-avatar hb-avatar--sm hb-avatar--muted">AW</span>
          <span class="hb-avatar hb-avatar--sm hb-avatar--muted">RG</span>
          <span class="hb-avatar-group__overflow">+1</span>
        </div>
        <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="Comments, 2 unread"><span class="hb-icon" aria-hidden="true">forum</span>2</button>
        <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="History"><span class="hb-icon" aria-hidden="true">history</span></button>
        <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="Add to case"><span class="hb-icon" aria-hidden="true">add</span></button>
        <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="Lock case"><span class="hb-icon" aria-hidden="true">lock</span></button>
      </div>
    </header>
    <div class="hb-paper">
      <div class="hb-case-tabs">
        <nav class="hb-case-tabs__list" aria-label="Case tabs">
          <div class="hb-case-tabs__tab hb-case-tabs__tab--home">
            <a class="hb-case-tabs__link" href="#" aria-label="Case overview"><span class="hb-icon" aria-hidden="true">grid_view</span></a>
          </div>
          <div class="hb-case-tabs__tab">
            <a class="hb-case-tabs__link" href="#"><span class="hb-icon" aria-hidden="true">folder</span><span class="hb-case-tabs__label">Files</span></a>
          </div>
          <div class="hb-case-tabs__tab hb-case-tabs__tab--document">
            <a class="hb-case-tabs__link" href="#" aria-current="page"><span class="hb-icon" aria-hidden="true">description</span><span class="hb-case-tabs__label">AML Investigation</span></a>
            <span class="hb-case-tabs__tab-actions">
              <button type="button" class="hb-case-tabs__tab-btn" aria-label="Pin AML Investigation"><span class="hb-icon hb-icon--sm" aria-hidden="true">push_pin</span></button>
              <button type="button" class="hb-case-tabs__tab-btn" aria-label="Close AML Investigation"><span class="hb-icon hb-icon--sm" aria-hidden="true">close</span></button>
            </span>
          </div>
        </nav>
        <button type="button" class="hb-case-tabs__menu" aria-label="All tabs"><span class="hb-icon hb-icon--sm" aria-hidden="true">arrow_drop_down_circle</span></button>
      </div>
      <div class="hb-paper__body">
        <p class="hb-text-body">The open tab's content goes here.</p>
      </div>
    </div>
  </main>
</div>
```

## Case header

| Element | Class | Notes |
|---|---|---|
| Title | `hb-case-header__title` | The case's `<h1>`: the subject or the case name. Truncates on one line. |
| Tags | `hb-case-header__tags` | The case's tags, then an `hb-tag--add` button. |
| People | `hb-avatar-group` in `__actions` | Who works the case. 16px before the buttons. |
| Actions | ghost `hb-btn--sm` in `__actions` | Icon-only, each with an `aria-label`: Comments (with its unread count), History, Add to case, Lock case. |

- `hb-case-header` is 12px top and bottom, 16px sides, on the grey ground.
- Keep the case actions in this order on every case screen. A count, like unread comments, follows its icon and goes in the label too.

## Case tabs

Browser-like tabs: the overview first, then the case's views, then the documents the analyst opened. The current tab is white and joins the paper.

| Element | Class | Notes |
|---|---|---|
| Strip | `hb-case-tabs` | 40px, `ui-bg-secondary`. Holds the `__list` and the `__menu`. |
| Tab | `hb-case-tabs__tab` | A wrapper around the tab's link; the whole tab is the link's hit area. |
| Link | `hb-case-tabs__link` | Icon and `__label`. `aria-current="page"` on the current one. |
| Overview | `__tab--home` | First, 56px, icon only (`grid_view`), `aria-label="Case overview"`. |
| Document | `__tab--document` | An opened document: 240px, with `__tab-actions` to pin and close it. |
| Menu | `hb-case-tabs__menu` | Lists every open tab when they don't fit. |

- Thin dividers separate resting tabs; they disappear next to the current one.
- The tabs are links in a `<nav aria-label="Case tabs">`, not a tablist: each one is a view of its own, with its own address.
- Name the pin and close buttons after their tab: "Close AML Investigation", not "Close".

## Do

- Open each document the analyst works on (an investigation, a filing) as a tab of its own.
- Build the content of a tab inside the paper's body, like any page.

## Don't

- Don't add a page header inside a case: the case header and the tabs already say where you are.
- Don't put the case's actions inside a tab. Actions for one document go in that document's content.
