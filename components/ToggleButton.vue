<template>
    <BaseButton ref="toggleButton" class="toggle-button" :text="cardsVisible ? 'NEW ROUND' : 'REVEAL CARDS'"
        :secondary="cardsVisible || somePlayersVoted" :disabled="noPlayersVoted && !cardsVisible" />
</template>

<script setup lang="ts">
import { animate, spring } from "motion"
const { cardsVisible, somePlayersVoted, noPlayersVoted } = defineProps<{
    cardsVisible: boolean,
    somePlayersVoted: boolean
    noPlayersVoted: boolean
}>()
const buttonRef = useTemplateRef('toggleButton')

watchEffect(() => {
    if (!cardsVisible && !noPlayersVoted && !somePlayersVoted) {
        animateToggleButton()
    }
})


const animateToggleButton = () => {
    const animationSequence = [
        [
            buttonRef.value?.$el,
            { transform: "translateX(-25px) " },
            { duration: 0.5 }
        ],
        [
            buttonRef.value?.$el,
            { transform: "translateX(0px)" },
            { duration: 0.5, type: spring, stiffness: 600 }
        ]
    ]
    // @ts-ignore something is wrong with the typing in Motion
    animate(animationSequence)
};
</script>

<style scoped>
.toggle-button {
    align-self: center;
    max-width: 300px;
    margin: 10px 0;
}
</style>
