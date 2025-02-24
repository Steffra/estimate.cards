<script setup lang="ts">
import { useSocket } from '~/composables/useSocket'
import { nanoid } from 'nanoid'
//useTemplateRef is new in vue 3.5 !
//https://medium.com/@shuhan.chan08/basic-usage-of-vue-3-5-usetemplateref-4b8d7a89bf7d
const { connect, session, reset, revealCards, vote, toggleObserverMode } = useSocket()!
const router = useRouter()
const sessionExists = ref(false)
const playerId = ref('')
onBeforeMount(() => {
  const name = window.sessionStorage.getItem('name')
  const sessionid = window.location.pathname.split('/').pop()
  playerId.value = nanoid(32)


  if (!name) {
    window.location.href = '/join' + "?session=" + sessionid
    return
  }

  fetch(`/api/session/${sessionid}`)
    .then(response => {
      if (response.ok) {
        sessionExists.value = true
        window.sessionStorage.setItem('id', playerId.value)
        connect(sessionid!, name, playerId.value)
      } else {
        router.push(`/`)
      }
    })
})

const toggleVisibility = () => {
  if (session.value.cardsVisible) {
    reset()
  } else {
    revealCards()
  }
}

watch(() => session.value.players, async () => {
  const container = document.querySelector('.players')
  if (!container) return;
  const oldFlexItemsInfo = getFlexItemsInfo(container)
  await nextTick();

  const newFlexItemsInfo = getFlexItemsInfo(container)

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

const noPlayersVoted = computed(() => {
  return players.value.every(player => player.card == '' || player.card == null)
})

const somePlayersVoted = computed(() => {
  return players.value.some(player => player.card != '' && player.card != null) &&
    !players.value.every(player => player.card != '' && player.card != null)
})

const isObserver = computed(() => {
  return session.value.players.find(player => player.id == window.sessionStorage.getItem('id'))?.observer!
})

const toggleObserver = () => {
  toggleObserverMode()
}

const players = computed(() => {
  return session.value.players.filter(p => !p.observer)
})

const selectedCard = computed(() => {
  const player = session.value.players.find(player => player.id == playerId.value)
  if (player) {
    return player.card
  }
  return null
})
</script>

<template>
  <div v-if="session.id" class="session">
    <div class="header">
      <div>
        <div class="share-label">SHARE THIS SESSION <span>({{ session.id }})</span></div>
        <ShareButton />
      </div>
      <BaseToggle :value="isObserver" @toggle="toggleObserver" text="OBSERVER MODE" class="observer-toggle" />
    </div>
    <div class="players">
      <Player v-for="(player, index) in players" :key="player.id" :player="player" :is-visible="session.cardsVisible"
        :index="index" />
      <div v-if="players.length == 0" class="empty-state">No players have joined yet.</div>
    </div>
    <ToggleButton @click="toggleVisibility" :cards-visible="session.cardsVisible" :somePlayersVoted="somePlayersVoted"
      :noPlayersVoted="noPlayersVoted" />
    <div v-if="!isObserver">
      <VotingCards @vote="vote" :is-voting-disabled="session.cardsVisible" :selected-card="selectedCard" />
    </div>

  </div>
</template>

<style>
.session {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0 1rem 1rem;
  box-sizing: border-box;
  min-height: 100dvh;
  background-color: var(--background-low-emphasis-color);
}

.header {
  display: flex;
  justify-content: space-between;
}

.players {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0 2rem;
  flex-grow: 1;
  max-height: calc(100dvh - 17rem);
  overflow-y: scroll;
  scrollbar-color: var(--primary-color) var(--background-color);
  padding-top: 25px;

  @media (width >=480px) {
    max-height: calc(100dvh - 19rem);
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
  color: var(--secondary-text);
  padding-left: 5px;
  margin-bottom: 4px;

  &>span {
    font-size: 10px;
    font-weight: 400;
  }
}

.empty-state {
  font-size: 14px;
  font-weight: 400;
  color: var(--secondary-text);
  margin-top: 1rem;
  justify-content: center;
}

.observer-toggle {
  margin-right: 1rem;
}
</style>