/*
 * BLUEPRINT ATELIER — Home composition
 * Sec.00 Hero → Sec.01 About → Sec.02 Experience → Sec.03 Projects →
 * Sec.04 Capabilities → Sec.05 Awards → Sec.06 Contact
 */
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Awards from "@/components/sections/Awards";
import Contact from "@/components/sections/Contact";
import { MeasureStrip } from "@/components/Interstitial";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground grain">
      <Hero />
      <MeasureStrip
        label="FIG. 01 / FOUNDATION"
        numeral="B.Sc. CE"
        sub="Sonargaon University, 2024–2027 — building the theoretical foundation before the first pour: GPA 3.05/4.00, ICCSD KUET conference paper accepted."
      />
      <About />
      <Experience />
      <MeasureStrip
        label="FIG. 02 / LOAD PATH"
        numeral="17+"
        sub="Awards verified on the national and international record — from ISIF Indonesia bronze to the AUST Mind Sparks renewable-energy award."
      />
      <Projects />
      <Skills />
      <Awards />
      <Contact />
    </div>
  );
}
