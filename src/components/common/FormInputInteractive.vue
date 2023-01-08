<template>
    <fieldset class="form-fieldset">
        <label :for="forAttr" class="form-label">{{ label }}</label>
        <div
          v-for="(data, index) in dataToDisplay"
          :key="index"
          class="input-wrapper"
        >
            <input
              type="text"
              :id="forAttr"
              class="form-input"
              :value="data[fieldToDisplay]"
            >
            <button class="remove-item-btn" @click="deleteItem">
                <CloseIcon />
            </button>
        </div>
        <Button :click-handler="addNewInput" class-color="light">
            <template #icon>
                <span class="action-add-span">{{ buttonIcon }}</span>
            </template>
            <template #label>
                <span class="action-add-span">{{ buttonLabel }}</span>
            </template>
        </Button>
    </fieldset>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Button from '@/components/common/Button.vue';
import CloseIcon from '@/assets/images/icon-cross.svg?component';
import type { SubTaskType, ColumnType } from '@/@types/boardTypes';

export interface Props {
    label: string,
    forAttr: string,
    buttonIcon: string,
    buttonLabel: string,
    data?: ColumnType[] | SubTaskType[],
    fieldToDisplay?: string,
    fieldsToUse?: ColumnType | SubTaskType,
    placeholderData?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
    label: '',
    forAttr: 'form-label',
    buttonIcon: '',
    buttonLabel: '',
    data: () => [],
    fieldToDisplay: '',
    fieldsToUse: () => {},
    placeholderData: false,
});

const allData = ref<SubTaskType[] | ColumnType[]>(props.data || []);

const addNewInput = () => {
    // allData.value.push({ title: '', isCompleted: false});
};

const deleteItem = () => {
    console.log('delete item');
};
// https://jsfiddle.net/crswll/24txy506/9/
// https://stackoverflow.com/questions/34825065/vuejs-v-model-array-in-multiple-input
const dataToDisplay = computed(() => {
    // an array with a fake object or an object?
    if (
        props.placeholderData
        && !props.data?.length
        && props.fieldsToUse
    ) {
        allData.value.push(props.fieldsToUse);
    }

    return allData.value;
});
</script>

<style scoped lang="less">
.input-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
}

.form-input {
    flex-grow: 1;
}

.remove-item-btn {
    background: none;
    border: none;
    margin-left: 16px;

    &:hover {
        cursor: pointer;

        :deep(svg path) {
            fill: var(--red);
        }
    }
}

:deep(.action-add-span) {
    color: var(--primary);
}
</style>