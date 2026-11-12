The frame of every Hummingbird screen: the global nav on the left and the paper, the white page the content sits on.

## Structure

```html
<body class="hb-app">
  <nav class="hb-global-nav" aria-label="Main">…</nav>
  <main class="hb-app__main">
    <div class="hb-paper">
      <header class="hb-page-header">…</header>
      <div class="hb-paper__body">…</div>
    </div>
  </main>
</body>
```

- `hb-app` goes on `<body>`. It fills the window (`100vh`) on the `ui-bg-tertiary` ground and never scrolls itself. The paper's body scrolls.
- `hb-app__main` holds everything right of the nav: a paper, or a case header and a paper.
- Every screen uses this frame. Don't build a page without the nav, and don't put content straight on the grey ground.

## Layouts

Five layouts cover the product. Each one has a template: `python3 scripts/new_prototype.py ../prototypes/<name> --template <template>`.

| Layout | Use it for | Header | Template |
|---|---|---|---|
| Page | Most pages: settings, a list, a form | A title, with breadcrumbs when the page sits under another one | `page` |
| Dashboard | A section's main page, listing its records with views as tabs, like Requests | Section icon, title, tabs; a table toolbar, table and footer in the body | `dashboard` |
| Page with tabs | One record with sibling views, each in a tab | Breadcrumbs, title, status tag, actions, tabs | `page-tabs` |
| Record | A profile or entity with many sections: a subject, a business | Type icon, title, subtitle, tags, actions; a Sidenav in the body | `profile` |
| Case | Anything inside a case | A case header above the paper, case tabs at the top of it | `case-tab` |

The headers are in the [Page header](page-header.html) guide; the case pieces are in [Case](case.html).

### Page

```html preview
<div class="hb-app">
  <nav class="hb-global-nav" aria-label="Main">
    <div class="hb-global-nav__top">
      <a class="hb-global-nav__logo" href="#" aria-label="Hummingbird home"><svg aria-hidden="true" viewBox="0 0 40 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M40 3.23149L39.5553 2.59264L31.2933 7.83063C30.4007 7.54842 28.6001 7.12045 26.784 7.5143C25.1533 7.86785 23.9518 8.81993 23.1025 10.4295C22.6515 11.2885 22.3427 12.2623 21.9875 13.3881C21.8238 13.906 21.6539 14.4425 21.4593 15.0038C21.3296 15.3728 21.1999 15.7295 21.0671 16.0799C14.2784 14.7433 10.6803 9.17967 11.4215 1.09474L11.5234 0L10.461 0.263605C10.3776 0.285314 8.4009 0.787715 6.24199 2.45928C2.27318 5.53571 0 10.1473 0 15.1092C0 18.7966 1.26013 22.1894 3.36654 24.8906L3.34492 24.9061C3.48699 25.089 3.64451 25.2627 3.80202 25.4271C6.70836 28.8353 11.0169 31 15.8227 31C19.9367 31 23.6522 29.5548 26.2837 26.9281C28.4148 24.8037 29.99 22.0126 30.966 18.6354C31.7474 15.9404 32.1643 12.7957 32.2137 9.29132L40 3.23149ZM4.91699 24.3261C3.79276 22.9864 2.90634 21.4358 2.32878 19.7425C4.87067 21.6715 8.3731 22.7631 12.2215 22.7631C12.416 22.7631 12.6106 22.76 12.8052 22.7538C14.8313 22.6949 16.6968 22.3413 18.1855 21.7707C16.4991 24.1556 14.5564 25.5325 12.274 25.9946C8.08277 26.8474 5.83121 25.2565 4.91699 24.3261ZM7.19327 3.70288C8.16925 2.94618 9.10818 2.45928 9.78766 2.16777C9.61161 6.33893 10.566 9.93637 12.5705 12.6345C14.3742 15.0596 16.9717 16.7188 20.122 17.4786C16.9439 18.2539 12.9658 17.5251 9.73516 15.5217C6.55393 13.5493 4.49695 10.6342 3.89468 7.27241C4.76874 5.92957 5.87754 4.72319 7.19327 3.70288ZM2.79206 9.29132C3.78967 12.3522 5.90534 14.9852 8.9136 16.8521C11.5358 18.4803 14.6244 19.3424 17.4967 19.3424C18.2071 19.3424 18.902 19.2897 19.5753 19.1812C18.4387 20.2945 15.7486 21.1039 12.762 21.1877C8.11675 21.3241 3.98734 19.7518 1.68636 16.9886C1.60605 16.3714 1.55973 15.745 1.55973 15.1061C1.55973 13.0686 1.98904 11.0993 2.79206 9.29132ZM25.1872 25.8178C22.8492 28.15 19.5259 29.4339 15.8227 29.4339C13.4105 29.4339 11.1374 28.826 9.14215 27.7623C9.42939 27.784 9.71971 27.7995 10.0162 27.7995C10.8409 27.7995 11.6995 27.7127 12.5797 27.5328C17.1045 26.6148 20.3907 22.8003 22.9264 15.5248C23.1303 14.9418 23.3032 14.3929 23.47 13.8656C23.8036 12.8112 24.0939 11.8995 24.48 11.1645C25.1069 9.97359 25.9409 9.30062 27.1083 9.04632C28.4704 8.7517 29.8757 9.04942 30.654 9.27581C30.6077 12.6376 30.2093 15.6427 29.468 18.2012C28.5692 21.321 27.13 23.8827 25.1872 25.8178Z"/></svg></a>
      <div class="hb-global-nav__group">
        <a class="hb-global-nav__item" href="#" aria-label="Inbox" aria-current="page"><span class="hb-icon" aria-hidden="true">inbox</span></a>
        <a class="hb-global-nav__item" href="#" aria-label="Cases"><span class="hb-icon" aria-hidden="true">group</span></a>
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
    <div class="hb-paper">
      <header class="hb-page-header">
        <div class="hb-page-header__bar">
          <div class="hb-page-header__heading">
            <h1 class="hb-page-header__title">Page title</h1>
          </div>
          <div class="hb-page-header__actions">
            <button type="button" class="hb-btn hb-btn--primary hb-btn--lg">Primary action</button>
          </div>
        </div>
      </header>
      <div class="hb-paper__body">
        <p class="hb-text-body">The page's content goes here.</p>
      </div>
    </div>
  </main>
</div>
```

