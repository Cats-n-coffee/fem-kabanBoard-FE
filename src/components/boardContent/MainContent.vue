<template>
    <div class="content">
        <Columns />
    </div>
</template>

<script setup lang="ts">
import Columns from './Columns.vue';
</script>

<style scoped lang="less">
.content {
    display: flex;
    gap: 24px;
    height: 100%;
    background-color: var(--dark);
    padding: 24px 0 0 24px;
}
</style>