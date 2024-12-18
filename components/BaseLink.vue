<template>
    <NuxtLink :to="to">
        <BaseButton :text="text" :secondary="secondary" />
    </NuxtLink>
</template>

<script setup lang="ts">
const { to, text, secondary } = defineProps<{
    to: string
    text: string
    secondary?: boolean
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