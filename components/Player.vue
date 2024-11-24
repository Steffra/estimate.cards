<template>
    <div :id="player.id" class="player">
        <div class="player-card-wrapper" :class="[{ 'voted': player.card}, { 'visible': isVisible}]" ref="card">
            <div class="player-card--back">
                Back
            </div>
            <div class="player-card--front">
                Front
            </div>
        </div>
        <div class="player-name">{{ player.name }}</div>

    </div>
    
</template>

<script setup lang="ts">
import { type Player } from '~/types/types';
import { animate, spring } from "motion"

const { player, isVisible } = defineProps<{
    player: Player,
    isVisible: boolean
}>()

const card = ref<HTMLElement | null>(null);

watch(() => player.card, (newCard, oldCard) => {
    if (player.card && !oldCard) {
        animatCardSelection();
    }
});
watch(() => isVisible, () => {
    if (isVisible) {
        animateReveal();
    }else {
        animateHide();
    }
});

const animatCardSelection = () => {
    const cardelement = document.getElementById(player.id);
    animate(
        cardelement!,
        { transform: "translateY(-10px)" },
        { duration: 0.2 }
        
    ).then(() => {
        animate(
            cardelement!,
            { transform: "translateY(0px)" },
            { type: spring, stiffness: 800 }
        );
    });

};

const animateReveal = () => {
    animate(
        card.value!,
        { transform: "rotateY(180deg)" },
        { type: spring, bounce: 0.4, duration: 1 }
        );
};

const animateHide = () => {
    animate(
        card.value!,
        { transform: "rotateY(0deg)" },
        { type: spring, bounce: 0.4, duration: 1 }
    );
};
</script>

<style scoped>
.player {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    gap: 8px;
}

.player-card-wrapper {
    border-radius: 5px;
    box-shadow: 5px 5px 5px;
    min-width: 80px;
    min-height: 120px;
    transform-style: preserve-3d;
    background-color: wheat;
    color: rgb(126, 115, 93);
}
.player-card--front {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    font-size: 1.5rem;
    font-weight: bold;
}
.player-card--back {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    transform: rotateY(180deg);
}
.voted {
    background-color: lightgreen;    
    color: rgb(51, 83, 51);

}
</style>