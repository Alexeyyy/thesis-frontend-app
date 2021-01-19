<template>
    <v-layout raw wrap>
        <v-flex 
            xs12 sm4 md3
            v-for="index in loadingCardsCount"
            :key="index"
            class="pa-2"
        >
            <v-card>
                <v-skeleton-loader
                    type="image, article"
                ></v-skeleton-loader>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: ['loadingCardsCount'],
}
</script>