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
                <div v-if="finishedTasks.length > 0">
                    <v-container class="max-width">
                        <v-row
                             v-for="(task, index) in finishedTasks" 
                            :key="task.id"
                        >
                            <v-col>
                                <v-row>
                                    <v-col>
                                        <task-list-item :task="task" :processing="false"></task-list-item>
                                    </v-col>
                                </v-row>
                                <v-row v-if="index < finishedTasks.length - 1">
                                    <v-divider></v-divider>
                                </v-row>
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
                <div v-if="processingTasks.length > 0">
                    <v-container class="max-width">
                        <v-row
                             v-for="(task, index) in processingTasks" 
                            :key="task.id"
                        >
                            <v-col>
                                <v-row>
                                    <v-col>
                                        <task-list-item :task="task" :processing="true"></task-list-item>
                                    </v-col>
                                </v-row>
                                <v-row v-if="index < processingTasks.length - 1">
                                    <v-divider></v-divider>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
                <div v-else class="pa-6 text-center">
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
import taskListItem from '@/components/TaskListItem'

export default {
    data () {
        return {
            tab: null
        }
    },
    components: { taskListItem },
    computed: {
        tasks () {
            return this.$store.getters.tasks
        },
        finishedTasks () {
            return this.$store.getters.finishedTasks
        },
        processingTasks () {
            return this.$store.getters.processingTasks
        },
        erroredTasks () {
            return this.$store.getters.erroredTasks
        }
    }
}
</script>

<style scoped>
    .max-width {
        max-width: 800px;
    }
</style>