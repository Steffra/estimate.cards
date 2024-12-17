<template>
    <button :class="{ 'secondary': type === 'secondary' }">{{ text }}</button>
</template>

<script setup lang="ts">
const { text, type } = defineProps<{
    text: string
    type: "primary" | "secondary"
}>()
</script>

<style scoped>
button {
    background-color: #011e74;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    padding: 1rem 2rem;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    width: 100%;

    &.secondary {
        background-color: #f2f2f2;
        color: #011e74;
        border: 2px solid #02b5db;
    }

    &:hover {
        background-color: #88d5f5;
        color: #00005f;
    }

    &:active {
        background-color: #bbe7f9;
        color: #00005f;
    }


    @media (width >=480px) {
        width: auto;
        min-width: 250px;
    }



}
</style>