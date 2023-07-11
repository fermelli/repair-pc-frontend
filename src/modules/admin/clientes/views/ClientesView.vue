<script setup lang="ts">
import ModalComponente from "@/components/ModalComponente.vue";
import FormularioClientes from "../components/FormularioClientes.vue";
import { clientesService } from "@/services";
import { ref } from "vue";
import { ClienteInterface } from "@/interfaces/cliente.interface";
import { onMounted } from "vue";
import FormularioEquipos from "../../equipos/components/FormularioEquipos.vue";

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
const idClienteSeleccionado = ref<number | null>(null);

const obtenerClientes = async () => {
  cargando.value = true;

  try {
    const { data } = await clientesService.get();
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
    await clientesService.destroy(id);

    idClienteAEliminar.value = null;

    obtenerClientes();
  } catch (error) {
    console.log(error);
  } finally {
    eliminando.value = false;
  }
};

const registrarEquipo = (idCliente: number) => {
  idClienteSeleccionado.value = idCliente || null;
  dialogEquipo.value = true;
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
          @click="obtenerClientes"
        >
          Recargar
        </v-btn>
      </div>
    </v-col>

    <v-col cols="12">
      <v-btn
        color="primary"
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
        :items-per-page-options="[
          { value: 10, title: '10' },
          { value: 20, title: '20' },
          { value: 30, title: '30' },
        ]"
        :loading="cargando"
        color="primary"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.acciones="{ item }">
          <v-btn
            color="red"
            variant="text"
            density="compact"
            :disabled="eliminando"
            :loading="eliminando && idClienteAEliminar === item.columns.clId"
            @click="eliminarCliente(item.columns.clId)"
          >
            Eliminar
          </v-btn>

          <v-btn
            color="primary"
            variant="text"
            density="compact"
            @click="registrarEquipo(item.columns.clId)"
          >
            R. Equipo
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
        :id-cliente-pre-seleccionado="1"
        @cerrar-modal="dialogEquipo = false"
      ></formulario-equipos>
    </modal-componente>
  </v-row>
</template>
