/*
 * BLUEPRINT ATELIER — navigation
 * Fixed top bar: transparent over hero, opaque charcoal on scroll.
 * Active item in cyber gold; mono tags; smooth anchor links via Lenis.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PROFILE, ASSETS } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // determine active section
      let current = "hero";
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 220) current = link.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 10, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-[#0a0a0c]/85 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-5 md:px-10 h-16">
        {/* wordmark */}
        <button
          onClick={() => goTo("hero")}
          className="flex items-center gap-3 group"
          aria-label="Back to top"
        >
          <img
            src={ASSETS.logo}
            alt="Jonayed logo"
            className="h-8 w-8 md:h-9 md:w-9 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="flex flex-col items-start leading-none">
            <span className="font-display font-extrabold text-[0.95rem] tracking-tight uppercase text-foreground">
              Jonayed<span style={{ color: "var(--gold-bright)" }}>.</span>
            </span>
            <span className="hud-label mt-0.5">Civil Engineer</span>
          </span>
        </button>

        {/* desktop links */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.slice(1).map((link) => (
            <button
              key={link.id}
              onClick={() => goTo(link.id)}
              className={`relative text-[0.72rem] font-mono uppercase tracking-[0.18em] transition-colors duration-200 ${
                active === link.id ? "text-[#f5c542]" : "text-[#8a8a93] hover:text-foreground"
              }`}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 right-0 h-px bg-[#d4af37]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
          <button
            onClick={() => goTo("contact")}
            className="magnetic-btn !py-2.5 !px-5 !text-[0.68rem]"
          >
            Initiate Contact
          </button>
        </nav>

        {/* mobile toggle */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden bg-[#0a0a0c]/97 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex flex-col gap-4"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => goTo(link.id)}
                className={`flex items-baseline gap-3 text-left ${
                  active === link.id ? "text-[#f5c542]" : "text-[#8a8a93]"
                }`}
              >
                <span className="hud-label">{link.tag}</span>
                <span className="font-display font-bold uppercase text-sm tracking-wide">
                  {link.label}
                </span>
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
