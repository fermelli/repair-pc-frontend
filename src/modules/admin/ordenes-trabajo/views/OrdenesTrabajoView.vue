<script setup lang="ts">
import { OrdenTrabajoInterface } from "@/interfaces/orden-trabajo.interface";
import { ordenesTrabajoService } from "@/services";
import { ref, onMounted } from "vue";
import { cabecerasOrdenesTrabajoConAcciones } from "./utils";
import { opcionesItemsPorPagina } from "@/utils/tabla-datos";
import { useToast } from "vue-toast-notification";

onMounted(() => {
  obtenerOrdenesTrabajo();
});

const itemsPorPagina = ref(10);
const cargando = ref(false);
const ordenesTrabajo = ref<OrdenTrabajoInterface[]>([]);
const eliminando = ref(false);
const idOrdenTrabajoAEliminar = ref<number | null>(null);
const $toast = useToast();

const obtenerOrdenesTrabajo = async () => {
  cargando.value = true;

  try {
    const { data } = await ordenesTrabajoService.obtenerOrdenesTrabajo();

    ordenesTrabajo.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    cargando.value = false;
  }
};

const eliminarOrdenTrabajo = async (id: number) => {
  idOrdenTrabajoAEliminar.value = id;
  eliminando.value = true;

  try {
    await ordenesTrabajoService.eliminarCuentaCorriente(id);

    idOrdenTrabajoAEliminar.value = null;

    $toast.success("Orden de trabajo eliminada correctamente");

    obtenerOrdenesTrabajo();
  } catch (error) {
    console.log(error);
  } finally {
    eliminando.value = false;
  }
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex align-center">
        <h1>Ordenes de Trabajo</h1>

        <v-btn
          class="ml-2"
          variant="text"
          color="primary"
          append-icon="mdi-reload"
          @click="obtenerOrdenesTrabajo"
        >
          Recargar
        </v-btn>
      </div>
    </v-col>

    <v-col>
      <v-data-table
        v-model:items-per-page="itemsPorPagina"
        :headers="cabecerasOrdenesTrabajoConAcciones"
        :items="ordenesTrabajo"
        :items-per-page-options="opcionesItemsPorPagina"
        :loading="cargando"
        color="primary"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.acciones="{ item }">
          <v-btn
            color="red"
            variant="text"
            icon="mdi-delete"
            :disabled="eliminando"
            :loading="eliminando && idOrdenTrabajoAEliminar === item.columns.orId"
            title="Eliminar"
            @click="eliminarOrdenTrabajo(item.columns.orId)"
          >
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
