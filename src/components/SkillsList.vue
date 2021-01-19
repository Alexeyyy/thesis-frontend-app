<template>
    <div v-if="!techs || techs.length === 0">
        <span>
            Нет данных
        </span>
    </div>
    <div v-else-if="showString">
        <span>{{ techString }}</span>
    </div>
    <div v-else>
        <v-chip-group
            column
            v-if="techs.length > 0"
        >
            <v-chip v-for="tech in techs" :key="tech">{{ tech }}</v-chip>
        </v-chip-group>
    </div>
</template>

<script>
export default {
    props: ['techs', 'showString'],
    computed: {
        techString () {
            return this.techs.join(', ')
        }
    }
}
</script>