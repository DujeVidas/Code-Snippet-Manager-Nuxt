<template>
    <q-btn flat round dense icon="translate" color="white">
      <q-menu :offset="[30, 10]" class="bg-grey-10 text-white rounded-borders">
        <q-list
          v-for="language in languages"
          :key="language"
          style="min-width: 100px"
        >
          <q-item clickable @click="handleLanguage(language)">
            <q-item-section
              class="item"
              :class="{ selected_item: languagesToFilter.includes(language) }"
              >{{ language }}</q-item-section
            >
          </q-item>
        </q-list>
      </q-menu>
      <q-tooltip>Filter By Language</q-tooltip>
    </q-btn>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const emit = defineEmits(['sendLanguages']);
  
  const props = defineProps({
    languages: Array,
  });
  const languagesToFilter = ref([]);
  const handleLanguage = (language) => {
    if (!languagesToFilter.value.includes(language)) {
      languagesToFilter.value.push(language);
    } else {
      languagesToFilter.value = languagesToFilter.value.filter(
        (langinArr) => langinArr != language
      );
    }
    const languagesToFilterArr = Object.values(languagesToFilter.value);
    emit('sendLanguages', languagesToFilterArr);
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
  