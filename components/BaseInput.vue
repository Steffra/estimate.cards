<template>
    <div>
        <input v-model="inputValue" :autofocus="autofocus" :placeholder="placeholder" />
        <label v-if="label"> {{ label }}</label>
    </div>

</template>

<script setup lang="ts">
//defineModel is the new fancy way to define v-model in >= Vue 3.4
const inputValue = defineModel('inputValue')

const { placeholder, label, autofocus } = defineProps<{
    placeholder: string
    label?: string
    autofocus?: boolean
}>()
</script>

<style scoped>
div {
    position: relative;
    display: flex;
    width: 100%;

}

input {
    padding: 0 1rem;
    border-radius: 0.5rem;
    background-color: var(--soft-background);
    color: var(--primary-text);
    border: 1px solid var(--divider);
    height: 3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    width: 100%;


}

input:focus {
    border: 1px solid var(--branding);
    outline: none;
}

label {
    position: absolute;
    top: -7px;
    left: 10px;
    color: var(--input-label-color);
    font-size: 12px;
    pointer-events: none;
    transition: 0.2s;
    background: var(--soft-background);
    padding: 0 2px;

}
</style>