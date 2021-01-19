<template>
    <v-chip-group
        column
        v-if="techs.length > 0"
    >
        <v-chip v-for="tech in techs" :key="tech">{{ tech }}</v-chip>
    </v-chip-group>
    <span v-else>
        Нет данных
    </span>
</template>

<script>
export default {
    props: ['techs']
}
</script>