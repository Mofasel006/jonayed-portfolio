/*
 * BLUEPRINT ATELIER — footer
 * Drawing-sheet colophon: wordmark, coordinates, credits.
 */
import { ASSETS, PROFILE } from "@/lib/data";
import { Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#08080a] border-t border-white/5 py-12">
      <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <img src={ASSETS.logo} alt="logo" className="h-9 w-9" />
          <div>
            <p className="font-display font-extrabold uppercase text-sm tracking-tight text-foreground">
              Md Jonayed Ahamed<span style={{ color: "var(--gold-bright)" }}>.</span>
            </p>
            <p className="hud-label mt-1">Civil Engineer · Sustainable Infrastructure</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="hud-chip flex items-center gap-2 !border-white/15 !text-[#8a8a93]"
          >
            <Mail size={13} /> {PROFILE.email}
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hud-chip flex items-center gap-2 !border-white/15 !text-[#8a8a93]"
          >
            <Linkedin size={13} /> LinkedIn
          </a>
        </div>
      </div>

      <div className="container mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-6">
        <p className="hud-label !text-[0.6rem] text-[#5a5a64]">
          © {new Date().getFullYear()} MD JONAYED AHAMED — ALL RIGHTS RESERVED
        </p>
        <p className="hud-label !text-[0.6rem] text-[#5a5a64]">
          DRAWN WITH THREE.JS + FRAMER MOTION · BLUEPRINT ATELIER
        </p>
      </div>
    </footer>
  );
}
