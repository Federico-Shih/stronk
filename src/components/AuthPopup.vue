<script>
import { mapActions, mapState } from "pinia";
import { usePopupStore, Popup } from "@/stores/auth";
import { useProfileStore } from "@/stores/profile";

export default {
  computed: {
    ...mapState(usePopupStore, ["show", "onAuthRoute", "popupType"]),
    ...mapState(useProfileStore, ["getToken", "getCorrectVerification"]),
    passwordConfirmRule() {
      return (
        this.password === this.confirmPassword ||
        "Las contraseñas tienen que ser idénticas"
      );
    },
    usernameNotFoundRule() {
      return (
        !this.usernameNotFound || "Nombre de usuario o contraseña inválida"
      );
    },
    usernameTakenRule() {
      return !this.usernameAlreadyTaken || "Nombre de usuario ya existe";
    },
    emailTakenRule() {
      return !this.emailAlreadyTaken || "Email ya existe";
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
    email() {
      this.emailAlreadyTaken = false;
    },
    username() {
      this.usernameNotFound = false;
      this.usernameAlreadyTaken = false;
    },
    password() {
      this.usernameNotFound = false;
    },
  },
  data: () => ({
    MAX_USERLENGTH: 20,
    usernameNotFound: false,
    usernameAlreadyTaken: false,
    emailAlreadyTaken: false,
    valid: false,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
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
        v.length <= 20 ||
        "Utilice un nombre con, a lo sumo, 20 carácteres",
      (v) => !!v || "Tiene que ingresar Nombre y Apellido"
    ],
    hidePass: true,
    hideConfirm: true,
    isRegister: true,
    isVerification: false,
    verificationCode: "",
    verificationMessage: "¡Ingrese el Código Enviado a su Email!",
    rememberPassword: false
  }),
  methods: {
    ...mapActions(useProfileStore, [
      "login",
      "createNewProfile",
      "verify_email",
      "resend_verification",
      "loadCurrentNames",
    ]),
    ...mapActions(usePopupStore, ["hidePopup"]),
    async onSubmit() {
      this.$refs.form.validate();
      if (this.valid) {
        if (this.isRegister) {
          const res = await this.createNewProfile(
            this.username,
            this.password,
            this.email,
            this.firstName,
            this.lastName
          );
          console.log(res);
          // 'UNIQUE constraint failed: User.email' 'UNIQUE constraint failed: User.username'
          if (res.code === 2) {
            if (res.details[0] === "UNIQUE constraint failed: User.username") {
              this.usernameAlreadyTaken = true;
            } else if (
              res.details[0] === "UNIQUE constraint failed: User.email"
            ) {
              this.emailAlreadyTaken = true;
            }
            return;
          }
          this.isRegister = false;
          this.isVerification = true;
        } else {
          await this.login(this.username, this.password, this.rememberPassword);
          if (this.getToken !== "") {
            await this.loadCurrentNames();
            this.setStartingConditionsAndClose();
          } else {
            this.usernameNotFound = true;
            return;
          }
        }
        if (this.onAuthRoute !== this.$route.path) {
          await this.$router.push(this.onAuthRoute);
        }
      }
    },
    async verify() {
      await this.verify_email(this.email, this.verificationCode);
      const valid = this.getCorrectVerification;
      if (valid) {
        await this.login(this.username, this.password);
        if (this.getToken !== "") {
          await this.loadCurrentNames();
          this.setStartingConditionsAndClose();
        } else {
          this.verificationMessage = "Hubo un error iniciando sesión...";
        }
      } else {
        this.verificationMessage = "Lo sentimos, ese código es incorrecto...";
      }
    },
    resendVerification() {
      this.resend_verification(this.email);
      this.verificationMessage = "Revise su Email. Código Reenviado.";
    },
    setStartingConditionsAndClose() {
      this.$refs.form.reset();
      this.password = "";
      this.isRegister = true;
      this.isVerification = false;
      this.hidePopup();
      if (this.$route.path === "/auth") {
        this.$router.go(-1);
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
        @click="setStartingConditionsAndClose"
        ><v-icon>mdi-close</v-icon></v-btn
      >
      <v-row style="position: relative" class="mb-5">
        <v-fade-transition hide-on-leave group>
          <v-col :key="2" v-if="isVerification" class="text-lg-center"
            >Verificar Código</v-col
          >
          <v-col :key="1" v-else-if="isRegister" class="text-lg-center"
            >Registrarse</v-col
          >
          <v-col :key="2" v-else class="text-lg-center"
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
              :rules="[
                ...usernameRules,
                usernameTakenRule,
                usernameNotFoundRule,
              ]"
              v-if="isRegister || !isVerification"
              :key="1"
              required
            ></v-text-field>
          </v-expand-transition>
          <v-text-field
            v-model="firstName"
            label="Primer Nombre"
            :counter="MAX_USERLENGTH"
            :rules="nameRules"
            v-if="isRegister"
            :key="10"
            required
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            label="Apellido"
            :counter="MAX_USERLENGTH"
            :rules="nameRules"
            v-if="isRegister"
            :key="11"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="[...emailRules, emailTakenRule]"
            label="Correo Electrónico"
            v-if="isRegister"
            required
            :key="2"
          ></v-text-field>
          <v-text-field
            :rules="[...passwordRules]"
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
            hint="ABC123"
            :key="25"
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
            <v-checkbox
              v-if="!isRegister && !isVerification"
              label="Recordar contraseña"
              v-model="rememberPassword"
            />
          </v-expand-transition>
          <v-container class="width_full d-flex flex-column align-center">
            <v-btn v-if="!isVerification" type="submit" color="primary">{{
              isRegister ? "Registrarse" : "Iniciar Sesión"
            }}</v-btn>
            <v-btn v-if="isVerification" @click="verify()" color="primary">
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
