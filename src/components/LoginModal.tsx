import { useEffect, useRef, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useScrollLock } from "../hooks/useScrollLock";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const focusTimer = setTimeout(() => emailRef.current?.focus(), 300);

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeydown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [open, onClose]);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const email = emailRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value.trim() ?? "";
    if (!email || !password) return;

    login(email);
    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
    onClose();
  }

  return (
    <div
      className={`modal-overlay${open ? " open" : ""}`}
      id="loginModal"
      role="dialog"
      aria-modal="true"
      aria-label="Log in"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className="modal-card">
        <button type="button" className="modal-close" id="modalClose" aria-label="Close login" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h3 className="modal-title">Welcome back</h3>
        <p className="modal-subtitle">Log in to continue to your account.</p>
        <form className="modal-form" id="loginForm" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
              name="loginEmail"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              ref={emailRef}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input
              id="loginPassword"
              name="loginPassword"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              ref={passwordRef}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </button>
        </form>
        <p className="modal-alt">
          Don't have an account?{" "}
          <a href="#" onClick={(e) => e.preventDefault()}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
