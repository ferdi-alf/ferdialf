import React from "react";

interface ShineButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  bgColor?: string;

  disabled?: boolean;
}

const sizeStyles: Record<
  NonNullable<ShineButtonProps["size"]>,
  { padding: string; fontSize: string }
> = {
  sm: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
  md: { padding: "0.6rem 1.4rem", fontSize: "1rem" },
  lg: { padding: "0.8rem 1.8rem", fontSize: "1.125rem" },
};

export const ShineButton: React.FC<ShineButtonProps> = ({
  label = "Shine now",
  onClick,
  className = "",
  size = "md",
  bgColor = "linear-gradient(325deg, hsl(0 0% 18%) 0%, hsl(0 0% 32%) 50%, hsl(0 0% 14%) 100%)",
  disabled = false,
}) => {
  const { padding, fontSize } = sizeStyles[size];

  const backgroundImage = bgColor.startsWith("linear-gradient")
    ? bgColor
    : `linear-gradient(to right, ${bgColor}, ${bgColor})`;

  return (
    <button
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`relative text-white font-medium rounded-md min-w-30 min-h-11
        border-none
        focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent
        overflow-hidden group
        ${disabled ? "cursor-not-allowed" : "cursor-pointer active:scale-95"}
        ${className}`}
      style={{
        backgroundImage,
        backgroundSize: "280% auto",
        backgroundPosition: "initial",
        color: "hsl(0 0% 100%)",
        fontSize,
        padding,
        opacity: disabled ? 0.32 : 1,
        transition:
          "background-position 0.8s ease, transform 0.15s ease, opacity 0.2s ease",
        boxShadow: disabled
          ? "none"
          : [
              "0px 0px 18px rgba(255,255,255,0.08)",
              "0px 4px 8px -2px rgba(0,0,0,0.5)",
              "inset 0px 1px 0px rgba(255,255,255,0.18)",
              "inset 0px -1px 0px rgba(0,0,0,0.4)",
            ].join(", "),
        pointerEvents: disabled ? "none" : "auto",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        (e.currentTarget as HTMLButtonElement).style.backgroundPosition =
          "right top";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        (e.currentTarget as HTMLButtonElement).style.backgroundPosition =
          "initial";
      }}
    >
      {label}

      {!disabled && (
        <span
          className="pointer-events-none absolute inset-0 -left-2.5 -translate-x-full skew-x-[-20deg]
            bg-white/20 group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out"
        />
      )}
    </button>
  );
};
