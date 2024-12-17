<template>
    <button class="toggle-button">{{ text }}</button>
</template>

<script setup lang="ts">
const { text } = defineProps<{
    text: string
}>()
</script>
