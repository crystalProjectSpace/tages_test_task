<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

interface SelectOption {
    label: string,
    value: string | number,
}

interface Props {
    title: string,
    options: SelectOption[]
    currentValue: string | number
}

const props = defineProps<Props>()
const emits = defineEmits(['select'])
const selectActive = ref(false)
const selectControl = ref<HTMLElement>()

const activeLabel = computed(() => props.options.find(o => o.value === props.currentValue )?.label)

function toggle(selectState: boolean) {
    selectActive.value = selectState
}

function deselectOnOutside(evt: MouseEvent) {
    const selectElt = selectControl.value as HTMLElement
    if(!selectElt) return
    const path = evt.composedPath()
    const isOutside = !path.includes(selectElt)
    if(isOutside) {
        selectActive.value = false
    }
}

function selectOption(val: number | string) {
    emits('select', val)
    nextTick(() => toggle(false))
}

onMounted(() => {
    document.addEventListener('click', deselectOnOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', deselectOnOutside)
})
</script>
<template>
    <div class="select-wrap" ref="selectControl">
        <span class="select-title" v-text="props.title"/>
        <span
            class="select-value-wrap"
            :class="{_active: selectActive}"
        >
            <span class="select-value-label" v-text="activeLabel" @click="toggle(!selectActive)"/>
            <span class="select-value-toggle" />
            <ul v-if="selectActive" class="select-list">
                <li
                    v-for="(option, index) in props.options"
                    :key="`${option.value}-${index}`"
                    class="select-list-option"
                    @click="selectOption(option.value)">
                    <span v-text="option.label" />
                </li>
            </ul>
        </span>
    </div>
</template>