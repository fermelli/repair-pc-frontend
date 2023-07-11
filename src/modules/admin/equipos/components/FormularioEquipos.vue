<script setup lang="ts">
import { ClienteInterface } from "@/interfaces/cliente.interface";
import { clientesService, equiposService } from "@/services";
import { campoRequerido } from "@/utils/validaciones";
import { onMounted } from "vue";
import { ref } from "vue";

const pros = defineProps({
  idClientePreSeleccionado: {
    type: Number,
    default: null,
  },
});

const idClienteSeleccionado = ref<number | null>(pros.idClientePreSeleccionado);

onMounted(() => {
  obtenerClientes();
});

const emit = defineEmits(["cerrar-modal"]);
const valoresIniciales = () => ({
  eqId: 0,
  eqModelo: "",
  eqMarca: "",
  eqDetalle: "",
  clId: 0,
});

const formulario = ref(valoresIniciales());
const formuarlioValido = ref(false);
const cargando = ref(false);
const clientes = ref<ClienteInterface[]>([]);
const cargandoClientes = ref(false);

const obtenerClientes = async () => {
  cargandoClientes.value = true;

  try {
    const { data } = await clientesService.get();

    clientes.value = data.map((cliente: ClienteInterface) => ({
      ...cliente,
      clNombre: `${cliente.clNombre} ${cliente.clApellidos}`,
    }));
  } catch (error) {
    console.log(error);
  } finally {
    cargandoClientes.value = false;
  }
};

const guardarEquipo = async () => {
  if (!formuarlioValido.value) return;

  cargando.value = true;
  try {
    await equiposService.store({ ...formulario.value, clId: idClienteSeleccionado.value || 0 });

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
    @submit.prevent="guardarEquipo"
  >
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            v-model="idClienteSeleccionado"
            :items="clientes"
            hide-no-data
            item-title="clNombre"
            item-value="clId"
            :loading="cargandoClientes"
            label="Cliente"
            outlined
            required
            :rules="[campoRequerido]"
            :disabled="idClientePreSeleccionado !== null"
          ></v-autocomplete>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="formulario.eqModelo"
            label="Modelo"
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
            v-model="formulario.eqMarca"
            label="Marca"
            outlined
            required
            :rules="[campoRequerido]"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="formulario.eqDetalle"
            label="Detalle"
            outlined
            required
            :rules="[campoRequerido]"
          ></v-textarea>
        </v-col>

        <v-col cols="12">
          <div class="d-flex justify-end">
            <v-btn
              class="mr-2"
              color="primary"
              variant="text"
              :disabled="cargando"
              append-icon="mdi-close"
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
              append-icon="mdi-content-save"
            >
              Guardar
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
