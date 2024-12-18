<template>
  <DefaultLayout>
    <div class="title">
      <h1>START A NEW ESTIMATION SESSION</h1>
      <h2> ... or join your team!</h2>
    </div>

    <BaseLink to="/start" text="START SESSION"></BaseLink>
    <BaseLink to="join" text="JOIN SESSION" secondary></BaseLink>

  </DefaultLayout>
</template>

<style scoped>
.title {
  width: 100%;
  text-align: center;

  @media (width >=480px) {
    margin-top: 1rem;
  }
}

h1 {
  font-size: 20px;
  font-weight: 200;
  color: #101316;
  margin: 0;
}

h2 {
  font-size: 16px;
  font-weight: 100;
  color: #71777e;
  margin: 0 0 1rem 0;
}
</style>