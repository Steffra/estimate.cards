<template>
    <button class="voting-card" :class="{ 'selected': selected }" :style="'color:' + color">{{ value }}</button>
</template>

<script setup lang="ts">


const { value, selected, color } = defineProps<{
    value: string,
    selected: boolean
    color: string
}>()
</script>

<style>
.voting-card {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    color: var(--primary-color);
    fill: var(--primary-color);
    font-size: 24px;
    font-weight: bold;
    min-height: 4.5rem;
    min-width: 3rem;
    box-shadow: 5px 5px 5px var(--box-shadow-color);
    /* this is needed because iOS Safari has predefiend styles for  buttons*/
    padding: 0;

    @media (width >=480px) {
        min-height: 6rem;
        width: 4rem;
        font-size: 32px;
    }

    &:hover:enabled {
        border: 1px solid var(--primary-color);
    }

    &:active:enabled {
        border: 1px solid var(--primary-color);
        box-shadow: inset 0 0 8px 2px var(--box-shadow-color);
    }

    &:disabled {
        background-color: var(--disabled-background-color);
        color: var(--disabled-text-color) !important;
        cursor: not-allowed;
    }
}

.voting-card.selected {
    background-color: var(--primary-color);
    color: var(--background-color);
}
</style>