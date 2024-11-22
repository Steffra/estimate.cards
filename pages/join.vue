<script setup lang="ts">
const name = ref('')
const session = ref('')
function start(){
  window.sessionStorage.setItem('name', name.value)
    if (session.value) {
        window.location.href = `/session/${session.value}?name=${name.value}`
    } else {
        window.location.href = `/session/new?name=${name.value}`
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