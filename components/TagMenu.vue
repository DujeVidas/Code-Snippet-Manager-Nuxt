<template>
    <q-btn flat round dense icon="sell" color="white">
      <q-menu :offset="[30, 10]" class="bg-grey-10 text-white rounded-borders">
        <q-list v-for="tag in tags" :key="tag" style="min-width: 100px">
          <q-item clickable @click="handleTag(tag)">
            <q-item-section
              class="item"
              :class="{ selected_item: tagsToFilter.includes(tag) }"
              >{{ tag }}</q-item-section
            >
          </q-item>
        </q-list>
      </q-menu>
      <q-tooltip>Filter By Tags</q-tooltip>
    </q-btn>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const emit = defineEmits(['sendTags']);
  
  const props = defineProps({
    tags: Array,
  });
  const tagsToFilter = ref([]);
  const handleTag = (tag) => {
    if (!tagsToFilter.value.includes(tag)) {
      tagsToFilter.value.push(tag);
    } else {
      tagsToFilter.value = tagsToFilter.value.filter(
        (taginArr) => taginArr != tag
      );
    }
    const tagsToFilterArr = Object.values(tagsToFilter.value);
    emit('sendTags', tagsToFilterArr);
  };
  </script>
  
  <style lang="scss" scoped>
  .item {
    border-radius: 5px;
    align-items: center;
    font-family: 'RubixSmall';
  }
  .selected_item {
    background-color: green;
    box-shadow: 0 3px 6px aquamarine;
  }
  </style>
  