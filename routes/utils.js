/**
 * Utilties for working with routes and paths.
 *
 * @module
 */

import pathMappings from './mappings'

/**
 * Takes a path with dynamic parameters (`[name]`) and produces a
 * concrete one by replacing the parameters with particular values.
 *
 * @param {string} path - The dynamic path.
 * @param {Object.<string, string>} params - Dynamic parameter values.
 * @returns {string} The concrete path.
 */
export function fillPathParams(path, params) {
  let result = path

  for (const [key, value] of Object.entries(params)) {
    result = result.replace(`[${key}]`, value)
  }

  return result
}

/**
 * Takes any value that can be used as `href` with a Next.js link
 * (a page file path or an object of the form `{ pathname, query }`)
 * and creates a fully-formed URL path for the given locale.
 *
 * @param {*} href - The `href` value to localize.
 * @param {*} locale - The locale ("de" or "en") to use.
 * @returns The localized URL path.
 */
export function localizeHref(href, locale) {
  const page = typeof href === 'string' ? href : href.pathname
  const query = typeof href === 'string' ? {} : href.query || {}

  const mapping = pathMappings.find((m) => m.page === page)

  if (!mapping) {
    console.warn('`routes/mappings.js` has no mapping for path: ' + page)
    return page
  }

  let path = mapping && (mapping[locale] || mapping.page)
  for (const [key, value] of Object.entries(query)) {
    path = path.replace(`[${key}]`, value)
  }

  return path
}
