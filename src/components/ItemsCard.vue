<script lang="ts" setup>
import { computed } from 'vue'
import { useStore} from 'vuex'
import type { WareItem } from '../interfaces'
import { ACTION_TYPES, DISCOUNT_TEXT } from '../constants'
import IconChecked from './icons/IconChecked.vue'
import IconFree from './icons/IconFree.vue'
import IconSelected from './icons/IconSelected.vue'

const store = useStore()

const props = defineProps<WareItem>()
const isDiscounted = computed(() => (props.price.old_price ?? 0) > props.price.current_price)
const isChecked = computed(() => store.getters['user_selections/checkedItemIds'].includes(props.id))
const isSelected = computed(() => store.getters['user_selections/selectedItemIds'].includes(props.id))

function toggleCheck() {
    store.dispatch(`user_selections/toggleItemAction`, {id: props.id, action: ACTION_TYPES.CHECK })
}

function toggleSelect() {
    store.dispatch(`user_selections/toggleItemAction`, {id: props.id, action: ACTION_TYPES.SELECT })
}
</script>
<template>
    <div class="item-card">
        <div class="item-card-notice" v-if="isDiscounted" v-text="DISCOUNT_TEXT" />
        <figure class="item-card-img__wrap">
            <img class="item-card-img" :src="props.image?.url" :alt="props.name" />
        </figure>
        <div class="item-card-code" v-text="props.code" />
        <div class="item-card-name" v-text="props.name" />
        <div class="item-card-options__wrap">
            <div class="item-card-pricing__wrap">
                <span
                    v-if="props.price.old_price"
                    class="item-card-pricing _obsolete"
                >
                    {{ Math.trunc(props.price.old_price) }}&#x20bd;
                </span>
                <span class="item-card-pricing">
                    {{ Math.trunc(props.price.current_price) }}&#x20bd;
                </span>
            </div>
            <div class="item-card-controls">
                <button
                    type="button"
                    class="item-card-btn _item-check"
                    @click="toggleCheck"
                >
                    <IconChecked v-if="isChecked"/>
                    <IconFree v-else />
                </button>
                <button
                    type="button"
                    class="item-card-btn _item-select"
                    @click="toggleSelect"
                >
                    <IconSelected :classes="isSelected ? '_active' : ''" />
                </button>
            </div>
        </div>
    </div>
</template>