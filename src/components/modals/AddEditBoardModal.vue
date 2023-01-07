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
              :placeholder-subtask="modalPlaceholderColumns"
              @input-interactive-value="updateBoardColumns"
              @input-interactive-error="updateColumnsError"
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
import type { ColumnType } from '@/@types/boardTypes';
import Form from '@/components/common/Form.vue';
import FormInputField from '@/components/common/FormInputField.vue';
import FormInputInteractive from '@/components/common/FormInputInteractive.vue';
import Button from '@/components/common/Button.vue';
import { useCurrentFormErrors } from '@/stores/form';
import { useBoardsStore } from '@/stores/boards';
import { useCurrentBoard } from '@/stores/current';

const currentBoardStore = useCurrentBoard();
const { getCurrentBoard } = currentBoardStore;

const { name } = getCurrentBoard();

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

// Input handling
const boardName = ref(props.modalName === 'editBoard' ? name : '');
const boardColumns: Ref<ColumnType[]> = ref([]);

const updateBoardColumns = (value: string) => {
    const newId = Math.floor(Math.random() * 1000).toString();
    const newColumn = {
        id: newId,
        name: value,
        tasks: [],
    }
    boardColumns.value.push(newColumn);
}

const updateBoardName = (value: string) => {
    boardName.value = value;
}

// Error handling
const currentErrorsStore = useCurrentFormErrors();
const { currentErrors } = storeToRefs(currentErrorsStore);
const { setCurrentErrors } = currentErrorsStore;

onMounted(() => {
    setCurrentErrors({
        nameError: '',
        columnsErrors: [],
    });
});

const updateNameError = (value: string) => {
    setCurrentErrors({ nameError: value });
}

const updateColumnsError = (value: string) => {
    setCurrentErrors({ columnsErrors: []});
};

const isSubmitDisabled = computed(() => {
    const allErrors = Object.values(currentErrors.value);
    return allErrors.every((error) => error) || !boardName.value;
});

// Submit + state updates
const useBoards = useBoardsStore();
const { addBoard } = useBoards;

const submitBoard = () => {
    if (props.modalName === 'addBoard') {
        const newId = Math.floor(Math.random() * 1000).toString();
        addBoard({
            id: newId,
            name: boardName.value,
            columns: boardColumns.value,
        })
    } else { // editBoard
        // handle the fields updates
    } 
}
</script>

<style scoped lang="less">
.submit-button {
    margin-top: 24px;
}
</style>