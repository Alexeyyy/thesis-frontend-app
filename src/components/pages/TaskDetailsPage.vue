<template>
    <v-container fluid>
        <v-layout raw wrap>
            <v-flex xs12>
                <v-card class="ma-2">
                    <v-card-title>
                        #{{ task.id }} {{ task.name}}
                    </v-card-title>
                    <v-card-text>
                        <v-container fluid>
                            <v-row class="mb-6">
                                <v-col cols="2">
                                    <strong>Alpha</strong>                                  
                                </v-col>
                                <v-col cols="2">
                                    <strong>Глубина поиска</strong>                                  
                                </v-col>
                                <v-col cols="2">
                                    <strong>Время поиска, мин.</strong>
                                </v-col>
                                <v-col cols="2">
                                    <strong>Репозитории</strong>
                                </v-col>
                                <v-col cols="1">
                                    <strong>Команды</strong>
                                </v-col>
                                <v-col cols="3">
                                    <strong>ТОП технологий</strong>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="2">
                                    <v-layout raw>
                                        <v-avatar size="30px">
                                            <img :src="task.alpha.avatarUrl">
                                        </v-avatar>
                                        <span class="ml-2">
                                            @{{ task.alpha.login }}
                                        </span>
                                    </v-layout>
                                </v-col>
                                <v-col cols="2">
                                    {{ task.depth }}
                                </v-col>
                                <v-col cols="2">
                                    {{ task.time }}
                                </v-col>
                                <v-col cols="2">
                                   {{ task.repos }}
                                </v-col>
                                <v-col cols="1">
                                    {{ task.teams }}
                                </v-col>
                                <v-col cols="3">
                                    <v-chip-group
                                        column
                                    >
                                        <v-chip small v-for="tech in task.teamsTopTechs" :key="tech.name">{{ tech }}</v-chip>
                                    </v-chip-group>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout raw wrap>
            <v-flex xs12 sm12 md6>
                <v-card class="ma-2">
                    <v-card-title>
                        Распределение технологий по командам
                    </v-card-title>
                    <v-card-text>
                         <bar-chart :height="chartHeight" :chart-data="barChartData" :chart-options="chartOptions"></bar-chart>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md6>
                <v-card class="ma-2">
                    <v-card-title>
                        Распределение числа разработчиков по командам
                    </v-card-title>
                    <v-card-text>
                        <bar-chart :height="chartHeight" :chart-data="barChartData" :chart-options="chartOptions"></bar-chart>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout raw>
            <v-flex xs12 sm12 md12>
                <v-card class="ma-2">
                    <v-card-title>
                        Рейтинг команд
                    </v-card-title>
                    <v-card-text>
                        <template>
                            <v-container fluid>
                                <v-row class="mb-3">
                                    <v-col cols="1">
                                    </v-col>
                                    <v-col cols="3">
                                        <strong>Команда</strong>                                  
                                    </v-col>
                                    <v-col cols="3">
                                        <strong>Технологии</strong>
                                    </v-col>
                                    <v-col cols="3">
                                        <strong>Метрики</strong>
                                    </v-col>
                                    <v-col cols="2">
                                        <strong>Рейтинг</strong>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-divider></v-divider>
                                    </v-col>
                                </v-row>
                                <v-row v-for="(team, index) in teams" :key="team.sort" class="mt-4">
                                    <v-col>
                                        <v-row>
                                            <v-col cols="1">
                                                {{ team.sort }}
                                            </v-col>
                                            <v-col cols="3">
                                                <v-tooltip 
                                                    top
                                                    v-for="member in team.members" 
                                                    :key="member.login"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-avatar
                                                            class="mr-1 mb-1"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        >
                                                            <img :src="member.avatarUrl">
                                                        </v-avatar>
                                                    </template>
                                                    <span>{{ member.name }}</span>
                                                </v-tooltip>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-chip-group
                                                    column
                                                >
                                                    <v-chip v-for="tech in team.techList" :key="tech">{{ tech }}</v-chip>
                                                </v-chip-group>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-layout v-for="metric in team.metrics" :key="metric.name" raw>
                                                    <span class="mr-2">
                                                        {{ metric.name }}
                                                    </span>
                                                    <v-rating
                                                        v-model="metric.value"
                                                        color="primary"
                                                        dense
                                                        readonly
                                                        half-increments
                                                        size="10"
                                                        class="mr-1"
                                                    >
                                                    </v-rating>
                                                    <span>
                                                        ({{ metric.value }})
                                                    </span>
                                                </v-layout>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-layout raw>
                                                    <span class="mr-2">
                                                        Общий рейтинг
                                                    </span>
                                                    <v-rating
                                                        v-model="team.overallRating"
                                                        color="primary"
                                                        dense
                                                        readonly
                                                        half-increments
                                                        size="10"
                                                        class="mr-1" 
                                                    >
                                                    </v-rating>
                                                    <span>
                                                        ({{ team.overallRating }})
                                                    </span>
                                                </v-layout>
                                            </v-col>
                                        </v-row>
                                        <v-row v-if="index < teams.length - 1">
                                            <v-col>
                                                <v-divider></v-divider>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row class="mt-4">
                                    <v-col>
                                        <v-pagination
                                            :length="4"
                                            circle
                                        ></v-pagination>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </template>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import BarChart from './components/BarChart'

    export default {
        components: { BarChart },
        data () {
            return {
                task: {
                    id: 1,
                    name: 'Поиск джавистов',
                    alpha: {
                        name: 'Yegor Bugaenko',
                        avatarUrl: 'https://avatars3.githubusercontent.com/u/526301?v=4',
                        login: 'yegor256',
                        mainSkills: ['Java', 'HTML', 'JavaScript']
                    },
                    depth: 3,
                    time: 180,
                    repos: 45849,
                    profiles: 465448,
                    teams: 4597,
                    teamsTopTechs: ['Java', '.NET', 'JavaScript']
                },
                teams: [
                    {
                        sort: 1,
                        members: [
                            {
                                id: 526301,
                                name: 'Yegor Bugaenko',
                                login: 'yegor256',
                                avatarUrl: 'https://avatars3.githubusercontent.com/u/526301?v=4'
                            },
                            {
                                id: 3105537,
                                avatarUrl: 'https://avatars1.githubusercontent.com/u/3105537?v=4',
                                login: 'Alexeyyy',
                                name: 'Alex Zhelepov'
                            },
                            {
                                login: 'mojombo',
                                avatarUrl: 'https://avatars0.githubusercontent.com/u/1?v=4',
                                id: 1,
                                name: 'Tom Preston-Werner'
                            },
                            {
                                id: 3105477,
                                login: 'vladdy-moses',
                                name: 'Vladislav Moiseev',
                                avatarUrl: 'https://avatars3.githubusercontent.com/u/3105477?v=4'
                            },
                            {
                                id: 747988,
                                login: 'vgv',
                                avatarUrl: 'https://avatars0.githubusercontent.com/u/747988?v=4',
                                name: 'Vasily Vasilkov'
                            }
                        ],
                        overallRating: 5.0,
                        repos: [
                            {
                                id: 1,
                            },
                            {
                                id: 2
                            },
                            {
                                id: 3
                            }
                        ],
                        techList: [
                            'Java', '.NET', 'JavaScript', 'Kafka', 'Vue.js'
                        ],
                        metrics: [
                            {
                                name: 'Зрелость команды',
                                value: 4.8
                            },
                            {
                                name: 'Soft skills',
                                value: 4.5
                            },
                            {
                                name: 'Признание проектов',
                                value: 4.0
                            }
                        ]
                    },
                    {
                        sort: 2,
                        members: [
                            {
                                id: 526301,
                                name: 'Yegor Bugaenko',
                                login: 'yegor256',
                                avatarUrl: 'https://avatars3.githubusercontent.com/u/526301?v=4'
                            },
                            {
                                id: 3105537,
                                avatarUrl: 'https://avatars1.githubusercontent.com/u/3105537?v=4',
                                login: 'Alexeyyy',
                                name: 'Alex Zhelepov'
                            },
                            {
                                login: 'mojombo',
                                avatarUrl: 'https://avatars0.githubusercontent.com/u/1?v=4',
                                id: 1,
                                name: 'Tom Preston-Werner'
                            },
                            {
                                id: 3105477,
                                login: 'vladdy-moses',
                                name: 'Vladislav Moiseev',
                                avatarUrl: 'https://avatars3.githubusercontent.com/u/3105477?v=4'
                            },
                            {
                                id: 747988,
                                login: 'vgv',
                                avatarUrl: 'https://avatars0.githubusercontent.com/u/747988?v=4',
                                name: 'Vasily Vasilkov'
                            },
                            {
                                id: 3105477,
                                login: 'vladdy-moses',
                                name: 'Vladislav Moiseev',
                                avatarUrl: 'https://avatars3.githubusercontent.com/u/3105477?v=4'
                            },
                            {
                                id: 747988,
                                login: 'vgv',
                                avatarUrl: 'https://avatars0.githubusercontent.com/u/747988?v=4',
                                name: 'Vasily Vasilkov'
                            },
                            {
                                id: 3105477,
                                login: 'vladdy-moses',
                                name: 'Vladislav Moiseev',
                                avatarUrl: 'https://avatars3.githubusercontent.com/u/3105477?v=4'
                            },
                            {
                                id: 747988,
                                login: 'vgv',
                                avatarUrl: 'https://avatars0.githubusercontent.com/u/747988?v=4',
                                name: 'Vasily Vasilkov'
                            }
                        ],
                        overallRating: 5.0,
                        repos: [
                            {
                                id: 1,
                            },
                            {
                                id: 2
                            },
                            {
                                id: 3
                            }
                        ],
                        techList: [
                            'Java', '.NET', 'Vue.js'
                        ],
                        metrics: [
                            {
                                name: 'Зрелость команды',
                                value: 4.8
                            },
                            {
                                name: 'Soft skills',
                                value: 4.5
                            },
                            {
                                name: 'Признание проектов',
                                value: 4.0
                            }
                        ]
                    },
                ],
                barChartData: {
                    labels: ['3', '4', '5', '6', '7', '8', '9', '10'],
                    datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: '#1E88E5',
                            data: [
                                this.getRandomInt(), 
                                this.getRandomInt(),
                                this.getRandomInt(),
                                this.getRandomInt(),
                                this.getRandomInt(),
                                this.getRandomInt(),
                                this.getRandomInt(),
                                this.getRandomInt()
                            ]
                        }
                    ]
                },
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false
                },
                chartHeight: 250
            }
        },
        methods: {
            getRandomInt () {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            }
        }
    }
</script>

<style scoped>
    .chart-card {
        max-height: 300px;
    }
</style>>