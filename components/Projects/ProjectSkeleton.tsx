export default function ProjectSkeleton() {
  return (
    <div
      className="rounded-xl overflow-hidden border border-white/4"
      style={{
        background:
          "linear-gradient(160deg, rgba(39,39,42,0.6) 0%, rgba(24,24,27,0.8) 100%)",
      }}
    >
      <div className="w-full aspect-video bg-zinc-800/60 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-3.5 bg-zinc-700/40 rounded-full w-3/5 animate-pulse" />
        <div className="h-2.5 bg-zinc-700/30 rounded-full w-full animate-pulse" />
        <div className="h-2.5 bg-zinc-700/30 rounded-full w-4/5 animate-pulse" />
        <div className="flex gap-2 pt-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full bg-zinc-700/40 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
