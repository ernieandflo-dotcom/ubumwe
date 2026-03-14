# Ubumwe — Communauté Burundaise de Québec

> *"Ubumwe ni nguvu"* — L'unité est force / Unity is strength

Plateforme numérique officielle de la communauté burundaise de Québec.  
Official digital platform of the Burundian community of Quebec City.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Local development

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/ubumwe.git
cd ubumwe

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open http://localhost:5173/ubumwe/
```

### Build for production

```bash
npm run build
# Output is in /dist
```

---

## 🌐 Deploying to GitHub Pages

### First-time setup

1. Push the repository to GitHub.
2. Go to **Settings → Pages** in your GitHub repo.
3. Under **Source**, select **GitHub Actions**.
4. Push to the `main` branch — the workflow in `.github/workflows/deploy.yml` handles the rest.

Your site will be live at:  
`https://YOUR_USERNAME.github.io/ubumwe/`

### Custom domain (optional)

1. Add a `CNAME` file to `/public/` containing your domain, e.g. `ubumwe-quebec.community`
2. In `vite.config.js`, change `base` from `'/ubumwe/'` to `'/'`
3. Configure your domain registrar's DNS to point to GitHub Pages (see [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))

---

## 📁 Project Structure

```
ubumwe/
├── public/                  # Static assets (images, fonts, favicon, CNAME)
├── src/
│   ├── components/          # Shared UI components
│   │   ├── Header.jsx       # Sticky nav + hamburger drawer + language toggle
│   │   ├── Footer.jsx       # Site footer
│   │   └── WelcomeModal.jsx # Mandatory welcome video gate
│   ├── data/                # All content and configuration data
│   │   ├── content.js       # Seed content (posts, events, businesses…)
│   │   ├── translations.js  # FR/EN strings — add languages here
│   │   └── roles.js         # Role system scaffolding
│   ├── hooks/               # Custom React hooks
│   │   ├── useLang.js       # Language state + localStorage persistence
│   │   ├── useNavigation.js # Page routing + back-button history stack
│   │   └── useToast.js      # Toast notification state
│   ├── pages/               # One file per page
│   │   ├── Home.jsx         # Hero + blog grid
│   │   ├── Calendar.jsx     # Calendar widget + event list
│   │   ├── EventDetail.jsx  # Full event page
│   │   ├── Gallery.jsx      # Media gallery + private share links
│   │   ├── Business.jsx     # Directory + travel + partners + contributors
│   │   └── Contact.jsx      # Contact info + submission form
│   ├── styles/
│   │   └── global.css       # Design tokens, resets, shared utilities
│   ├── App.jsx              # Root component + page router
│   └── main.jsx             # React entry point
├── index.html               # HTML shell
├── vite.config.js           # Vite config (base path for GitHub Pages)
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml       # Auto-deploy on push to main
```

---

## 🗺️ Roadmap

The codebase is deliberately structured to support these future features:

### Near-term
- [ ] **Authentication** — Replace `CURRENT_USER` mock in `src/data/roles.js` with a real auth provider (Supabase recommended for its free tier and Postgres). The `canView()` function and role system are already in place.
- [ ] **First-login password change** — Add to the auth flow once Supabase is connected.
- [ ] **Real content** — Replace seed data in `src/data/content.js` with API calls returning the same data shape.
- [ ] **Image uploads** — Connect Supabase Storage or Cloudinary; replace emoji placeholders in Gallery and Event pages.

### Medium-term
- [ ] **Editorial CMS** — Sanity.io or Directus (self-hosted) for the editorial committee to manage posts, events, and gallery without touching code.
- [ ] **Calendar integration** — Google Calendar API or ICS feed for event sync.
- [ ] **Donation flow** — Stripe Checkout integration on a dedicated donate page.
- [ ] **Kirundi language** — Add `rn` object to `src/data/translations.js`. The toggle button is already scaffolded.

### Long-term (multi-community scale)
- [ ] **Community selector** — Each city (Montréal, Ottawa, Toronto, Vancouver…) gets its own content instance. Shared codebase, per-community branding via CSS variables.
- [ ] **Social features** — Like, comment, share — feature-flagged, off by default.
- [ ] **Mobile app** — React Native with shared business logic from `src/data/` and `src/hooks/`.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--green` | `#1B4332` | Primary brand, header, footer |
| `--red` | `#9B1D20` | Accents, featured badges |
| `--gold` | `#D4AF37` | CTAs, active states, highlights |
| `--cream` | `#FAF6EF` | Page background |
| `--font-display` | Playfair Display | Headlines, titles |
| `--font-body` | DM Sans | Body text, UI |
| `--font-accent` | Cormorant Garamond | Proverbs, captions |

---

## 🌍 Adding a New Language

1. Open `src/data/translations.js`
2. Duplicate the `en` block, give it the new language code (e.g. `rn` for Kirundi)
3. Translate all values
4. Open `src/data/translations.js` → `LANGUAGES` array → set `available: true` for the new code
5. That's it. The toggle button is already rendered.

---

## 🔐 Role System

Roles are scaffolded in `src/data/roles.js`:

| Role | Rank | Access |
|---|---|---|
| `member` | 1 | All public content |
| `editor` | 2 | Member content + restricted editorial posts |
| `admin` | 3 | Everything |

To restrict a post, add `minRole: 'editor'` (or `'admin'`) to any item in `src/data/content.js`. The `canView()` function handles the gate. A blurred lock overlay renders automatically for insufficient roles.

---

## 📄 License

Proprietary — All rights reserved.  
© 2025 Association Ubumwe Québec
