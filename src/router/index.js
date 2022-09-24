import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/LandingPage.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing,
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomePage.vue"),
      children: [
        {
          path: "explore",
          name: "explore",
          component: () => import("../views/ExplorePage.vue"),
        },
      ],
    },
  ],
});

export default router;
