import { OrdenTrabajoInterface } from "@/interfaces/orden-trabajo.interface";
import service from "./service";

const guardarCuentaCorriente = (ordenTrabajo: OrdenTrabajoInterface) => {
  return service.post<OrdenTrabajoInterface>("/ordenTrabajo", ordenTrabajo);
};

const obtenerOrdenesTrabajo = () => {
  return service.get<OrdenTrabajoInterface[]>("/ordenTrabajo");
};

const obtenerCuentasCorrientes = (idEquipo: number) => {
  return service.get<OrdenTrabajoInterface[]>(`/ordenTrabajo/${idEquipo}`);
};

const eliminarCuentaCorriente = (id: number) => {
  return service.delete<OrdenTrabajoInterface>(`/ordenTrabajo/${id}`);
};

export default {
  guardarCuentaCorriente,
  obtenerOrdenesTrabajo,
  obtenerCuentasCorrientes,
  eliminarCuentaCorriente,
};
