<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">

onBeforeMount(() => {
  const theme = localStorage.getItem('theme')
  if (theme) {
    document.documentElement.setAttribute('theme', theme);
  } else {
    document.documentElement.setAttribute('theme', 'Aldi');
    localStorage.setItem('theme', 'Aldi');
  }
})

</script>

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
  --hover-text: var(--primary-text);
  --active-bg: var(--branding-dark);
  --secondary-border: var(--branding);
  --secondary-hover-bg: var(--hover-bg);
  --secondary-hover-text: var(--hover-text);
  --secondary-active-bg: var(--active-bg);
  --box-shadow-color: rgba(71, 107, 82, 0.1);
  --primary-button-selected-background: var(--branding);
  --primary-button-selected-text: var(--primary-text);


  --button-border-radius: 8px;
  --player-card-border-radius: 12px;
  --player-card-inner-border-radius: 8px;
  --layout-border-radius: 24px;
  --voting-card-border-radius: 10px;
  --backgrodund-image-url: url('assets/vue-logo.svg');
  --logo-offset-top: 9px;
  --logo-offset-top-desktop: 10px;


  --voted-card-front-box-shadow: 0px 2px 10px var(--branding);
  --voted-card-back-box-shadow: 3px 5px 15px var(--branding);
  --voted-card-front-border: var(--branding);
  --voted-card-back-border: var(--branding);


  /*component colors */
  --card-background: var(--soft-background);

  --voting-card-background: var(--soft-background);
  --voting-card-text: var(--primary-text);
  --voting-card-selected-text: var(--primary-text);

  --slider-color: var(--background-color);
  --slider-background-color: var(--secondary-text);
  --box-shadow-default: 0 0 0 var(--box-shadow-color);

  --input-label-color: var(--branding);
  --input-border-focus: var(--branding);
  --input-text-color: var(--primary-text);

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

:root[theme='Nuxt'] {
  --branding-light: #00C16A;
  --branding-dark: #00DC82;
  --primary-text: rgb(255 255 255);
  --secondary-text: #e2e5f0;
  --background-color: #020420;
  --soft-background: #0e112c;
  --tertiary-background: #0e112c;
}

:root[theme='Nuxt'] {
  --branding-light: #00C16A;
  --branding-dark: #00DC82;
  --primary-text: rgb(255 255 255);
  --secondary-text: #e2e5f0;
  --background-color: #020420;
  --soft-background: #0e112c;
  --tertiary-background: #0e112c;
}

:root[theme='Custom2'] {
  --branding: #08fdd8;
  --branding-light: #4effe4;
  --branding-dark: rgba(15, 204, 176, 0.838);
  --accent-color: #17fad8;
  --primary-text: rgb(255, 255, 255);
  --background-color: #181818;
  --soft-background: #222222;
  --tertiary-background: #222222;
  --hover-text: var(--soft-background);
  --primary-button-selected-text: var(--soft-background);
  --voting-card-selected-text: var(--soft-background);
  --input-label-color: var(--secondary-text);
  --input-border-focus: var(--primary-text);

  --button-border-radius: 3px;
  --button-border-radius: 3px;
  --player-card-border-radius: 5px;
  --player-card-inner-border-radius: 0px;
  --layout-border-radius: 3px;
  --voting-card-border-radius: 3px;
  --backgrodund-image-url: url('assets/custom-vue-logo.svg');
}

:root[theme='Custom'] {
  --branding: #08fdd8;
  --branding-light: #4effe4;
  --branding-dark: rgba(15, 204, 176, 0.838);
  --accent-color: #17fad8;
  --primary-text: rgb(255, 255, 255);
  --background-color: #020420;
  --soft-background: #0e112c;
  --tertiary-background: #222222;
  --hover-text: var(--soft-background);
  --primary-button-selected-text: var(--soft-background);
  --voting-card-selected-text: var(--soft-background);
  --input-label-color: var(--secondary-text);
  --input-border-focus: var(--primary-text);

  --button-border-radius: 3px;
  --button-border-radius: 3px;
  --player-card-border-radius: 5px;
  --player-card-inner-border-radius: 0px;
  --layout-border-radius: 3px;
  --voting-card-border-radius: 3px;
  --backgrodund-image-url: url('assets/custom-vue-logo.svg');
}

:root[theme='Aldi'] {
  --branding: #00005f;
  --branding-light: #88d5f5;
  --branding-dark: #bbe7f9;
  --accent-color: #f03d13;

  --primary-text: #00005f;
  --secondary-text: darkgrey;
  --background-color: #f5f5f5;
  --soft-background: #fff;
  --tertiary-background: #ccc;
  --secondary-hover-bg: #e6ebf4;
  --secondary-active-bg: #9eb0d4;
  --box-shadow-color: rgba(0, 0, 0, 0.1);
  --primary-button-selected-background: var(--primary-text);
  --primary-button-selected-text: var(--soft-background);
  --voting-card-selected-text: var(--soft-background);
  --box-shadow-default: 5px 5px 5px var(--box-shadow-color);
  --input-label-color: #71777e;
  --input-border-focus: #0079cb;
  --input-text-color: #000;
  --backgrodund-image-url: url('assets/aldi-logo.svg');
  --logo-offset-top: 4px;
  --logo-offset-top-desktop: 3px;

  --player-card-back-box-shadow: 10px 10px 10px var(--box-shadow-color);
  --voted-card-front-box-shadow: 10px 10px 10px var(--box-shadow-color);
  --voted-card-back-box-shadow: 10px 10px 10px var(--box-shadow-color);
  --voted-card-front-border: var(--branding);
  --voted-card-back-border: var(--accent-color);


  .orange {
    color: #f47d20;
  }

  .red {
    color: #e11b22;
  }

  .yellow {
    color: #ffc20e;
  }

  .lightblue {
    color: #1ec5ee;
  }
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