<template>
  <div class="wrapper">
    <div class="content">
      <div class="title">
        <h1>START A NEW ESTIMATION SESSION</h1>
        <h2> ... OR JOIN YOUR TEAM!</h2>
      </div>

      <BaseLink to="/start" text="START SESSION" type="primary"></BaseLink>
      <BaseLink to="join" text="JOIN SESSION" type="secondary"></BaseLink>

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (width >=480px) {
    background-color: white;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 0.5rem 2rem 2.5rem 2rem;
    margin-bottom: 35dvh;
  }
}

.title {
  width: 100%;
  text-align: center;
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