import { EquipoInterface } from "@/interfaces/equipo.interface";
import service from "./service";

const guardarAperturaCuenta = (equipo: EquipoInterface) => {
  return service.post<EquipoInterface>("/equipo", equipo);
};

const obtenerEquipos = () => {
  return service.get<EquipoInterface[]>("/equipo");
};

const obtenerAperturaCuentas = (idCliente: number) => {
  return service.get<EquipoInterface[]>(`/equipo/${idCliente}`);
};

const eliminarAperturaCuenta = (id: number) => {
  return service.delete<EquipoInterface>(`/equipo/${id}`);
};

export default {
  guardarAperturaCuenta,
  obtenerEquipos,
  obtenerAperturaCuentas,
  eliminarAperturaCuenta,
};
