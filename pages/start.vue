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
  <div class="wrapper">
    <div class="content">
      <h1>START ESTIMATION SESSION</h1>
      <form @submit.prevent="startSession">
        <div>
          <input v-model="name" placeholder="NAME">
        </div>
        <BaseButton type="primary" :text="'START SESSION'" />
      </form>
    </div>
  </div>

</template>

<style scoped>
.wrapper {
  padding: 1rem;

  @media (width >=480px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    background-color: #f5f5f5;
  }
}

.content {
  @media (width >=480px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 0.5rem 2rem 2.5rem 2rem;
    margin-bottom: 35dvh;
  }
}

h1 {
  font-size: 20px;
  font-weight: 200;
  margin-bottom: 2rem;
  color: #71777e;
}

form {
  &>div {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    width: 100%;
  }
}

input {
  padding: 0 1rem;
  border-radius: 0.5rem;
  border: 1px solid #343d46;
  color: #101316;
  height: 3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;


}

input:focus {
  border: 1px solid #0079cb;
  outline: none;
}
</style>