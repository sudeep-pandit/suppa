import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { useScrollLock } from "./hooks/useScrollLock";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { AmbientBackground } from "./components/AmbientBackground";
import { WavyCursor } from "./components/WavyCursor";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Skills } from "./components/Skills";
import { Writing } from "./components/Writing";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";

export default function App() {
  const [welcomeDone, setWelcomeDone] = useState(false);
  useScrollLock(!welcomeDone);

  return (
    <ThemeProvider>
      <AuthProvider>
        {!welcomeDone && <WelcomeScreen onDone={() => setWelcomeDone(true)} />}
        <AmbientBackground />
        <WavyCursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Education />
          <Skills />
          <Writing />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </AuthProvider>
    </ThemeProvider>
  );
}
