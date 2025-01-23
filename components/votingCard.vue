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
    background-color: #eeeeee;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    color: #011e74;
    fill: #011e74;
    font-size: 24px;
    font-weight: bold;
    min-height: 4.5rem;
    min-width: 3rem;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);

    @media (width >=480px) {
        min-height: 6rem;
        width: 4rem;
        font-size: 32px;
    }

    &:hover {
        background-color: #e3e3e3;
    }

    &:active {
        background-color: #011e74;
        color: white;

    }

    &:disabled {
        background-color: #e3e3e3;
        color: #b3b3b3;
        cursor: not-allowed;
    }
}

.voting-card.selected {
    background-color: #011e74;
    color: white;
}
</style>