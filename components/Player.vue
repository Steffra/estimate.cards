<template>
    <div :id="player.id" class="player">
        <div class="player-card" :class="[{ 'voted': player.card}]" ref="card">
                 
        </div>
        <div class="player-name">{{ player.name }}</div>

    </div>
    
</template>

<script setup lang="ts">
import { type Player } from '~/types/types';
import { animate, spring } from "motion"

const card = ref<HTMLElement | null>(null);

watch(() => player.card, (newCard, oldCard) => {
    if (player.card && !oldCard) {
        animateCard();
    }
});

const animateCard = () => {
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

const { player } = defineProps<{
  player: Player
}>()
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

.player-card {
    border-radius: 5px;
    box-shadow: 5px 5px 5px;
    min-width: 80px;
    min-height: 120px;

    background-color: wheat;
    color: rgb(126, 115, 93);
}
.voted {
    background-color: lightgreen;    
    color: rgb(51, 83, 51);

}
</style>