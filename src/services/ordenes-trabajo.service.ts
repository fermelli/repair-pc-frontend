import { OrdenTrabajoInterface } from "@/interfaces/orden-trabajo.interface";
import service from "./service";

const store = (ordenTrabajo: OrdenTrabajoInterface) => {
  return service.post<OrdenTrabajoInterface>("/ordenTrabajo", ordenTrabajo);
};

const get = () => {
  return service.get<OrdenTrabajoInterface[]>("/ordenTrabajo");
};

export default {
  store,
  get,
};
