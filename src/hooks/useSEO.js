import { useEffect } from 'react'

/**
 * useSEO – dynamically updates <title> and key <meta> tags per route.
 *
 * @param {object} options
 * @param {string} options.title       – Full page title (shown in browser tab & SERPs)
 * @param {string} options.description – Meta description (~150 chars ideal)
 * @param {string} [options.path]      – Page path e.g. "/services". Canonical is auto-built
 *                                       from window.location.origin + path, so it always
 *                                       matches the domain the site is served from.
 * @param {string} [options.ogImage]   – Open Graph image URL (defaults to global)
 */
export function useSEO({ title, description, path, ogImage }) {
  useEffect(() => {
    // ── Title ──────────────────────────────────────────────────────────
    if (title) document.title = title

    // ── Helper: upsert <meta> ──────────────────────────────────────────
    const setMeta = (selector, attr, value) => {
      if (!value) return
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const [attrName, attrValue] = attr.split('=')
        el.setAttribute(attrName, attrValue.replace(/"/g, ''))
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    // ── Helper: upsert <link rel="canonical"> ─────────────────────────
    const setCanonical = (href) => {
      if (!href) return
      let el = document.querySelector('link[rel="canonical"]')
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', 'canonical')
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    // ── Build canonical from the actual live origin so it always matches
    //    the domain the page is served from (no cross-domain mismatch).
    const canonical = path
      ? `${window.location.origin}${path}`
      : window.location.href.split('?')[0].split('#')[0]

    // ── Apply metas ────────────────────────────────────────────────────
    setMeta('meta[name="description"]',          'name="description"',        description)
    setMeta('meta[property="og:title"]',         'property="og:title"',       title)
    setMeta('meta[property="og:description"]',   'property="og:description"', description)
    setMeta('meta[property="og:url"]',           'property="og:url"',         canonical)
    setMeta('meta[name="twitter:title"]',        'name="twitter:title"',      title)
    setMeta('meta[name="twitter:description"]',  'name="twitter:description"', description)

    if (ogImage) {
      setMeta('meta[property="og:image"]',  'property="og:image"',  ogImage)
      setMeta('meta[name="twitter:image"]', 'name="twitter:image"', ogImage)
    }

    setCanonical(canonical)
  }, [title, description, path, ogImage])
}
