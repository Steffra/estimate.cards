<script setup lang="ts">
import { useSocket } from '~/composables/useSocket'
//useTemplateRef is new in vue 3.5 !
//https://medium.com/@shuhan.chan08/basic-usage-of-vue-3-5-usetemplateref-4b8d7a89bf7d
const votingCards = useTemplateRef('votingCards')
const socket = useSocket()

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

watch(() => socket.session.value.cardsVisible, (newValue) => {
  if (newValue && votingCards.value) {
    //call resetSelection thats defineExposed
    votingCards.value.resetSelection()
  }
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
    <ToggleButton @click="toggleVisibility" :cards-visible="socket.session.value.cardsVisible" />
    <div class="voting-cards">
      <VotingCards @vote="socket.vote" ref="votingCards" :is-voting-disabled="socket.session.value.cardsVisible" />
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