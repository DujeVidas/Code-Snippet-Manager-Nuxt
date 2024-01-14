<template>
    <q-dialog
      transition-show="slide-right"
      transition-duration="300"
      transition-hide="slide-right"
    >
      <q-card style="width: 700px; height: 500px" class="card">
        <q-card-section>
          <q-item>
            <q-item-section>
              <div class="text-h6">{{ title }}</div>
            </q-item-section>
  
            <q-item-section side>
              <q-icon
                name="delete"
                color="red"
                size="md"
                @click="alert = true"
                style="cursor: pointer"
              />
            </q-item-section>
          </q-item>
          <q-dialog v-model="alert">
            <q-card>
              <q-card-section>
                <div class="text-h6">Alert</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                Do you Want To Delete This Snippet
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  flat
                  label="YES"
                  color="black"
                  @click="handleEmit"
                  v-close-popup
                />
                <q-btn flat label="NO" color="black" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <div class="tags-container">
            <div class="text-subtitle2" v-for="tag in tags" :key="tag">
              <p>{{ tag }}</p>
            </div>
          </div>
        </q-card-section>
  
        <q-card-section class="q-pt-none">
          <Prism :language="language">{{ code }}</Prism>
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn flat label="Close" color="black" v-close-popup />
          <q-btn flat label="Copy" color="black" @click="copyCode" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
  import 'prismjs';
  import 'prismjs/themes/prism.css';
  import Prism from 'vue-prism-component';
  import 'prismjs/components/prism-sql';
  import 'prismjs/components/prism-java';
  import 'prismjs/components/prism-c';
  import 'prismjs/components/prism-cpp';
  import 'prismjs/components/prism-python';
  import 'prismjs/components/prism-jsx';
  import 'prismjs/components/prism-docker';
  import { useQuasar } from 'quasar';
  import { ref } from 'vue';
  const emit = defineEmits('delete-snippet');
  const alert = ref(false);
  const props = defineProps({
    title: String,
    code: String,
    tags: Array,
    language: String,
    id: String,
  });
  
  const $q = useQuasar();
  
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(props.code);
      $q.notify({
        message: 'Copied',
        color: 'green',
      });
    } catch ($e) {
      $q.notify({
        message: 'Cannot Copy',
        color: 'red',
      });
    }
  };
  const handleEmit = () => {
    emit('delete-snippet', props.id);
  };
  </script>
  
  <style lang="scss" scoped>
  .tags-container {
    display: flex;
    justify-content: space-evenly;
  }
  
  .q-item-section--main {
    justify-content: flex-start;
  }
  
  .q-item-section--side {
    justify-content: flex-end;
  }
  .card {
    font-family: 'Rubix';
  }
  </style>
  