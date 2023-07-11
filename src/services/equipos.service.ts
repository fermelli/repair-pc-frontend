import { EquipoInterface } from "@/interfaces/equipo.interface";
import service from "./service";

const store = (equipo: EquipoInterface) => {
  return service.post<EquipoInterface>("/equipo", equipo);
};

const get = () => {
  return service.get<EquipoInterface[]>("/equipo");
};

const getEquiposCliente = (idCliente: number) => {
  return service.get<EquipoInterface[]>(`/equipo/${idCliente}`);
};

const destroy = (id: number) => {
  return service.delete<EquipoInterface>(`/equipo/${id}`);
};

export default {
  store,
  get,
  getEquiposCliente,
  destroy,
};