### Dashboard

The main page of a section. The header repeats the section's icon from the global nav next to its title; tabs switch between views; the body is a table with its toolbar and footer.

```html preview
<div class="hb-app">
  <nav class="hb-global-nav" aria-label="Main">
    <div class="hb-global-nav__top">
      <a class="hb-global-nav__logo" href="#" aria-label="Hummingbird home"><svg aria-hidden="true" viewBox="0 0 40 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M40 3.23149L39.5553 2.59264L31.2933 7.83063C30.4007 7.54842 28.6001 7.12045 26.784 7.5143C25.1533 7.86785 23.9518 8.81993 23.1025 10.4295C22.6515 11.2885 22.3427 12.2623 21.9875 13.3881C21.8238 13.906 21.6539 14.4425 21.4593 15.0038C21.3296 15.3728 21.1999 15.7295 21.0671 16.0799C14.2784 14.7433 10.6803 9.17967 11.4215 1.09474L11.5234 0L10.461 0.263605C10.3776 0.285314 8.4009 0.787715 6.24199 2.45928C2.27318 5.53571 0 10.1473 0 15.1092C0 18.7966 1.26013 22.1894 3.36654 24.8906L3.34492 24.9061C3.48699 25.089 3.64451 25.2627 3.80202 25.4271C6.70836 28.8353 11.0169 31 15.8227 31C19.9367 31 23.6522 29.5548 26.2837 26.9281C28.4148 24.8037 29.99 22.0126 30.966 18.6354C31.7474 15.9404 32.1643 12.7957 32.2137 9.29132L40 3.23149ZM4.91699 24.3261C3.79276 22.9864 2.90634 21.4358 2.32878 19.7425C4.87067 21.6715 8.3731 22.7631 12.2215 22.7631C12.416 22.7631 12.6106 22.76 12.8052 22.7538C14.8313 22.6949 16.6968 22.3413 18.1855 21.7707C16.4991 24.1556 14.5564 25.5325 12.274 25.9946C8.08277 26.8474 5.83121 25.2565 4.91699 24.3261ZM7.19327 3.70288C8.16925 2.94618 9.10818 2.45928 9.78766 2.16777C9.61161 6.33893 10.566 9.93637 12.5705 12.6345C14.3742 15.0596 16.9717 16.7188 20.122 17.4786C16.9439 18.2539 12.9658 17.5251 9.73516 15.5217C6.55393 13.5493 4.49695 10.6342 3.89468 7.27241C4.76874 5.92957 5.87754 4.72319 7.19327 3.70288ZM2.79206 9.29132C3.78967 12.3522 5.90534 14.9852 8.9136 16.8521C11.5358 18.4803 14.6244 19.3424 17.4967 19.3424C18.2071 19.3424 18.902 19.2897 19.5753 19.1812C18.4387 20.2945 15.7486 21.1039 12.762 21.1877C8.11675 21.3241 3.98734 19.7518 1.68636 16.9886C1.60605 16.3714 1.55973 15.745 1.55973 15.1061C1.55973 13.0686 1.98904 11.0993 2.79206 9.29132ZM25.1872 25.8178C22.8492 28.15 19.5259 29.4339 15.8227 29.4339C13.4105 29.4339 11.1374 28.826 9.14215 27.7623C9.42939 27.784 9.71971 27.7995 10.0162 27.7995C10.8409 27.7995 11.6995 27.7127 12.5797 27.5328C17.1045 26.6148 20.3907 22.8003 22.9264 15.5248C23.1303 14.9418 23.3032 14.3929 23.47 13.8656C23.8036 12.8112 24.0939 11.8995 24.48 11.1645C25.1069 9.97359 25.9409 9.30062 27.1083 9.04632C28.4704 8.7517 29.8757 9.04942 30.654 9.27581C30.6077 12.6376 30.2093 15.6427 29.468 18.2012C28.5692 21.321 27.13 23.8827 25.1872 25.8178Z"/></svg></a>
      <div class="hb-global-nav__group">
        <a class="hb-global-nav__item" href="#" aria-label="Inbox"><span class="hb-icon" aria-hidden="true">inbox</span></a>
        <a class="hb-global-nav__item" href="#" aria-label="Cases"><span class="hb-icon" aria-hidden="true">group</span></a>
        <a class="hb-global-nav__item" href="#" aria-label="Requests" aria-current="page"><span class="hb-icon" aria-hidden="true">forward_to_inbox</span></a>
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
    <div class="hb-paper">
      <header class="hb-page-header">
        <div class="hb-page-header__bar">
          <div class="hb-page-header__heading">
            <span class="hb-page-header__icon" aria-hidden="true"><span class="hb-icon">forward_to_inbox</span></span>
            <h1 class="hb-page-header__title">Requests</h1>
          </div>
        </div>
        <div class="hb-tabs" role="tablist" aria-label="Requests views">
          <button class="hb-tabs__tab" role="tab" id="rq-tab-list" aria-controls="rq-panel-list" aria-selected="true">Requests</button>
          <button class="hb-tabs__tab" role="tab" id="rq-tab-analytics" aria-controls="rq-panel-analytics" aria-selected="false" tabindex="-1">Analytics</button>
        </div>
      </header>

      <div class="hb-paper__body" id="rq-panel-list" role="tabpanel" aria-labelledby="rq-tab-list">
        <div style="display: flex; flex-direction: column; gap: var(--spacing-16);">
          <div class="hb-table-toolbar" role="toolbar" aria-label="Requests" data-hb-toolbar-for="rq-table" data-hb-noun="request|requests">
            <div class="hb-table-toolbar__controls">
              <button type="button" class="hb-btn hb-btn--secondary hb-btn--lg"><span class="hb-icon hb-icon--sm" aria-hidden="true">person_search</span>My requests<span class="hb-icon hb-icon--sm" aria-hidden="true">expand_more</span></button>
              <div class="hb-search" style="width: 280px;">
                <svg class="hb-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>
                <input class="hb-search__input" type="text" placeholder="Search requests" aria-label="Search requests">
              </div>
              <button type="button" class="hb-btn hb-btn--secondary hb-btn--lg"><span class="hb-icon hb-icon--sm" aria-hidden="true">filter_list</span>Status<span class="hb-icon hb-icon--sm" aria-hidden="true">expand_more</span></button>
              <div class="hb-table-toolbar__filters" role="group" aria-label="Applied filters"></div>
              <span class="hb-table-toolbar__spacer"></span>
              <button type="button" class="hb-btn hb-btn--secondary hb-btn--lg"><span class="hb-icon hb-icon--sm" aria-hidden="true">view_column</span>Columns<span class="hb-icon hb-icon--sm" aria-hidden="true">expand_more</span></button>
            </div>
          </div>

          <div class="hb-table-wrap" role="region" tabindex="0" aria-labelledby="rq-caption">
            <table class="hb-table" id="rq-table">
              <caption id="rq-caption" class="hb-table__caption hb-visually-hidden">My requests</caption>
              <thead>
                <tr><th scope="col">Request</th><th scope="col">Case</th><th scope="col">Status</th><th scope="col">Sent by</th><th scope="col">Recipients</th><th scope="col">Last activity</th><th scope="col">Due</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" class="hb-table__rowheader"><a class="hb-link hb-table__link" href="#">Periodic review 2026</a></th>
                  <td>Acme Financial Services Ltd</td>
                  <td><span class="hb-tag hb-tag--grey">Open</span></td>
                  <td><span style="display: inline-flex; align-items: center; gap: var(--spacing-8);"><span class="hb-avatar hb-avatar--sm" aria-hidden="true">JD</span>You</span></td>
                  <td><span class="hb-avatar hb-avatar--sm hb-avatar--muted" title="Sara Diaz">SD</span></td>
                  <td>10 Jun 2026</td>
                  <td>13 Jun 2026</td>
                </tr>
                <tr>
                  <th scope="row" class="hb-table__rowheader"><a class="hb-link hb-table__link" href="#">Ownership update</a></th>
                  <td>Acme Financial Services Ltd</td>
                  <td><span class="hb-tag hb-tag--grey">Open</span></td>
                  <td><span style="display: inline-flex; align-items: center; gap: var(--spacing-8);"><span class="hb-avatar hb-avatar--sm" aria-hidden="true">JD</span>You</span></td>
                  <td><span class="hb-avatar hb-avatar--sm hb-avatar--muted" title="Mark Wells">MW</span></td>
                  <td>10 Jun 2026</td>
                  <td><span style="display: inline-flex; align-items: center; gap: var(--spacing-4); color: var(--ui-status-danger-text);"><span class="hb-icon hb-icon--sm" style="color: inherit;" aria-hidden="true">warning_amber</span>8 Jun 2026 · Overdue</span></td>
                </tr>
                <tr>
                  <th scope="row" class="hb-table__rowheader"><a class="hb-link hb-table__link" href="#">FATCA certification</a></th>
                  <td>Acme Financial Services Ltd</td>
                  <td><span class="hb-tag hb-tag--grey">Open</span></td>
                  <td><span style="display: inline-flex; align-items: center; gap: var(--spacing-8);"><span class="hb-avatar hb-avatar--sm" aria-hidden="true">JD</span>You</span></td>
                  <td><span class="hb-avatar hb-avatar--sm hb-avatar--muted" title="Sara Diaz">SD</span></td>
                  <td>9 Jun 2026</td>
                  <td><span style="display: inline-flex; align-items: center; gap: var(--spacing-4); color: var(--ui-status-warning-contrast);"><span class="hb-icon hb-icon--sm" style="color: inherit;" aria-hidden="true">warning_amber</span>11 Jun 2026 · Due soon</span></td>
                </tr>
                <tr>
                  <th scope="row" class="hb-table__rowheader"><a class="hb-link hb-table__link" href="#">Agent network list</a></th>
                  <td>Sola Remittances Inc.</td>
                  <td><span class="hb-tag hb-tag--blue">Submitted</span></td>
                  <td><span style="display: inline-flex; align-items: center; gap: var(--spacing-8);"><span class="hb-avatar hb-avatar--sm" aria-hidden="true">JD</span>You</span></td>
                  <td><span class="hb-avatar hb-avatar--sm hb-avatar--muted" title="Femi Hassan">FH</span></td>
                  <td>8 Jun 2026</td>
                  <td>15 Jun 2026</td>
                </tr>
                <tr>
                  <th scope="row" class="hb-table__rowheader"><a class="hb-link hb-table__link" href="#">AML review 2025</a></th>
                  <td>Acme Financial Services Ltd</td>
                  <td><span class="hb-tag hb-tag--green">Resolved</span></td>
                  <td><span style="display: inline-flex; align-items: center; gap: var(--spacing-8);"><span class="hb-avatar hb-avatar--sm" aria-hidden="true">JD</span>You</span></td>
                  <td><span class="hb-avatar hb-avatar--sm hb-avatar--muted" title="Sara Diaz">SD</span></td>
                  <td>12 Mar 2026</td>
                  <td>15 Dec 2025</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="hb-table__footer">
            <div class="hb-table__footer-group">
              <span class="hb-table__page-info">Showing 1–5 of 5</span>
              <label class="hb-table__footer-group">
                <span class="hb-table__footer-label">View</span>
                <div class="hb-select hb-select--sm" style="width: 88px;">
                  <select aria-label="Rows per page"><option>10</option><option selected>25</option><option>50</option></select>
                </div>
              </label>
              <span class="hb-table__footer-label">Last updated a few seconds ago. <a class="hb-link" href="#">Refresh</a></span>
            </div>
            <nav class="hb-table__pagination" aria-label="Pagination">
              <button type="button" class="hb-btn hb-btn--secondary hb-btn--sm" aria-label="Previous page" disabled><span class="hb-icon">chevron_left</span></button>
              <span class="hb-table__page-info">1 of 1</span>
              <button type="button" class="hb-btn hb-btn--secondary hb-btn--sm" aria-label="Next page" disabled><span class="hb-icon">chevron_right</span></button>
            </nav>
          </div>
        </div>
      </div>

      <div class="hb-paper__body" id="rq-panel-analytics" role="tabpanel" aria-labelledby="rq-tab-analytics" hidden>
        <p class="hb-text-body">Response times and overdue requests go here.</p>
      </div>
    </div>
  </main>
</div>
```

