import { createRouter, createWebHistory } from "vue-router";
import LoginVue from "@/views/Login.vue";
import HomeVue from "@/views/Home.vue";
import { useAccessTokenStore } from "@/stores/accessToken";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeVue,
      meta: {privateRoute: true}
    },
    {
      path: "/",
      name: "login",
      component: LoginVue,
    },
  ],
});

router.beforeEach((to, from) => {
  const store = useAccessTokenStore();
  if (to.name !== 'login' && to.meta.privateRoute && !store.isAuthenticated) {
    return { name: 'login' }
  } else if (to.name === 'cadastro' && store.isAuthenticated) {
    return { name: 'home' }
  }
});

export default router;
