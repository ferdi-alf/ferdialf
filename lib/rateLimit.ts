type Record = { count: number; resetAt: number };
const store = new Map<string, Record>();

if (typeof setInterval !== "undefined") {
  setInterval(
    () => {
      const now = Date.now();
      store.forEach((v, k) => {
        if (now > v.resetAt) store.delete(k);
      });
    },
    10 * 60 * 1000,
  );
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || now > existing.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: maxRequests - 1, resetAt };
  }

  if (existing.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count++;
  return {
    allowed: true,
    remaining: maxRequests - existing.count,
    resetAt: existing.resetAt,
  };
}
