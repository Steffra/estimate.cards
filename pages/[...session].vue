<script setup lang="ts">
import { useSocket } from '~/composables/useSocket'

const socket = useSocket()

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

watch(() => socket.session.value.players, async () => {
  const container = document.querySelector('.players')
  if (!container) return;
  const oldFlexItemsInfo = getFlexItemsInfo(container)
  console.log(oldFlexItemsInfo)
  await nextTick();


  const newFlexItemsInfo = getFlexItemsInfo(container)
  console.log(newFlexItemsInfo)

  aminateFlexItems(oldFlexItemsInfo, newFlexItemsInfo)
})

interface FlexItemInfo {
  element: Element
  x: number
  y: number
  width: number
  height: number
}

function getFlexItemsInfo(container: Element): FlexItemInfo[] {
  return Array.from(container.children).map((item) => {
    const rect = item.getBoundingClientRect()
    return {
      element: item,
      x: rect.left,
      y: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top,
    }
  })
}

function aminateFlexItems(
  oldFlexItemsInfo: FlexItemInfo[],
  newFlexItemsInfo: FlexItemInfo[]
): void {
  for (const newFlexItemInfo of newFlexItemsInfo) {
    const oldFlexItemInfo = oldFlexItemsInfo.find(
      (itemInfo) => itemInfo.element === newFlexItemInfo.element
    )
    if (!oldFlexItemInfo) return;
    const translateX = oldFlexItemInfo.x - newFlexItemInfo.x
    const translateY = oldFlexItemInfo.y - newFlexItemInfo.y
    const scaleX = oldFlexItemInfo.width / newFlexItemInfo.width
    const scaleY = oldFlexItemInfo.height / newFlexItemInfo.height


    newFlexItemInfo.element.animate(
      [
        {
          transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
        },
        { transform: 'none' },
      ],
      {
        duration: 250,
        easing: 'ease-out',
      }
    )
  }
}
</script>

<template>
  <div class="session">
    <div>
      <div class="share-label">SHARE THIS SESSION <span>({{ socket.session.value.id }})</span></div>
      <ShareButton v-if="socket.session.value" />

    </div>
    <div class="players">
      <Player v-for="player in socket.session.value.players" :key="player.id" :player="player"
        :is-visible="socket.session.value.cardsVisible" />
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
  min-height: 100dvh;
}

.players {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0 2rem;
  flex-grow: 1;
  max-height: calc(100dvh - 12rem);
  overflow-y: scroll;

  @media (width >=480px) {
    max-height: calc(100dvh - 14rem);
  }
}

.players>* {
  transform-origin: left top;
}

.players>* {
  flex-grow: 1;
  flex-basis: 100px;
  display: flex;
  align-items: center;

}

.share-label {
  font-size: 11px;
  font-weight: bold;
  color: darkgrey;
  padding-left: 5px;
  margin-bottom: 4px;

  &>span {
    font-size: 10px;
    font-weight: 400;
  }
}
</style>