import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";

import App from "./App.vue";
import { router } from "./router";

import "./assets/main.css";
import type { RouteRecordRaw } from "vue-router";

import { Amplify } from "aws-amplify";
import aws_exports from "./aws-exports";

import { API } from "aws-amplify";
import * as queries from "./graphql/queries";
import type { ListPostsQuery } from "./API";
import type { GraphQLQuery } from "@aws-amplify/api";
import { useBlogStore } from "./stores/blog";

export const createApp = ViteSSG(
  App,
  { routes: router },
  async ({ app, router, initialState }) => {
    const pinia = createPinia();
    app.use(pinia);
    Amplify.configure(aws_exports);

    if (import.meta.env.SSR) {
      const { data } = await API.graphql<GraphQLQuery<ListPostsQuery>>({
        query: queries.listPosts
      });
      initialState.data = data;
    } else {
      // Restore or read the initial state on the client side in the browser
      const store = useBlogStore();
      store.posts = initialState.data || {};
    }
  }
);

export async function includedRoutes(
  paths: string[],
  routes: RouteRecordRaw[]
) {
  // runs during build time
  try {
    const { data } = await API.graphql<GraphQLQuery<ListPostsQuery>>({
      query: queries.listPosts
    });
    const items = data?.listPosts?.items.map(item => `/blog/${item?.slug}`);
    return (
      await Promise.all(
        routes.map(async route => {
          return route.name === "blog" ? items : route.path;
        })
      )
    ).flat();
  } catch (error) {
    console.log("error", error);
  }
}
