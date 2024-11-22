<template>
   <div :class="[{ 'outline': player.card}]">
        {{ player.name }}
   </div>
</template>

<script>
export default {
    props: {
        player: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.outline {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
}
</style>