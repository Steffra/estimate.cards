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
        border-radius: 24px;
        padding: 0.5rem 2rem 2.5rem 2rem;
        margin-bottom: 35dvh;
    }
}
</style>