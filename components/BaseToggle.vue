<template>
    <label for="toggleinput" class="wrapper">
        <div class="text" :class="{ 'text--active': value }">
            {{ text }}
        </div>
        <div class="toggle-container">
            <div class="toggle" for="toggleinput">
                <input id="toggleinput" class="toggle__input" type="checkbox" :checked="value"
                    @change="$emit('toggle')" />
                <div class=" toggle__slider">
                </div>
            </div>
            <span class="label" :class="{ 'label--active': value }">{{ value ? 'ON' : 'OFF' }}</span>
        </div>
    </label>
</template>

<script setup lang="ts">
const inputValue = defineModel('inputValue')
const { text, value } = defineProps<{
    text: string
    value: boolean
}>()

defineEmits<{
    toggle: []
}>()

</script>

<style scoped>
.wrapper {
    display: flex;
    align-items: end;
    flex-direction: column;
    gap: 12px;

    .text {
        font-size: 11px;
        font-weight: bold;
        color: var(--secondary-text);
        cursor: pointer;

        &.text--active {
            color: var(--accent-color);
        }

    }


    .toggle-container {
        display: flex;
        align-items: center;
        gap: 5px;
        width: 100px;

        .label {
            font-size: 11px;
            font-weight: bold;
            color: darkgrey;

            &.label--active {
                color: var(--accent-color);
            }
        }

        .toggle {
            display: inline-block;
            cursor: pointer;
            height: 26px;
            width: 50px;
            padding-left: 10px;

            .toggle__input {
                display: none;

                &:checked+.toggle__slider {
                    background-color: var(--accent-color);

                    &:before {
                        left: 22px;
                    }
                }
            }

            .toggle__slider {
                width: 40px;
                height: 20px;
                background: var(--slider-background-color);
                padding: 3px;
                border-radius: 2em;
                position: absolute;
                transition: 300ms cubic-bezier(0.785, 0.135, 0.150, 0.860);

                &:before {
                    content: '';
                    width: 20px;
                    height: 20px;
                    background: var(--slider-color);
                    position: absolute;
                    top: 50%;
                    left: 5px;
                    transform: translateY(-50%);
                    border-radius: 50%;
                    transition: 300ms cubic-bezier(0.785, 0.135, 0.150, 0.860);
                }
            }
        }
    }
}
</style>