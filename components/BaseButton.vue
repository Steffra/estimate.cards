<template>
    <button :disabled="disabled" :class="{ 'secondary': secondary }">{{ text }}
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
const { text, secondary = false, disabled = false } = defineProps<{
    text: string
    secondary?: boolean
    disabled?: boolean
}>()
</script>

<style scoped>
button {

    background-color: #00005f;
    color: white;
    border: 1px transparent;
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;
    padding: 1rem 2rem;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    width: 100%;

    &.secondary {
        color: #00005f;
        border: 1px solid #00005f;
        background-color: #fff;
        -webkit-box-shadow: inset 0px 0px 0px 2px #02b5db;
        -moz-box-shadow: inset 0px 0px 0px 2px #02b5db;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);

        &:hover:enabled {
            background-color: #e6ebf4;
        }

        &:active:enabled {
            background-color: #9eb0d4;
        }
    }

    &:disabled {
        background-color: #e3e3e3;
        color: #b3b3b3;
        cursor: not-allowed;
    }




    /*hover effect only on devices with hover capability*/
    @media(hover: hover) and (pointer: fine) {
        &:hover:enabled {
            background-color: #88d5f5;
            color: #00005f;
        }

        &:active:enabled {
            color: #00005f;
            background-color: #bbe7f9;
        }
    }

    &:active:enabled {
        background-color: #bbe7f9;
    }

}
</style>