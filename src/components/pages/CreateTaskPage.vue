<template>
    <v-container fluid>
        <v-card class="mb-3 pa-5">
            <v-card-title>
                <h2 class="mb-5">
                    Создание поиска
                </h2>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid" ref="form" validation>
                    <v-btn
                        v-if="!selectedAlpha"
                        class="mb-5"
                        color="info"
                        @click="showDialog = true"
                    >Добавить Alpha</v-btn>
                    <v-card
                        v-else
                        class="mb-10"
                        elevation="2"
                        max-width="374"
                    >
                        <div class="d-flex flex-no-wrap">
                            <v-avatar
                                class="ma-3"
                                size="125"
                                tile
                            >
                                <v-img :src="selectedAlpha.avatar_url"></v-img>
                            </v-avatar>
                            <div>
                                <v-card-title
                                    class="headline"
                                    v-text="selectedAlpha.name"
                                ></v-card-title>

                                <v-card-subtitle v-text="`@${selectedAlpha.login}`"></v-card-subtitle>

                                <v-card-text v-text="`Java, C#, Vue`">
                                </v-card-text>

                                <v-btn 
                                    color="primary"
                                    fab
                                    small
                                    absolute
                                    top
                                    right
                                    @click="showDialog = true"
                                >
                                    <v-icon color="white">mdi-close</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-card>

                    <v-dialog
                        v-model="showDialog"
                        transition="dialog-top-transition"
                        max-width="800"
                    >
                        <template>
                            <v-card>
                                <v-toolbar
                                    color="primary"
                                    dark
                                >Выбор Alpha</v-toolbar>
                                
                                <v-card-text>
                                    <div>
                                        <v-text-field
                                            full-width
                                            label="Поиск alpha"
                                            prepend-inner-icon="mdi-account-search"
                                            v-model="flt"
                                        >
                                        </v-text-field>
                                    </div>
                                    <div class="pa-3" v-if="alphaList.length > 0">
                                        <v-list class="popup-inner-list overflow-y-auto" two-line>
                                            <v-list-item-group
                                                v-model="defaultSelectedIndex"
                                                active-class="primary--text"
                                            >
                                                <template v-for="(item, index) in alphaList">
                                                    <v-list-item :key="item.title">
                                                        <template>
                                                            <v-list-item-avatar>
                                                                <v-img :src="item.avatar_url"></v-img>
                                                            </v-list-item-avatar>
                                                            <v-list-item-content>
                                                                <v-list-item-title v-text="item.name"></v-list-item-title>

                                                                <v-list-item-subtitle
                                                                    class="text--primary"
                                                                    v-text="`@${item.login}`"
                                                                ></v-list-item-subtitle>

                                                                <v-list-item-subtitle class="mt-1" v-text="`ТОП-технологий: Java, C#, Vue`"></v-list-item-subtitle>
                                                            </v-list-item-content>

                                                            <v-list-item-action>
                                                                <v-list-item-action-text>
                                                                    <v-icon
                                                                        color="grey lighten-1"
                                                                    >
                                                                        mdi-account-multiple
                                                                    </v-icon>
                                                                    <span>{{ item.followers }}</span>
                                                                </v-list-item-action-text>
                                                                <v-list-item-action-text>
                                                                    <v-icon color="grey lighten-1">
                                                                        mdi-folder
                                                                    </v-icon>
                                                                    <span>{{ item.public_repos }}</span>
                                                                </v-list-item-action-text>
                                                            </v-list-item-action>
                                                        </template>
                                                    </v-list-item>

                                                    <v-divider
                                                        v-if="index < alphaList.length - 1"
                                                        :key="index"
                                                    ></v-divider>
                                                </template>
                                            </v-list-item-group>
                                        </v-list>
                                    </div>
                                    <div class="pa-3" v-else>
                                        <h2 class="text-center mt-12 text--disabled">
                                            Нет данных для отображения
                                        </h2>
                                    </div>
                                </v-card-text>
                                
                                <v-card-actions class="justify-end">
                                    <v-btn
                                        outlined
                                        color="primary"
                                        :disabled="!(defaultSelectedIndex >= 0) || !alphaList.length > 0"
                                        @click="onDialogClosed()"
                                    >Выбрать</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                    
                    <v-slider
                        class="mb-5"
                        v-model="depth.val"
                        :label="depth.label"
                        :step="depth.step"
                        :max="depth.max"
                        :tick-size="depth.step"
                        :thumb-color="depth.color"
                        thumb-label="always"
                    ></v-slider>

                    <v-slider
                        class="mb-5"
                        v-model="duration.val"
                        :label="duration.label"
                        :step="duration.step"
                        :max="duration.max"
                        :tick-size="duration.step"
                        :thumb-color="duration.color"
                        thumb-label="always"
                    ></v-slider>

                    <v-btn
                        :loading="loading"
                        :disabled="!valid || selectedAlpha === null"
                        class="success"
                        @click="createTask()"
                    >
                        Сохранить
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>  
</template>

<script>
export default {
    data () {
        return {
            alpha: null,
            valid: false,
            depth: {
                label: 'Глубина поиска',
                max: 5,
                val: 1,
                color: 'primary',
                step: 1
            },
            duration: {
                label: 'Продолжительность поиска, мин.',
                max: 180,
                val: 60,
                color: 'primary',
                step: 1
            },
            defaultSelectedIndex: 0,
            selectedAlpha: null,
            showDialog: false,
            flt: ''
        }
    },
    methods: {
        createTask () {
            const task = {
                alphaId: this.selectedAlpha.id,
                depth: this.depth.val,
                duration: this.duration.val
            }
            this.$store.dispatch('createTask', task)
        },
        onDialogClosed () {
            if (this.defaultSelectedIndex >= 0) {
                this.showDialog = false
                this.selectedAlpha = this.alphaList[this.defaultSelectedIndex]
                this.defaultSelectedIndex = 0
                this.flt = ''
            }
        }
    },
    computed: {
        loading () {
            return this.$store.getters.loading
        },
        alphaList () {
            let list = this.$store.getters.savedAlphaList
            if (!this.flt) {
                return list
            }
            return list.filter( alpha => 
                alpha.login.toLowerCase().includes(this.flt) || 
                alpha.name.toLowerCase().includes(this.flt)
            )
        }
    }
}
</script>

<style scoped>
    .popup-inner-list {
        max-height: 400px;
    }
</style>>