<template>
    <div class="content" :class="{ reduced: !hideSidebar }">
        <Columns />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Columns from './Columns.vue';
import { useHideSidebar } from '@/stores/appGlobals';

const sidebarStore = useHideSidebar();
const { hideSidebar } = storeToRefs(sidebarStore);
</script>

<style scoped lang="less">
.content {
    display: flex;
    gap: 24px;
    height: 100%;
    min-width: 0;
    background-color: var(--dark);
    padding: 24px 0 0 24px;
    overflow: scroll;

    @media screen and (min-width: 700px) {
        &.reduced {
            width: calc(100vw - 250px);
        }
    }
}
</style>