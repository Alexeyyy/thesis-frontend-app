<template>
    <v-card class="mt-5" elevation="0">
        <v-tabs
            v-model="tab"
            centered
            icons-and-text
        >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">
                Готовые
                <v-icon>mdi-thumb-up</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
                В процессе
                <v-icon>mdi-recycle</v-icon>
            </v-tab>

            <v-tab href="#tab-3">
                C ошибкой
                <v-icon>mdi-thumb-down</v-icon>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item
                :value="'tab-1'"
            >
                <div v-if="tasks.length > 0">
                    <v-container class="max-width">
                        <v-row
                             v-for="(task, index) in tasks" 
                            :key="task.id"
                        >
                            <v-col>
                                <v-row>
                                    <v-col>
                                        <v-card
                                            elevation="0"
                                            class="pa-2 mt-7"
                                        >
                                            <div class="d-flex flex-no-wrap justify-space-between">
                                                <div class="d-flex flex-no-wrap">
                                                    <div class="mr-4 mt-4">
                                                        <v-progress-circular
                                                            :rotate="360"
                                                            :size="80"
                                                            :width="10"
                                                            :value="50"
                                                            color="primary"
                                                        >
                                                        {{ 50 }}
                                                        </v-progress-circular>
                                                    </div>
                                                    <div>
                                                        <v-card-title>
                                                            #{{ task.id }}
                                                        </v-card-title>
                                                        <v-card-subtitle>
                                                            alpha: @yegor256
                                                        </v-card-subtitle>
                                                        <v-card-text>
                                                            <p>
                                                                <strong>Длительность</strong>: {{ }}
                                                            </p>
                                                            <p>
                                                                <strong>Глубина</strong>:{{ }}
                                                            </p>
                                                            <p>
                                                                <strong>Резюме</strong>: {{ }}
                                                            </p>
                                                        </v-card-text>
                                                    </div>
                                                </div>
                                                <div>
                                                    <v-card-actions>
                                                        <v-btn class="bottom-pos" color="primary" fab x-small plain :to="`/task/${task.id}`">
                                                            <v-icon>mdi-chart-bar</v-icon>
                                                        </v-btn>
                                                        <v-btn class="bottom-pos" color="primary" fab x-small plain :to="`/task/${task.id}`">
                                                            <v-icon>mdi-account-multiple</v-icon>
                                                        </v-btn>
                                                    </v-card-actions>
                                                </div>
                                            </div>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row v-if="index < tasks.length - 1">
                                    <v-divider></v-divider>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row class="mt-3">
                            <v-col>
                                <v-pagination
                                    :length="4"
                                    circle
                                ></v-pagination>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
                <div class="pa-6 text-center" v-else>
                    <h2 class="mt-12 text--disabled">
                        Нет данных для отображения
                    </h2>
                    <v-btn class="success mt-4" :to="'/search'">
                        Создать поиск
                    </v-btn>
                </div>
            </v-tab-item>
            <v-tab-item
                :value="'tab-2'"
            >
                <div class="pa-6 text-center">
                    <h2 class="mt-12 text--disabled">
                        Нет данных для отображения
                    </h2>
                    <v-btn class="success mt-4" :to="'/search'">
                        Создать поиск
                    </v-btn>
                </div>
            </v-tab-item>
            <v-tab-item
                :value="'tab-3'"
            >
                <div class="pa-6 text-center">
                    <h2 class="mt-12 text--disabled">
                        Нет данных для отображения
                    </h2>
                </div>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
export default {
    data () {
        return {
            tab: null,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    },
    computed: {
        tasks () {
            return this.$store.getters.tasks
        }
    }
}
</script>

<style scoped>
    .max-width {
        max-width: 600px;
    }
</style>