import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VDataTable } from "vuetify/labs/VDataTable";
import { es } from "vuetify/locale";

const vuetify = createVuetify({
  components: {
    VDataTable,
  },
  locale: {
    locale: "es",
    messages: { es },
  },
});

export default vuetify;
