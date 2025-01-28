<template>
    <BaseButton class="toggle-button" :text="cardsVisible ? 'NEW ROUND' : 'REVEAL CARDS'"
        :secondary="cardsVisible || somePlayersReady" />
</template>

<script setup lang="ts">
const { cardsVisible, somePlayersReady } = defineProps<{
    cardsVisible: boolean,
    somePlayersReady: boolean
}>()
</script>

<style scoped>
.toggle-button {
    align-self: center;
    max-width: 300px;
    margin: 10px 0;
}
</style>
