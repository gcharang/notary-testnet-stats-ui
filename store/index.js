export const state = () => ({
    notaries: {},
    headers: []
})

export const mutations = {
    setNotaryData: function (state, notaries) {
        state.notaries = notaries
    },
    setHeadersData: function (state, headers) {
        state.headers = headers
    }
}

export const getters = {
    getNotaryData: function (state) {
        return state.notaries
    },
    getHeadersData: function (state) {
        return state.headers
    }
}