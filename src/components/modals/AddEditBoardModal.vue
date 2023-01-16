<template>
    <Form>
        <template #title>
            {{ modalInView }}
        </template>
        <template #formType>
            <FormInputField
              :label="modalNameLabel"
              for-attr="board-title"
              :placeholder-text="modalPlaceholderText"
              :input-value="boardName"
              @input-value="updateBoardName"
              @input-error="updateNameError"
            />
            <FormInputInteractive
              :label="modalColumnsLabel"
              for-attr="board-input-interactive"
              button-icon="+"
              button-label="Add New Column"
              :data="boardColumns"
              field-to-display="name"
              :fields-to-use="interactiveFields"
              :placeholder-data="modalPlaceholderColumns"
              :placeholder-text="modalPlaceholderColumnText"
              @send-updates="updateBoardColumns"
            />
        </template>
        <template #submitButton>
            <Button
              class="submit-button"
              :click-handler="submitBoard"
              :disabled="isSubmitDisabled"
            >
                <template #label>
                    <span class="action-add-board-span">{{ modalSubmitButton }}</span>
                </template>
            </Button>
        </template>
    </Form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import type { ColumnType } from '@/@types/boardTypes';
import Form from '@/components/common/Form.vue';
import FormInputField from '@/components/common/FormInputField.vue';
import FormInputInteractive from '@/components/common/FormInputInteractive.vue';
import Button from '@/components/common/Button.vue';
import { useAppModal } from '@/stores/appGlobals';
import { useCurrentFormErrors } from '@/stores/form';
import { useBoardsStore } from '@/stores/boards';
import { useCurrentBoard } from '@/stores/current';
import { createId } from '@/helpers/formatters';

const props = defineProps<{
    modalName: string, 
}>();

// Component text and setup Add vs Edit Board
const modalInView = computed(() => {
    return props.modalName === 'addBoard'
     ? 'Add New Board'
     : 'Edit Board';
});

const modalSubmitButton = computed(() => {
    return props.modalName === 'addBoard'
     ? 'Create New Board'
     : 'Save Changes';
});

const modalPlaceholderText = computed(() => {
    return props.modalName === 'addBoard'
     ? 'e.g. Web Design'
     : '';
});

const modalNameLabel = computed(() => {
    return props.modalName === 'addBoard'
     ? 'Name'
     : 'Board Name';
});

const modalColumnsLabel = computed(() => {
    return props.modalName === 'addBoard'
     ? 'Columns'
     : 'Board Columns';
});

const modalPlaceholderColumns = computed(() => {
    return props.modalName === 'addBoard'
     ? true
     : false;
});

const modalPlaceholderColumnText = computed(() => {
    return props.modalName === 'addBoard'
     ? 'e.g Todo'
     : '';
})

// Input handling
const currentBoardStore = useCurrentBoard();
const { getCurrentBoard } = currentBoardStore;

const { id, name, columns } = getCurrentBoard();

const interactiveFields: ColumnType = {
    id: '',
    name: '',
    tasks: [],
    parentBoardId: id,
};

const boardName = ref(props.modalName === 'editBoard' ? name : '');
const boardColumns: Ref<ColumnType[]> = ref(
    props.modalName === 'editBoard' ? columns : []
);

const updateBoardName = (value: string) => {
    boardName.value = value;
}

const updateBoardColumns = (value: ColumnType[]) => {
    const updatedItems = [];
    for (let i = 0; i < value.length; i++) {
        const newId = uuidv4();
        updatedItems.push({ ...value[i], id: newId});
    }

    boardColumns.value = updatedItems;
}

// Error handling
const currentErrorsStore = useCurrentFormErrors();
const { currentErrors } = storeToRefs(currentErrorsStore);
const { setCurrentErrors } = currentErrorsStore;

onMounted(() => {
    setCurrentErrors({
        nameError: '',
    });
});

const updateNameError = (value: string) => {
    setCurrentErrors({ nameError: value });
}

const isSubmitDisabled = computed(() => {
    const allErrors = Object.values(currentErrors.value);
    return allErrors.every((error) => error) || !boardName.value;
});

// Submit + state updates
const useBoards = useBoardsStore();
const { addBoard, editBoard } = useBoards;

const appModalStore = useAppModal();
const { toggleModal } = appModalStore;

const submitBoard = () => {
    const newData = {
        name: boardName.value,
        columns: boardColumns.value,
    }

    if (props.modalName === 'addBoard') {
        const newId = createId();
        addBoard({ id: newId, ...newData })
    } else {
        editBoard({ id, ...newData });
    } 
    toggleModal();
}
</script>

<style scoped lang="less">
.submit-button {
    margin-top: 24px;
}
</style>