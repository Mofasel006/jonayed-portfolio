/*
 * BLUEPRINT ATELIER — Contact (SEC.06)
 * Minimalist drafting-sheet form: magnetic input focus frames, neon ring sweep
 * on submit, telemetry confirmation. Opens mailto with prefilled content.
 */
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Mail, Phone, Linkedin, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PROFILE } from "@/lib/data";

function MagneticField({
  label,
  type = "text",
  name,
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const pull = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 200);
    setPos({ x: dx * pull * 0.08, y: dy * pull * 0.08 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative"
    >
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="peer w-full bg-transparent border-b border-white/15 py-4 text-[0.95rem] text-foreground placeholder-transparent focus:outline-none transition-colors"
        placeholder={label}
      />
      <label
        className={`absolute left-0 hud-label transition-all duration-200 pointer-events-none ${
          focus ? "-top-1 text-[#f5c542]" : "top-4 text-[#5a5a64]"
        }`}
      >
        {label}
        {required ? " *" : ""}
      </label>
      <motion.span
        className="absolute left-0 bottom-0 h-px bg-gradient-to-r from-[#d4af37] via-[#22d3ee] to-transparent"
        animate={{ scaleX: focus ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        style={{ width: "100%", transformOrigin: "left" }}
      />
    </motion.div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    // build mailto link (static site has no backend)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    const subject = encodeURIComponent(form.subject || "Portfolio Inquiry");
    setTimeout(() => {
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }, 900);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 blueprint-grid">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-14">
          {/* left */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="hud-label mb-4 flex items-center gap-2">
                <span className="inline-block w-8 h-px bg-[#d4af37]" />
                SEC. 06 / INITIATE CONTACT
              </p>
              <h2 className="display text-[clamp(2.2rem,4.5vw,3.6rem)] text-foreground">
                Let's build something{" "}
                <span style={{ color: "var(--gold-bright)" }}>load-bearing</span>
              </h2>
              <p className="mt-5 text-[#8a8a93] leading-relaxed max-w-md">
                Open for internships, research collaborations, site roles, and consultancy on
                sustainable infrastructure and smart-city frameworks.
              </p>
            </Reveal>

            <div className="mt-10 space-y-5">
              {[
                { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
                { icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
                { icon: Linkedin, label: "LinkedIn", value: "md-jonayed-ahamed", href: PROFILE.linkedin },
                { icon: MapPin, label: "Location", value: PROFILE.location, href: undefined },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 0.08}>
                  <a
                    href={item.href ?? undefined}
                    target={item.href?.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 border border-white/8 bg-[#131317] p-4 transition-all duration-200 hover:border-[#d4af37]/50"
                  >
                    <item.icon size={18} style={{ color: "var(--gold-bright)" }} />
                    <div>
                      <p className="hud-label">{item.label}</p>
                      <p className="mt-0.5 text-[0.9rem] text-foreground group-hover:text-[#f5c542] transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* right: form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.12}>
              <form
                onSubmit={onSubmit}
                className="relative border border-white/8 bg-[#111115] p-8 md:p-10"
              >
                <div className="flex items-center justify-between mb-8">
                  <p className="hud-label">TRANSMISSION FORM / REQ-06</p>
                  <span className={`hud-chip ${sent ? "!border-[#22d3ee]/60 !text-[#22d3ee]" : ""}`}>
                    {sent ? "TRANSMITTED ✓" : PROFILE.status}
                  </span>
                </div>

                <div className="space-y-7">
                  <MagneticField label="Your Name" name="name" value={form.name} onChange={set("name")} required />
                  <MagneticField label="Your Email" type="email" name="email" value={form.email} onChange={set("email")} required />
                  <MagneticField label="Subject" name="subject" value={form.subject} onChange={set("subject")} />
                  <div className="relative">
                    <textarea
                      name="message"
                      value={form.message}
                      required
                      onChange={(e) => set("message")(e.target.value)}
                      rows={5}
                      className="peer w-full bg-transparent border-b border-white/15 py-4 text-[0.95rem] text-foreground placeholder-transparent focus:outline-none resize-none"
                      placeholder="Message"
                    />
                    <label className="absolute left-0 top-4 hud-label text-[#5a5a64] peer-focus:-top-1 peer-focus:text-[#f5c542] transition-all duration-200 pointer-events-none">
                      Message *
                    </label>
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-4">
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileTap={{ scale: 0.97 }}
                    className={`magnetic-btn ${sending ? "opacity-60 pointer-events-none" : ""}`}
                  >
                    <AnimatePresence mode="wait">
                      {sent ? (
                        <motion.span
                          key="sent"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Check size={16} style={{ color: "var(--cyan-glow)" }} /> Transmitted
                        </motion.span>
                      ) : sending ? (
                        <motion.span
                          key="sending"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Send size={16} className="animate-pulse" /> Transmitting…
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Send size={16} /> Initiate Contact
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  <p className="hud-label !text-[0.6rem]">Opens your mail client · static site</p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
