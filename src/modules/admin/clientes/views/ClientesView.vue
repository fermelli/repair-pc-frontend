<script setup lang="ts">
import ModalComponente from "@/components/ModalComponente.vue";
import FormularioClientes from "../components/FormularioClientes.vue";
import { clientesService } from "@/services";
import { ref } from "vue";
import { ClienteInterface } from "@/interfaces/cliente.interface";
import { onMounted } from "vue";

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
]);
const cargando = ref(false);

const clientes = ref<ClienteInterface[]>([]);

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
      ></v-data-table>
    </v-col>

    <modal-componente
      v-model="dialog"
      titulo="Nuevo Cliente"
      ancho-modal="1024"
      texto-ok-accion="Guardar"
    >
      <formulario-clientes @cerrar-modal="actualizarLista"></formulario-clientes>
    </modal-componente>
  </v-row>
</template>