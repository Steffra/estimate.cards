<script setup lang="ts">
import { useWebsocket } from '~/composables/useWebsocket'
const socket = useWebsocket()
</script>

<template>
  <div>
   <h1>Session: {{ socket.session.value.id }}</h1>
   <button @click="socket.vote('1')">1</button>
      <button @click="socket.vote('2')">2</button>
      <button @click="socket.vote('3')">3</button>
      <button @click="socket.vote('5')">5</button>
      <button @click="socket.vote('8')">8</button>
      <button @click="socket.vote('13')">13</button>
  </div>
  <div class="players">
      <p v-for="player in socket.session.value.players" :key="player.id">
        <Player :player="player" :is-visible="socket.session.value.cardsVisible" />
      </p>
      
    </div>
    <button @click="socket.revealCards">Reveal votes</button>
    <button @click="socket.reset">Reset votes</button>
    
</template>

<style>
  .players {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
</style>