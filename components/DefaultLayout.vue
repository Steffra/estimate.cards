<template>
    <div class="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    padding: 1rem;
    background-color: var(--background-color);

    @media (width >=480px) {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100dvh - 2rem);
        background-color: var(--background-low-emphasis-color);
    }
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    @media (width >=480px) {
        background-color: var(--background-color);
        box-shadow: 5px 5px 5px var(--box-shadow-color);
        border-radius: 24px;
        padding: 0.5rem 2rem 2.5rem 2rem;
        margin-bottom: 35dvh;
    }
}
</style>