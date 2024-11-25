<template>
    <div :id="player.id" class="player">
        <div class="flip-card-container">
            <div class="flip-card" :class="[{ 'voted': player.card}, { 'visible': isVisible}]" ref="card">
                <div class="card-back">
                    <CardsIcon />
                </div>
                <div class="card-front">
                    Front
                </div>
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
const seed = Math.random();

watch(() => player.card, (newCard, oldCard) => {
    if (player.card && !oldCard) {
        animatCardSelection();
    }
});

watch(() => isVisible, () => {
    if (isVisible) {
        setTimeout(function () {
            animateReveal();
        }, Math.floor(seed * 200));
    }else {
        setTimeout(function () {
            animateHide();
        }, Math.floor(seed * 200));    }
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
    animatCardSelection();
    const bounce = 0.2 + seed * 0.4;
    const duration = 0.5 + seed * 1;
    animate(
        card.value!,
        { transform: "rotateY(180deg)" },
        { type: spring, bounce:bounce, duration: duration }
        );
};

const animateHide = () => {
    animate(
        card.value!,
        { transform: "rotateY(0deg)" },
        { type: spring, bounce: 0.4, duration: 0.8 }
    );
};
</script>

<style scoped>
.player {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    gap: 8px;
}

.flip-card-container {
  width: 80px;
  height: 120px;

  perspective: 1000px;
}
.flip-card {
  width: inherit;
  height: inherit;

  position: relative;
  transform-style: preserve-3d;
  transition: .6s .1s;
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  border-radius: 24px;

  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  backface-visibility: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
}

.card-back {
  background-color:beige;
  transform: rotateY(0deg);
  z-index: 2;
}

.card-front {
  background-color:rgb(170, 170, 142);
  transform: rotateY(180deg);
  z-index: 1;
}
.voted {
    background-color: lightgreen;    
    color: rgb(51, 83, 51);

}
</style>