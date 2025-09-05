import jwt_decode from "jwt-decode";

export function getCurrentUserId(): string | null {
  if (typeof window === "undefined") return null;
  const t = localStorage.getItem("token");
  if (!t) return null;
  try {
    const d = jwt_decode<{ userId?: string; sub?: string }>(t);
    return (d.userId || d.sub || null) as string | null;
  } catch { return null; }
}