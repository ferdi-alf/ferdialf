export default function CertSkeleton() {
  return (
    <div
      className="rounded-xl overflow-hidden border border-white/4"
      style={{
        background:
          "linear-gradient(160deg, rgba(39,39,42,0.6) 0%, rgba(24,24,27,0.8) 100%)",
      }}
    >
      <div className="w-full aspect-4/3 bg-zinc-800/50 animate-pulse" />
      <div className="p-3.5 space-y-2">
        <div className="h-3 bg-zinc-700/40 rounded-full w-4/5 animate-pulse" />
        <div className="h-2.5 bg-zinc-700/30 rounded-full w-2/3 animate-pulse" />
      </div>
    </div>
  );
}
