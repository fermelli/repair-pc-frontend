import homeRoutes from "@/modules/pages/home/routes";
import adminDashboardRoutes from "@/modules/admin/dashboard/routes";
import adminClientesRoutes from "@/modules/admin/clientes/routes";
import adminEquiposRoutes from "@/modules/admin/equipos/routes";
import adminOrdenesTrabajoRoutes from "@/modules/admin/ordenes-trabajo/routes";
import { Route } from "@/types/routes.type";

const routes: Route[] = [
  ...homeRoutes,
  ...adminDashboardRoutes,
  ...adminClientesRoutes,
  ...adminEquiposRoutes,
  ...adminOrdenesTrabajoRoutes,
];

export default routes;
