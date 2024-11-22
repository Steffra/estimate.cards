<template>
   <div :class="[{ 'outline': player.card}]">
        {{ player.name }}
   </div>
</template>

<script setup lang="ts">
import { type Player } from '~/types/types';
const { player } = defineProps<{
  player: Player
}>()
</script>

<style scoped>
.outline {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
}
</style>