<script setup lang="ts">

const themes = ref(['Aldi', 'Vue', 'Custom'/*, 'Custom2', 'Nuxt'*/])
const selectedTheme = ref('Aldi')
const isDropdownOpen = ref(false)

const selectTheme = (theme: string) => {
    selectedTheme.value = theme
    document.documentElement.setAttribute('theme', theme);
    localStorage.setItem('theme', theme);
}
const closeDropdown = () => {
    isDropdownOpen.value = false
}

defineExpose({
    closeDropdown
})
</script>


<template>
    <div class="wrapper">
        <button @click.stop="isDropdownOpen = !isDropdownOpen">CHANGE THEME</button>
        <div class="theme-selector">
            <ul v-show="isDropdownOpen" class="themes">
                <li v-for="theme in themes" :key="theme" :class="{
                    selected
                        : theme === selectedTheme
                }" @click.stop="selectTheme(theme)">
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

button {
    font-size: 11px;
    font-weight: bold;
    color: var(--secondary-text);
    cursor: pointer;
    font-weight: bold;
    background-color: unset;
    box-shadow: none;
    border: none;
    text-decoration: underline;
    text-decoration-color: var(--branding);
    font-weight: 700;
}

.theme-selector {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;

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
        margin-top: 6px;
        cursor: pointer;
        list-style-type: none;

        li {
            padding: 7px;
            border-radius: 8px;
            color: var(--input-text-color);


            &:hover {
                background-color: var(--background-color);
            }

        }

        li.selected {
            font-weight: bold;
            color: var(--branding);
        }
    }
}
</style>