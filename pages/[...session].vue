<script setup lang="ts">
type Player = {
  id: string,
  name: string,
  card: string | null,
}

type Session = {
  id: string,
  cardsVisible: boolean,
  players: Player[] 
}
const protocol= window.location.protocol === 'https:' ? 'wss' : 'ws'
const sessionid = window.location.pathname.split('/').pop()
const name = window.location.search.split('name=')[1] || window.sessionStorage.getItem('name')
if (!name) {
  window.location.href = '/join'
}
const { status, data, send, open, close } = useWebSocket(`${protocol}://${location.host}/api/websocket?session=${sessionid}&name=${name}`)
const history = ref<string[]>([])
const session = ref<Session>({ id: '', cardsVisible: false, players: [] })

watch(data, (newValue) => {
  history.value.push(`${newValue}`)
  session.value = JSON.parse(newValue)

  if (session.value.id) {
    window.history.pushState({}, '', `/session/${session.value.id}`)
  }
})


</script>

<template>
  <div>
   <h1>Session: {{ session.id }}</h1>
    <div>
      <p v-for="player in session.players">{{ player.name }}</p>
    </div>
  </div>
</template>