### Page with tabs

```html preview
<div class="hb-app">
  <nav class="hb-global-nav" aria-label="Main">
    <div class="hb-global-nav__top">
      <a class="hb-global-nav__logo" href="#" aria-label="Hummingbird home"><svg aria-hidden="true" viewBox="0 0 40 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M40 3.23149L39.5553 2.59264L31.2933 7.83063C30.4007 7.54842 28.6001 7.12045 26.784 7.5143C25.1533 7.86785 23.9518 8.81993 23.1025 10.4295C22.6515 11.2885 22.3427 12.2623 21.9875 13.3881C21.8238 13.906 21.6539 14.4425 21.4593 15.0038C21.3296 15.3728 21.1999 15.7295 21.0671 16.0799C14.2784 14.7433 10.6803 9.17967 11.4215 1.09474L11.5234 0L10.461 0.263605C10.3776 0.285314 8.4009 0.787715 6.24199 2.45928C2.27318 5.53571 0 10.1473 0 15.1092C0 18.7966 1.26013 22.1894 3.36654 24.8906L3.34492 24.9061C3.48699 25.089 3.64451 25.2627 3.80202 25.4271C6.70836 28.8353 11.0169 31 15.8227 31C19.9367 31 23.6522 29.5548 26.2837 26.9281C28.4148 24.8037 29.99 22.0126 30.966 18.6354C31.7474 15.9404 32.1643 12.7957 32.2137 9.29132L40 3.23149ZM4.91699 24.3261C3.79276 22.9864 2.90634 21.4358 2.32878 19.7425C4.87067 21.6715 8.3731 22.7631 12.2215 22.7631C12.416 22.7631 12.6106 22.76 12.8052 22.7538C14.8313 22.6949 16.6968 22.3413 18.1855 21.7707C16.4991 24.1556 14.5564 25.5325 12.274 25.9946C8.08277 26.8474 5.83121 25.2565 4.91699 24.3261ZM7.19327 3.70288C8.16925 2.94618 9.10818 2.45928 9.78766 2.16777C9.61161 6.33893 10.566 9.93637 12.5705 12.6345C14.3742 15.0596 16.9717 16.7188 20.122 17.4786C16.9439 18.2539 12.9658 17.5251 9.73516 15.5217C6.55393 13.5493 4.49695 10.6342 3.89468 7.27241C4.76874 5.92957 5.87754 4.72319 7.19327 3.70288ZM2.79206 9.29132C3.78967 12.3522 5.90534 14.9852 8.9136 16.8521C11.5358 18.4803 14.6244 19.3424 17.4967 19.3424C18.2071 19.3424 18.902 19.2897 19.5753 19.1812C18.4387 20.2945 15.7486 21.1039 12.762 21.1877C8.11675 21.3241 3.98734 19.7518 1.68636 16.9886C1.60605 16.3714 1.55973 15.745 1.55973 15.1061C1.55973 13.0686 1.98904 11.0993 2.79206 9.29132ZM25.1872 25.8178C22.8492 28.15 19.5259 29.4339 15.8227 29.4339C13.4105 29.4339 11.1374 28.826 9.14215 27.7623C9.42939 27.784 9.71971 27.7995 10.0162 27.7995C10.8409 27.7995 11.6995 27.7127 12.5797 27.5328C17.1045 26.6148 20.3907 22.8003 22.9264 15.5248C23.1303 14.9418 23.3032 14.3929 23.47 13.8656C23.8036 12.8112 24.0939 11.8995 24.48 11.1645C25.1069 9.97359 25.9409 9.30062 27.1083 9.04632C28.4704 8.7517 29.8757 9.04942 30.654 9.27581C30.6077 12.6376 30.2093 15.6427 29.468 18.2012C28.5692 21.321 27.13 23.8827 25.1872 25.8178Z"/></svg></a>
      <div class="hb-global-nav__group">
        <a class="hb-global-nav__item" href="#" aria-label="Inbox" aria-current="page"><span class="hb-icon" aria-hidden="true">inbox</span></a>
        <a class="hb-global-nav__item" href="#" aria-label="Cases"><span class="hb-icon" aria-hidden="true">group</span></a>
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
    <div class="hb-paper">
      <header class="hb-page-header">
        <div class="hb-page-header__bar">
          <div class="hb-page-header__heading">
            <nav class="hb-breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="#">Section</a></li><li><a href="#">Parent page</a></li></ol></nav>
            <h1 class="hb-page-header__title">Page title</h1>
            <div class="hb-page-header__tags"><span class="hb-tag hb-tag--blue">Status</span></div>
          </div>
          <div class="hb-page-header__actions">
            <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="Undo"><span class="hb-icon" aria-hidden="true">undo</span></button>
            <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="Redo"><span class="hb-icon" aria-hidden="true">redo</span></button>
            <button type="button" class="hb-btn hb-btn--secondary hb-btn--lg">Secondary action</button>
            <button type="button" class="hb-btn hb-btn--primary hb-btn--lg">Primary action</button>
          </div>
        </div>
        <div class="hb-tabs" role="tablist" aria-label="Page views">
          <button class="hb-tabs__tab" role="tab" id="pv-tab-first" aria-controls="pv-panel-first" aria-selected="true">First view</button>
          <button class="hb-tabs__tab" role="tab" id="pv-tab-second" aria-controls="pv-panel-second" aria-selected="false" tabindex="-1">Second view</button>
        </div>
      </header>
      <div class="hb-paper__body" id="pv-panel-first" role="tabpanel" aria-labelledby="pv-tab-first">
        <p class="hb-text-body">The first view's content goes here.</p>
      </div>
      <div class="hb-paper__body" id="pv-panel-second" role="tabpanel" aria-labelledby="pv-tab-second" hidden>
        <p class="hb-text-body">The second view's content goes here.</p>
      </div>
    </div>
  </main>
</div>
```

