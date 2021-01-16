export default {
    state: {
        loading: false,
        error: null,
        info: null
    },
    mutations: {
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        setInfo (state, payload) {
            state.info = payload
        },
        clearInfo (state) {
            state.info = null
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        setLoading ({ commit }, payload) {
            commit('setLoading', payload)
        },
        setError ({ commit }, payload) {
            commit('setError', payload)
        },
        setInfo ({ commit }, payload) {
            commit('setInfo', payload)
        },
        clearError ({ commit }) {
            commit('clearError')
        },
        clearInfo ({ commit }) {
            commit('clearInfo')
        }
    },
    getters: {
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        },
        info (state) {
            return state.info
        }
    }
}