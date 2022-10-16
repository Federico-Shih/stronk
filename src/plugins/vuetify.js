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
        primary: "#5a31ff",
        darkback: "#170e46",
        contback: "#eee0ff",
        contbacksecondary: "#e1cdff",
        secondary: "#fd8e01",
      },
    },
  },
  icons: {
    iconfont: 'mdi'
  }
});
