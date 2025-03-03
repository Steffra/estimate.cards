<script setup lang="ts">

const themes = ref(['Aldi', 'Vue', 'Nuxt', 'Steffra'])
const selectedTheme = ref('Aldi')
const isDropdownOpen = ref(false)


const selectTheme = (theme: string) => {
    selectedTheme.value = theme
    isDropdownOpen.value = false
}

</script>


<template>
    <div class="wrapper">
        <h1>THEME</h1>
        <div class="theme-selector">
            <BaseButton @click="isDropdownOpen = !isDropdownOpen" :text="selectedTheme" tertiary small> </BaseButton>
            <ul v-show="isDropdownOpen" class="themes">
                <li v-for="theme in themes" :key="theme" :class="{
                    selected
                        : theme === selectedTheme
                }" @click="selectTheme(theme)">
                    {{ theme }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: start;
}

h1 {
    font-size: 11px;
    font-weight: bold;
    color: var(--secondary-text);
    cursor: pointer;
    margin-top: 0;
    font-weight: bold;
}

.theme-selector {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
    margin-top: 8px;

    >button {
        border: 1px solid var(--divider)
    }

    ul {
        display: flex;
        flex-direction: column;
        position: absolute;
        background-color: var(--soft-background);
        border: 1px solid var(--primary-color);
        border-radius: 8px;
        gap: 1px;
        padding: 3px;
        z-index: 1;
        width: 108px;
        margin-top: 35px;
        cursor: pointer;
        list-style-type: none;

        li {
            padding: 7px;
            border-radius: 8px;
            color: white;


            &:hover {
                background-color: var(--background-color);
                color: var(--secondary-hover-text);
            }

        }

        li.selected {
            font-weight: bold;
            color: var(--branding);
        }
    }
}
</style>