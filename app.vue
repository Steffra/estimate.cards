<template>
  <div>
    <NuxtPage />
  </div>
</template>


<style>
:root {
  /*default colors */
  --branding: #42b883;
  --branding-light: #42d392;
  --branding-dark: #33a06f;
  --accent-color: #73abfe;

  /*text colors */
  --primary-text: rgb(255 255 255 / 87%);
  --secondary-text: rgb(255 255 255 / 60%);

  /*background colors */
  --background-color: #242424;
  --soft-background: #2f2f2f;
  --tertiary-background: #2f2f2f;

  --divider: rgb(84 84 84 / 65%);

  /*button colors */
  --hover-bg: var(--branding-light);
  --active-bg: var(--branding-dark);
  --secondary-border: var(--branding);
  --secondary-hover-bg: var(--hover-bg);
  --secondary-active-bg: var(--active-bg);
  --box-shadow-color: rgba(71, 107, 82, 0.1);

  /*component colors */
  --card-background: var(--soft-background);

  --voting-card-background: var(--soft-background);
  --voting-card-text: var(--primary-text);

  --slider-color: #1a1a1a;

  --box-shadow-default: 0 0 0 var(--box-shadow-color);

  /*popper config */
  --popper-theme-background-color: var(--soft-background);
  --popper-theme-background-color-hover: var(--soft-background);
  --popper-theme-text-color: var(--primary-text);
  --popper-theme-border-color: var(--divider);
  --popper-theme-border-width: 0;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 10px;
  --popper-theme-padding: 8px;
  --popper-theme-box-shadow: 0 6px 30px -6px var(--box-shadow-color);
}

body {
  font-family: Poppins;
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  letter-spacing: 0.2px;
  background-color: var(--background-color);
}

* {
  touch-action: manipulation;
}

h1 {
  font-size: 20px;
  font-weight: 200;
  color: var(--primary-text);
  text-align: center;
  margin: 0;

  @media (width >=480px) {
    margin-top: 1rem;
  }
}

h2 {
  font-size: 12px;
  font-weight: 200;
  margin-top: 0;
  color: var(--secondary-text);
  text-align: center;

  &>span {
    font-size: 9px;
  }
}

form {
  width: 100%;
  margin-top: 1.5rem;

  &>div {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    gap: 12px;
  }
}
</style>