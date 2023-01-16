<template>
    <fieldset class="form-fieldset">
        <label :for="forAttr" class="form-label">{{ label }}</label>
        <div
          v-for="(data, index) in allData"
          :key="index"
          class="input-wrapper"
        >
            <input
              type="text"
              class="form-input"
              v-model="data[fieldToDisplay as keyof (ColumnType | SubTaskType)]"
              :placeholder="placeholderText"
              @blur="validateAndSendToParent"
            >
            <button class="remove-item-btn" @click="deleteItem(index)">
                <CloseIcon />
            </button>
        </div>
        <Button :click-handler="addNewInput" class-color="light" :disabled="allData.length >= 10">
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
import { ref, onMounted, defineEmits } from 'vue';
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
    placeholderText?: string,
};

const props = withDefaults(defineProps<Props>(), {
    label: '',
    forAttr: 'form-label',
    buttonIcon: '',
    buttonLabel: '',
    data: () => [],
    fieldToDisplay: '',
    fieldsToUse: () => {},
    placeholderData: false,
    placeholderText: '',
});

// Data to use
const allData = ref<SubTaskType[] | ColumnType[]>(props.data || []);

onMounted(() => {
    if (
        props.placeholderData
        && !props.data?.length
        && props.fieldsToUse
    ) {
        allData.value.push({ ...props.fieldsToUse });
    }

    return allData.value;
});

// Operations to perform
const addNewInput = () => {
    allData.value.push({ ...props.fieldsToUse });
};

const deleteItem = (index: number) => {
    const filteredItems = allData.value.filter(
        (_: ColumnType | SubTaskType, idx: number) => {
        return index !== idx;
    })

    allData.value = filteredItems;
    validateAndSendToParent();
};

// Send parent updates
const emit = defineEmits(['sendUpdates']);

const validateAndSendToParent = () => {
    const cleanedPayload = [];

    for (let i = 0; i < allData.value.length; i++) {
        const item = allData.value[i];

        // Remove empty fields before sending to parent
        if (item[props.fieldToDisplay]) {
            cleanedPayload.push(item);
        }
    }

    emit('sendUpdates', cleanedPayload);
};
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