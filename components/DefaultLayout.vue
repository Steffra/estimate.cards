<template>
    <div class="layout-wrapper">
        <div class="content">
            <slot></slot>
        </div>
        <ThemeSelector />
    </div>
</template>

<style scoped>
.layout-wrapper {
    padding: 1rem;

    @media (width >=480px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(100dvh - 2rem);
        gap: 1rem;
    }
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    @media (width >=480px) {
        background-color: var(--soft-background);
        box-shadow: var(--box-shadow-default);
        border-radius: var(--layout-border-radius);
        padding: 0.5rem 2rem 2.5rem 2rem;
    }
}
</style>