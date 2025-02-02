<template>
    <button class="voting-card" :class="{ 'selected': selected }">{{ value }}</button>
</template>

<script setup lang="ts">


const { value, selected } = defineProps<{
    value: string,
    selected: boolean
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
    color: #00005f;
    fill: #00005f;
    font-size: 24px;
    font-weight: bold;
    min-height: 4.5rem;
    min-width: 3rem;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    /* this is needed because iOS Safari has predefiend styles for  buttons*/
    padding: 0;

    @media (width >=480px) {
        min-height: 6rem;
        width: 4rem;
        font-size: 32px;
    }

    &:hover:enabled {
        border: 1px solid #00005f;
    }

    &:active:enabled {
        border: 1px solid #00005f;
        box-shadow: inset 0 0 8px 2px rgba(0, 0, 0, 0.1);
    }

    &:disabled {
        background-color: #f3f3f3;
        color: #646668;
        cursor: not-allowed;
    }
}

.voting-card.selected {
    background-color: #00005f;
    color: white;
}
</style>