import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/LandingPage.vue";
import { useProfileStore } from "../stores/profile";
import { pinia } from "../main";

Vue.use(VueRouter);

const tokenGuard = (to, from, next) => {
  const profile = useProfileStore(pinia);
  if (!profile.getToken) {
    next({ name: "auth", query: { to: to.fullPath } });
  } else {
    next();
  }
};

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
      path: "/explore",
      name: "explore",
      component: () => import("../views/ExplorePage.vue"),
    },
    {
      path: "/community",
      name: "community",
      component: () => import("../views/CommunityPage.vue"),
      beforeEnter: tokenGuard
    },
    {
      path: "/routines",
      name: "routines",
      component: () => import("../views/MisRutinas.vue"),
      beforeEnter: tokenGuard,
    },
    {
      path: "/routines/create",
      name: "create_routine",
      component: () => import("../views/RoutineEditCreationPage.vue"),
      beforeEnter: tokenGuard,
    },
    {
      path: "/routines/:id",
      name: "routine",
      component: () => import("../views/RoutineDetailsPage.vue"),
      beforeEnter: tokenGuard
    },
    {
      path: "/routines/:id/edit",
      name: "routine_edit",
      component: () => import("../views/RoutineEditCreationPage.vue"),
      beforeEnter: tokenGuard
    },
    {
      path: "/profile/edit",
      name: "profile_edit",
      component: () => import("../views/EditProfilePage.vue"),
      beforeEnter: tokenGuard
    },
    {
      path: "/profile/:id",
      name: "profile_extern",
      component: () => import("../views/ProfilePage.vue"),
      beforeEnter: tokenGuard
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfilePage.vue"),
      beforeEnter: tokenGuard
    },
    {
      path: "/exercises",
      name: "exercises",
      component: () => import("../views/ExercisePage.vue"),
      beforeEnter: tokenGuard,
    },
    {
      path: "/exercises/create",
      name: "exercise_create",
      component: () => import("../views/ExerciseEditCreationPage.vue"),
      beforeEnter: tokenGuard,
    },
    {
      path: "/exercises/:id",
      name: "exercise_details",
      component: () => import("../views/ExerciseDetailsPage.vue"),
      beforeEnter: tokenGuard,
    },
    {
      path: "/exercises/:id/edit",
      name: "exercises_edit",
      component: () => import("../views/ExerciseEditCreationPage.vue"),
      beforeEnter: tokenGuard,
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/AuthPage.vue"),
    },
    {
      path: "*",
      name: "404",
      component: () => import("../views/ErrorFourOFour.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    console.log(`Saved Position: ${savedPosition}`);
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

export default router;
