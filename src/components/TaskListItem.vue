<template>
    <v-card
        elevation="0"
        class="pa-2 mt-7"
    >
        <div class="d-flex flex-no-wrap justify-space-between">
            <div class="d-flex flex-no-wrap">
                <div>
                    <v-card-title>
                        #{{ task.id }} {{ task.name }}
                    </v-card-title>
                    <v-card-subtitle>
                        <strong>alpha</strong>: <a :href="task.alpha.html_url" target="_blank">@{{task.alpha.login}}</a>
                    </v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="2">
                                <v-avatar size="70">
                                    <img :src="task.alpha.avatar_url">
                                </v-avatar>
                            </v-col>
                            <v-col cols="10">
                                <v-simple-table>
                                    <thead>
                                        <tr>
                                            <th>Длительность (мин.)</th>
                                            <th>Глубина</th>
                                            <th>Репозитории</th>
                                            <th>Профили</th>
                                            <th>Команды</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ task.duration }}</td>
                                            <td>{{ task.depth }}</td>
                                            <td class="text-center" v-if="processing">
                                                <v-progress-circular    
                                                    size="20"
                                                    width="2"
                                                    indeterminate
                                                    color="primary"
                                                ></v-progress-circular>
                                            </td>
                                            <td v-else>{{ task.details.repos }}</td>
                                            <td class="text-center" v-if="processing">
                                                <v-progress-circular    
                                                    size="20"
                                                    width="2"
                                                    indeterminate
                                                    color="primary"
                                                ></v-progress-circular>
                                            </td>
                                            <td v-else>{{ task.details.profiles }}</td>
                                            <td class="text-center" v-if="processing">
                                                <v-progress-circular    
                                                    size="20"
                                                    width="2"
                                                    indeterminate
                                                    color="primary"
                                                ></v-progress-circular>
                                            </td>
                                            <td v-else>{{ task.details.teams }}</td>
                                        </tr>
                                    </tbody>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </div>
            <div>
                <v-card-actions>
                    <v-btn :disabled="processing" class="bottom-pos" color="primary" fab x-small plain :to="`/task/${task.id}`">
                        <v-icon>mdi-chart-bar</v-icon>
                    </v-btn>
                </v-card-actions>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    props: ['task', 'processing']
}
</script>

<style scoped>

</style>