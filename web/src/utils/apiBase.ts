/**
 * FloBoard backend on Render. api.floboard.app no longer resolves.
 *
 * The production web build is served by Netlify, which proxies `/api/*` to the
 * Render service (see netlify.toml). Calling the API through our own origin
 * keeps every request same-origin for the browser, so the API does not have to
 * grant CORS access to this site. Dev builds still talk to Render directly.
 */
const RENDER = 'https://floboard-api.onrender.com'

export function getApiBase(): string {
  const envUrl = import.meta.env.VITE_API_URL as string | undefined
  if (envUrl) return envUrl.replace(/\/$/, '')
  return import.meta.env.DEV ? RENDER : ''
}

export async function resolveApiBase(): Promise<string> {
  const base = getApiBase()
  try {
    // Drop any base cached by earlier builds that pointed at Render directly.
    localStorage.removeItem('floboard:apiBase')
  } catch { /* ignore */ }
  return base
}
