<template>
    <Popper :show="showTooltip" :offsetSkid="'10'" :offsetDistance="'8'">
        <BaseButton text="SHARE SESSION" secondary class="share-button" @click="copyUrlToClipboard">
        </BaseButton>
        <template #content :is-open>
            <div class="tooltip-content">
                URL copied to clipboard!
                <ShareIcon />
            </div>
        </template>
    </Popper>

</template>

<script setup lang="ts">
const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    const isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
    if (navigator.share && isMobile) {
        navigator.share({
            title: 'Join my estimation session:',
            url: window.location.href
        })
    } else {
        console.log('sharing is not supported on this browser')
        displayTooltip()
    }
}
const showTooltip = ref(false)
const displayTooltip = () => {
    showTooltip.value = true
    setTimeout(() => {
        showTooltip.value = false
    }, 2000)
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
    margin-bottom: 8px;
}

.tooltip-content {
    display: flex;
    align-items: center;
    justify-content: center;
    fill: #011e74;
    font-size: 14px;
    font-weight: 400;

}
</style>