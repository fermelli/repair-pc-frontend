<script setup lang="ts">
import ModalComponente from "@/components/ModalComponente.vue";
import FormularioClientes from "../components/FormularioClientes.vue";
import { ref } from "vue";

const dialog = ref(false);
</script>

<template>
  <v-row>
    <v-col cols="12">
      <h1>Clientes</h1>
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
      titulo="Nuevo Cliente"
      ancho-modal="1024"
      texto-ok-accion="Guardar"
    >
      <formulario-clientes @cerrar-modal="dialog = false"></formulario-clientes>
    </modal-componente>
  </v-row>
</template>
