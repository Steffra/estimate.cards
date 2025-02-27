<template>
  <div>
    <NuxtPage />
  </div>
</template>


<style>
:root {
  /*default colors */
  --branding: #00005f;
  --branding-light: #88d5f5;
  --branding-dark: #bbe7f9;
  --accent-color: #f03d13;

  /*text colors */
  --primary-text: #00005f;
  --secondary-text: darkgrey;

  /*background colors */
  --background-color: #f5f5f5;
  --soft-background: #fff;
  --tertiary-background: #ccc;

  --divider: rgb(84 84 84 / 65%);

  /*button colors */
  --hover-bg: var(--branding-light);
  --hover-text: var(--primary-text);
  --active-bg: var(--branding-dark);
  --secondary-border: var(--branding);
  --secondary-hover-bg: #e6ebf4;
  --secondary-hover-text: var(--hover-text);
  --secondary-active-bg: #9eb0d4;
  --box-shadow-color: rgba(0, 0, 0, 0.1);
  --primary-button-selected-background: var(--primary-text);
  --primary-button-selected-text: var(--soft-background);

  /*component colors */
  --card-background: var(--soft-background);

  --voting-card-background: var(--soft-background);
  --voting-card-text: var(--primary-text);
  --voting-card-selected-text: var(--soft-background);

  --slider-color: var(--background-color);
  --slider-background-color: var(--secondary-text);
  --box-shadow-default: 5px 5px 5px var(--box-shadow-color);

  --input-label-color: #71777e;
  --input-border-focus: #0079cb;
  --input-text-color: #000;

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
  background-color: var(--soft-background);

  @media (width >=480px) {
    background-color: var(--background-color);
  }
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