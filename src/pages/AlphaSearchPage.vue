<template>
    <v-container fluid>
        <v-card class="mb-3 pa-5">
            <v-card-title>
                <h2>
                    Параметры поиска
                </h2>
            </v-card-title>
            <v-card-text>
                <v-layout raw wrap>
                    <v-flex xs12> 
                        <v-text-field
                            v-model="language"
                            full-width
                            label="Основная технология (язык программирования) ..."
                            prepend-inner-icon="mdi-sword"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout raw wrap>
                    <v-flex xs12> 
                        <v-text-field
                            v-model="location"
                            full-width
                            label="Местоположение ..."
                            prepend-inner-icon="mdi-map-marker"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout raw wrap>
                    <v-btn
                        text
                        small
                        @click="showExtraSearchParams()"
                    >
                        <span 
                            v-if="!showExtraParams"
                        >
                            Показать доп. параметры
                        </span>
                        <span v-else>
                            Скрыть доп. параметры
                        </span>
                    </v-btn>                        
                </v-layout>
            </v-card-text>
            <v-card-text v-if="showExtraParams">
                <v-layout raw wrap>
                    <v-flex xs12> 
                        <v-slider
                            v-model="repos"
                            :label="'Репозиториев больше чем'"
                            :step="1"
                            :max="10000"
                            thumb-color="primary"
                            thumb-label="always"
                        ></v-slider>
                    </v-flex>
                </v-layout>
                <v-layout raw wrap>
                    <v-flex xs12> 
                        <v-slider
                            v-model="followers"
                            :label="'Фолловеров больше чем'"
                            :step="1"
                            :max="10000"
                            thumb-color="primary"
                            thumb-label="always"
                        ></v-slider>
                    </v-flex>
                </v-layout>
                <v-layout raw>
                    <v-flex xs12>
                        <v-text-field
                            v-model="login"
                            full-width
                            label="Имя ..."
                            prepend-inner-icon="mdi-account"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-layout raw>
                    <v-flex xs12>
                        <v-btn 
                            color="primary"
                            :loading="loading"
                            @click="searchPage(1)"
                        >
                            Начать поиск
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>
        </v-card>

        <!-- Прелоадер -->
        <v-container v-if="loading" fluid>
            <v-row>
                <v-col>
                    <alpha-search-skeleton-loader :loadingCardsCount="loadingCardsCount"></alpha-search-skeleton-loader>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-pagination
                        v-if="totalCount > showPerPage"
                        v-model="page"
                        class="mt-6"
                        :disabled="true"
                        :length="pageLimitToShow"
                        total-visible="10"
                    ></v-pagination>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else-if="alphaList.length === 0" fluid>
            <v-row>
                <v-col>
                    <h2 class="text-center mt-15 text--disabled">
                        Нет данных для отображения
                    </h2>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else-if="!loading" fluid>
            <v-row>
                <v-col>
                    <v-layout raw wrap>
                        <v-flex
                            xs12 sm4 md3
                            v-for="item in alphaList"
                            :key="item.login"
                            class="pa-2"
                        >
                            <v-card
                                class="mx-auto"
                                max-width="374"
                            >
                                <v-img
                                    height="250"
                                    :src="item.avatar_url"
                                >
                                </v-img>
                                
                                <v-card-title v-if="item.name">
                                    {{ item.name }} 
                                </v-card-title>
                                <v-card-title v-else>
                                    No name
                                </v-card-title>

                                <v-card-subtitle>
                                    <a :href="item.html_url" target="_blank">
                                        @{{ item.login }}
                                    </a>
                                </v-card-subtitle>

                                <v-card-text class="mt-2">
                                    <div class="ml-4">
                                        <v-row
                                            align="center"
                                            class="mb-5"
                                        >
                                            <v-tooltip top color="black">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <div
                                                        v-on="on"
                                                        v-bind="attrs"
                                                    >
                                                        <v-icon class="mr-1">
                                                            mdi-account-multiple
                                                        </v-icon>
                                                        <span class="subheading mr-2">{{ item.followers }}</span>
                                                    </div>
                                                </template>
                                                <span>Количество фолловеров</span>
                                            </v-tooltip>
                                            <v-tooltip top color="black">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <div
                                                        v-on="on"
                                                        v-bind="attrs"
                                                    >
                                                        <v-icon class="mr-1">
                                                            mdi-folder
                                                        </v-icon>
                                                        <span class="subheading mr-2">{{ item.public_repos }}</span>
                                                    </div>
                                                </template>
                                                <span>Количество открытых репозиториев</span>
                                            </v-tooltip>
                                        </v-row>
                                        <v-row
                                            align="center"
                                            class="mb-3"
                                        >
                                            <v-tooltip top color="black">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <div
                                                        v-on="on"
                                                        v-bind="attrs"
                                                    >
                                                        <v-icon class="mr-1">
                                                            mdi-email
                                                        </v-icon>
                                                        <span class="subheading mr-2" v-if="item.email">
                                                            {{ item.email }}
                                                        </span>
                                                        <span class="subheading mr-2" v-else>
                                                            Нет данных
                                                        </span>
                                                    </div>
                                                </template>
                                                <span>Электронная почта</span>
                                            </v-tooltip>
                                        </v-row>
                                        <v-row
                                            align="center"
                                            class="mb-3"
                                        >
                                            <v-tooltip top color="black">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <div
                                                        v-on="on"
                                                        v-bind="attrs"
                                                    >
                                                        <v-icon class="mr-1">
                                                            mdi-earth
                                                        </v-icon>
                                                        <span class="subheading mr-2" v-if="item.location">{{ item.location}}</span>
                                                        <span class="subheading mr-2" v-else>
                                                            Нет данных
                                                        </span>
                                                    </div>
                                                </template>
                                                <span>Местоположение</span>
                                            </v-tooltip>
                                        </v-row>
                                        <v-row
                                            align="center"
                                            class="mb-3"
                                        >
                                            <v-tooltip top color="black">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <div
                                                        v-on="on"
                                                        v-bind="attrs"
                                                    >
                                                        <v-icon class="mr-1">
                                                            mdi-flag
                                                        </v-icon>
                                                        <span class="subheading mr-2" v-if="item.company">{{ item.company}}</span>
                                                        <span class="subheading mr-2" v-else>
                                                            Нет данных
                                                        </span>
                                                    </div>
                                                </template>
                                                <span>Местоположение</span>
                                            </v-tooltip>
                                        </v-row>
                                    </div>
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-title>Топ-навыки</v-card-title>
                                <v-card-text>
                                    <skills-list :techs="item.techs" :showString="false"></skills-list>
                                </v-card-text>

                                <v-divider></v-divider>
                                
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn 
                                        v-if="!item.inSavedAlphaList"
                                        text 
                                        color="primary"
                                        @click="saveAlpha(item.id)"
                                    >
                                        Добавить
                                    </v-btn>
                                    <v-btn 
                                        v-else
                                        text
                                        :disabled="true"
                                    >
                                        <v-icon left>
                                            mdi-check
                                        </v-icon>
                                        Добавлен
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-pagination
                        v-if="totalCount > showPerPage"
                        v-model="page"
                        class="mt-6"
                        :length="pageLimitToShow"
                        total-visible="10"
                    ></v-pagination>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
