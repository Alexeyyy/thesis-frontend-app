import { searchUsers, getUserInfo, getUserRepos } from '@/api/gitHubApi'
import { getTopElementsFromDict } from '@/helpers/commonHelper'
import { compareBuild } from 'semver'

export default {
    state: {
        alphaList: [],
        lastSearch: {
            login: '',
            language: '',
            location: '',
            page: 1,
            totalCount: 0
        },
        // Его потом надо будет грузить с сервера (пока хранится целый объект).
        savedAlphaList: []
    },
    mutations: {
        setAlphaList (state, payload) {
            state.alphaList = payload
        },
        saveAlpha (state, payload) {
            if (state.savedAlphaList.find(a => a.id === payload.id)) {
                return
            }
            state.savedAlphaList.push(payload)
        },
        saveRequest (state, { nickname, languages, location, reposCountRange }) {
            state.lastRequest.nickname = nickname
            state.languages = languages
            state.location = location
            state.reposCountRange = reposCountRange
        },
        saveLastSearch(state, { query, totalCount }) {
            state.lastSearch.login = query.login
            state.lastSearch.language = query.language
            state.lastSearch.location = query.location
            state.lastSearch.page = query.page
            state.lastSearch.totalCount = totalCount
        }
    },
    actions: {
        async searchAlphaUsers ({ commit }, request) {
            commit('clearError')
            commit('setLoading', true)

            try {
                let json = JSON.parse(await searchUsers(request.query, request.token))
                let totalCount = json.total_count

                let users = json.items
                let usersData = []

                // Чтение данных пользователей.
                // Репозитории все не перебираются - берутся все, что есть по ссылке на первой странице.
                users.forEach(async (user) => {
                    let data = JSON.parse(await getUserInfo(user.url, request.token))
                    let repos = JSON.parse(await getUserRepos(user.repos_url, request.token))
                    let langStats = {}

                    repos.forEach(repo => {
                        const language = repo.language
                        if (language) {
                            if (langStats[language]) {
                                langStats[language] += 1
                            } else {
                                langStats[language] = 1
                            }
                        }
                    })

                    usersData.push({
                        id: data.id,
                        avatar_url: data.avatar_url,
                        login: data.login,
                        html_url: data.html_url,
                        techs: getTopElementsFromDict(langStats),
                        name: data.name,
                        company: data.company,
                        blog: data.blog,
                        location: data.location,
                        email: data.email,
                        bio: data.bio,
                        twitter: data.twitter_username,
                        public_repos: data.public_repos,
                        gists: data.public_gists,
                        followers: data.followers,
                        following: data.following,
                    })
                });
                
                commit('setAlphaList', usersData)
                commit('saveLastSearch', { query: request.query, totalCount })
                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
            }
        },
        saveAlpha ({ commit }, payload) {
            commit('saveAlpha', payload)
            commit('setInfo', `Alpha ${payload.name} сохранен`)
        }
    },
    getters: {
        alphaList (state) {
            const saved = state.savedAlphaList.map(a => a.id)
            return state.alphaList.filter(a => !saved.includes(a.id))
        },
        savedAlphaList (state) {
            return state.savedAlphaList
        },
        getAlphaById: (state) => (id) => {
            return state.alphaList.find(a => a.id === id)
        },
        totalCount (state) {
            return state.lastSearch.totalCount
        }
    }
}