<template>
    <div class="voting-cards-wrapper">
        <div class="voting-cards">
            <voting-card v-for="card in cards" :key="card.value" :value="card.value" :selected="card.selected"
                @click="vote(card.value)" />
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['vote'])
const props = defineProps<{
    selectedCard: string | undefined | null
}>()
const vote = (value: string) => {
    emit('vote', value)
}

const cards = computed(() => [
    { value: "1", selected: props.selectedCard == "1" },
    { value: "2", selected: props.selectedCard == "2" },
    { value: "3", selected: props.selectedCard == "3" },
    { value: "5", selected: props.selectedCard == "5" },
    { value: "8", selected: props.selectedCard == "8" },
    { value: "13", selected: props.selectedCard == "13" }
])

</script>

<style scoped>
.voting-cards-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}

.voting-cards {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 600px;

}
</style>