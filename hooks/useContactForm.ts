import { useState, useCallback } from "react";

export type FormState = {
  name: string;
  email: string;
  message: string;
};

export type SubmitStatus = "idle" | "loading" | "success" | "error";

async function generateFingerprint(): Promise<string> {
  try {
    const raw = [
      navigator.userAgent,
      navigator.language,
      navigator.languages?.join(",") ?? "",
      `${screen.width}x${screen.height}x${screen.colorDepth}`,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      String(navigator.hardwareConcurrency ?? ""),
      String(navigator.maxTouchPoints ?? ""),
      String(new Date().getTimezoneOffset()),
      navigator.platform ?? "",
    ].join("||");

    const buffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(raw),
    );
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const updateField = useCallback(
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (status === "error") setStatus("idle");
      },
    [status],
  );

  const handleSubmit = useCallback(async () => {
    const { name, email, message } = form;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please fill in all fields.");
      setStatus("error");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (message.trim().length < 10) {
      setErrorMessage("Message is too short.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const fingerprint = await generateFingerprint();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Device-Fingerprint": fingerprint,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data: { error?: string } = await res.json();

      if (!res.ok) {
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrorMessage("Network error. Please check your connection.");
      setStatus("error");
    }
  }, [form]);

  const reset = useCallback(() => {
    setStatus("idle");
    setErrorMessage("");
  }, []);

  return { form, updateField, handleSubmit, status, errorMessage, reset };
}
