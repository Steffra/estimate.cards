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
  <DefaultLayout>
    <h1>START ESTIMATION SESSION</h1>
    <form @submit.prevent="startSession">
      <div>
        <!-- this works since vue3.4! /> -->
        <BaseInput v-model:inputValue="name" placeholder="NAME" label="Your name" autofocus />
      </div>
      <BaseButton :text="'START'" />
    </form>
  </DefaultLayout>
</template>

<style scoped>
h1 {
  font-size: 18px;
  font-weight: 400;
  color: #71777e;
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