<script setup lang="ts">
import { computed, onBeforeMount, watch } from 'vue';
import { useStore } from 'vuex'
import { DISPLAY_OPTIONS, MATERIALS, SORT_DIR, SORT_OPTIONS } from './constants';
import ItemsGrid from './components/ItemsGrid.vue'
import ItemsSorter from './components/controls/ItemsSorter.vue'


const store = useStore()
const loading = computed(() => store.getters['storewares/loading'])
const activeFilter = computed(() => store.getters['user_selections/activeFilter'])
const activeSort = computed(() => store.getters['user_selections/activeSort'])
const serializedUserData = computed(() => store.getters['user_selections/serializedUserData'])

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

watch(serializedUserData, (newVal, oldVal) => {
  if(newVal !== oldVal) store.dispatch('user_selections/selectionToLS')
})
</script>

<template>
  <div class="grid-page">
    <header class="grid-page-header">
      <h1 class="grid-items-header">
        Комплекты стеллажных систем
      </h1>
      <div class="grid-items-sorters">
        <ItemsSorter title="Сортировать по" :options="SORT_OPTIONS" :currentValue="activeSort" @select="updSort"/>
        <ItemsSorter title="Материал" :options="DISPLAY_OPTIONS" :currentValue="activeFilter" @select="updFilter"/>
      </div>
    </header>
    <main class="grid-items-wrap">
      <span v-if="loading" class="loader" />  
      <ItemsGrid v-else />
    </main>
  </div>
</template>
<style scoped></style>
