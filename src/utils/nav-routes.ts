import { NavRoute } from "@/interfaces/nav-route.interface";

const navRoutes: NavRoute[] = [
  {
    to: { name: "dashboard" },
    icon: "mdi-view-dashboard",
    text: "Dashboard",
  },
  {
    to: { name: "clientes" },
    icon: "mdi-account-group",
    text: "Clientes",
  },
  {
    to: { name: "equipos" },
    icon: "mdi-desktop-classic",
    text: "Equipos",
  },
  {
    to: { name: "ordenes-trabajo" },
    icon: "mdi-file-document-edit-outline",
    text: "Ordenes de Trabajo",
  },
];

export default navRoutes;
