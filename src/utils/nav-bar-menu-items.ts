import { NavRoute } from "@/interfaces/nav-route.interface";

const navBarMenuItems: NavRoute[] = [
  {
    to: { name: "home" },
    icon: "mdi-home",
    text: "Home",
  },
  {
    to: { name: "dashboard" },
    icon: "mdi-view-dashboard",
    text: "Dashboard",
  },
];

export default navBarMenuItems;
