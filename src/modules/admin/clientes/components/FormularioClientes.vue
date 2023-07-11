<script setup lang="ts">
import { ref } from "vue";
import { clientesService } from "@/services";
import { campoRequerido } from "@/utils/validaciones";

const emit = defineEmits(["cerrar-modal"]);
const valoresIniciales = () => ({
  clCi: null,
  clNombre: "",
  clApellidos: "",
  clTelefono: null,
  clDireccion: "",
});

const formulario = ref(valoresIniciales());
const formuarlioValido = ref(false);
const cargando = ref(false);

const guardarCliente = async () => {
  if (!formuarlioValido.value) return;

  cargando.value = true;
  try {
    await clientesService.store(formulario.value);

    formulario.value = valoresIniciales();

    emit("cerrar-modal");
  } catch (error) {
    console.log(error);
  } finally {
    cargando.value = false;
  }
};
</script>

<template>
  <v-form
    v-model="formuarlioValido"
    :disabled="cargando"
    @submit.prevent="guardarCliente"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="formulario.clCi"
            label="C. I."
            outlined
            type="number"
            required
            :rules="[campoRequerido]"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="8"
        ></v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="formulario.clNombre"
            label="Nombres"
            outlined
            required
            :rules="[campoRequerido]"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="formulario.clApellidos"
            label="Apellidos"
            outlined
            required
            :rules="[campoRequerido]"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="formulario.clTelefono"
            label="Teléfono"
            outlined
            type="number"
            required
            :rules="[campoRequerido]"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="formulario.clDireccion"
            label="Dirección"
            outlined
            required
            :rules="[campoRequerido]"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <div class="d-flex justify-end">
            <v-btn
              class="mr-2"
              color="primary"
              variant="text"
              :disabled="cargando"
              @click="emit('cerrar-modal')"
            >
              Cancelar
            </v-btn>

            <v-btn
              class="ml-2"
              color="primary"
              type="submit"
              :disabled="cargando"
              :loading="cargando"
            >
              Guardar
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
