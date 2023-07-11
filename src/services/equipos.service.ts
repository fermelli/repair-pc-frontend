import { EquipoInterface } from "@/interfaces/equipo.interface";
import service from "./service";

const store = (equipo: EquipoInterface) => {
  return service.post<EquipoInterface>("/equipo", equipo);
};

const get = () => {
  return service.get<EquipoInterface[]>("/equipo");
};

export default {
  store,
  get,
};
