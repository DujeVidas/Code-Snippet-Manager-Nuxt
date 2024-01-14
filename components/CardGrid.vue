<template>
  <div class="grid-container">
    <div v-for="snippet in snippets" :key="snippet" class="grid-item">
      <CardComponent
        :title="snippet.title"
        :tags="snippet.tags"
        :code="snippet.code"
        :language="snippet.language"
        :id="snippet.id"
        @delete-snippet="handleEmit"
      />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits("delete-snippet");

const props = defineProps({
  snippets: Array,
});

const handleEmit = (id) => {
  emit("delete-snippet", id);
};
</script>

<style lang="scss" scoped>
.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}
</style>
