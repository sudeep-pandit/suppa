import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="container">
      <Reveal className="footer-content" stagger>
        <div className="footer-logo">Sudeep Pandit</div>
        <p className="footer-tagline">Building, learning &amp; exploring technology.</p>
        <div className="footer-crafted">
          Crafted with{" "}
          <span className="heart" aria-label="love">
            ❤️
          </span>{" "}
          by Sudeep Pandit
        </div>
        <p className="footer-copyright">© 2026 Sudeep Pandit</p>
      </Reveal>
    </footer>
  );
}
