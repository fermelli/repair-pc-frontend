<script setup lang="ts">
import ModalComponente from "@/components/ModalComponente.vue";
import FormularioEquipos from "../components/FormularioEquipos.vue";
import { ref } from "vue";
import { equiposService } from "@/services";
import { EquipoInterface } from "@/interfaces/equipo.interface";
import { onMounted } from "vue";
import { cabecerasEquipos } from "../utils";

onMounted(() => {
  obtenerEquipos();
});

const dialog = ref(false);
const itemsPorPagina = ref(10);
const cabeceras = ref(cabecerasEquipos);
const cargando = ref(false);

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
  </v-row>
</template>
