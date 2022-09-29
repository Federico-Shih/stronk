<script>
import { mapActions, mapState } from "pinia";
import { usePopupStore, Popup } from "../stores/auth";
import { useProfileStore } from "../stores/profile";

export default {
  computed: {
    ...mapState(usePopupStore, ["show", "onAuthRoute", "popupType"]),
    passwordConfirmRule() {
      return (
        this.password === this.confirmPassword ||
        "Las contraseñas tienen que ser idénticas"
      );
    },
  },
  watch: {
    show(curr) {
      if (curr) {
        this.isRegister = this.popupType === Popup.REGISTER;
      }
    },
    isRegister() {
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    },
  },
  data: () => ({
    MAX_USERLENGTH: 20,
    valid: false,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    emailRules: [
      (v) => !!v || "Tiene que ingresar correo electrónico",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Tiene que ingresar contraseña",
      (v) =>
        (!!v && v.length >= 8) ||
        "La contraseña tiene que tener mínimo 8 carácteres",
    ],
    usernameRules: [
      (v) =>
        !v ||
        v.length <= 20 ||
        "Nombre de usuario tiene que tener como mucho 10 carácteres",
      (v) => !!v || "Tiene que ingresar nombre de usuario",
    ],
    hidePass: true,
    hideConfirm: true,
    isRegister: true,
  }),
  methods: {
    ...mapActions(useProfileStore, ["setProfile"]),
    ...mapActions(usePopupStore, ["hidePopup"]),
    onSubmit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.setProfile({ username: this.username, email: this.email });
        if (this.onAuthRoute !== this.$route.path) {
          this.$router.push(this.onAuthRoute);
        }
        this.hidePopup();
      }
    },
  },
};
</script>

<template>
  <v-overlay :value="this.show">
    <v-card class="pa-8 card-anim" min-width="500px">
      <v-btn
        style="position: absolute; right: 0; top: 0; z-index: 1000"
        class="ma-5"
        icon
        @click="hidePopup"
        ><v-icon>mdi-close</v-icon></v-btn
      >
      <v-row style="position: relative" class="mb-5">
        <v-fade-transition hide-on-leave group>
          <v-col :key="1" v-if="isRegister" class="text-lg-center text-h5"
            >Registrarse</v-col
          >

          <v-col :key="2" v-if="!isRegister" class="text-lg-center text-h5"
            >Iniciar sesión</v-col
          ></v-fade-transition
        >
      </v-row>
      <v-expand-transition>
        <v-form @submit.prevent="onSubmit" ref="form" class="" v-model="valid">
          <v-expand-transition>
            <v-text-field
              v-model="username"
              label="Nombre de usuario"
              :counter="MAX_USERLENGTH"
              :rules="usernameRules"
              v-if="isRegister"
              :key="1"
              required
            ></v-text-field>
          </v-expand-transition>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Correo electrónico"
            required
            :key="2"
          ></v-text-field>
          <v-text-field
            :rules="passwordRules"
            label="Contraseña"
            :type="hidePass ? 'password' : 'text'"
            required
            :append-icon="hidePass ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="hidePass = !hidePass"
            :key="3"
            v-model="password"
          ></v-text-field>
          <v-expand-transition>
            <v-text-field
              v-if="isRegister"
              label="Confirmar contraseña"
              required
              v-model="confirmPassword"
              :append-icon="hideConfirm ? 'mdi-eye-off' : 'mdi-eye'"
              :type="hideConfirm ? 'password' : 'text'"
              @click:append="hideConfirm = !hideConfirm"
              :key="4"
              :rules="[passwordConfirmRule]"
            >
            </v-text-field>
          </v-expand-transition>
          <v-container class="width_full d-flex flex-column align-center">
            <v-btn type="submit" color="primary">{{
              isRegister ? "Registrarse" : "Iniciar sesión"
            }}</v-btn>
            <div v-if="isRegister" class="mt-2">
              Ya tiene una cuenta?
              <a @click="isRegister = false">Inicie sesión</a>
            </div>
            <div v-else class="mt-2">
              No tiene una cuenta?
              <a @click="isRegister = true">Registrese</a>
            </div>
          </v-container>
        </v-form>
      </v-expand-transition>
    </v-card>
  </v-overlay>
</template>

<style></style>
