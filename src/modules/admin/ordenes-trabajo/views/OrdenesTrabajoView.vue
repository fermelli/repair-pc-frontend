<script setup lang="ts">
import { OrdenTrabajoInterface } from "@/interfaces/orden-trabajo.interface";
import { ordenesTrabajoService } from "@/services";
import { ref, onMounted } from "vue";
import { cabecerasOrdenesTrabajo } from "./utils";

onMounted(() => {
  obtenerOrdenesTrabajo();
});

const itemsPorPagina = ref(10);
const cabeceras = ref(cabecerasOrdenesTrabajo);
const cargando = ref(false);
const ordenesTrabajo = ref<OrdenTrabajoInterface[]>([]);

const obtenerOrdenesTrabajo = async () => {
  cargando.value = true;

  try {
    const { data } = await ordenesTrabajoService.get();

    ordenesTrabajo.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    cargando.value = false;
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
          @click="obtenerOrdenesTrabajo"
        >
          Recargar
        </v-btn>
      </div>
    </v-col>

    <v-col>
      <v-data-table
        v-model:items-per-page="itemsPorPagina"
        :headers="cabeceras"
        :items="ordenesTrabajo"
        :items-per-page-options="[
          { value: 10, title: '10' },
          { value: 20, title: '20' },
          { value: 30, title: '30' },
        ]"
        :loading="cargando"
        color="primary"
      >
      </v-data-table>
    </v-col>
  </v-row>
</template>
