<template>
  <div class="d-flex flex-row">
    <div class="d-flex flex-column" style="width: 100%">
      <h3 class="font-weight-medium text-decoration-none mb-2">
        {{ this.$props.name }}
      </h3>
      <div class="d-flex flex-row justify-space-between align-start">
        <v-form onsubmit="" v-model="valid">
          <div class="d-flex flex-row align-center">
            <v-img
              class="flex-grow-0 ml-auto mr-4"
              width="10em"
              height="7em"
              :src="img_url"
            ></v-img>
            <div style="width: 120px">
              <v-text-field
                v-if="type === 'Repeticiones' || type === 'Ambos'"
                class="mr-2"
                v-model="repetitionsModel"
                outlined
                dense
                label="Repeticiones"
                type="number"
                :rules="[
                  rules.required,
                  rules.moreThan(0),
                  rules.lessThan(999),
                ]"
              />
            </div>
            <div style="width: 120px">
              <v-text-field
                v-if="type === 'Tiempo' || type === 'Ambos'"
                class="mr-4"
                v-model="durationModel"
                outlined
                dense
                label="Tiempo (segs)"
                type="number"
                :rules="[
                  rules.required,
                  rules.moreThan(0),
                  rules.lessThan(999),
                ]"
              />
            </div>
          </div>
        </v-form>
        <div class="d-flex flex-row justify-end align-center">
          <v-btn icon @click="deleteDialog = true" color="primary">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <div class="d-flex flex-column">
            <v-btn
              icon
              :disabled="index === 0"
              @click="moveUp()"
              color="primary"
            >
              <v-icon>mdi-arrow-up-bold</v-icon>
            </v-btn>
            <v-btn icon :disabled="last" @click="moveDown()" color="primary">
              <v-icon>mdi-arrow-down-bold</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <DeleteConfirmationDialog
      :dialog="deleteDialog"
      title="¿Está seguro que desea eliminar el ejercicio?"
      agree-button-text="Sí"
      disagree-button-text="No"
      v-on:agree="
        deleteDialog = false;
        remove();
      "
      v-on:disagree="deleteDialog = false"
    />
  </div>
</template>

<script>
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog.vue";
export default {
  name: "EditExercise",
  components: { DeleteConfirmationDialog },
  data: () => ({
    valid: true,
    deleteDialog: false,
    rules: {
      required: (value) => !!value || "Requerido",
      moreThan(n) {
        return (value) => value > n || `Mayor a ${n}`;
      },
      lessThan(n) {
        return (value) => value < n || `Menor a ${n}`;
      }
    }
  }),
  props: {
    index: Number,
    last: Boolean,
    type: String,
    name: String,
    img_url: String,
    repetitions: Number,
    duration: Number,
    cycleOrder: Number,
    bus: {
      type: Object,
      required: true
    },
  },
  methods: {
    remove() {
      this.$emit("remove");
    },
    moveUp() {
      this.$emit("moveup");
    },
    moveDown() {
      this.$emit("movedown");
    },
  },
  computed: {
    durationModel: {
      get() {
        return this.duration;
      },
      set(value) {
        if (!isNaN(value)) {
          this.$emit("update:duration", parseInt(value));
        }
      }
    },
    repetitionsModel: {
      get() {
        return this.repetitions;
      },
      set(value) {
        if (!isNaN(value)) {
          this.$emit("update:repetitions", parseInt(value));
        }
      }
    }
  },
  mounted() {
    console.log(this.name);
  },
  created() {
    this.bus.$on("validate", () => {
      if (this.valid) this.bus.$emit("validatedEx", this.cycleOrder);
    });
  },
};
</script>
