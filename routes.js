// eslint-disable-next-line no-multi-assign
const routes = module.exports = require('next-routes')()

routes.add('about', '/:lang(en)/about')
