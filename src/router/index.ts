import type { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

export const router: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue")
  },
  {
    path: "/blog/",
    name: "blog",
    component: () => import("../views/Blog.vue")
  },
  {
    path: "/blog/:id",
    name: "post",
    component: () => import("../views/Post.vue")
  }
];
