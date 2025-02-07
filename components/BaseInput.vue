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
    border: 1px solid var(--input-border-color);
    height: 3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    width: 100%;


}

input:focus {
    border: 1px solid var(--input-border-color-focus);
    outline: none;
}

label {
    position: absolute;
    top: -7px;
    left: 10px;
    color: var(--disabled-text-color);
    font-size: 12px;
    pointer-events: none;
    transition: 0.2s;
    background-color: var(--background-color);
    padding: 0 2px;

}
</style>