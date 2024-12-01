<script setup lang="ts">
import { useSocket } from '~/composables/useSocket'
const socket = useSocket()
const url = computed(() => {
  let fullUrl = window.location.href
  fullUrl.split('/').pop()
  return fullUrl + socket.session.value.id
})
const copyUrlToClipboard = () => {
  navigator.clipboard.writeText(window.location.href)
}
</script>

<template>
  <div  class="session">
    <div>
      <div class="shareLabel">SHARE THIS SESSION</div>
      <button class="shareButton" @click="copyUrlToClipboard"> {{ url }} <ShareIcon /> </button>
    </div>
    <div>
      <button @click="socket.revealCards">Reveal votes</button>
    <button @click="socket.reset">Reset votes</button>
    </div>
    <div class="players">
      <p v-for="player in socket.session.value.players" :key="player.id">
        <Player :player="player" :is-visible="socket.session.value.cardsVisible"/>
      </p>
    </div>
    <div class="votingCards">
      <button @click="socket.vote('1')">1</button>
      <button @click="socket.vote('2')">2</button>
      <button @click="socket.vote('3')">3</button>
      <button @click="socket.vote('5')">5</button>
      <button @click="socket.vote('8')">8</button>
      <button @click="socket.vote('13')">13</button>
    </div>
    
  </div>
</template>

<style>
  .session {

    height: calc(100vh - 10rem);
  }
  .players {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;
    height:100%;
  }
  .shareLabel {
    font-size: 11px;
    font-weight: bold;
    color:darkgrey
  }
  .shareButton {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    background-color: #f2f2f2;
    border: 2px solid #02b5db;
    border-radius: 10px;
    cursor:pointer;
    color: #011e74;
    fill: #011e74;
    font-size:16px;
    font-weight:bold;
    letter-spacing:0.6px;
    padding: 10px 10px;
}
.shareButton:hover {
  background-color: #02b5db;
  color: white;
  fill: white;
}
.shareButton:active {
  outline: 2px solid #011e74;
  
}
</style>