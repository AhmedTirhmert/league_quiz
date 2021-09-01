
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/skins",
    name: "Skins",
    component: () => import(/* webpackChunkName: "skins" */ "../views/Skins.vue"),
  },
  {
    path: "/quiz",
    name: "Quiz",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "quiz" */ "../views/Quiz.vue"),
  },
  {
    path: "/quiz/spells",
    name: "Spells",
    component: () => import(/* webpackChunkName: "Quiz" */ "../views/Quiz.vue"),
  },
  {
    path: "/quiz/quotes",
    name: "Quotes",
    component: () => import(/* webpackChunkName: "Quiz" */ "../views/Quiz.vue"),
  },
  {
    path: "/quiz/passives",
    name: "Passives",
    component: () => import(/* webpackChunkName: "Quiz" */ "../views/Quiz.vue"),
  },
  {
    path: "/quiz/items",
    name: "Items",
    component: () => import(/* webpackChunkName: "Quiz" */ "../views/Quiz.vue"),
  },
  
];
export default routes