### Record

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
    <div class="hb-paper">
      <header class="hb-page-header">
        <div class="hb-page-header__bar">
          <div class="hb-page-header__heading">
            <span class="hb-page-header__icon" aria-hidden="true"><span class="hb-icon">person</span></span>
            <div class="hb-page-header__titles">
              <div class="hb-page-header__title-row">
                <h1 class="hb-page-header__title">Daniel Okafor</h1>
                <div class="hb-page-header__tags">
                  <span class="hb-tag hb-tag--green">PEP cleared</span>
                  <span class="hb-tag hb-tag--purple">EDD</span>
                  <span class="hb-tag hb-tag--red">High risk</span>
                  <button type="button" class="hb-tag hb-tag--add" aria-label="Add tag"><span class="hb-icon hb-icon--sm" aria-hidden="true">add</span></button>
                </div>
              </div>
              <p class="hb-page-header__subtitle">Individual · 47 years old</p>
            </div>
          </div>
          <div class="hb-page-header__actions">
            <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="History"><span class="hb-icon" aria-hidden="true">history</span></button>
          </div>
        </div>
      </header>
      <div class="hb-paper__body hb-paper__body--flush">
        <div class="hb-sidenav-area">
          <nav class="hb-sidenav" id="record-nav" aria-label="Profile sections">
            <a class="hb-sidenav__item hb-sidenav__item--active" href="#" aria-current="page"><span class="hb-sidenav__label">Information</span></a>
            <a class="hb-sidenav__item" href="#"><span class="hb-sidenav__label">Relationships</span><span class="hb-sidenav__count">6</span></a>
            <a class="hb-sidenav__item" href="#"><span class="hb-sidenav__label">Related cases</span><span class="hb-sidenav__count">7</span></a>
            <a class="hb-sidenav__item" href="#"><span class="hb-sidenav__label">Alerts</span></a>
            <a class="hb-sidenav__item" href="#"><span class="hb-sidenav__label">Files</span><span class="hb-sidenav__count">11</span></a>
          </nav>
          <div style="flex: 1; min-width: 0; padding: var(--spacing-8) var(--spacing-16);">
            <div style="display: flex; align-items: center; gap: var(--spacing-8);">
              <button type="button" class="hb-sidenav__toggle" aria-controls="record-nav" aria-expanded="true" aria-label="Collapse navigation" title="Collapse navigation"><span class="hb-icon" aria-hidden="true">first_page</span></button>
              <h2 class="hb-text-heading-small" style="margin: 0;">Information</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
