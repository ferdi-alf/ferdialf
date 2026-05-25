import { darkSurface, rimBorder } from "@/styles/surfaces";
import { ShineButton } from "../lightswind/shine-button";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FormContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className=" "
    >
      <div style={rimBorder} className="w-full">
        <div style={darkSurface} className="p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-white/80 text-base font-medium mb-1">
              Send a Message
            </h3>
            <p className="text-white/25 text-xs">
              I&apos;ll get back to you as soon as possible.
            </p>
          </div>

          {["name", "email"].map((field) => (
            <div key={field} className="flex flex-col gap-2">
              <label className="text-xs tracking-widest text-white/30 uppercase">
                Your {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                placeholder={
                  field === "email" ? "john@example.com" : "John Doe"
                }
                value={form[field as "name" | "email"]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                onFocus={() => setFocused(field)}
                onBlur={() => setFocused(null)}
                style={{
                  background:
                    "linear-gradient(160deg, rgba(38,38,42,0.7) 0%, rgba(16,16,18,0.9) 100%)",
                  border: `1px solid ${focused === field ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 12,
                  color: "rgba(255,255,255,0.85)",
                  outline: "none",
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 14,
                  fontFamily: "inherit",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest text-white/30 uppercase">
              Message
            </label>
            <textarea
              rows={3}
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              style={{
                background:
                  "linear-gradient(160deg, rgba(38,38,42,0.7) 0%, rgba(16,16,18,0.9) 100%)",
                border: `1px solid ${focused === "message" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 12,
                color: "rgba(255,255,255,0.85)",
                outline: "none",
                width: "100%",
                padding: "12px 16px",
                fontSize: 14,
                fontFamily: "inherit",
                resize: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            />
          </div>

          <ShineButton
            label="Send Message"
            className="mt-2 w-full border-white/10"
          />
        </div>
      </div>
    </motion.div>
  );
}
