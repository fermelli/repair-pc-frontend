import { OrdenTrabajoInterface } from "@/interfaces/orden-trabajo.interface";
import service from "./service";

const store = (ordenTrabajo: OrdenTrabajoInterface) => {
  return service.post<OrdenTrabajoInterface>("/ordenTrabajo", ordenTrabajo);
};

const get = () => {
  return service.get<OrdenTrabajoInterface[]>("/ordenTrabajo");
};

const getOrdenesTrabajoEquipo = (idEquipo: number) => {
  return service.get<OrdenTrabajoInterface[]>(`/ordenTrabajo/${idEquipo}`);
};

const destroy = (id: number) => {
  return service.delete<OrdenTrabajoInterface>(`/ordenTrabajo/${id}`);
};

export default {
  store,
  get,
  getOrdenesTrabajoEquipo,
  destroy,
};
