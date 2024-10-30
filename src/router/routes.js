const routes = [
  {
    path: "/",
    component: () => import("pages/CardPage.vue"),
  },
  {
    path: "/create",
    component: () => import("pages/CreateCardPage.vue"),
  },
  {
    path: "/profile",
    component: () => import("pages/ProfilePage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
