<template>
    <div class="voting-cards-wrapper">
        <div class="voting-cards">
            <voting-card v-for="card in cards" :key="card.value" :value="card.value" :selected="card.selected"
                @click="vote(card.value)" />
        </div>
    </div>
</template>

<script setup lang="ts">
type VotingCard = {
    value: string,
    selected: boolean
}
const emit = defineEmits(['vote'])

const cards = ref<Array<VotingCard>>([
    { value: "1", selected: false },
    { value: "2", selected: false },
    { value: "3", selected: false },
    { value: "5", selected: false },
    { value: "8", selected: false },
    { value: "13", selected: false }
])

const vote = (selectedCard: string) => {
    emit('vote', selectedCard)
    if (selectedCard == cards.value.find(card => card.selected)?.value) {
        cards.value.forEach(card => {
            card.selected = false
        })
        return;
    }
    cards.value.forEach(card => {
        card.selected = card.value === selectedCard
    })
}

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