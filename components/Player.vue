<template>
    <div class="player">
        <div class="player-card" :class="[{ 'voted': player.card}]">
                
        </div>
        <div class="player-name">{{ player.name }}</div>

    </div>
    
</template>

<script setup lang="ts">
import { type Player } from '~/types/types';
const { player } = defineProps<{
  player: Player
}>()
</script>

<style scoped>
.player {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 100px;
}

.player-card {
    border: 1px solid black;
    border-radius: 5px;
    min-width: 80px;
    min-height: 120px;
    background-color: wheat;
}
.voted {
    background-color: lightgreen;    

}
</style>