export default function PreviewStack({ srcs }: { srcs: string[] }) {
  const rotations = [-6, 1, 7];
  const offsets = [
    "-translate-y-3 -translate-x-2",
    "translate-y-0",
    "translate-y-2 translate-x-2",
  ];

  return (
    <div className="relative w-60  h-44 md:w-92 md:h-72 mx-auto pr-8 sm:pr-0">
      {srcs.slice(0, 3).map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 rounded-xl overflow-hidden border border-white/[0.07] shadow-2xl ${offsets[i]}`}
          style={{
            transform: `rotate(${rotations[i]}deg)`,
            zIndex: i,
            background:
              "linear-gradient(160deg, rgba(39,39,42,0.9) 0%, rgba(18,18,22,0.98) 100%)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover opacity-70"
            draggable={false}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
