<template>
    <fieldset class="fieldset-input-locked">
        <label :for="forAttr">{{ label }}</label>
        <div>
            <input type="text" :id="forAttr">
        </div>
        <Button :click-handler="clickHandler">
            <template #icon>{{ buttonIcon }}</template>
            <template #label>
                <span class="action-add-task-span">{{ buttonLabel }}</span>
            </template>
        </Button>
    </fieldset>
</template>

<script setup lang="ts">
import Button from '@/components/common/Button.vue';

export interface Props {
    label: string,
    forAttr: string,
    clickHandler: ((payload: MouseEvent) => void) | undefined,
    buttonIcon: string,
    buttonLabel: string,
}

withDefaults(defineProps<Props>(), {
    label: '',
    forAttr: 'form-label',
    clickHandler: () => {},
    buttonIcon: '',
    buttonLabel: '',
});
</script>