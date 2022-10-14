<template>
  <v-main>
    <div class="d-flex flex-row justify-center pa-10">
      <div style="position: absolute; left: 0; top: 0" class="ma-10">
        <GoBackButton></GoBackButton>
      </div>
      <v-card
        outlined
        width="60%"
        class="mx-16 pa-8 d-flex flex-column"
        style="gap: 20px"
      >
        <div class="d-flex flex-row justify-start align-center mb-8">
          <v-img
            class="mx-8 rounded-circle"
            :src="imageUrl"
            height="150px"
            max-width="150px"
            alt="Imagen de usuario"
          />
          <div>
            <v-text-field
              label="URL de tu avatar"
              v-model="tempImageURL"
              @blur="changeUrl"
              :rules="[notValidUriRule]"
            ></v-text-field>
          </div>
        </div>
        <div class="d-flex flex-row">
          <v-text-field
            v-model="name"
            class="mr-8"
            outlined
            dense
            label="Nombres"
            prepend-icon="mdi-account"
            :rules="nameRules"
            counter="32"
          ></v-text-field>
          <v-text-field
            v-model="surname"
            outlined
            dense
            label="Apellidos"
            :rules="nameRules"
            counter="32"
          ></v-text-field>
        </div>
        <div class="d-flex flex-row" style="gap: 50px">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Birthday date"
                prepend-icon="mdi-calendar"
                readonly
                outlined
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              :active-picker.sync="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1900-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
          <v-select
            outlined
            :items="sexOptions"
            v-model="sex"
            label="Género elegido"
            dense
          />
        </div>
        <v-text-field
          outlined
          dense
          type="number"
          v-model="phoneNumber"
          label="Numero de teléfono"
        ></v-text-field>
        <div class="d-flex flex-row justify-end">
          <v-btn
            outlined
            class="rounded-pill mx-4 d-flex flex-row justify-space-between"
          >
            <v-icon class="mr-1">mdi-close</v-icon>
            <span>Descartar Cambios</span>
          </v-btn>
          <v-btn
            outlined
            :loading="loading"
            @click="onSubmit"
            class="rounded-pill mx-4 d-flex flex-row justify-space-between"
          >
            <v-icon class="mr-1">mdi-content-save</v-icon>
            <span>Guardar Cambios</span>
          </v-btn>
        </div>
      </v-card>
    </div>
    <v-snackbar v-model="saveSnackbar" color="green">
      Perfil guardada con éxito!
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="saveSnackbar = false">
          Seguir Editando
        </v-btn>
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="
            saveSnackbar = false;
            $router.back();
          "
        >
          Salir
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
import temp from "../assets/arnold.png";
import GoBackButton from "../components/GoBackButton.vue";
import { mapActions, mapState } from "pinia";
import { useProfileStore } from "../stores/profile";

const httpRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export default {
  components: {
    GoBackButton
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    }
  },
  computed: {
    ...mapState(useProfileStore, ["profile"]),
    notValidUriRule: function() {
      return httpRegex.test(this.tempImageURL) || "No es un URL válido.";
    }
  },
  methods: {
    ...mapActions(useProfileStore, ["saveProfile"]),
    save(date) {
      this.$refs.menu.save(date);
    },
    createImage(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    changeUrl() {
      if (this.notValidUriRule !== "No es un URL válido.") {
        this.imageUrl = this.tempImageURL;
      }
    },
    async onSubmit() {
      this.loading = true;
      await this.saveProfile({
        firstName: this.name,
        lastName: this.surname,
        gender: this.sex ? this.sex : undefined,
        birthdate: new Date(this.date).getTime(),
        phone: this.phoneNumber,
        avatarUrl: this.imageUrl
      });
      this.loading = false;
      this.saveSnackbar = true;
    },
  },
  data() {
    return {
      loading: false,
      activePicker: null,
      name: "",
      surname: "",
      date: null,
      menu: false,
      changePhoto: false,
      image: undefined,
      imageUrl: temp,
      nameRules: [(v) => v.length <= 32 || "Max 32 caracteres"],
      descriptionRules: [(v) => v.length <= 280 || "Max 280 caracteres"],
      sexOptions: [
        { text: "Masculino", value: "male" },
        { text: "Femenino", value: "female" },
        { text: "Otro", value: "other" }
      ],
      sex: null,
      phoneNumber: "",
      tempImageURL: "",
      saveSnackbar: false
    };
  },
  async created() {
    const user = this.profile;
    this.name = user.firstName || "";
    this.surname = user.lastName || "";
    this.date = user.birthdate
      ? new Date(user.birthdate).toISOString().split("T")[0]
      : null;
    this.phoneNumber = user.phone || "";
    this.sex = user.gender || null;
    this.imageUrl = user.avatarUrl || "";
    this.tempImageURL = user.avatarUrl || "";
  },
};
</script>
