<template>
    <div>
      <q-card class="my-card text-white" bordered>
        <q-card-section @click="showDialog = true">
          <div class="text-h6 title" ref="titleRef">{{ title }}</div>
          <div class="tags-container">
            <div class="text-subtitle2 tags" v-for="tag in tags" :key="tag">
              <p>{{ tag }}</p>
            </div>
          </div>
        </q-card-section>
  
        <q-separator />
  
        <q-card-actions align="around">
          <q-btn flat dense @click="copyCode" class="full-width-btn">Copy</q-btn>
          <q-btn flat dense @click="showDialog = true" class="full-width-btn"
            >Open</q-btn
          >
        </q-card-actions>
      </q-card>
  
      <OpenCard
        v-model="showDialog"
        :title="title"
        :code="code"
        :tags="tags"
        :language="language"
        :id="id"
        @delete-snippet="handleEmit"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useQuasar } from 'quasar';
  const $q = useQuasar();
  const emit = defineEmits('delete-snippet');
  const showDialog = ref(false);
  
  const props = defineProps({
    title: String,
    code: String,
    tags: Array,
    language: String,
    id: String,
  });
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
  
  const handleEmit = (id) => {
    emit('delete-snippet', id);
  };
  
  const titleRef = ref(null);
  
  onMounted(() => {
    const titleEl = titleRef.value;
    if (titleEl) {
      if (titleEl.scrollWidth > titleEl.offsetWidth) {
        titleEl.style.textOverflow = 'ellipsis';
        titleEl.style.whiteSpace = 'nowrap';
        titleEl.style.overflow = 'hidden';
      }
    }
  });
  </script>
  
  <style lang="scss" scoped>
  .my-card {
    width: 250px;
    height: 150px;
    background: linear-gradient(45deg, #333333, #000000);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    font-family: 'Rubik', sans-serif;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .full-width-btn {
    width: 45%;
  }
  
  .my-card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.4);
  }
  
  .tags-container {
    display: flex;
    justify-content: space-evenly;
    cursor: default;
  }
  
  .title {
    font-family: 'Rubik', sans-serif;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 8px;
  }
  
  .tags {
    font-family: 'Fantasy', sans-serif;
    color: #b3b3b3;
    margin-right: 8px;
  }
  
  .q-card-actions button {
    color: #b3b3b3;
    transition: color 0.3s;
  }
  
  .q-card-actions button:hover {
    color: #ffffff;
  }
  </style>
  