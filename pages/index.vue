<template>
  <ToolbarComp
    v-if="isComponentReady"
    :tags="tags"
    :languages="languages"
    @add-code="showDialog = true"
    @delete-all-snippets="deleteAllSnippets"
    @filter-tags="filterTags"
    @filter-languages="filterLanguages"
    @toggle-menu="toggleMenu"
    @close-menu="closeMenu"
    :userName="userName"
    :userEmail="userEmail"
    :showMenu="showMenu"
  />
  <div class="text-white bg-dark fill-div" @click="closeMenu">
    <q-input
      bg-color="white"
      rounded
      outlined
      v-model="text"
      label="Search Snippets"
      class="custom-input q-pb-lg"
      ><template v-slot:append>
        <q-icon
          v-if="text !== ''"
          name="close"
          @click="resetText"
          class="cursor-pointer"
        />
        <q-icon name="search" /> </template
    ></q-input>
    <div>
      <CardGrid :snippets="snippetsToShow" @delete-snippet="deleteSnippet" />
    </div>
  </div>
  <AddCode v-model="showDialog" :snippets="jsonData" @add="addSnippet" />
</template>

<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { getSnippetsFirebase } from "~/composables/api";
import { Loading } from "quasar";

definePageMeta({
  middleware: "user-auth",
});

const showMenu = ref(false);
const text = ref("");
const showDialog = ref(false);
const snippetsToShow = ref([]);
const jsonData = ref([]);
const tags = ref([1, 2, 3]);
const languages = ref([4, 5, 6]);
const snippetsTagsFiltered = ref([]);
const languagesToFilterToUse = ref([]);
const tagsToFilterToUse = ref([]);
const userId = ref({});
const userEmail = ref({});
const userName = ref({});
const isComponentReady = ref(false);

onMounted(async () => {
  const { $firebaseAuth } = useNuxtApp();
  onAuthStateChanged($firebaseAuth, async (user) => {
    if (user) {
      userId.value = user.uid;
      userEmail.value = user.email;
      userName.value = user.displayName;
      console.log(userId.value);
      console.log(userEmail.value);
      console.log(userName.value);

      isComponentReady.value = true;

      Loading.show();
      jsonData.value = (await getSnippetsFirebase(userId.value)) || [];
      Loading.hide();
      console.log(jsonData.value);
      snippetsToShow.value = jsonData.value;
      tags.value = getTags(jsonData.value);
      languages.value = getLanguages(jsonData.value);
      snippetsTagsFiltered.value = jsonData.value;

      document.body.addEventListener("click", handleBodyClick);
    } else {
      console.log("No user is signed in");
    }
  });
});

const closeMenu = () => {
  showMenu.value = false;
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const handleBodyClick = (event) => {
  const qAppElement = document.body;
  const isInsideQApp = qAppElement.contains(event.target);
  console.log(event.target);
  if (!isInsideQApp) {
    closeMenu();
  }
};

onBeforeUnmount(() => {
  document.body.removeEventListener("click", handleBodyClick);
});
const addSnippet = (snippet) => {
  snippet.language = snippet.language.value;
  saveSnippetFirebase(userId.value, snippet);
  jsonData.value.push(snippet);
  updateFilters();
};

const getTags = (snippets) => {
  const allTagsSet = new Set();
  snippets.forEach((snippet) => {
    snippet.tags.forEach((tag) => allTagsSet.add(tag));
  });
  return Array.from(allTagsSet);
};

const getLanguages = (snippets) => {
  const allLangSet = new Set();
  snippets.forEach((snippet) => {
    allLangSet.add(snippet.language);
  });
  return Array.from(allLangSet);
};

const updateFilters = () => {
  tags.value = getTags(jsonData.value);
  languages.value = getLanguages(jsonData.value);
};

const searchSnippets = () => {
  const searchText = text.value.toLowerCase();
  snippetsToShow.value = snippetsTagsFiltered.value.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchText) &&
      (tagsToFilterToUse.value.length === 0 ||
        snippet.tags.some((tag) => tagsToFilterToUse.value.includes(tag))) &&
      (languagesToFilterToUse.value.length === 0 ||
        languagesToFilterToUse.value.includes(snippet.language))
  );
};

const resetText = () => {
  text.value = "";
  updateFilters();
  searchSnippets();
};

const deleteAllSnippets = async () => {
  Loading.show();
  await deleteAllSnippetsFirebase(userId.value);
  jsonData.value = (await getSnippetsFirebase(userId.value)) || [];
  snippetsToShow.value = jsonData.value;
  snippetsTagsFiltered.value = [];
  tagsToFilterToUse.value = [];
  languagesToFilterToUse.value = [];
  updateFilters();
  Loading.hide();
};

const deleteSnippet = async (id) => {
  Loading.show();
  await deleteSnippetFirebase(userId.value, id);
  jsonData.value = (await getSnippetsFirebase(userId.value)) || [];
  snippetsToShow.value = jsonData.value;
  removeSnippetFrontend(id);
  updateFilters();
  Loading.hide();
};

const removeSnippetFrontend = (id) => {
  snippetsTagsFiltered.value = snippetsTagsFiltered.value.filter(
    (snippet) => snippet.id !== id
  );
};

const filterTags = (tagsToFilter) => {
  tagsToFilterToUse.value = tagsToFilter;
  searchSnippets();
};

const filterLanguages = (languagesToFilter) => {
  languagesToFilterToUse.value = languagesToFilter;
  searchSnippets();
};
</script>

<style lang="scss">
body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
body {
  background-color: #1d1d1d;
}
.custom-input {
  width: 400px;
  margin: 0 auto;
  padding-top: 20px;
  font-family: "Rubix";
}

.full-height {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.fill-div {
  flex: 1;
}
</style>
