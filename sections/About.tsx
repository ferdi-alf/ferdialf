import SectionLayout from "@/components/layouts/SectionLayout";
import { BorderBeam } from "@/components/lightswind/border-beam";
import {
  GraduationCap,
  Globe,
  Code2,
  FolderGit2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface CardBadgeProps {
  label: string;
  color: string;
  bg: string;
}

const CardBadge = ({ label, color, bg }: CardBadgeProps) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase ${color} ${bg}`}
  >
    {label}
  </span>
);

const journeyItems = [
  {
    done: true,
    text: "SMKN 4 Palembang – Vocational High School (Software Engineering 2023 – 2026)",
  },
  { done: true, text: "Volunteering Developer – School Digital Systems" },
  { done: true, text: "Freelance Fullstack Developer – Active (2023 – Now)" },
  { done: false, text: "Pursuing Higher Education – In Progress" },
];

const socials = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Email", href: "#" },
];

const About = () => {
  return (
    <SectionLayout title="About Me">
      <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row">
        <div className="relative flex-[1.25] overflow-hidden rounded-2xl border border-white/10 bg-white/4 backdrop-blur-[1px] p-6 sm:p-7 flex flex-col gap-5">
          <BorderBeam
            size={280}
            duration={8}
            colorFrom="#8b5cf6"
            colorTo="#c4b5fd"
          />

          <div className="flex items-center justify-between">
            <CardBadge
              label="My Journey"
              color="text-violet-300"
              bg="bg-violet-500/15"
            />
            <GraduationCap className="h-5 w-5 text-violet-400 opacity-80" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              Building From the{" "}
              <span className="text-violet-400">Ground Up</span>
            </h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed max-w-sm">
              Started in vocational school, shipping production code for real
              clients. Every project added a layer — now I'm leveling up through
              formal education while staying active in freelance.
            </p>
          </div>

          <div className="h-px w-full bg-white/[0.07]" />

          <ul className="flex flex-col gap-3">
            {journeyItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                {item.done ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                ) : (
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                )}
                <span
                  className={`text-sm leading-snug ${item.done ? "text-zinc-300" : "text-zinc-500 italic"}`}
                >
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-5 sm:p-6 backdrop-blur-[1px] flex flex-col gap-4">
            <BorderBeam
              size={200}
              duration={10}
              colorFrom="#06b6d4"
              colorTo="#67e8f9"
            />

            <div className="flex items-center justify-between">
              <CardBadge
                label="Find Me"
                color="text-cyan-300"
                bg="bg-cyan-500/15"
              />
              <Globe className="h-5 w-5 text-cyan-400 opacity-80" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Let's Connect</h3>
              <p className="mt-1 text-xs text-zinc-500">
                Open to collaborations, freelance projects, and new
                opportunities.
              </p>
            </div>

            <div className="mt-auto flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-4 sm:p-5 backdrop-blur-[1px] flex flex-col justify-between min-h-[140px] sm:min-h-[160px]">
              <BorderBeam
                size={150}
                duration={9}
                colorFrom="#10b981"
                colorTo="#34d399"
              />
              <BorderBeam
                size={100}
                duration={7}
                delay={3}
                colorFrom="#3b82f6"
                colorTo="#60a5fa"
              />

              <div className="flex items-center justify-between">
                <CardBadge
                  label="Experience"
                  color="text-emerald-300"
                  bg="bg-emerald-500/15"
                />
                <Code2 className="h-4 w-4 text-emerald-400 opacity-80" />
              </div>

              <div>
                <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  3
                </p>
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                  Years
                </p>
                <p className="mt-1 text-[11px] text-zinc-500">2023 – Present</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-4 sm:p-5 backdrop-blur-[1px] flex flex-col justify-between min-h-[140px] sm:min-h-[160px]">
              <BorderBeam
                size={150}
                duration={9}
                colorFrom="#f59e0b"
                colorTo="#fbbf24"
              />
              <BorderBeam
                size={100}
                duration={6}
                delay={2}
                colorFrom="#f97316"
                colorTo="#fb923c"
              />

              <div className="flex items-center justify-between">
                <CardBadge
                  label="Projects"
                  color="text-amber-300"
                  bg="bg-amber-500/15"
                />
                <FolderGit2 className="h-4 w-4 text-amber-400 opacity-80" />
              </div>

              <div>
                <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  28
                </p>
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  Delivered
                </p>
                <p className="mt-1 text-[11px] text-zinc-500">Across clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default About;
