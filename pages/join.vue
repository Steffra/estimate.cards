<script setup lang="ts">
const name = ref('')
const sessionFromUrl = ref('')
const router = useRouter()
const sessionInput = ref('')
sessionFromUrl.value = router.currentRoute.value.query.session as string
onBeforeMount(() => {
  if (sessionFromUrl.value) {
    fetch(`/api/session/${sessionFromUrl.value}`)
      .then(response => {
        if (!response.ok) {
          window.location.href = '/'
        }
      })
  }

})
async function startSession() {
  window.sessionStorage.setItem('name', name.value)

  if (sessionFromUrl.value) {
    router.push(`/${sessionFromUrl.value}`)
  } else {
    fetch(`/api/session/${sessionInput.value}`)
      .then(response => {
        if (response.ok) {
          router.push(`/${sessionInput.value}`)
        } else {
          alert('Session not found')
        }
      })
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="title">
      <h1>JOIN ESTIMATION SESSION</h1>
      <h2 v-if="sessionFromUrl"><span>(</span>session: {{ sessionFromUrl }}<span>)</span></h2>
    </div>
    <form @submit.prevent="startSession">
      <div>
        <!-- this works since vue3.4! /> -->
        <BaseInput v-if="!sessionFromUrl" v-model:inputValue="sessionInput" placeholder="SESSION" label="Session id"
          :autofocus="true" />
        <BaseInput v-model:inputValue="name" placeholder="NAME" label="Your name" :autofocus="sessionFromUrl != ''" />
      </div>
      <BaseButton :disabled="name === ''" :text="'JOIN'" />
    </form>
  </DefaultLayout>
</template>
