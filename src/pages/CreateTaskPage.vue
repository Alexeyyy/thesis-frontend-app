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
                    <chosen-alpha-card
                        v-else
                        class="mb-5"
                        v-on:openDialog="showDialog = true" 
                        :showDialog="showDialog"
                        :selectedAlpha="selectedAlpha"
                    >
                    </chosen-alpha-card>

                    <saved-alpha-list-modal 
                        :showDialog="showDialog" 
                        v-on:onAlphaChosen="onAlphaChosen">
                    </saved-alpha-list-modal>
                    
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
import chosenAlphaCard from '@/components/ChosenAlphaCard'
import savedAlphaListModal from '@/components/SavedAlphaListModal'

export default {
    data () {
        return {
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
            selectedAlpha: null,
            showDialog: false
        }
    },
    components: {
        chosenAlphaCard, savedAlphaListModal
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
        onAlphaChosen (alpha) {
            this.showDialog = false
            this.selectedAlpha = alpha
        }
    },
    computed: {
        loading () {
            return this.$store.getters.loading
        }
    }
}
</script>

<style scoped>
</style>>