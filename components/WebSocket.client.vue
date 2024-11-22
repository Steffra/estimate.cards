<script setup lang="ts">

const protocol= window.location.protocol === 'https:' ? 'wss' : 'ws'

const { status, data, send, open, close } = useWebSocket(`${protocol}://${location.host}/api/websocket?session=general&name=ASDASD`)

const history = ref<string[]>([])
watch(data, (newValue) => {
  history.value.push(`server: ${newValue}`)
})

const message = ref('')
function sendData(){
  history.value.push(`client: ${message.value}`)
  send(message.value)
  message.value = ''
}
</script>

<template>
  <div>
    <h1>WebSocket - let's go!</h1>
    <form @submit.prevent="sendData">
      <input v-model="message">
      <button type="submit">Send</button>
    </form>
    <div>
      <p v-for="entry in history">{{ entry }}</p>
    </div>
  </div>
</template>