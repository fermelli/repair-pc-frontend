import { ClienteInterface } from "@/interfaces/cliente.interface";
import service from "./service";

const store = (cliente: ClienteInterface) => {
  return service.post<ClienteInterface>("/cliente", cliente);
};

const get = () => {
  return service.get<ClienteInterface[]>("/cliente");
};

const destroy = (id: number) => {
  return service.delete<ClienteInterface>(`/cliente/${id}`);
};

export default {
  store,
  get,
  destroy,
};
