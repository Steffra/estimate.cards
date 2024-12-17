<template>
    <NuxtLink :to="to">
        <BaseButton :text="text" :type="type" />
    </NuxtLink>
</template>

<script setup lang="ts">
const { to, text, type } = defineProps<{
    to: string
    text: string
    type: "primary" | "secondary"
}>()
</script>

<style scoped>
a {
    text-decoration: none;
    width: 100%;

    @media (width >=480px) {
        width: auto;
        min-width: 250px;
    }
}
</style>