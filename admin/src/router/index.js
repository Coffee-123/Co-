import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Users from "../components/Users.vue";
import HomePage from "../components/HomePage.vue";
import Songlist from "../components/Songlist.vue";
import SonglistSongs from "../components/SonglistSongs.vue";
import Square from "../components/Square.vue";
import Data from "../components/Data.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
    meta: { isPublic: true },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    redirect: "/homepage",
    children: [
      { path: "/homepage", component: HomePage },
      { path: "/users", component: Users },
      { path: "/songlist", component: Songlist },
      { path: "/songlistSongs/:id",name:"songlistSongs", component: SonglistSongs },
      { path: "/square", component:  Square },
      { path: "/data",name:"data", component: Data }
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

//导航守卫
router.beforeEach((to, from, next) => {
  //如果没有isPublic 而且没有token 就返回login页面
  if (!to.meta.isPublic && !sessionStorage.token) {
    return next("/login");
  }
  next();
});

export default router;
