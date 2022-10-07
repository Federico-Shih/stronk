<script>
import { mapActions, mapState } from "pinia";
import { usePopupStore, Popup } from "@/stores/auth";
import { useProfileStore } from "@/stores/profile";

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
    firstname: "",
    lastname: "",
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
        "Nombre de usuario con, a lo sumo, 20 carácteres",
      (v) => !!v || "Tiene que ingresar nombre de usuario",
    ],
    nameRules: [
      (v) =>
        !v ||
        v.length <= 14 ||
        "Utilice un nombre con, a lo sumo, 14 carácteres",
      (v) => !!v || "Tiene que ingresar Nombre y Apellido",
    ],
    hidePass: true,
    hideConfirm: true,
    isRegister: true,
    isVerification: false,
    verificationCode: "",
    verificationMessage: "¡Ingrese el Código Enviado a su Email!",
  }),
  methods: {
    ...mapActions(useProfileStore, [
      "hasProfile",
      "login",
      "createNewProfile",
      "getToken",
      "verify_email",
      "getCorrectVerification",
    ]),
    ...mapActions(usePopupStore, ["hidePopup"]),
    onSubmit() {
      this.$refs.form.validate();
      if (this.valid) {
        if (this.isRegister) {
          if (this.onAuthRoute !== this.$route.path) {
            this.$router.push(this.onAuthRoute);
          }
          this.createNewProfile(
            this.username,
            this.password,
            this.email,
            this.firstname,
            this.lastname
          );
          this.isRegister = false;
          this.isVerification = true;
        } else {
          this.login(this.username, this.password);
          const token = this.getToken();
          if (token !== "") {
            this.setStartingConditionsAndClose();
          }
        }
      }
    },
    verify() {
      this.verify_email(this.email, this.verificationCode);
      const valid = this.getCorrectVerification();
      if (valid) {
        this.login(this.username, this.password);
        this.setStartingConditionsAndClose();
      } else {
        this.verificationMessage = "Lo sentimos, ese código es incorrecto...";
      }
    },
    resendVerification() {
      // llamado a la API
      this.verificationMessage = "Revise su Email. Código Reenviado.";
    },
    setStartingConditionsAndClose() {
      this.$refs.form.reset();
      this.password = "";
      this.isRegister = true;
      this.isVerification = false;
      this.hidePopup();
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
        @click="setStartingConditionsAndClose"
        ><v-icon>mdi-close</v-icon></v-btn
      >
      <v-row style="position: relative" class="mb-5">
        <v-fade-transition hide-on-leave group>
          <v-col :key="2" v-if="isVerification" class="text-lg-center text-h5"
            >Verificar Código</v-col
          >
          <v-col :key="1" v-else-if="isRegister" class="text-lg-center text-h5"
            >Registrarse</v-col
          >
          <v-col :key="2" v-else class="text-lg-center text-h5"
            >Iniciar Sesión</v-col
          >
        </v-fade-transition>
      </v-row>
      <v-expand-transition>
        <v-form @submit.prevent="onSubmit" ref="form" class="" v-model="valid">
          <v-expand-transition>
            <v-text-field
              v-model="username"
              label="Nombre de Usuario"
              :counter="MAX_USERLENGTH"
              :rules="usernameRules"
              v-if="isRegister || !isVerification"
              :key="1"
              required
            ></v-text-field>
          </v-expand-transition>
          <v-text-field
            v-model="firstname"
            label="Primer Nombre"
            :counter="MAX_USERLENGTH"
            :rules="nameRules"
            v-if="isRegister"
            :key="10"
            required
          ></v-text-field>
          <v-text-field
            v-model="lastname"
            label="Apellido"
            :counter="MAX_USERLENGTH"
            :rules="nameRules"
            v-if="isRegister"
            :key="11"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Correo Electrónico"
            v-if="isRegister"
            required
            :key="2"
          ></v-text-field>
          <v-text-field
            :rules="passwordRules"
            label="Contraseña"
            :type="hidePass ? 'password' : 'text'"
            v-if="!isVerification"
            required
            :append-icon="hidePass ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="hidePass = !hidePass"
            :key="3"
            v-model="password"
          ></v-text-field>
          <v-text-field
            v-if="isVerification"
            label="Validación"
            required
            :key="4"
            v-model="verificationCode"
          ></v-text-field>
          <v-expand-transition>
            <v-text-field
              v-if="isRegister && !isVerification"
              label="Confirmar Contraseña"
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
            <v-btn v-if="!isVerification" type="submit" color="primary">{{
              isRegister ? "Registrarse" : "Iniciar Sesión"
            }}</v-btn>
            <v-btn
              v-if="isVerification"
              @click="verify()"
              color="primary"
              v-model="verificationCode"
            >
              Verifique su correo electrónico
            </v-btn>
            <v-btn
              v-if="isVerification"
              @click="resendVerification()"
              color="secondary"
              class="mt-4"
            >
              Reenviar Verificación
            </v-btn>
            <div v-if="isRegister" class="mt-2">
              ¿Ya tiene una cuenta?
              <a @click="isRegister = false">Inicie Sesión</a>
            </div>
            <div v-else-if="!isVerification" class="mt-2">
              ¿No tiene una cuenta?
              <a @click="isRegister = true">Registrese</a>
            </div>
            <div v-else class="mt-4 mb-2">
              {{ verificationMessage }}
            </div>
          </v-container>
        </v-form>
      </v-expand-transition>
    </v-card>
  </v-overlay>
</template>

<style></style>
