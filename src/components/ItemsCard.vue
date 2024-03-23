<script lang="ts" setup>
import { computed } from 'vue'
import { useStore} from 'vuex'
import type { WareItem } from '../interfaces'
import { ACTION_TYPES, DISCOUNT_TEXT } from '../constants'

const store = useStore()

const props = defineProps<WareItem>()
const isDiscounted = computed(() => (props.price.old_price ?? 0) > props.price.current_price)
const isChecked = computed(() => store.getters['user_selections/checkedItemIds'].includes(props.id))
const isSelected = computed(() => store.getters['user_selections/selectedItemIds'].includes(props.id))

function toggleCheck() {
    store.dispatch(`user_selections/${ACTION_TYPES.SELECT}`, props.id)
}

function toggleSelect() {
    store.dispatch(`user_selections/${ACTION_TYPES.CHECK}`, props.id)
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
        <div class="item-card-pricing__wrap">
            <div class="item-card-pricing">
                <span
                    v-if="props.price.old_price"
                    class="item-card-pricing _obsolete"
                    v-text="props.price.old_price"
                />
                <span class="item-card" v-text="props.price.current_price" />
            </div>
            <div class="item-card-controls">
                <button
                    type="button"
                    class="item-card-btn _item-check"
                    :class="{ _active: isChecked }"
                    @click="toggleCheck"
                />
                <button
                    type="button"
                    class="item-card-btn _item-select"
                    :class="{ _active: isSelected }"
                    @click="toggleSelect"
                />
            </div>
        </div>
    </div>
</template>