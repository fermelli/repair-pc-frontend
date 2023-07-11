import { ClienteInterface } from "@/interfaces/cliente.interface";
import service from "./service";

const store = (cliente: ClienteInterface) => {
  return service.post<ClienteInterface>("/cliente", cliente);
};

const get = () => {
  return service.get<ClienteInterface[]>("/cliente");
};

export default {
  store,
  get,
};
