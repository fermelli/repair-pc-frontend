import { Route } from "@/types/routes.type";

const routes: Route[] = [
  {
    path: "/equipos",
    name: "equipos",
    component: () => import("./views/EquiposView.vue"),
    meta: {
      layout: "admin-layout",
    },
  },
];

export default routes;
