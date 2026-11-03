/**
 * Referrer for profile stats: only the bare domain of the site a visitor came
 * from, never a path, query or full URL. Internal navigation counts as direct.
 */
export function referrerDomainOf(raw: string | null | undefined, ownHosts: string[] = []): string | null {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw.slice(0, 2000));
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  const host = url.hostname.toLowerCase().replace(/^www\./, "").replace(/\.$/, "");
  if (!/^[a-z0-9.-]{1,253}$/.test(host) || !host.includes(".")) return null;
  const own = ["rout.be", ...ownHosts.map((h) => h.toLowerCase().replace(/^www\./, ""))];
  if (own.some((o) => o && (host === o || host.endsWith(`.${o}`)))) return null;
  if (host === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return null;
  return host;
}
