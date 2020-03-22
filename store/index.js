export const state = () => ({
    notaries: {}
})

export const mutations = {
    setNotaryData: function (state, notaries) {
        state.notaries = notaries
    }
}

export const getters = {
    getNotaryData: function (state) {
        return state.notaries
    }
}