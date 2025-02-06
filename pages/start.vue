<script setup lang="ts">
const name = ref('')
const router = useRouter()

function startSession() {
  if (!name.value) return
  window.sessionStorage.setItem('name', name.value)
  router.push(`/new`)
}
</script>

<template>
  <DefaultLayout>
    <h1>START ESTIMATION SESSION</h1>
    <form @submit.prevent="startSession">
      <div>
        <!-- this works since vue3.4! /> -->
        <BaseInput v-model:inputValue="name" placeholder="NAME" label="Your name" autofocus />
      </div>
      <BaseButton :disabled="name === ''" :text="'START'" />
    </form>
  </DefaultLayout>
</template>

<style scoped>
h1 {
  font-size: 18px;
  font-weight: 400;
  color: #00005f;
  text-align: center;
  margin-bottom: 2rem;
}

form {
  width: 100%;

  &>div {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
  }
}
</style>