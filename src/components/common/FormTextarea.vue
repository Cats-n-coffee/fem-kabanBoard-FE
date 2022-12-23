<template>
    <fieldset class="fieldset-textarea">
        <label :for="forAttr">{{ label }}</label>
        <textarea :id="forAttr" cols="30" rows="10"></textarea>
    </fieldset>
</template>

<script setup lang="ts">
export interface Props {
    label: string,
    forAttr: string,
}

withDefaults(defineProps<Props>(), {
    label: '',
    forAttr: 'form-label',
});
</script>