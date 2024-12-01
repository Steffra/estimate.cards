<template>
    <div :id="player.id" class="player">
        <div class="flip-card-container" ref="container">
            <div class="flip-card" :class="[{'voted': player.card },{ 'visible': isVisible}]" ref="card">
                <div class="card-back">
                    <img src="assets/logo_blue.png" width="80" />
                </div>
                <div class="card-front">
                    {{ player.card }}
                </div>
            </div>
        </div>
        <div class="player-name">{{ player.name }}</div>
    </div>
</template>

<script setup lang="ts">
import { type Player } from '~/types/types';
import { animate, cubicBezier, easeInOut, easeOut, spring } from "motion"

const { player, isVisible } = defineProps<{
    player: Player,
    isVisible: boolean
}>()

const isOwnCard = player.id === window.sessionStorage.getItem('id');
const container = ref<HTMLElement | null>(null);
const card = ref<HTMLElement | null>(null);
const seed = Math.random();

watch(() => player.card, (newCard, oldCard) => {
    if(isOwnCard && newCard) {
        animateOwnCardSelection();
        return;
    }
    if (player.card && !oldCard) {
        animateCardSelection();
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

const animateCardSelection = () => {
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

const animateOwnCardSelection = () => {
    const animationLength = 0.75
    animate(
        card.value!,
        { transform: "rotateZ(5deg) translateY(-10px) rotateY(155deg)" },
        { duration: animationLength, ease: cubicBezier(.06,.9,.62,.99) }
    ).then(() => {
        animate(
            card.value!,
            { transform: "rotateZ(0deg) translateY(0px) rotateY(0deg)" },
            { duration: animationLength, ease: cubicBezier(.06,.9,.62,.99) }
            );
    });
    

   

};

const animateReveal = () => {
    animateCardSelection();
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
  transform: scale(1);
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  border:4px solid #011e74;

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
  background-color: #02b5db;
  transform: rotateY(0deg);
  z-index: 2;
}

.card-front {
  background-color:#02b5db;
  color:white;
  transform: rotateY(180deg);
  z-index: 1;
  font-size: 48px;
}

.voted .card-back {
    border:4px solid #f03d13;

}
</style>