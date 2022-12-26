<template>
    <div class="form-modal">
        <h2>
            <slot name="title"></slot>
        </h2>
        <form>
            <slot name="formType"></slot>
            <slot name="submitButton"></slot>
        </form>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.form-modal {
    max-width: 480px;
    width: 100%;
    margin: 0 16px;
    background-color: var(--light);
    border-radius: 16px;
    padding: 24px;

    h2 {
        font-size: 18px;
        font-weight: 700;
        color: var(--font-primary);
    }

    @media screen and (min-width: 700px) {
        padding: 32px;
    }
}
</style>