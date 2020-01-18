import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index.js";
import Unauthorized from "../components/Unauthorized";
import NotFound from "../components/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/catalog",
    name: "catalog",
    component: () =>
      import(/* webpackChunkName: "catalog" */ "../views/Catalog.vue")
  },
  {
    path: "/song/:songId",
    name: "song",
    component: () => import(/* webpackChunkName: "song" */ "../views/Song.vue"),
    props: true
  },
  {
    path: "/creator",
    name: "creator",
    component: () =>
      import(/* webpackChunkName: "creator" */ "../views/Creator.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/user::user_id",
    component: () => import("../views/Profile.vue"),
    props: true,
    children: [
      {
        path: "songs",
        name: "userSongs",
        component: () => import("../components/Profile/UserSongs")
      },
      {
        path: "playlists",
        name: "userPlaylists",
        component: () => import("../components/Profile/UserPlaylists")
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("../components/Profile/Settings"),
        beforeEnter: (to, from, next) => {
          if (store.getters.currentUser.id === to.params.user_id){
            next();
          }else next("/401");
        }
      }
    ]
  },
  {
    path: "/401",
    component: Unauthorized
  },
  { path: "/404", component: NotFound },
  { path: "*", redirect: "/404" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLogged) {
      next();
      return;
    }
    next("/401");
  } else {
    next();
  }
});


export default router;
