import { darkSurface, rimBorder } from "@/styles/surfaces";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const SECTION_MAP: Record<string, number> = {
  Journey: 2,
  "Certifications & Awards": 5,
  Projects: 4,
};

const FREELANCE_LINKS = [
  {
    label: "Fiverr",
    href: "https://www.fiverr.com/ferdialf_dev",
  },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~010945969eb89d66ab",
  },
  {
    label: "Freelancer.com",
    href: "https://www.freelancer.com/u/Ferdialfian80?frm=Ferdialfian80&sb=t",
  },
];

const WORK_LINKS = ["Projects", "Certifications & Awards", "Journey"];

interface FooterProps {
  onNavigate?: (index: number) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const Year = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaGithub size={18} />,
      href: "https://github.com/ferdi-alf",
      label: "GitHub",
    },
    {
      icon: <FaInstagram size={18} />,
      href: "https://www.instagram.com/eternalferr_",
      label: "Instagram",
    },
    {
      icon: <FaLinkedinIn size={18} />,
      href: "https://www.linkedin.com/in/muhammad-ferdi-alfian-979273396?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/4">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <p
              className="text-2xl font-bold tracking-tight mb-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ferdialf
            </p>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs font-light">
              Through clean design and solid architecture, I turn complex ideas
              into smooth, responsive digital experiences.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  <motion.div whileHover={{ y: -2 }} style={rimBorder}>
                    <div
                      style={{ ...darkSurface, borderRadius: 10 }}
                      className="w-9 h-9 flex items-center p-2! justify-center text-white/35 hover:text-white/70 transition-colors"
                    >
                      {s.icon}
                    </div>
                  </motion.div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-white/25 uppercase mb-4">
              Work
            </p>
            <ul className="space-y-2.5">
              {WORK_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => onNavigate?.(SECTION_MAP[link])}
                    className="text-sm text-white/40 hover:text-white/70 transition-colors font-light cursor-pointer text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-white/25 uppercase mb-4">
              Available On
            </p>
            <ul className="space-y-2.5">
              {FREELANCE_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/40 hover:text-white/70 transition-colors font-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="w-full h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
          }}
        />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs font-light tracking-wide">
            © {Year} Muhammad Ferdi Alfian / Built with passion
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-white/30 text-xs hover:text-white/50 transition-colors font-light"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="relative w-full flex items-end justify-center overflow-hidden"
        style={{ height: "clamp(80px, 18vw, 220px)" }}
        aria-hidden
      >
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(9,9,11,0) 0%, rgba(9,9,11,0.4) 40%, rgba(9,9,11,1) 100%)",
          }}
        />
        <span
          className="relative select-none font-black tracking-tighter leading-none"
          style={{
            fontSize: "clamp(60px, 14vw, 200px)",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            transform: "translateY(28%)",
          }}
        >
          FERDIALF
        </span>
      </div>
    </footer>
  );
}
