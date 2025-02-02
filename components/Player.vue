<template>
    <div :id="player.id" class="player">
        <div class="flip-card-container" ref="container">
            <div class="flip-card" :class="[{ 'voted': player.card }, { 'visible': isVisible }]" ref="card">
                <div class="card-back">
                    <div class="card-back__inner" :class="{ 'shadow': player.card }">

                        <svg class="background-logo" width="75" height="75" viewBox="0 0 32 32" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <title></title>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M17.2982 8.00069C17.9233 6.16203 18.5999 5.00736 20.2694 5.00736V5H23.2848V5.09561C22.2478 5.22064 21.5639 6.09584 21.0784 7.53735L15.3786 24.3133C14.7535 26.1519 14.0768 27.3066 12.4073 27.3066H9.45077V27.2183C10.4878 27.0933 11.1129 26.2181 11.5983 24.7766L17.2982 8.00069ZM11.9366 8.03014C12.5618 6.19149 13.2384 5.03681 14.9079 5.03681H17.9233V5.13242C16.8863 5.25745 16.2097 6.13265 15.7169 7.57416L10.0171 24.3648C9.39194 26.2035 8.71531 27.3582 7.04578 27.3582H4.08922V27.2625C5.12622 27.1375 5.74401 26.2623 6.23677 24.8208L11.9366 8.03014ZM9.54631 5.06625C7.87681 5.06625 7.20018 6.22093 6.57504 8.05958L0 27.3949H1.67686C3.34636 27.3949 4.02298 26.2402 4.64813 24.4016L10.3553 7.59624C10.8481 6.15473 11.5247 5.27953 12.5617 5.15451V5.05889H9.54631V5.06625ZM24.1378 11.428C25.3072 11.428 25.9765 11.5898 26.5943 12.8548V12.8475C26.7487 13.1564 27.9181 15.6202 27.9181 15.6202H27.8151C27.3371 14.995 26.6605 14.8847 25.822 14.8847H19.9898L21.1666 11.428H24.1378ZM28.7126 17.8412C28.1315 16.6203 27.4255 16.4217 26.2561 16.4217H19.4678L18.291 19.8784H27.8888C28.7493 19.8784 29.3892 20.0034 29.8746 20.6359H29.9776C29.9776 20.6359 28.8523 18.1427 28.7126 17.8412ZM28.3448 21.445C29.5215 21.445 30.2717 21.651 30.8821 23.0116H30.8895C30.9556 23.166 32 25.6887 32 25.6887H31.897C31.4043 25.0488 30.7571 24.9091 29.9775 24.9091H16.5773C16.627 24.7801 16.6732 24.6477 16.7208 24.5119C16.7436 24.4465 16.7667 24.3803 16.7906 24.3133L17.7614 21.445H28.3448Z"
                                fill="#00005f"></path>
                        </svg>
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
    transform: scale(1);
}

.card-front,
.card-back {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    border: 3px double #00005f;

    position: absolute;
    overflow: hidden;

    backface-visibility: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
}

.card-back {
    background-color: #fff;
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
}

.card-front {
    background-color: #fff;
    color: #00005f;
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
    color: #00005f;
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