<script setup lang="ts">
const name = ref('')
const router = useRouter()

function startSession() {
  if (!name.value) return
  fetch(`/api/session/new`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(data => {
      if (data.id) {
        window.sessionStorage.setItem('name', name.value)
        router.push(`/${data.id}`)
      }
    })
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
      <BaseButton :disabled="name === ''" :text="'START'" secondary />
    </form>
  </DefaultLayout>
</template>
