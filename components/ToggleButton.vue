<template>
    <BaseButton class="toggle-button" :text="cardsVisible ? 'NEW ROUND' : 'REVEAL CARDS'"
        :secondary="cardsVisible || somePlayersVoted" :disabled="noPlayersVoted" />
</template>

<script setup lang="ts">
const { cardsVisible, somePlayersVoted, noPlayersVoted } = defineProps<{
    cardsVisible: boolean,
    somePlayersVoted: boolean
    noPlayersVoted: boolean
}>()
</script>

<style scoped>
.toggle-button {
    align-self: center;
    max-width: 300px;
    margin: 10px 0;
}
</style>
