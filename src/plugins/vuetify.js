import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import es from "vuetify/lib/locale/es";
import colors from 'vuetify/lib/util/colors'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { es },
    current: "es",
  },
  theme: {
    themes: {
      light: {
        primary: "#167BFF",
        contback: "#b2e5ff",
        contbacksecondary: "#c1e3f6",
        secondary: "#757575",
      },
    },
  },
  icons: {
    iconfont: 'mdi'
  }
});
