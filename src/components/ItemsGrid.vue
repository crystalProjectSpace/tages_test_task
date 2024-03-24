<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { WareItem } from '../interfaces'
import { MATERIALS, SORT_DIR } from '../constants'
import ItemsCard from './ItemsCard.vue'
const store = useStore()

const relevantItems = computed(() => {
    const sortDir: SORT_DIR = store.getters['user_selections/activeSort']
    const activeFilter: MATERIALS = store.getters['user_selections/activeFilter']

    return store.getters['storewares/items']
        .filter((item: WareItem ) => activeFilter === MATERIALS.ALL ? true : item.material === activeFilter )
        .sort((itemPrev: WareItem, itemNext: WareItem) => {
            const delta = itemPrev.price.current_price - itemNext.price.current_price
            return sortDir === SORT_DIR.ASC ? delta : -delta
        })
    
})
</script>
<template>
    <div class="grid-items">
        <ItemsCard v-for="item in relevantItems" :key="item.id" v-bind="item" />
    </div>
</template>
