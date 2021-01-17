<template>
    <v-container fluid>
        <v-card class="mb-3 pa-5">
            <v-card-title>
                <h2>
                    Параметры поиска
                </h2>
            </v-card-title>
            <v-card-text>
                <v-layout raw>
                    <v-flex xs12>
                        <v-text-field
                            full-width
                            label="Ник на GitHub"
                            prepend-inner-icon="mdi-map-marker"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout raw wrap>
                    <v-flex xs12 sm6 md6> 
                        <v-text-field
                            full-width
                            label="Технологии"
                            prepend-inner-icon="mdi-map-marker"
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-chip-group column>
                            <v-chip v-for="n in demoChipsCount"
                                :key="n"
                                class="ma-2"
                                close
                                color="primary"
                                text-color="white"
                                close-icon="mdi-close"
                                @click:close="close()"
                            >
                                Java
                            </v-chip>
                        </v-chip-group>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-layout raw>
                    <v-flex xs12>
                        <v-btn 
                            color="primary"
                            @click="searchPage(page)"
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
                    <v-layout raw wrap>
                        <v-flex 
                            xs12 sm4 md3
                            v-for="index in loadingCardsCount"
                            :key="index"
                            class="pa-2"
                        >
                            <v-card>
                                <v-skeleton-loader
                                    type="image, article"
                                ></v-skeleton-loader>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-pagination
                        v-model="page"
                        class="mt-6"
                        :disabled="true"
                        :length="pageLimitToShow"
                        total-visible="10"
                    ></v-pagination>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else-if="!loading && alphaList.length > 0" fluid>
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
                                                            No data
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
                                                            No data
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
                                    <v-chip-group
                                        column
                                        v-if="item.techs.length > 0"
                                    >
                                        <v-chip v-for="tech in item.techs" :key="tech">{{ tech }}</v-chip>
                                    </v-chip-group>
                                    <span v-else>
                                        Нет данных
                                    </span>
                                </v-card-text>

                                <v-divider></v-divider>
                                
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn 
                                        text 
                                        color="primary"
                                        @click="saveAlpha(item.id)"
                                    >
                                        Добавить
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
                        v-model="page"
                        class="mt-6"
                        :length="pageLimitToShow"
                        total-visible="10"
                    ></v-pagination>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else fluid>
            <v-row>
                <v-col>
                    <h2 class="text-center mt-15 text--disabled">
                        Нет данных для отображения
                    </h2>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            loadingCardsCount: 8,
            demoChipsCount: 7,
            page: 1,
            pageLimit: 100
        }
    },
    methods: {
        searchPage (page) {
            this.page = page
            const request = {
                query: {
                    language: 'python',
                    location: 'moscow',
                    page: this.page,
                    showPerPage: this.showPerPage
                },
                token: this.token
            }
            this.$store.dispatch('searchAlphaUsers', request)
        },
        close () {
            console.log('Close chip')
            this.$store.dispatch('setError', 'Ошибка вышла')
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
            let apiPageLimit = Math.floor(this.$store.getters.totalCount / this.$store.getters.showPerPage)
            if (apiPageLimit < this.pageLimit) {
                return apiPageLimit
            }
            return this.pageLimit
        },
        showPerPage () {
            return this.$store.getters.showPerPage
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
}
</script>

<style scoped>
</style>>