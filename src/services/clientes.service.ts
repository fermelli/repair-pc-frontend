import { ClienteInterface } from "@/interfaces/cliente.interface";
import service from "./service";

const store = (cliente: ClienteInterface) => {
  return service.post<ClienteInterface>("/cliente", cliente);
};

export default {
  store,
};
