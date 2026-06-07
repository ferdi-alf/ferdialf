// components/FormContact.tsx
import { darkSurface, rimBorder } from "@/styles/surfaces";
import { ShineButton } from "../lightswind/shine-button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContactForm } from "@/hooks/useContactForm";

export default function FormContact() {
  const { form, updateField, handleSubmit, status, errorMessage } =
    useContactForm();
  const [focused, setFocused] = useState<string | null>(null);

  const isDisabled = status === "loading" || status === "success";

  const inputStyle = (field: string): React.CSSProperties => ({
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
    opacity: isDisabled ? 0.5 : 1,
    cursor: isDisabled ? "not-allowed" : "text",
  });

  const buttonLabel =
    status === "loading"
      ? "Sending..."
      : status === "success"
        ? "Message Sent ✓"
        : "Send Message";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

          {(["name", "email"] as const).map((field) => (
            <div key={field} className="flex flex-col gap-2">
              <label className="text-xs tracking-widest text-white/30 uppercase">
                Your {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                placeholder={
                  field === "email" ? "john@example.com" : "John Doe"
                }
                value={form[field]}
                onChange={updateField(field)}
                onFocus={() => setFocused(field)}
                onBlur={() => setFocused(null)}
                disabled={isDisabled}
                style={inputStyle(field)}
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
              onChange={updateField("message")}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              disabled={isDisabled}
              style={{ ...inputStyle("message"), resize: "none" }}
            />
          </div>

          <AnimatePresence mode="wait">
            {status === "error" && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400/80 text-xs"
              >
                {errorMessage}
              </motion.p>
            )}
            {status === "success" && (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-green-400/80 text-xs"
              >
                ✓ Message sent! I&apos;ll get back to you soon.
              </motion.p>
            )}
          </AnimatePresence>

          <ShineButton
            label={buttonLabel}
            className="mt-2 w-full border-white/10"
            onClick={!isDisabled ? handleSubmit : undefined}
            disabled={isDisabled}
          />
        </div>
      </div>
    </motion.div>
  );
}
