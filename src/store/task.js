class Task {
    constructor(id, depth, duration, alphaId) {
        this.id = id
        this.alphaId = alphaId
        this.depth = depth,
        this.duration = duration
    }
}

export default {
    state: {
        tasks: []
    },
    mutations: {
        addTask (state, payload) {
            state.tasks.push(payload)
        }
    },
    actions: {
        async createTask ({ commit }, { alphaId, duration, depth }) {
            commit('clearError')
            commit('setLoading', true)
            
            const task = new Task(
                1, depth, duration, alphaId
            )

            try {
                // Тут сохранение таска на сервере.
                await new Promise((res, rej) => {
                    setTimeout(() => {
                        commit('addTask', task)
                        res()
                    }, 3000)
                })
                commit('setInfo', 'Поиск с id: 1 создан')
                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
            }
        }
    },
    getters: {
        tasks (state) {
            return state.tasks
        }
    }
}