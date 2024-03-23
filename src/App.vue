<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex'
import { DISPLAY_OPTIONS, MATERIALS, SORT_DIR, SORT_OPTIONS } from './constants';
import ItemsGrid from './components/ItemsGrid.vue'
import ItemsSorter from './components/controls/ItemsSorter.vue'


const store = useStore()
const loading = computed(() => store.getters['storewares/loading'])
const activeFilter = computed(() => store.getters['user_selections/activeFilter'])
const activeSort = computed(() => store.getters['user_selections/activeSort'])

onBeforeMount(async ()=> {
  store.dispatch('user_selections/restoreFromLS')
  await Promise.all([
    store.dispatch('storewares/acquireItemList'),
    store.dispatch('storewares/acquireMaterialsList'),
  ])
})

function updSort(evt: SORT_DIR) {
  store.dispatch('user_selections/updateFilters', { sort: evt })
}

function updFilter(evt: MATERIALS) {
  store.dispatch('user_selections/updateFilters', { filter: evt })
}
</script>

<template>
  <div>
    <main class="items-wrap">
      <div class="items-sorters">
        <ItemsSorter title="Сортировать по" :options="SORT_OPTIONS" :currentValue="activeSort" @select="updSort"/>
        <ItemsSorter title="материал" :options="DISPLAY_OPTIONS" :currentValue="activeFilter" @select="updFilter"/>
      </div>
      <span v-if="loading" class="loader" />  
      <ItemsGrid v-else />
    </main>
  </div>
</template>
<style scoped></style>
