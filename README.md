# Sudeep Pandit — Portfolio (React + TypeScript)

A Vite + React + TypeScript conversion of the original single-file HTML portfolio, kept in sync with the latest design.

## Features
- **Dark / light mode** — sun/moon toggle in the nav bar (desktop) and in the mobile menu, persisted to `localStorage`, respects the OS preference on first visit. The ambient background and wavy cursor trail both re-tint themselves for dark mode.
- **Login** — a "Log In" button opens a "Welcome back" modal (UI only; wire it up to a real auth provider such as your own API, Clerk, or Auth0). Supports Escape-to-close and click-outside-to-close.
- **Typing effect** — the "Hello, I'm" greeting in the hero types itself out character by character with a blinking caret, matching the `typing-greeting` / `typed-text` styling.
- **Wavy cursor trail** — a physics-based spring-line cursor effect (`WavyCursor.tsx`), ported 1:1 from the vanilla JS version, blended with `mix-blend-mode` (multiply in light mode, screen in dark mode).
- Animated ambient gradient background, welcome intro screen, scroll reveals, projects with Demo + View actions, experience/education timelines (Coventry University + Prasadi Academy), skills, writing list, validated contact form, and a "Crafted with ❤️" footer.

## Project structure
```
src/
  components/   # Navbar, Hero, About, Projects, Timeline, Skills, Writing, Contact, Footer, WavyCursor, AmbientBackground, etc.
  context/      # ThemeContext (dark/light) and AuthContext (login state)
  hooks/        # useTypewriter, useReveal, useScrollLock
  data/         # Typed content for projects/experience/education/writing/skills
  styles/       # index.css — design tokens, dark mode variables, all component styles
```

## Getting started
```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build
```

## Notes / next steps
- Replace the placeholder data in `src/data/portfolioData.ts` with your real projects, experience, demo links, and education.
- Update the email/social links in `src/components/Contact.tsx`.
- The login modal is UI-only — connect it to a real auth backend when you're ready.
- The contact form validates client-side but doesn't send anywhere yet — wire it to an email service (e.g. Resend, Formspree) or your own API.
