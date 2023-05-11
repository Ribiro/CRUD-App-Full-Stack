import { createRouter, createWebHistory } from "vue-router";
import ContactsView from "../views/ContactsView.vue";

const routes = [
    {
        path: "/",
        name: "contacts",
        component: ContactsView,
      },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });
  
  export default router;