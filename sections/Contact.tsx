"use client";

import { motion } from "framer-motion";

import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { darkSurface, rimBorder } from "@/styles/surfaces";

import Lanyard from "@/components/Lanyard";
import FormContact from "@/components/Contact/FormContact";
import Footer from "@/components/Footer";

export default function ContactFooter() {
  const infoItems = [
    {
      icon: <MdEmail size={18} />,
      label: "Email",
      value: "ferdialf.dev@gmail.com",
    },
    {
      icon: <MdPhone size={18} />,
      label: "Phone",
      value: "+62 881 0802 88925",
    },
    {
      icon: <MdLocationOn size={18} />,
      label: "Location",
      value: "Palembang, South Sumatra, Indonesia",
    },
  ];

  return (
    <div className="w-full ">
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto gap-4 p-3 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-full flex flex-col justify-center py-2 px-2 lg:px-4"
          >
            <div className="mb-5">
              <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-3 font-light">
                Get In Touch
              </p>
              <h2
                className="text-4xl bg-clip-text lg:text-5xl font-bold mb-4 leading-tight"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Let&apos;s Build
                <br />
                Something Great
              </h2>
              <p className="text-white/45 text-sm leading-relaxed max-w-sm">
                I&apos;m always open to interesting projects, collaborations, or
                just a friendly chat about tech and design.
              </p>
            </div>

            <div className="md:gap-2.5 gap-2  flex justify-center items-center ">
              {infoItems.map((item) => (
                <div key={item.label} style={rimBorder}>
                  <div
                    style={{ ...darkSurface, borderRadius: 13 }}
                    className="flex items-center md:gap-4 gap-2 md:px-4 px-2 py-2  md:py-3.5"
                  >
                    <span className="text-white/30 shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-[10px] tracking-widest text-white/25 uppercase">
                        {item.label}
                      </p>
                      <p className="text-white/70 truncate text-[6.5px] md:text-[12px] lg:text-[11px] font-light">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <FormContact />
        </div>
        <div className="lg:block hidden h-full w-full">
          <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
