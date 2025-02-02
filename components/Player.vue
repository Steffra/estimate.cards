<template>
    <div :id="player.id" class="player">
        <div class="flip-card-container" ref="container">
            <div class="flip-card" :class="[{ 'voted': player.card }, { 'visible': isVisible }]" ref="card">
                <div class="card-back">
                    <div class="card-back__inner" :class="{ 'shadow': player.card }">
                        <img class="background-logo" src="assets/logo_blue.png" />
                    </div>
                </div>
                <div class="card-front">
                    {{ player.card }}
                </div>
            </div>
        </div>
        <div class="player-name" :class="{ 'player-name--bold': isOwnCard }">{{ player.name }}</div>
    </div>
</template>

<script setup lang="ts">
import { type Player } from '~/types/types';
import { animate, cubicBezier, spring } from "motion"
// done like this because AnimationPlaybackControls is not exported
let runningAnimation: ReturnType<typeof animate> | null = null;
const { player, isVisible } = defineProps<{
    player: Player,
    isVisible: boolean
}>()

const isOwnCard = player.id === window.sessionStorage.getItem('id');
const container = ref<HTMLElement | null>(null);
const card = ref<HTMLElement | null>(null);
const seed = Math.random();

watch(() => player.card, (newCard, oldCard) => {
    cancelAnimation();
    if (isOwnCard && newCard) {
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
        }, Math.floor(seed * 100));
    } else {
        setTimeout(function () {
            animateHide();
        }, Math.floor(seed * 200));
    }
});

const animateCardSelection = () => {
    const cardelement = document.getElementById(player.id);
    const duration = 0.1 + seed * 0.2;
    const stiffness = 400 + seed * 400;

    const animationSequence = [
        [
            cardelement!,
            { transform: "translateY(-10px) " },
            { duration }
        ],
        [
            cardelement!,
            { transform: "translateY(0px)" },
            { type: spring, stiffness, duration }
        ]
    ]
    // @ts-ignore something is wrong with the typing in Motion
    runningAnimation = animate(animationSequence)
    runningAnimation.then(() => {
        runningAnimation = null;
    });
};

const animateOwnCardSelection = () => {
    const animationLength = 0.75

    const animationSequence = [
        [
            card.value!,
            { transform: "rotateZ(5deg) translateY(-10px) rotateY(135deg) scale(1.2)" },
            { duration: animationLength, ease: cubicBezier(.06, .9, .62, .99) }
        ],
        [
            card.value!,
            { transform: "rotateZ(0deg) translateY(0px) rotateY(0deg) scale(1)" },
            { duration: animationLength, ease: cubicBezier(.06, .9, .62, .99) }
        ]
    ]
    // @ts-ignore something is wrong with the typing in Motion
    runningAnimation = animate(animationSequence)
    runningAnimation.then(() => {
        runningAnimation = null;
    });

};

const animateReveal = () => {
    cancelAnimation();
    animateCardSelection();
    const bounce = 0.2 + seed * 0.4;
    const duration = 1 + seed * 0.5;
    animate(
        card.value!,
        { transform: "rotateY(180deg)" },
        { type: spring, bounce, duration }
    );
};

const animateHide = () => {
    const animation = animate(
        card.value!,
        { transform: "rotateY(0deg)" },
        { type: spring, bounce: 0.4, duration: 0.8 }
    );

};

const cancelAnimation = () => {
    if (runningAnimation) {
        runningAnimation.cancel();
    }
};
</script>

<style scoped>
.player {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    max-width: 85px;

    @media (width >=480px) {
        min-width: 50px;
        max-width: 100px;
    }
}


.flip-card-container {
    width: 85px;
    height: 130px;
    perspective: 1000px;

    @media (width >=480px) {
        width: 100px;
        height: 150px;
    }
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
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    border: 3px double #011e74;

    position: absolute;
    overflow: hidden;

    backface-visibility: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: transform 0.5s;
    -webkit-transition: border 200ms ease-in;
    -moz-transition: border 200ms ease-in;
    -o-transition: border 200ms ease-in;
}

.card-back {
    background-color: #02b5db;
    transform: rotateY(0deg);
    z-index: 2;
}

.card-back__inner {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.shadow {
    box-shadow: inset 0 0 8px 2px rgba(239 111 80 / 50%);
    transition: transform 0.5s;
    -webkit-transition: box-shadow 200ms ease-in;
    -moz-transition: box-shadow 200ms ease-in;
    -o-transition: box-shadow 200ms ease-in;
}

.card-front {
    background-color: #02b5db;
    color: white;
    transform: rotateY(180deg);
    z-index: 1;
    font-size: 56px;
    font-weight: bold;
}

.voted .card-back {
    border-color: #f03d13;

}

.player-name {
    font-size: 16px;
    line-height: 19px;
    font-weight: normal;
    color: #011e74;
    text-align: center;
    max-width: 75px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 36px;
    text-wrap: balance;
    word-wrap: break-word;

    @media (width >=480px) {
        max-width: 90px;
    }
}

.background-logo {
    width: 75px;

    @media (width >=480px) {
        width: 90px;
    }
}
</style>