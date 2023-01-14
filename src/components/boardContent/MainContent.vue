<template>
    <div
      class="content"
      :class="{
        reduced: !hideSidebar,
        empty: isNoBoardOrNoColumn
      }"
    >
        <NoBoardNoColumn
          v-if="isNoBoardOrNoColumn"
          :message-name="isNoBoardOrNoColumnText"
        />
        <Columns v-else />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import Columns from './Columns.vue';
import NoBoardNoColumn from './NoBoardNoColumn.vue';
import { useHideSidebar } from '@/stores/appGlobals';
import { useBoardsStore } from '@/stores/boards';
import { useCurrentBoard } from '@/stores/current';

const sidebarStore = useHideSidebar();
const { hideSidebar } = storeToRefs(sidebarStore);

const boardsStore = useBoardsStore();
const { boards } = storeToRefs(boardsStore);

const currentBoardStore = useCurrentBoard();
const { getCurrentBoard } = currentBoardStore;

const isNoBoardOrNoColumn = computed(() => {
    return !boards.value.length || !getCurrentBoard().columns.length;
});

const isNoBoardOrNoColumnText = computed(() => {
    if (!boards.value.length) {
        return 'addBoard';
    } else {
        return 'addColumn';
    }
});
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

    &.empty {
        padding: 24px;
        justify-content: center;
        align-items: center;
    }
}
</style>