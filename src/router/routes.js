const routes = [
  {
    path: "/",
    component: () => import("layouts/MainCard.vue"),
  },
  {
    path: "/create-conclusion",
    component: () => import("pages/CreateCardPage.vue"),
  },
  {
    path: "/profile",
    component: () => import("pages/ProfilePage.vue"),
  },
  {
    path: "/registration",
    component: () => import("pages/RegistrationPage.vue"),
  },
  {
    path: "/authorization",
    component: () => import("pages/AuthPage.vue"),
  },
  {
    path: "/admin-user",
    component: () => import("../components/Admin/AdminUser.vue"),
  },
  {
    path: "/temporary-conclusion",
    component: () => import("../pages/TemporaryPage.vue"),
  },
  {
    path: "/edit-temps",
    component: () => import("../components/TemporaryConclusion/EditPage.vue"),
  },
  {
    path: "/remake-temps",
    component: () => import("../components/Remake/RemakePage.vue"),
  },
  {
    path: "/reset-password",
    component: () => import("../pages/ResetPassword.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
