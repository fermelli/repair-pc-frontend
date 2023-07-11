import { EquipoInterface } from "@/interfaces/equipo.interface";
import service from "./service";

const store = (equipo: EquipoInterface) => {
  return service.post<EquipoInterface>("/equipo", equipo);
};

export default {
  store,
};
