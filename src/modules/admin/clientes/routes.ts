import { Route } from "@/types/routes.type";

const routes: Route[] = [
  {
    path: "/clientes",
    name: "clientes",
    component: () => import("./views/ClientesView.vue"),
    meta: {
      layout: "admin-layout",
    },
  },
];

export default routes;
