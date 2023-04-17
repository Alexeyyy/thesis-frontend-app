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
                                            <img :src="task.alpha.avatar_url">
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
                         <bar-chart :height="chartHeight" :chart-data="techBarChartData" :chart-options="chartOptions"></bar-chart>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md6>
                <v-card class="ma-2">
                    <v-card-title>
                        Распределение числа разработчиков по командам
                    </v-card-title>
                    <v-card-text>
                        <bar-chart :height="chartHeight" :chart-data="membersDistributionBarChartData" :chart-options="chartOptions"></bar-chart>
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
                                                            <img :src="member.avatar_url">
                                                        </v-avatar>
                                                    </template>
                                                    <span>{{ member.name }}</span>
                                                </v-tooltip>
                                            </v-col>
                                            <v-col cols="3">
                                                <skills-list :techs="team.techList" :showString="false"></skills-list>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-layout v-for="metric in team.metrics" :key="metric.name" raw>
                                                    <span class="mr-2">
                                                        {{ metric.name }}
                                                    </span>
                                                    <v-rating
                                                        v-model="metric.valueRating"
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
                                                    <v-rating
                                                        v-model="team.overallRating.valueRating"
                                                        color="primary"
                                                        dense
                                                        readonly
                                                        half-increments
                                                        size="10"
                                                        class="mr-1" 
                                                    >
                                                    </v-rating>
                                                    <span>
                                                        ({{ team.overallRating.value }})
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
                            </v-container>
                        </template>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import BarChart from '@/components/charts/BarChart'
import { generateTeams, generateArray, generateAscendingArray } from '@/helpers/generator'

