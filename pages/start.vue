<script setup lang="ts">
const name = ref('')
const session = ref(window.location.pathname.split('/').pop())
const router = useRouter()

function startSession() {
  window.sessionStorage.setItem('name', name.value)
  if (session.value) {
    router.push(`/session/${session.value}?name=${name.value}`)
  } else {
    router.push(`/session/new?name=${name.value}`)
  }
}

</script>

<template>
  <div>
    <h1>Start session: </h1>
    <form @submit.prevent="startSession">
      <label for="name">Name:</label>
      <input v-model="name">
      <button type="submit">start</button>
    </form>
  </div>
</template>

<style>
input {
  display: block;
}
</style>