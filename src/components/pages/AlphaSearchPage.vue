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
                            @click="startSearch()"
                        >
                            Начать поиск
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>
        </v-card>

        <!-- Прелоадер -->
        <div v-if="loading">
            <v-layout raw wrap>
                <v-flex 
                    xs12 sm4 md3
                    v-for="index in loadingCardsCount"
                    :key="index"
                    class="pa-2"
                >
                    <v-card>
                        <v-skeleton-loader
                            v-bind="attrs"
                            type="image, article"
                        ></v-skeleton-loader>
                    </v-card>
                </v-flex>
            </v-layout>
        </div>
        <div v-else-if="!loading && alphaList.length > 0">
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
                        
                        <v-card-title>
                            {{ item.name }} 
                        </v-card-title>

                        <v-card-subtitle v-text="`@${item.login}`"></v-card-subtitle>

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
                                    <v-tooltip top color="black">
                                        <template v-slot:activator="{ on, attrs }">
                                            <div
                                                v-on="on"
                                                v-bind="attrs"
                                            >
                                                <v-icon class="mr-1">
                                                    mdi-email
                                                </v-icon>
                                                <span class="subheading mr-2" v-if="item.email">{{ item.email}}</span>
                                                <span class="subheading mr-2" v-else>?</span>
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
                                                <span class="subheading mr-2" v-else>?</span>
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
                            >
                                <v-chip>Java</v-chip>
                                <v-chip>C#</v-chip>
                                <v-chip>JavaScript</v-chip>
                                <v-chip>Elm</v-chip>
                                <v-chip>Erlang</v-chip>
                                <v-chip>Python</v-chip>
                                <v-chip>HTML</v-chip>
                            </v-chip-group>
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
        </div>
        <div v-else>
            <h2 class="text-center mt-15 text--disabled">
                Нет данных для отображения
            </h2>
        </div>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            loadingCardsCount: 6,
            demoChipsCount: 7,
        }
    },
    methods: {
        startSearch () {
            const alphaRequest = {}
            this.$store.dispatch('searchAlphaUsers', alphaRequest)
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
        }
    }
}
</script>

<style scoped>
</style>>