<template>
    <button :disabled="disabled" :class="{ 'secondary': secondary, 'tertiary': tertiary }">{{ text }}
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
const { text, secondary = false, disabled = false, tertiary = false } = defineProps<{
    text: string
    secondary?: boolean
    disabled?: boolean
    tertiary?: boolean
}>()
</script>
<style scoped>
button {
    background-color: var(--primary-button-selected-background);
    color: var(--primary-button-selected-text);
    border: 1px transparent;
    border-radius: 3px;
    cursor: pointer;
    font-size: 18px;
    padding: 1rem 2rem;
    box-shadow: var(--box-shadow-default);
    width: 100%;

    &:focus-visible {
        outline: var(--divider) auto 1px;
    }

    &.secondary {
        color: var(--branding);
        border: 1px solid var(--secondary-border);
        background-color: var(--soft-background);
        box-shadow: var(--box-shadow-default);

        &:hover:enabled {
            background-color: var(--secondary-hover-bg);
            color: var(--secondary-hover-text);
        }

        &:active:enabled {
            background-color: var(--secondary-active-bg);
            color: var(--soft-background);
        }
    }

    &.tertiary {
        color: var(--primary-text);
        border: none;
        background-color: var(--tertiary-background);
        box-shadow: var(--box-shadow-default);

        &:hover:enabled {
            background-color: var(--secondary-hover-bg);
            color: var(--primary-text);
        }

        &:active:enabled {
            background-color: var(--secondary-active-bg);
            color: var(--primary-text);
        }
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 50%;
    }

    @media(hover: hover) and (pointer: fine) {
        &:hover:enabled {
            background-color: var(--hover-bg);
            color: var(--hover-text);
        }

        &:active:enabled {
            background-color: var(--active-bg);
            color: var(--primary-text);

        }
    }

    &:active:enabled {
        background-color: var(--active-bg);
        color: var(--primary-text);
    }
}
</style>