<template>
    <v-card
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

                <v-card-subtitle>
                    <a :href="selectedAlpha.html_url" target="_blank">@{{selectedAlpha.login}}</a>
                </v-card-subtitle>

                <v-card-text v-text="`Java, C#, Vue`">
                </v-card-text>

                <v-btn 
                    color="primary"
                    fab
                    small
                    absolute
                    top
                    right
                    v-on:click="(event) => this.$emit('openDialog', event)"
                >
                    <v-icon color="white">mdi-close</v-icon>
                </v-btn>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    props: ['selectedAlpha']
}
</script>

<style scoped>

</style>