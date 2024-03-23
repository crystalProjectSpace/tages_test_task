<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const getLists = async function() {
    await Promise.all([
        store.dispatch('storewares/acquireItemList'),
        store.dispatch('storewares/acquireMaterialsList'),
    ])
}

getLists()
const items = computed( () => store.getters['storewares/items'])
const materials = computed( () => store.getters['storewares/materials'])
</script>
<template>
    <div class="items-grid">
        <div>{{ materials }}</div>
        <div>{{ items }}</div>
    </div>
</template>