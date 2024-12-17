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

const toggleVisibility = () => {
  if (socket.session.value.cardsVisible) {
    socket.reset()
  } else {
    socket.revealCards()
  }
}
</script>

<template>
  <div class="session">
    <div>
      <div class="share-label">SHARE THIS SESSION</div>
      <button v-if="socket.session.value.id" class="share-button" @click="copyUrlToClipboard"> {{ url }}
        <ShareIcon />
      </button>
      <button v-else class="share-button share-button--disabled"> loading . . .
        <ShareIcon />
      </button>
    </div>
    <div class="players">
      <div v-for="player in socket.session.value.players" :key="player.id">
        <Player :player="player" :is-visible="socket.session.value.cardsVisible" />
      </div>
    </div>
    <ToggleButton @click="toggleVisibility" :is-visible="socket.session.value.cardsVisible"
      :text="socket.session.value.cardsVisible ? 'NEW ROUND' : 'REVEAL CARDS'" />
    <div class="voting-cards">
      <VotingCards @vote="socket.vote" :selectedCard="selectedCard" />
    </div>

  </div>
</template>

<style>
.session {
  height: calc(100dvh - 2rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.players {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: scroll;
  @media (width >= 480px) {
    gap:16px;
  }

  @media (width >= 768px) {
    gap:24px;
  }
  
}

.share-label {
  font-size: 11px;
  font-weight: bold;
  color: darkgrey
}

.share-button {
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

.share-button:hover {
  background-color: #02b5db;
  color: white;
  fill: white;
}

.share-button:active {
  outline: 2px solid #011e74;

}
</style>