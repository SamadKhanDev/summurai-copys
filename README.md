# Samurai Systems - Next.js Project

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit **http://localhost:3000** to view the site.

---

## 📋 Project Overview

Modern Next.js application with:
- ✅ **20 pages** fully implemented
- ✅ **Dark-first theme** (Samurai Systems palette)
- ✅ **next-intl** for internationalization (EN/AR)
- ✅ **Lucide React** icons throughout
- ✅ **Tailwind CSS v4** for styling
- ✅ **TypeScript** type-safe
- ✅ **Reusable UI components**

---

## 🎨 Theme Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Navy | `#0a0f1e` | Primary background |
| Electric Cyan | `#00d4ff` | Accents, links, CTAs |
| White | `#ffffff` | Primary text |
| Soft Gray | `#8b91a8` | Secondary text |
| Card Background | `#12151f` | Surface elements |

**Design Philosophy**: Dark-first, high contrast, cool temperature only

---

## 📦 Pages

### Core
- `/` - Home with hero, services, testimonials
- `/about` - Company info, leadership, global presence
- `/contact` - Contact form and office locations
- `/assessment` - Free security assessment form

### Services
- `/services` - All services hub
- `/services/cybersecurity` - SOC, DFIR, VA/PT
- `/services/cloud` - Cloud & IT operations
- `/services/grc` - Governance, risk, compliance
- `/services/ai` - AI & automation solutions
- `/services/business-continuity` - BCM & DR
- `/services/digital-transformation` - Modernization

### Solutions & Content
- `/solutions` - Business-challenge solutions
- `/solutions/pam` - PAM (Wallix)
- `/industries` - Industry sectors
- `/partners` - Technology partners
- `/insights` - Articles & blog
- `/case-studies` - Client success stories
- `/careers` - Job opportunities

### Legal
- `/privacy` - Privacy policy (PDPL compliant)
- `/terms` - Terms of use

---

## 🧩 Tech Stack

- **Framework**: Next.js 16.2.7 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **i18n**: next-intl 4.12.0
- **Icons**: Lucide React
- **Fonts**: Geist Sans, Geist Mono

---

## 📁 Project Structure

```
├── app/
│   ├── [locale]/           # Localized routes
│   │   ├── page.tsx        # Home page
│   │   ├── components/     # Page components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ui/         # Reusable UI components
│   │   └── [pages]/        # All other pages
│   ├── globals.css         # Global styles with theme
│   └── layout.tsx
├── i18n/
│   ├── messages/
│   │   └── en/             # English translations
│   ├── navigation.ts
│   └── routing.ts
├── lib/
│   └── fonts/
└── public/
```

---

## 🌐 Internationalization

Language toggle in navbar switches between:
- **English** (en)
- **Arabic** (ar) - Structure ready, translations needed

Add translations in `i18n/messages/ar/` following the same structure as `en/`.

---

## 🎯 Features

✅ **Responsive Design** - Mobile, tablet, desktop optimized
✅ **Dark Theme** - Consistent Samurai Systems palette
✅ **Language Toggle** - EN/AR switcher
✅ **Reusable Components** - Button, Card, Section, Badge, etc.
✅ **Type Safe** - Full TypeScript support
✅ **SEO Ready** - Proper meta tags and structure
✅ **Accessibility** - ARIA labels and semantic HTML

---

## 🛠️ Development

### Adding a New Page

1. Create page component:
```typescript
// app/[locale]/my-page/page.tsx
"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Section } from "../components/ui";

export default function MyPage() {
  return (
    <>
      <Navbar />
      <Section>
        {/* Your content */}
      </Section>
      <Footer />
    </>
  );
}
```

2. Add translations in `i18n/messages/en/mypage.ts`
3. Import in `i18n/messages/en/index.ts`

### Using UI Components

```typescript
import {
  Button,
  Card,
  Section,
  Badge,
  Testimonial,
} from "./components/ui";

<Button variant="fill" size="lg">Click me</Button>
<Card hover>Content</Card>
<Section background="secondary">Content</Section>
```

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS with Tailwind
- `eslint.config.mjs` - ESLint rules

---

## 📞 Support

- **Email**: connect@samurai.systems
- **Phone**: +966 11 292 3918
- **Website**: www.samurai.systems

---

## 📄 License

© 2025 Samurai Systems — An Affiliate of Neusol | All Rights Reserved
