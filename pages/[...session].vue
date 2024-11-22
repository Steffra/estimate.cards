<script setup lang="ts">
import { useWebsocket } from '~/composables/useWebsocket'
const socket = useWebsocket()
</script>

<template>
  <div>
   <h1>Session: {{ socket.session.value.id }}</h1>
    <div>
      <p v-for="player in socket.session.value.players" :key="player.id">
        <Player :player="player" />
      </p>
      <button @click="socket.vote('1')">1</button>
    </div>
  </div>
</template>