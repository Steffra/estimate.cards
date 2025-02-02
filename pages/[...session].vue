<script setup lang="ts">
import { useSocket } from '~/composables/useSocket'
import { nanoid } from 'nanoid'
//useTemplateRef is new in vue 3.5 !
//https://medium.com/@shuhan.chan08/basic-usage-of-vue-3-5-usetemplateref-4b8d7a89bf7d
const votingCards = useTemplateRef('votingCards')
const { connect, session, reset, revealCards, vote, toggleObserverMode } = useSocket()!
const router = useRouter()
const sessionExists = ref(false)
onBeforeMount(() => {
  const name = window.sessionStorage.getItem('name')
  const sessionid = window.location.pathname.split('/').pop()
  if (sessionid !== 'new') {
    fetch(`/api/session/${sessionid}`)
      .then(response => {
        if (response.ok) {
          sessionExists.value = true
        } else {
          window.location.href = '/'
        }
      })
  }

  if (!name) {
    if (sessionid) {
      window.sessionStorage.setItem('session', sessionid)
      window.location.href = '/join' + "?session=" + sessionid
    } else {
      window.location.href = '/join'
    }
  }

  if (sessionid && name) {
    const playerId = nanoid(32)
    window.sessionStorage.setItem('id', playerId)
    connect(sessionid, name, playerId)
  } else {
    router.push(`/`)
  }
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
  console.log(oldFlexItemsInfo)
  await nextTick();


  const newFlexItemsInfo = getFlexItemsInfo(container)
  console.log(newFlexItemsInfo)

  aminateFlexItems(oldFlexItemsInfo, newFlexItemsInfo)
})

watch(() => session.value.cardsVisible, (newValue) => {
  if (newValue && votingCards.value) {
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
</script>

<template>
  <div v-if="session.id" class="session">
    <div class="header">
      <div>
        <div class="share-label">SHARE THIS SESSION <span>({{ session.id }})</span></div>
        <ShareButton />
      </div>
      <BaseToggle :value="isObserver" @toggle="toggleObserver" text="OBSERVER MODE" />
    </div>
    <div class="players">
      <Player v-for="player in players" :key="player.id" :player="player" :is-visible="session.cardsVisible" />
      <div v-if="players.length == 0" class="empty-state">No players have joined yet</div>
    </div>
    <ToggleButton @click="toggleVisibility" :cards-visible="session.cardsVisible" :somePlayersVoted="somePlayersVoted"
      :noPlayersVoted="noPlayersVoted" />
    <div class="voting-cards" v-if="!isObserver">
      <VotingCards @vote="vote" ref="votingCards" :is-voting-disabled="session.cardsVisible" />
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
  max-height: calc(100dvh - 15rem);
  overflow-y: scroll;

  @media (width >=480px) {
    max-height: calc(100dvh - 17rem);
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

.empty-state {
  font-size: 14px;
  font-weight: 400;
  color: darkgrey;
  margin-top: 1rem;
  justify-content: center;
}
</style>