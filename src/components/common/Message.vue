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