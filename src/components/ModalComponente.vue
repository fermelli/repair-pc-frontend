<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  anchoModal: {
    type: [String, Number],
    default: "1024",
  },
  textoOkAccion: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "ok-accion"]);

const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <v-dialog
    v-model="dialog"
    persistent
    :width="anchoModal"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ titulo }}</span>
      </v-card-title>

      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
