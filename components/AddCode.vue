<template>
  <q-dialog @before-hide="resetForm" transition-show="slide-down" transition-hide="slide-down" transition-duration="500">
    <div class="q-pa-sm">
      <q-card class="snippet-form">
        <q-card-section>
          <h2 class="q-mb-sm">Add Code Snippet</h2>
          <q-input outlined v-model="title" label="Title" class="q-mb-sm" maxlength="25" :error="!title.trim()" />
          <q-select outlined v-model="language" label="Language" :options="languageOptions" class="q-mb-sm" :error="!language" />
          <q-input outlined v-model="tags" maxlength="35" label="Tags (comma-separated)" class="q-mb-sm" :error="!tags.trim()" />
          <q-input outlined v-model="code" label="Code" type="textarea" rows="5" class="q-mb-sm" :error="!code.trim()" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="black" label="Save Snippet" @click="saveSnippet" :disable="!isFormValid" v-close-popup />
        </q-card-actions>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const title = ref(''), language = ref(''), tags = ref(''), code = ref('');

const emit = defineEmits(['add']);

const languageOptions = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C', value: 'c' },
  { label: 'C++', value: 'cpp' },
  { label: 'SQL', value: 'sql' },
  { label: 'JSX', value: 'jsx' },
  { label: 'Docker', value: 'docker' },
];

const isFormValid = computed(() => title.value.trim() !== '' && language.value !== '' && tags.value.trim() !== '' && code.value.trim() !== '');

function saveSnippet() {
  if (!isFormValid.value) return;
  const snippet = { id: uuidv4(), title: title.value, language: language.value, tags: tags.value.split(',').map(tag => tag.trim()), code: code.value };
  emit('add', snippet);
  resetForm();
}

function resetForm() { title.value = ''; language.value = ''; tags.value = ''; code.value = ''; }
</script>

<style lang="scss" scoped>
.snippet-form { max-width: 1000px; margin: 0 auto; background-color: #f5f5f5; border-radius: 8px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); max-height: 1000px; }
.q-card-section { display: flex; flex-direction: column; align-items: stretch; }
.q-card-actions { padding: 1px; }
.q-input--outlined.q-input--error { border-color: red; }
</style>
