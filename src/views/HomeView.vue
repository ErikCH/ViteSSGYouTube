<script setup lang="ts">
import { useBlogStore } from "@/stores/blog";
import { storeToRefs } from "pinia";
const store = useBlogStore();

const { postPaths } = storeToRefs(store);
</script>

<template>
  <div v-for="(path, idx) in postPaths" :key="idx">
    <router-link :to="`${path!}`">{{ path }}</router-link>
  </div>
</template>
