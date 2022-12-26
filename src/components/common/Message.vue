<template>
    <div class="message-modal">
        <h2>
            <slot name="title"></slot>
        </h2>
        <p>
            <slot name="content"></slot>
        </p>
        <slot name="actions"></slot>
    </div>
</template>

<style scoped lang="less">
.message-modal {
    background-color: var(--light);
    max-width: 480px;
    width: 100%;
    margin: 0 16px;
    border-radius: 6px;
    padding: 24px;

    h2 {
        color: var(--red);
        font-size: 18px;
        font-weight: 700;
    }
    
    p {
        color: var(--font-secondary);
        font-size: 13px;
        font-weight: 500;
        padding: 24px 0;
    }

    @media screeen and (min-width: 700px) {
        padding: 32px;
    }
}
</style>