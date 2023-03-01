<script setup lang="ts">
import { useBlogStore } from "../stores/blog";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const route = useRoute();
const store = useBlogStore();

const { posts } = storeToRefs(store);

const content = posts.value.listPosts?.items.find(
  v => v?.slug === `${route.params.id}`
);
</script>

<template>
  <h1>{{ content?.title }}</h1>
  <div>
    <p>{{ content?.content }}</p>
  </div>
  <div style="color: gray">{{ content?.date }}</div>
</template>
