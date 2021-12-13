import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../components/home.vue"),
    },
    {
      path: "/register",
      component: () => import("../components/register.vue"),
    },
    {
      path: "/sign-in",
      component: () => import("../components/sign-in.vue"),
    },
    {
      path: "/feed",
      component: () => import("../components/feed.vue"),
    },
    {
      path: "/dropdown",
      component: () => import("../components/dropdown.vue")
  },
  ],
});

export default router;

    
   