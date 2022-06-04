const TaskStatus = Object.freeze({'FINISHED': 1, 'PROCESSING': 2, 'ERROR': 3})

class Task {
    constructor(id, depth, duration, alpha) {
        this.id = id
        this.alpha = alpha
        this.depth = depth,
        this.duration = duration
        this.status = TaskStatus.PROCESSING
    }
}

export default {
    state: {
        /*tasks: [
            {
                id: 1,
                "alpha":{
                   "id":526301,
                   "avatar_url":"https://avatars3.githubusercontent.com/u/526301?v=4",
                   "login":"yegor256",
                   "html_url":"https://github.com/yegor256",
                   "techs":[
                      "Java",
                      "Dockerfile",
                      "Ruby"
                   ],
                   "name":"Yegor Bugayenko",
                   "company":"@huawei @zerocracy",
                   "blog":"http://www.yegor256.com",
                   "location":"Moscow, Russia",
                   "email":"yegor256@gmail.com",
                   "bio":"Lab director at @Huawei; author of \"Elegant Objects\" book series (buy them on Amazon); founder of @zerocracy; creator of @zold-io",
                   "twitter":"yegor256",
                   "public_repos":120,
                   "gists":6,
                   "followers":3407,
                   "following":4,
                   "inSavedAlphaList":true
                },
                "name":"Java-поиск",
                "depth":1,
                "duration":60,
                "status": 1,
                "details": {
                    progress: 100,
                    repos: 3429,
                    profiles: 75922,
                    teams: 238
                }
             },
             {
                id: 2,
                "alpha":{
                   "id":3105477,
                   "avatar_url":"https://avatars3.githubusercontent.com/u/3105477?v=4",
                   "login":"vladdy-moses",
                   "html_url":"https://github.com/vladdy-moses",
                   "techs":[
                      "C#",
                      "JavaScript",
                      "C"
                   ],
                   "name":"Vladislav Moiseev",
                   "company":"AIS Gorod",
                   "blog":"http://formoses.ru/",
                   "location":"Ulyanovsk, Russia",
                   "email":null,
                   "bio":null,
                   "twitter":null,
                   "public_repos":21,
                   "gists":0,
                   "followers":20,
                   "following":20,
                   "inSavedAlphaList":true
                },
                "name":".NET поиск",
                "depth":1,
                "duration":60,
                "status": 1,
                "details": {
                    progress: 100,
                    repos: 9534,
                    profiles: 48539,
                    teams: 734
                }
             },
             {
                id: 3,
                "alpha":{
                   "id":747988,
                   "avatar_url":"https://avatars0.githubusercontent.com/u/747988?v=4",
                   "login":"vgv",
                   "html_url":"https://github.com/vgv",
                   "techs":[
                      "Java",
                      "Kotlin",
                      "C"
                   ],
                   "name":"Vasily Vasilkov",
                   "company":"@Ecwid",
                   "blog":"https://twitter.com/2vgv",
                   "location":"Ulyanovsk, Russia",
                   "email":null,
                   "bio":null,
                   "twitter":null,
                   "public_repos":16,
                   "gists":2,
                   "followers":22,
                   "following":2,
                   "inSavedAlphaList":true
                },
                "name":"Kotlin-поиск",
                "depth":2,
                "duration":74,
                "status": 3,
                "details": {
                    progress: 100,
                    repos: 6402,
                    profiles: 53921,
                    teams: 583
                }
             }
        ]*/
        tasks: [],
        demoTasks: []
    },
    mutations: {
        fillDemoTasks (state, payload) {
            state.demoTasks = payload
        },
        addTask (state, payload) {
            state.tasks.push(payload)
        }
    },
    actions: {
        async createTask ({ commit }, { alphaId, duration, depth, name }) {
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
            if (true) {
                return state.demoTasks
            }
            return state.tasks
        },
        finishedTasks (state) {
            if (true) {
                return state.demoTasks.filter(t => t.status === TaskStatus.FINISHED)
            }
            return state.tasks.filter(t => t.status === TaskStatus.FINISHED)
        },
        processingTasks (state) {
            if (true) {
                return state.demoTasks.filter(t => t.status === TaskStatus.PROCESSING)
            }
            return state.tasks.filter(t => t.status === TaskStatus.PROCESSING)
        },
        erroredTasks (state) {
            if (true) {
                return state.demoTasks.filter(t => t.status === TaskStatus.ERROR)
            }
            return state.tasks.filter(t => t.status === TaskStatus.ERROR)
        }
    }
}