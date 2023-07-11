export const cabecerasOrdenesTrabajo = [
  {
    title: "ID",
    key: "orId",
    sortable: false,
  },
  {
    title: "Fecha",
    key: "orFecha",
  },
  {
    title: "Descripción",
    key: "orDescripcion",
    sortable: false,
  },
];

export const cabecerasOrdenesTrabajoConAcciones = cabecerasOrdenesTrabajo.concat([
  {
    title: "Acciones",
    key: "acciones",
    sortable: false,
  },
]);
