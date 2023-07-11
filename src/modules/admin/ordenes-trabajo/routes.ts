import { Route } from "@/types/routes.type";

const routes: Route[] = [
  {
    path: "/ordenes-trabajo",
    name: "ordenes-trabajo",
    component: () => import("./views/OrdenesTrabajoView.vue"),
    meta: {
      layout: "admin-layout",
    },
  },
];

export default routes;
