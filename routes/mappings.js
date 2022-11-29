/**
 * A mapping from each page file path to its corresponding German and
 * English URL path. (Localized URL paths can improve search engine ratings,
 * hence the separation.)
 *
 * Following the Next.js convention, a dynamic component in a URL path
 * (e.g., a blog post slug) is indicated using the `[name]` syntax.
 *
 * @typedef {Object} PathMappings
 * @property {string} page - The mapped page file path. See `routes/pages.js`.
 * @property {string} de - The German URL path to use.
 * @property {string} en - The English URL path to use.
 */

/**
 * @type {Array.<PathMappings>}
 */
module.exports = [
  {
    page: '/home',
    de: '/',
    en: '/en',
  },
  {
    page: '/what-we-do',
    de: '/was-wir-machenn',
    en: '/en/what-we-do',
  },
  {
    page: '/what-we-do/approach-de',
    de: '/was-wir-tun/ansatz-de',
    en: '/en/what-we-do/approach-de',
  },
  {
    page: '/what-we-do/approach-sa',
    de: '/was-wir-tun/ansatz-sa',
    en: '/en/what-we-do/approach-sa',
  },
  {
    page: '/what-we-do/impact',
    de: '/was-wir-machen/effekte',
    en: '/en/what-we-do/impact',
  },
  {
    page: '/who-we-are',
    de: '/wer-wir-sind',
    en: '/en/who-we-are',
  },
  {
    page: '/who-we-are/team-de',
    de: '/wer-wir-sind/team-de',
    en: '/en/who-we-are/team-de',
  },
  {
    page: '/who-we-are/team-sa',
    de: '/wer-wir-sind/team-sa',
    en: '/en/who-we-are/team-sa',
  },
  {
    page: '/how-to-support',
    de: '/wie-sie-helfen',
    en: '/en/how-to-support',
  },
  {
    page: '/how-to-support/become-sponsor',
    de: '/wie-sie-helfen/masifunde-gemeinschaft',
    en: '/en/how-to-support/become-sponsor',
  },
  {
    page: '/how-to-support/become-volunteer',
    de: '/wie-sie-helfen/aktiv-werden',
    en: '/en/how-to-support/become-volunteer',
  },
  {
    page: '/how-to-support/become-partner',
    de: '/wie-sie-helfen/partner-werden',
    en: '/en/how-to-support/become-partner',
  },
  {
    page: '/how-to-support/donate',
    de: '/wie-sie-helfen/spenden',
    en: '/en/how-to-support/donate',
  },
  {
    page: '/contact',
    de: '/kontakt',
    en: '/en/contact',
  },
  {
    page: '/impressum',
    de: '/impressum',
    en: '/en/impressum',
  },
  {
    page: '/datenschutz',
    de: '/datenschutz',
    en: '/en/privacy',
  },
  {
    page: '/blog',
    de: '/blog/page/[page]',
    en: '/en/blog/page/[page]',
  },
  {
    page: '/blog/blog-post',
    de: '/blog/[slug]',
    en: '/en/blog/[slug]',
  },
  {
    page: '/campaign',
    de: '/spendenaktion',
    en: '/en/campaign',
  },
  {
    page: '/press',
    de: '/presse',
    en: '/en/press',
  },
  {
    page: '/documents',
    de: '/dokumente',
    en: '/en/documents',
  },
  {
    page: '/transparency',
    de: '/transparenz',
    en: '/en/transparency',
  },
  {
    page: '/podcasts',
    de: '/podcasts/page/[page]',
    en: '/en/podcasts/page/[page]',
  },
]
