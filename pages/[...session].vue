<script setup lang="ts">
import { useSocket } from '~/composables/useSocket'
const socket = useSocket()
const url = computed(() => {
  return window.location.host + '/session/' + socket.session.value.id
})


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
      <ShareButton v-if="socket.session.value" />
    </div>
    <div class="players">
      <div v-for="player in socket.session.value.players" :key="player.id">
        <Player :player="player" :is-visible="socket.session.value.cardsVisible" />
      </div>
    </div>
    <div class="voting-cards">
      <ToggleButton @click="toggleVisibility" :is-visible="socket.session.value.cardsVisible"
        :text="socket.session.value.cardsVisible ? 'NEW ROUND' : 'REVEAL CARDS'" />
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
  padding: 1rem;
}

.players {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: scroll;

  @media (width >=480px) {
    gap: 16px;
  }

  @media (width >=768px) {
    gap: 24px;
  }

}

.share-label {
  font-size: 11px;
  font-weight: bold;
  color: darkgrey;
  padding-left: 5px;
  margin-bottom: 4px;
}
</style>