<template>
    <button :class="{ 'secondary': secondary }">{{ text }}
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
const { text, secondary } = defineProps<{
    text: string
    secondary?: boolean
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
        -webkit-box-shadow: inset 0px 0px 0px 2px #02b5db;
        -moz-box-shadow: inset 0px 0px 0px 2px #02b5db;
        box-shadow: inset 0px 0px 0px 2px #02b5db;
    }


    &:active {
        background-color: #88d5f5;
        color: #00005f;
    }

    /*hover effect only on devices with hover capability*/
    @media(hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #88d5f5;
            color: #00005f;
        }
    }
}
</style>