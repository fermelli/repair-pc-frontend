<script setup lang="ts">
import ModalComponente from "@/components/ModalComponente.vue";
import FormularioEquipos from "../components/FormularioEquipos.vue";
import { ref } from "vue";

const dialog = ref(false);
</script>

<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex align-center">
        <h1>Equipos</h1>
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

    <modal-componente
      v-model="dialog"
      titulo="Nuevo Equipo"
      ancho-modal="1024"
      texto-ok-accion="Guardar"
    >
      <formulario-equipos @cerrar-modal="dialog = false"></formulario-equipos>
    </modal-componente>
  </v-row>
</template>
