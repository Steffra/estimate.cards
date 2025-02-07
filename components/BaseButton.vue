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
    background-color: var(--primary-color);
    color: var(--secondary-color);
    border: 1px transparent;
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;
    padding: 1rem 2rem;
    box-shadow: 5px 5px 5px var(--box-shadow-color);
    width: 100%;

    &.secondary {
        color: var(--primary-color);
        border: 1px solid var(--secondary-border-color);
        background-color: var(--secondary-color);
        box-shadow: inset 0px 0px 0px 2px var(--secondary-box-shadow-color);
        box-shadow: 5px 5px 5px var(--box-shadow-color);

        &:hover:enabled {
            background-color: var(--secondary-hover-bg-color);
        }

        &:active:enabled {
            background-color: var(--secondary-active-bg-color);
        }
    }

    &:disabled {
        background-color: var(--disabled-bg-color);
        color: var(--disabled-text-color);
        cursor: not-allowed;
    }

    @media(hover: hover) and (pointer: fine) {
        &:hover:enabled {
            background-color: var(--hover-bg-color);
            color: var(--primary-color);
        }

        &:active:enabled {
            color: var(--primary-color);
            background-color: var(--active-bg-color);
        }
    }

    &:active:enabled {
        background-color: var(--active-bg-color);
    }
}
</style>