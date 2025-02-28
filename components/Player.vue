<template>
    <div :id="player.id" class="player">
        <div class="flip-card-container" ref="container">
            <div class="flip-card" :class="[{ 'voted': player.card }, { 'visible': isVisible }]" ref="card">
                <div class="card-back">
                    <div class="card-back__inner" :class="{ 'shadow': player.card }">
                        <div class="background-logo"></div>
                        <div class="background-logo"></div>
                        <div class="background-logo"></div>
                        <div class="background-logo"></div>
                        <div class="background-logo"></div>
                        <div class="background-logo"></div>
                        <div class="background-logo"></div>
                        <div class="background-logo"></div>
                        <div class="background-logo"></div>
                        <div class="background-logo"></div>
                        <div class="logo-center">
                            <div class="logo2" />
                        </div>
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
const { player, isVisible, index } = defineProps<{
    player: Player,
    isVisible: boolean,
    index: number
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
}, { immediate: true });

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

const textColor = computed(() => {
    switch (player.card) {
        case '1':
            return '#00005f';
        case '2':
            return '#f47d20';
        case '3':
            return '#e11b22';
        case '5':
            return '#ffc20e';
        case '8':
            return '#1ec5ee';
        case '13':
            return '#00005f';
        default:
            return '#00005f';
    }
});

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
    transform: scale(1);
}

.card-front,
.card-back {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 5px double var(--branding);
    color: var(--primary-text);

    padding: 4px 6px;

    position: absolute;
    overflow: hidden;

    backface-visibility: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (width >=480px) {
        padding: 6px 5px 5px 5px;
    }
}

.card-back {
    background-color: var(--soft-background);
    transform: rotateY(0deg);
    z-index: 2;
}

.card-back__inner {
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 5px;
    overflow: hidden;
    box-sizing: border-box;

}

.card-front {
    background-color: var(--card-background);
    transform: rotateY(180deg);
    z-index: 1;
    font-size: 56px;
    font-weight: bold;
}

.voted>div {
    box-shadow: 0px 2px 10px var(--branding);
    border-color: var(--branding);
}

.player-name {
    font-size: 16px;
    line-height: 19px;
    font-weight: normal;
    color: var(--primary-text);
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
    min-width: 8px;
    height: 100%;
    background-image: url(assets/vue-logo.svg);

    overflow: hidden;

    @media (width >=480px) {
        margin-top: 1px;

    }

}

.background-logo:nth-child(2n) {

    @media (width >=480px) {
        margin-top: -1px;

    }

    transform: rotate(180deg);
}


.logo-center {
    width: 40px;
    height: 40px;
    position: absolute;
    background-color: var(--soft-background);
    border-radius: 32px;
    border: 1px dashed var(--branding);
    left: 17px;
    top: 39px;

    @media (width >=480px) {
        width: 50px;
        height: 50px;
        left: 19px;
        top: 44px;
    }
}

.logo2 {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 9px;
    left: 6px;

    @media (width >=480px) {
        width: 40px;
        height: 40px;
        top: 10px;
        left: 5px;
    }

    background-image: url(assets/vue-logo.svg);
}
</style>