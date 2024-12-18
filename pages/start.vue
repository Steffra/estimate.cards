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
    <h2>START ESTIMATION SESSION</h2>
    <form @submit.prevent="startSession">
      <div>
        <!-- this works since vue3.4! /> -->
        <BaseInput v-model:inputValue="name" placeholder="YOUR NAME" />
      </div>
      <BaseButton :text="'START'" />
    </form>
  </DefaultLayout>
</template>

<style scoped>
h2 {
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 2rem;
  color: #71777e;
  text-align: center;
}

form {
  &>div {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    width: 100%;
  }
}
</style>