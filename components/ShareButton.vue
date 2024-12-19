<template>
    <BaseButton text="SHARE SESSION" secondary class="share-button" @click="copyUrlToClipboard">
        <ShareIcon />
    </BaseButton>
</template>

<script setup lang="ts">
const router = useRouter()

const url = computed(() => {
    return useRequestURL()
})
const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
}
</script>

<style scoped>
button.share-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 400;
    padding: 10px 10px;
    width: 180px;
    min-width: unset;
}
</style>