import alphaSearchSkeletonLoader from '@/components/AlphaSearchSkeletonLoader.vue'

export default {
    data () {
        return {
            loadingCardsCount: 8,
            showExtraParams: false,
            page: 1,
            // Only the first 1000 search results are available according to GitHub API.
            pageLimit: 80,
            // Search params.
            language: '',
            location: '',
            repos: 0,
            followers: 0,
            login: ''
        }
    },
    components: {
        alphaSearchSkeletonLoader
    },
    methods: {
        searchPage (page) {
            this.page = page
            const request = {
                query: {
                    language: this.language,
                    location: this.location,
                    repos: this.repos,
                    followers: this.followers,
                    login: this.login,
                    page: this.page,
                    showPerPage: this.showPerPage
                },
                token: this.token
            }
            this.$store.dispatch('searchAlphaUsers', request)
        },
        showExtraSearchParams () {
            this.showExtraParams = !this.showExtraParams
            if (!this.showExtraParams) {
                this.repos = 0
                this.followers = 0
                this.login = ''
            }
        },
        saveAlpha (id) {
            const alpha = this.$store.getters.getAlphaById(id)
            this.$store.dispatch('saveAlpha', alpha)
        }
    },
    computed: {
        alphaList () {
            return this.$store.getters.alphaList
        },
        loading () {
            return this.$store.getters.loading
        },
        lastSearch () {
            return this.$store.getters.lastSearch
        },
        pageLimitToShow () {
            let apiPageLimit = Math.ceil(this.totalCount / this.showPerPage)
            if (apiPageLimit < this.pageLimit) {
                return apiPageLimit
            }
            return this.pageLimit
        },
        showPerPage () {
            return this.$store.getters.showPerPage
        },
        totalCount () {
            return this.$store.getters.totalCount
        },
        token () {
            return this.$store.getters.token
        }
    },
    watch: {
        page: {
            handler: function (val) {
                this.searchPage(val)
            }
        }
    },
    mounted () {
        this.repos = this.lastSearch.repos
        this.language = this.lastSearch.language
        this.followers = this.lastSearch.followers
        this.login = this.lastSearch.login
        this.location = this.lastSearch.location
        this.page = this.lastSearch.page

        if (this.login || this.followers > 0 || this.repos > 0) {
            this.showExtraParams = true
        }
    }
}
</script>

<style scoped>
</style>>