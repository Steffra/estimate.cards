<script setup lang="ts">
import { useSocket } from '~/composables/useSocket'
const socket = useSocket()
const url = computed(() => {

  return window.location.host + '/session/' + socket.session.value.id
})
const copyUrlToClipboard = () => {
  navigator.clipboard.writeText(window.location.href)
}

const selectedCard = computed(() => {
  return socket.session.value.players.find(player => player.id === window.sessionStorage.getItem('id'))?.card
})
</script>

<template>
  <div class="session">
    <div>
      <div class="shareLabel">SHARE THIS SESSION</div>
      <button v-if="socket.session.value.id" class="shareButton" @click="copyUrlToClipboard"> {{ url }}
        <ShareIcon />
      </button>
      <button v-else class="shareButton shareButton--disabled"> loading . . .
        <ShareIcon />
      </button>
    </div>
    <div>
      <button @click="socket.revealCards">Reveal votes</button>
      <button @click="socket.reset">Reset votes</button>
    </div>
    <div class="players">
      <p v-for="player in socket.session.value.players" :key="player.id">
        <Player :player="player" :is-visible="socket.session.value.cardsVisible" />
      </p>
    </div>
    <div class="votingCards">
      <VotingCards @vote="socket.vote" :selectedCard="selectedCard" />
    </div>

  </div>
</template>

<style>
.session {
  height: calc(100vh - 14rem);

  @media (width >=480px) {
    height: calc(100vh - 15rem);
  }
}

.players {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.shareLabel {
  font-size: 11px;
  font-weight: bold;
  color: darkgrey
}

.shareButton {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  background-color: #f2f2f2;
  border: 2px solid #02b5db;
  border-radius: 10px;
  cursor: pointer;
  color: #011e74;
  fill: #011e74;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.6px;
  padding: 10px 10px;
  width: 320px;
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