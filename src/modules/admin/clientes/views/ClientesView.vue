<script setup lang="ts">
import ModalComponente from "@/components/ModalComponente.vue";
import FormularioClientes from "../components/FormularioClientes.vue";
import { clientesService, equiposService } from "@/services";
import { ref } from "vue";
import { ClienteInterface } from "@/interfaces/cliente.interface";
import { onMounted } from "vue";
import FormularioEquipos from "../../equipos/components/FormularioEquipos.vue";
import { EquipoInterface } from "@/interfaces/equipo.interface";
import { cabecerasEquiposConAcciones } from "../../equipos/utils";
import { ordenesTrabajoService } from "@/services";
import { campoRequerido } from "@/utils/validaciones";
import { opcionesItemsPorPagina } from "@/utils/tabla-datos";
import { useToast } from "vue-toast-notification";

onMounted(() => {
  obtenerClientes();
});

const dialog = ref(false);
const itemsPorPagina = ref(10);
const cabeceras = ref([
  {
    title: "ID.",
    key: "clId",
    sortable: false,
  },
  {
    title: "C. I.",
    key: "clCi",
  },
  {
    title: "Nombre",
    key: "clNombre",
  },
  {
    title: "Apellidos",
    key: "clApellidos",
  },
  {
    title: "Teléfono",
    key: "clTelefono",
    sortable: false,
  },
  {
    title: "Dirección",
    key: "clDireccion",
    sortable: false,
  },
  {
    title: "Acciones",
    key: "acciones",
    sortable: false,
  },
]);
const cargando = ref(false);
const eliminando = ref(false);
const idClienteAEliminar = ref<number | null>(null);
const clientes = ref<ClienteInterface[]>([]);
const dialogEquipo = ref(false);
const idClienteSeleccionado = ref<number>(0);
const dialogListaEquipos = ref(false);
const equiposCliente = ref<EquipoInterface[]>([]);
const cabecerasEquiposTabla = ref(cabecerasEquiposConAcciones);
const itemsPorPaginaEquipos = ref(10);
const dialogOrdenTrabajo = ref(false);
const idEquipoSeleccionado = ref<number>(0);
const ordenTrabajo = ref({
  orId: 0,
  orFecha: "",
  orDescripcion: "",
  eqId: 0,
});
const formularioOrdenTrabajoValido = ref(false);
const $toast = useToast();

const obtenerClientes = async () => {
  cargando.value = true;

  try {
    const { data } = await clientesService.obtenerClientes();

    clientes.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    cargando.value = false;
  }
};

const actualizarLista = () => {
  obtenerClientes();

  dialog.value = false;
};

const eliminarCliente = async (id: number) => {
  idClienteAEliminar.value = id;
  eliminando.value = true;

  try {
    await clientesService.eliminarCliente(id);

    idClienteAEliminar.value = null;

    $toast.success("Cliente eliminado con éxito");

    obtenerClientes();
  } catch (error) {
    console.log(error);
  } finally {
    eliminando.value = false;
  }
};

const registrarEquipo = (idCliente: number) => {
  idClienteSeleccionado.value = idCliente;
  dialogEquipo.value = true;
};

const listarEquipos = async (idCliente: number) => {
  try {
    const { data } = await equiposService.obtenerAperturaCuentas(idCliente);

    equiposCliente.value = data;

    dialogListaEquipos.value = true;
  } catch (error) {
    console.log(error);
  }
};

const abrirModalregistrarOrdenTrabajo = (equipoId: number) => {
  idEquipoSeleccionado.value = equipoId;
  dialogOrdenTrabajo.value = true;
};

