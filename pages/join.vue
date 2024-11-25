<script setup lang="ts">
const name = ref('')
const session = ref('')

const nameInStorage = window.sessionStorage.getItem('name')
if (nameInStorage) {
  name.value = nameInStorage
}
const sessionIdInStorage = window.sessionStorage.getItem('session')
const sessionIdInUrl = window.location.search.split('session=')[1]
if (sessionIdInStorage) {
  session.value = sessionIdInStorage
} else if (sessionIdInUrl) {
  session.value = sessionIdInUrl
}
function start(){
  window.sessionStorage.setItem('name', name.value)
    if (session.value) {
        window.location.href = `/session/${session.value}`
    }
}
</script>

<template>
  <div>
    <h1>Join session: </h1>
    <form @submit.prevent="start">
      <label for="name">Name:</label>
      <input v-model="name">
      <label for="session">Session id:</label>
      <input v-model="session">
      <button type="submit">Join</button>
    </form>
    
  </div>
</template>

<style>
  input {
    display: block;
  }
</style>