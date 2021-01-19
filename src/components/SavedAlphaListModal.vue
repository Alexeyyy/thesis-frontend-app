<template>
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
                    <div class="pa-3" v-if="alphaList.length > 0">
                        <div>
                            <v-text-field
                                full-width
                                label="Поиск alpha"
                                prepend-inner-icon="mdi-account-search"
                                v-model="flt"
                            >
                            </v-text-field>
                        </div>
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

                                                <v-list-item-subtitle class="mt-1">
                                                    <skills-list :techs="item.techs" :showString="true"></skills-list>
                                                </v-list-item-subtitle>
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
                    <div class="pa-3 text-center" v-else>
                        <h2 class="mt-12 text--disabled">
                            Нет данных для отображения
                        </h2>
                        <div>
                            <v-btn outlined color="success" class="mt-4" :to="'/alpha'">
                                Добавить alpha
                            </v-btn>
                        </div>
                    </div>
                </v-card-text>
                
                <v-card-actions class="justify-end">
                    <v-btn
                        outlined
                        color="primary"
                        :disabled="!(defaultSelectedIndex >= 0) || !alphaList.length > 0"
                        v-on:click="onDialogClosed()"
                    >Выбрать</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
export default {
    props: ['showDialog'],
    data () {
        return {
            defaultSelectedIndex: 0,
            flt: ''
        }
    },
    methods: {
        onDialogClosed () {
            if (this.defaultSelectedIndex >= 0) {
                this.$emit('onAlphaChosen', this.alphaList[this.defaultSelectedIndex])
                this.defaultSelectedIndex = 0
                this.flt = ''
            }
        }
    },
    computed: {
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
</style>