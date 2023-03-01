import { defineStore } from "pinia";
import type { ListPostsQuery } from "../API";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    posts: {} as ListPostsQuery
  }),
  getters: {
    postPaths: state =>
      state.posts.listPosts?.items.map(post => `/blog/${post?.slug}`)
  }
});
