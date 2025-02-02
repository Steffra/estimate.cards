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
    router.push(`/session/${sessionFromUrl.value}`)
  } else {
    fetch(`/api/session/${sessionInput.value}`)
      .then(response => {
        if (response.ok) {
          router.push(`/session/${sessionInput.value}`)
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

<style scoped>
h1 {
  font-size: 18px;
  font-weight: 400;
  color: #00005f;
  text-align: center;
  margin-bottom: 0;
}

h2 {
  font-size: 12px;
  font-weight: 200;
  margin-top: 0;
  margin-bottom: 2rem;
  color: #818991;
  text-align: center;

  &>span {
    font-size: 9px;
  }
}

form {
  width: 100%;

  &>div {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    gap: 12px;
  }
}
</style>