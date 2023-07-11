<script setup lang="ts">
import ModalComponente from "@/components/ModalComponente.vue";
import FormularioEquipos from "../components/FormularioEquipos.vue";
import { ref } from "vue";
import { equiposService, ordenesTrabajoService } from "@/services";
import { EquipoInterface } from "@/interfaces/equipo.interface";
import { onMounted } from "vue";
import { cabecerasEquiposConAcciones } from "../utils";
import { OrdenTrabajoInterface } from "@/interfaces/orden-trabajo.interface";
import { cabecerasOrdenesTrabajo } from "../../ordenes-trabajo/views/utils";

onMounted(() => {
  obtenerEquipos();
});

const dialog = ref(false);
const itemsPorPagina = ref(10);
const cabeceras = ref(cabecerasEquiposConAcciones);
const cargando = ref(false);
const eliminando = ref(false);
const idEquipoAEliminar = ref<number | null>(null);
const ordenesTrabajo = ref<OrdenTrabajoInterface[]>([]);
const dialogOrdenesTrabajo = ref(false);
const itemsPorPaginaOrdenesTrabajo = ref(10);

const equipos = ref<EquipoInterface[]>([]);

const obtenerEquipos = async () => {
  cargando.value = true;

  try {
    const { data } = await equiposService.get();
    equipos.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    cargando.value = false;
  }
};

const actualizarLista = () => {
  obtenerEquipos();

  dialog.value = false;
};

const eliminarEquipo = async (id: number) => {
  idEquipoAEliminar.value = id;
  eliminando.value = true;

  try {
    await equiposService.destroy(id);

    idEquipoAEliminar.value = null;

    obtenerEquipos();
  } catch (error) {
    console.log(error);
  } finally {
    eliminando.value = false;
  }
};

const listarOrdenesTrabajo = async (id: number) => {
  try {
    const { data } = await ordenesTrabajoService.getOrdenesTrabajoEquipo(id);

    dialogOrdenesTrabajo.value = true;

    ordenesTrabajo.value = data;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex align-center">
        <h1>Equipos</h1>

        <v-btn
          class="ml-2"
          variant="text"
          color="primary"
          @click="obtenerEquipos"
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
        :items="equipos"
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
            :loading="eliminando && idEquipoAEliminar === item.columns.clId"
            @click="eliminarEquipo(item.columns.eqId)"
          >
            Eliminar
          </v-btn>

          <v-btn
            color="primary"
            variant="text"
            density="compact"
            @click="listarOrdenesTrabajo(item.columns.eqId)"
          >
            O. Trabajo
          </v-btn>
        </template>
      </v-data-table>
    </v-col>

    <modal-componente
      v-model="dialog"
      titulo="Nuevo Equipo"
      ancho-modal="1024"
      texto-ok-accion="Guardar"
    >
      <formulario-equipos @cerrar-modal="actualizarLista"></formulario-equipos>
    </modal-componente>

    <modal-componente
      v-model="dialogOrdenesTrabajo"
      titulo="Ordenes de Trabajo"
      ancho-modal="1024"
      texto-ok-accion="Guardar"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-data-table
              v-model:items-per-page="itemsPorPaginaOrdenesTrabajo"
              :headers="cabecerasOrdenesTrabajo"
              :items="ordenesTrabajo"
              :items-per-page-options="[
                { value: 10, title: '10' },
                { value: 20, title: '20' },
                { value: 30, title: '30' },
              ]"
              color="primary"
            >
            </v-data-table>
          </v-col>

          <v-col cols="12">
            <v-btn
              color="primary"
              variant="text"
              @click="dialogOrdenesTrabajo = false"
            >
              Cerrar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </modal-componente>
  </v-row>
</template>
