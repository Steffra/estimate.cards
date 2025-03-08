<template>
    <button class="voting-card"
        :class="[{ 'selected': selected }, { 'orange': value == '2' }, { 'red': value == '3' }, { 'yellow': value == '5' }, { 'lightblue': value == '8' }]">{{
        value }}</button>
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
    background-color: var(--voting-card-background);
    border-radius: var(--voting-card-border-radius);
    border: none;
    cursor: pointer;
    color: var(--voting-card-text);
    fill: var(--branding);
    font-size: 24px;
    font-weight: bold;
    min-height: 4.5rem;
    min-width: 3rem;
    box-shadow: var(--box-shadow-default);
    /* this is needed because iOS Safari has predefiend styles for  buttons*/
    padding: 0;

    @media (width >=480px) {
        min-height: 6rem;
        width: 4rem;
        font-size: 32px;
    }

    &:hover:enabled {
        border: 1px solid var(--branding);
    }

    &:active:enabled {
        border: 1px solid var(--branding);
        box-shadow: inset 0 0 8px 10px var(--box-shadow-color)
    }

    &:disabled {
        opacity: 50%;
        cursor: not-allowed;
    }
}

.voting-card.selected {
    color: var(--voting-card-selected-text);
    background-color: var(--primary-button-selected-background);
    border: 1px solid var(--branding);
    transition-duration: 500ms;
    transition-property: transform;
    transform: translateY(-10px);
}
</style>