<template>
    <div class="voting-cards-wrapper">
        <div class="voting-cards">
            <voting-card v-for="card in cards" :key="card.value" :value="card.value" :color="card.color"
                :selected="card.value === props.selectedCard" @click="vote(card.value)"
                :disabled="props.isVotingDisabled" />
        </div>
    </div>
</template>

<script setup lang="ts">
type VotingCard = {
    value: string,
    selected: boolean,
    color: string
}

const props = defineProps<{
    isVotingDisabled: boolean
    selectedCard: string | null
}>()
const emit = defineEmits(['vote'])


const cards = ref<Array<VotingCard>>([
    { value: "1", selected: false, color: "#00005f" },
    { value: "2", selected: false, color: "#f47d20" },
    { value: "3", selected: false, color: "#e11b22" },
    { value: "5", selected: false, color: "#ffc20e" },
    { value: "8", selected: false, color: "#1ec5ee" },
    { value: "13", selected: false, color: "#00005f" }
])

const vote = (selectedCard: string) => {
    if (props.isVotingDisabled) return;
    emit('vote', selectedCard)
    if (selectedCard == cards.value.find(card => card.selected)?.value) {
        resetSelection()
        return;
    }
    cards.value.forEach(card => {
        card.selected = card.value === selectedCard
    })
}
const resetSelection = () => {
    cards.value.forEach(card => {
        card.selected = false
    })
}
defineExpose({
    resetSelection: resetSelection,
})
</script>

<style scoped>
.voting-cards-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}

.voting-cards {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 600px;
    transition: all 1.5s;

    @media (width >=480px) {
        gap: 10px;

    }

}
</style>