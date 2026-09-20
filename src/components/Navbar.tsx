import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { LoginModal } from "./LoginModal";

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

function ThemeIcons() {
  return (
    <>
      <svg
        className="icon-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg
        className="icon-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </>
  );
}

function LoginIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#about");
  const [loginOpen, setLoginOpen] = useState(false);
  const { toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(
      (el): el is Element => Boolean(el)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
        <div className="nav-container">
          <a href="#" className="logo" aria-label="Sudeep Pandit home">
            Sudeep Pandit
          </a>

          <nav aria-label="Main navigation">
            <ul className="nav-links" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={`nav-link${activeHref === item.href ? " active" : ""}`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              id="themeToggle"
              aria-label="Toggle dark mode"
              title="Toggle theme"
              onClick={toggleTheme}
            >
              <ThemeIcons />
            </button>

            <button
              type="button"
              className="btn-login"
              onClick={() => (user ? logout() : setLoginOpen(true))}
            >
              <LoginIcon />
              {user ? "Log Out" : "Log In"}
            </button>

            <button
              className="menu-toggle"
              id="menuToggle"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <nav className={`mobile-nav${mobileOpen ? " open" : ""}`} aria-label="Mobile navigation">
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
            {item.label}
          </a>
        ))}
        <div className="mobile-actions">
          <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle dark mode"
            style={{ position: "relative" }}
            onClick={toggleTheme}
          >
            <ThemeIcons />
          </button>
          <button
            type="button"
            className="btn-login"
            style={{ flex: 1, justifyContent: "center" }}
            onClick={() => {
              setMobileOpen(false);
              if (user) logout();
              else setLoginOpen(true);
            }}
          >
            <LoginIcon />
            {user ? "Log Out" : "Log In"}
          </button>
        </div>
      </nav>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