const registrarOrdenTrabajo = async () => {
  if (!formularioOrdenTrabajoValido.value) return;

  try {
    await ordenesTrabajoService.guardarCuentaCorriente({
      ...ordenTrabajo.value,
      eqId: idEquipoSeleccionado.value,
    });

    $toast.success("Orden de trabajo registrada con éxito");

    dialogOrdenTrabajo.value = false;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex align-center">
        <h1>Clientes</h1>

        <v-btn
          class="ml-2"
          variant="text"
          color="primary"
          append-icon="mdi-reload"
          @click="obtenerClientes"
        >
          Recargar
        </v-btn>
      </div>
    </v-col>

    <v-col cols="12">
      <v-btn
        color="primary"
        append-icon="mdi-plus"
        @click="dialog = true"
      >
        Nuevo
      </v-btn>
    </v-col>

    <v-col>
      <v-data-table
        v-model:items-per-page="itemsPorPagina"
        :headers="cabeceras"
        :items="clientes"
        :items-per-page-options="opcionesItemsPorPagina"
        :loading="cargando"
        color="primary"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.acciones="{ item }">
          <v-btn
            color="error"
            variant="text"
            icon="mdi-delete"
            :disabled="eliminando"
            :loading="eliminando && idClienteAEliminar === item.columns.clId"
            title="Eliminar"
            @click="eliminarCliente(item.columns.clId)"
          >
          </v-btn>

          <v-btn
            color="primary"
            variant="text"
            icon="mdi-table-plus"
            title="Registrar Equipo"
            @click="registrarEquipo(item.columns.clId)"
          >
          </v-btn>

          <v-btn
            color="primary"
            variant="text"
            icon="mdi-desktop-classic"
            title="Equipos del Cliente"
            @click="listarEquipos(item.columns.clId)"
          >
          </v-btn>
        </template>
      </v-data-table>
    </v-col>

    <modal-componente
      v-model="dialog"
      titulo="Nuevo Cliente"
      ancho-modal="1024"
      texto-ok-accion="Guardar"
    >
      <formulario-clientes @cerrar-modal="actualizarLista"></formulario-clientes>
    </modal-componente>

    <modal-componente
      v-model="dialogEquipo"
      titulo="Registrar Equipo"
      ancho-modal="1024"
      texto-ok-accion="Guardar"
    >
      <formulario-equipos
        :id-cliente-pre-seleccionado="idClienteSeleccionado"
        @cerrar-modal="dialogEquipo = false"
      ></formulario-equipos>
    </modal-componente>

    <modal-componente
      v-model="dialogListaEquipos"
      titulo="Equipos del Cliente"
      ancho-modal="1200"
      texto-ok-accion="Guardar"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-data-table
              v-model:items-per-page="itemsPorPaginaEquipos"
              :headers="cabecerasEquiposTabla"
              :items="equiposCliente"
              :items-per-page-options="opcionesItemsPorPagina"
              color="primary"
            >
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.acciones="{ item }">
                <v-btn
                  color="primary"
                  variant="text"
                  icon="mdi-file-plus"
                  title="Registrar Orden de Trabajo"
                  @click="abrirModalregistrarOrdenTrabajo(item.columns.eqId)"
                >
                </v-btn>
              </template>
            </v-data-table>
          </v-col>

          <v-col cols="12">
            <v-btn
              color="primary"
              variant="text"
              append-icon="mdi-close"
              @click="dialogListaEquipos = false"
            >
              Cerrar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </modal-componente>

    <modal-componente
      v-model="dialogOrdenTrabajo"
      titulo="Registrar Orden de Trabajo"
      ancho-modal="1200"
      texto-ok-accion="Guardar"
    >
      <v-form
        v-model="formularioOrdenTrabajoValido"
        @submit.prevent="registrarOrdenTrabajo"
      >
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="ordenTrabajo.orFecha"
                label="Fecha"
                outlined
                type="date"
                required
                :rules="[campoRequerido]"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="ordenTrabajo.orDescripcion"
                label="Descripción"
                outlined
                rows="3"
                required
                :rules="[campoRequerido]"
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <div class="d-flex justify-end">
                <v-btn
                  color="primary"
                  variant="text"
                  append-icon="mdi-close"
                  @click="dialogOrdenTrabajo = false"
                >
                  Cancelar
                </v-btn>

                <v-btn
                  class="ml-2"
                  color="primary"
                  type="submit"
                  append-icon="mdi-content-save"
                >
                  Registrar
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </modal-componente>
  </v-row>
</template>
