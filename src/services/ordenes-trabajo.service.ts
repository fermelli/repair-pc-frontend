import { OrdenTrabajoInterface } from "@/interfaces/orden-trabajo.interface";
import service from "./service";

const store = (ordenTrabajo: OrdenTrabajoInterface) => {
  return service.post<OrdenTrabajoInterface>("/ordenTrabajo", ordenTrabajo);
};

export default {
  store,
};
