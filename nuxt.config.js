// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
    router: {
        base: '/notary-testnet-stats-2020/'
    }
} : {}


module.exports = {
    modules: [
        '@nuxtjs/axios',
    ],
    buildModules: ['@nuxtjs/vuetify'],
    mode: "spa",
    ...routerBase

}