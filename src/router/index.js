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
    },
    {
      path: "/explore",
      name: "explore",
      component: () => import("../views/ExplorePage.vue"),
    },
    {
      path: "/community",
      name: "community",
      component: () => import("../views/CommunityPage.vue"),
    },
    {
      path: "/routines",
      name: "routines",
      component: () => import("../views/MisRutinas.vue"),
    },
    {
      path: "/routines/:id",
      name: "routine",
      component: () => import("../views/RoutineDetailsPage.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfilePage.vue"),
    },
    {
      path: "/exercises",
      name: "exercises",
      component: () => import("../views/ExercisePage.vue"),
    },
    {
      path: "/exercises/data",
      name: "exercise_details",
      component: () => import("../views/ExerciseDetailsPage.vue"),
    },
  ],
});

export default router;