```

## Global nav

The 72px rail on the left of every screen: the logo, the product's main destinations, and the person's own controls at the bottom.

| Element | Class | Notes |
|---|---|---|
| Logo | `hb-global-nav__logo` | Links home. `aria-label="Hummingbird home"`. |
| Destination | `hb-global-nav__item` | An `<a>` with an `hb-icon` and an `aria-label`. 40×40, `border-radius-8`. |
| Current destination | `aria-current="page"` | White (`ui-bg`) fill, `ui-text` icon. |
| Count | `hb-global-nav__badge` | Things waiting, like approvals. `aria-hidden`; the count also goes in the item's label. |
| Dark mode | `hb-global-nav__item` + `data-hb-theme-toggle` | A `<button>` with `aria-pressed`. `hb.js` switches the theme and remembers it. |
| Account | `hb-global-nav__account` | A button holding the person's `hb-avatar--md`. |

- Groups: `hb-global-nav__top` holds the logo and the destinations, 32px apart. The last `hb-global-nav__group` sits at the bottom. Items in a group are 12px apart.
- The rail shows each item's `aria-label` as a tooltip on hover and keyboard focus. Write the label as the destination's name ("Cases", not "Go to cases").
- The destinations, in order: Inbox (`inbox`), Cases (`group`), Requests (`forward_to_inbox`), Dashboards (`bar_chart`), Search (`search`), Intelligence (`account_tree`), Approvals (`approval`). Keep this order on every screen of a prototype.
- Mark the section the page belongs to as current: a subject's profile is in Cases.

## Paper

- `hb-paper` is the white page: `ui-bg` on the `ui-bg-tertiary` ground, 16px from the window and the rail, `border-radius-16`. No shadow and no border: the change of ground is enough.
- `hb-page-header` comes first, then `hb-paper__body`, which scrolls and pads its content by 24px.
- `hb-paper__body--flush` drops the padding for a body that lays out its own regions: a Sidenav area, a canvas, a split view.
- One paper per screen. Group content inside it with cards, not with more papers.

## Dark mode

`data-theme="dark"` on `<html>` switches every token. The dark mode item does it for you:

- `hb.js` toggles `data-theme`, keeps `aria-pressed` and the icon (`dark_mode` / `light_mode`) in step and stores the choice in localStorage (`hb-theme`).
- A page with the toggle opens in the theme chosen last.

## Accessibility

- The rail is a `<nav aria-label="Main">`; the content is `<main>`. A page has one `<h1>`: the page header's title.
- Icon-only items need an `aria-label`. The tooltip reads it, so there is one label to write.
- A count belongs in the label: "Approvals, 10 waiting".

## Do

- Start every prototype from the template of its layout.
- Keep the rail identical across the screens of a prototype; only the current item changes.

## Don't

- Don't add text labels, sections or a second rail to the global nav. A page's own sections go in a [Sidenav](sidenav.html) inside the paper.
- Don't stack two papers or put cards on the grey ground.
