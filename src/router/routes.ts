import homeRoutes from "@/modules/pages/home/routes";
import productsRoutes from "@/modules/pages/products/routes";
import adminDashboardRoutes from "@/modules/admin/dashboard/routes";
import adminInfoRoutes from "@/modules/admin/info/routes";
import adminPersonalDataRoutes from "@/modules/admin/personal-data/routes";
import adminClientesRoutes from "@/modules/admin/clientes/routes";
import adminEquiposRoutes from "@/modules/admin/equipos/routes";
import { Route } from "@/types/routes.type";

const routes: Route[] = [
  ...homeRoutes,
  ...productsRoutes,
  ...adminDashboardRoutes,
  ...adminInfoRoutes,
  ...adminPersonalDataRoutes,
  ...adminClientesRoutes,
  ...adminEquiposRoutes,
];

export default routes;
