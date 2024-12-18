<template>
    <input v-model="inputValue">
</template>

<script setup lang="ts">
//defineModel is the new fancy way to define v-model in >= Vue 3.4
const inputValue = defineModel('inputValue')

</script>

<style scoped>
input {
    padding: 0 1rem;
    border-radius: 0.5rem;
    border: 1px solid #343d46;
    color: #101316;
    height: 3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;


}

input:focus {
    border: 1px solid #0079cb;
    outline: none;
}
</style>