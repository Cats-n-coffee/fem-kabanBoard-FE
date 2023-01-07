<template>
    <div>
        <div
          v-for="({ title, isCompleted }, index) in subtasks"
          :key="index"
          class="row-wrapper"
          :class="{ completed: isCompleted }"
        >
            <label :for="title">
                <input type="checkbox" :checked="isCompleted" :id="title" />
                <span>
                    {{ title }}
                </span>
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SubTaskType } from '@/@types/boardTypes';

export interface Props {
    subtasks: SubTaskType[],
}

withDefaults(defineProps<Props>(), {
    subtasks: () => [],
});
</script>

<style scoped lang="less">
.row-wrapper {
    background-color: var(--dark);
    padding: 12px;
    border-radius: 4px;
    margin-top: 8px;

    label {
        font-size: 12px;
        line-height: 15px;
        color: var(--font-primary);
        font-weight: 700;
        display: flex;
    }

    input[type="checkbox"] {
        appearance: none;
    }

    input[type="checkbox"] + span {
        display: flex;
        align-items: center;
    }

    input[type="checkbox"] + span:before {
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 1px solid var(--form-input);
        background-color: var(--light);
        border-radius: 2px;
        margin-right: 16px;
    }

    input[type="checkbox"]:checked + span:before {
        content: url('src/assets/images/icon-check.svg');
        background-color: var(--primary);
        padding: 0 0 6px 2px;
        border: 1px solid var(--primary);
    }

    input[type="checkbox"]:focus + span:before {
        outline: 1px solid var(--primary-fade-25);
    }

    &:hover {
        background-color: var(--primary-fade-25);
        cursor: pointer;

        label {
            cursor: pointer;
        }
    }

    &.completed {
        label > span {
            text-decoration: line-through;
            color: var(--font-primary-50);
        }
    }
}
</style>
