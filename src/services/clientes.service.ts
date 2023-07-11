import { ClienteInterface } from "@/interfaces/cliente.interface";
import service from "./service";

const guardarCliente = (cliente: ClienteInterface) => {
  return service.post<ClienteInterface>("/cliente", cliente);
};

const obtenerClientes = () => {
  return service.get<ClienteInterface[]>("/cliente");
};

const eliminarCliente = (id: number) => {
  return service.delete<ClienteInterface>(`/cliente/${id}`);
};

export default {
  guardarCliente,
  obtenerClientes,
  eliminarCliente,
};