export default {
    components: { BarChart },
    data () {
        return {
            task: {
                id: 1,
                name: 'Поиск джавистов',
                alpha: {
                    name: 'Yegor Bugaenko',
                    avatar_url: 'https://avatars3.githubusercontent.com/u/526301?v=4',
                    login: 'yegor256',
                    mainSkills: ['Java', 'Ruby']
                },
                depth: 3,
                time: 1000,
                repos: 22195,
                profiles: 177381,
                teams: 3460,
                teamsTopTechs: ['Java', 'Kotlin', 'Ruby']
            },

            teams: [
                /* Вторая команда */
                {
                    sort: 1,
                    members: [
                        {
                            id: 3,
                            name: 'Pavel Drankov',
                            login: 'Sammers21',
                            avatar_url: 'https://avatars.githubusercontent.com/u/16746106?v=4'
                        },
                        {
                            id: 4,
                            avatar_url: 'https://avatars.githubusercontent.com/u/298504?v=4',
                            login: 'olegmoz',
                            name: 'Oleg Mozzhechkov'
                        },
                    ],
                    overallRating: {
                        value: 62.58,
                        valueRating: 3.3
                    },
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
                        'Java'
                    ],
                    metrics: [
                        {
                            name: 'λ',
                            value: 50.00,
                            valueRating: 2.5,
                        },
                        {
                            name: 'β',
                            value: 50.00,
                            valueRating: 2.5,
                        },
                        {
                            name: 'γ',
                            value: 57.806,
                            valueRating: 2.6,
                        },
                    ]
                },
                /* Вторая команда */
                {
                    sort: 2,
                    members: [
                        {
                            id: 1,
                            name: 'Ron',
                            login: 'webron',
                            avatar_url: 'https://avatars.githubusercontent.com/u/241629?v=4'
                        },
                        {
                            id: 2,
                            avatar_url: 'https://avatars.githubusercontent.com/u/249413?v=4',
                            login: 'fehguy',
                            name: 'Tony Tam'
                        },
                    ],
                    overallRating: {
                        value: 61.78,
                        valueRating: 3.3
                    },
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
                        'Java', 'Javascript'
                    ],
                    metrics: [
                        {
                            name: 'λ',
                            value: 39.78,
                            valueRating: 1.9,
                        },
                        {
                            name: 'β',
                            value: 39.78,
                            valueRating: 1.9,
                        },
                        {
                            name: 'γ',
                            value: 88.07,
                            valueRating: 4.2,
                        },
                    ]
                },

                {
                    sort: 3,
                    members: [
                        {
                            id: 1,
                            name: 'Nick Sieger',
                            login: 'nicksieger',
                            avatar_url: 'https://avatars.githubusercontent.com/u/154?v=4'
                        },
                        {
                            id: 2,
                            avatar_url: 'https://avatars.githubusercontent.com/u/45967?v=4',
                            login: 'kares',
                            name: 'Karol Bucek'
                        },
                    ],
                    overallRating: {
                        value: 61.37,
                        valueRating: 3.2
                    },
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
                        'Java', 'Ruby'
                    ],
                    metrics: [
                        {
                            name: 'λ',
                            value: 34.67,
                            valueRating: 1.85,
                        },
                        {
                            name: 'β',
                            value: 34.67,
                            valueRating: 1.85,
                        },
                        {
                            name: 'γ',
                            value: 84.86,
                            valueRating: 4.1,
                        },
                    ]
                },
                {
                    sort: 4,
                    members: [
                        {
                            id: 3,
                            name: 'Paul Dubs',
                            login: 'treo',
                            avatar_url: 'https://avatars.githubusercontent.com/u/509379?v=4'
                        },
                        {
                            id: 2360237,
                            login: 'AlexDBlack',
                            name: 'Alex Black',
                            avatar_url: 'https://avatars.githubusercontent.com/u/2360237?v=4'
                        },
                        {
                            login: 'eraly',
                            avatar_url: 'https://avatars.githubusercontent.com/u/8340500?v=4',
                            id: 8340500,
                            name: 'Susan Eraly'
                        },
                        {
                            id: 12250879,
                            name: 'raver119',
                            login: 'raver119',
                            avatar_url: 'https://avatars.githubusercontent.com/u/12250879?v=4'
                        },
                        {
                            id: 3328023,
                            avatar_url: 'https://avatars.githubusercontent.com/u/3328023?v=4',
                            login: 'saudet',
                            name: 'Samuel Audet'
                        }
                    ],
                    overallRating: {
                        value: 62.58,
                        valueRating: 3.3
                    },
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
                        'C', 'C++', 'Java'
                    ],
                    metrics: [
                        {
                            name: 'λ',
                            value: 51.71,
                            valueRating: 2.6,
                        },
                        {
                            name: 'β',
                            value: 51.71,
                            valueRating: 2.6,
                        },
                        {
                            name: 'γ',
                            value: 57.806,
                            valueRating: 2.6,
                        },
                    ]
                },
                {
                    sort: 5,
                    members: [
                        {
                            id: 3,
                            name: 'Dan Allen',
                            login: 'mojavelinux',
                            avatar_url: 'https://avatars.githubusercontent.com/u/79351?v=4'
                        },
                        {
                            id: 4,
                            avatar_url: 'https://avatars.githubusercontent.com/u/132158?v=4',
                            login: 'aslakknutsen',
                            name: 'Aslak Knutsen'
                        },
                    ],
                    overallRating: {
                        value: 50.01,
                        valueRating: 2.5
                    },
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
                        'Java'
                    ],
                    metrics: [
                        {
                            name: 'λ',
                            value: 21.58,
                            valueRating: 1.7,
                        },
                        {
                            name: 'β',
                            value: 21.58,
                            valueRating: 1.7,
                        },
                        {
                            name: 'γ',
                            value: 85.45,
                            valueRating: 4.2,
                        },
                    ]
                },
                {
                    sort: 6,
                    members: [
                        {
                            id: 11,
                            name: 'Libor Vala',
                            login: 'valib',
                            avatar_url: 'https://avatars.githubusercontent.com/u/1472678?v=4'
                        },
                        {
                            id: 22,
                            avatar_url: 'https://avatars.githubusercontent.com/u/31533?v=4',
                            login: 'chocolateboy',
                            name: 'chocolateboy'
                        },
                        {
                            login: 'Zsombor',
                            avatar_url: 'https://avatars.githubusercontent.com/u/66230?v=4',
                            id: 33,
                            name: 'zsombor'
                        },
                        {
                            id: 44,
                            login: 'Happy-Neko',
                            name: 'I. Sokolov',
                            avatar_url: 'https://avatars.githubusercontent.com/u/11806?v=4'
                        },
                        {
                            id: 55,
                            login: 'Raptor399',
                            avatar_url: 'https://avatars.githubusercontent.com/u/879970?v=4',
                            name: 'Patrick Atoon'
                        },
                        {
                            id: 66,
                            login: 'robinmulder',
                            avatar_url: 'https://avatars.githubusercontent.com/u/120075?v=4',
                            name: 'Robin Mulder'
                        },
                        {
                            id: 77,
                            login: 'shagr4th',
                            avatar_url: 'https://avatars.githubusercontent.com/u/405318?v=4',
                            name: 'Arnaud Brochard'
                        },
                        {
                            id: 88,
                            login: 'tcox2',
                            avatar_url: 'https://avatars.githubusercontent.com/u/231512?v=4',
                            name: 'Tim Cox'
                        },

                    ],
                    overallRating: {
                        value: 50.0,
                        valueRating: 2.5
                    },
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
                        'Java'
                    ],
                    metrics: [
                        {
                            name: 'λ',
                            value: 35.39,
                            valueRating: 1.8,
                        },
                        {
                            name: 'β',
                            value: 35.39,
                            valueRating: 1.8,
                        },
                        {
                            name: 'γ',
                            value: 83.00,
                            valueRating: 4.05,
                        },
                    ]
                },
                {
                    sort: 7,
                    members: [
                        {
                            id: 3,
                            name: 'Sam Van Oort',
                            login: 'svanoort',
                            avatar_url: 'https://avatars.githubusercontent.com/u/5400948?v=4'
                        },
                        {
                            id: 2360237,
                            login: 'Jesse Glick',
                            name: 'jglick',
                            avatar_url: 'https://avatars.githubusercontent.com/u/154109?v=4'
                        },
                    ],
                    overallRating: {
                        value: 50.00,
                        valueRating: 2.5
                    },
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
                        'Java', 'Shell', 'Javascript'
                    ],
                    metrics: [
                        {
                            name: 'λ',
                            value: 20.59,
                            valueRating: 2.0,
                        },
                        {
                            name: 'β',
                            value: 20.59,
                            valueRating: 2.0,
                        },
                        {
                            name: 'γ',
                            value: 84.71,
                            valueRating: 2.6,
                        },
                    ]
                },
            ],
            techBarChartData: {
                labels: ['PHP', 'Java', 'JavaScript', 'Ruby', 'C', 'Emacs Lisp', 'Elixir', 'Scala', 'Go'],
                datasets: [
                    {
                        label: 'Количество команд, для которых указанная технология в приоритете',
                        backgroundColor: '#1E88E5',
                        data: [700, 525, 489, 232, 208, 206, 198, 194, 190]
                    }
                ]
            },
            membersDistributionBarChartData: {
                labels: [2,3,4,5,6,7,8,9,12,13,10,11],
                datasets: [
                    {
                        label: 'Количество команд, для которых указанная технология в приоритете',
                        backgroundColor: '#03AC13',
                        data: [1727, 484, 242, 156, 120, 74, 72, 56, 38, 35, 35, 32]
                    }
                ]
            },
            barChartData: {
                labels: generateAscendingArray(60, 5, 4),
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#1E88E5',
                        data: generateArray(60, 1000, 3000).reverse()
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
    },
    /*computed : {
        teams () {
            return this.$store.getters.demoTeams
        }
    }*/
}
</script>

<style scoped>
    .chart-card {
        max-height: 300px;
    }
</style>>