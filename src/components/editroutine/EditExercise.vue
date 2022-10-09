<script>
export default {
  name: "EditExercise",
  props: {
    index: Number,
    last: Boolean,
    name: String,
    img_url: String,
    repetitions: Number,
    duration: Number
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
    }
  },
  computed: {
    durationModel: {
      get() {
        return this.duration;
      },
      set(value) {
        if (!isNaN(+value)) {
          this.$emit("update:duration", parseInt(value));
        }
      }
    },
    repetitionsModel: {
      get() {
        return this.repetitions;
      },
      set(value) {
        console.log(typeof value);
        if (!isNaN(+value)) {
          this.$emit("update:repetitions", parseInt(value));
        }
      }
    }
  },
  mounted() {
  }
};
</script>

<template>
  <div class="d-flex flex-row">
    <div class="d-flex flex-column">
      <h3 class="font-weight-bold text-decoration-none mb-2">
        {{ name }}
      </h3>
      <div class="d-flex flex-row justify-space-between align-start">
        <div class="d-flex flex-row align-center">
          <v-img
            class="flex-grow-0 ml-auto mr-4"
            width="10em"
            height="7em"
            :src="img_url"
          ></v-img>
          <v-text-field
            class="mr-2"
            v-model="repetitionsModel"
            outlined
            dense
            label="Repeticiones"
            type="number"
          />
          <v-text-field
            v-model="durationModel"
            outlined
            dense
            label="Tiempo (segs)"
            type="number"
          />
        </div>
        <div class="d-flex flex-row justify-end align-center">
          <v-btn icon @click="remove()">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
          <div class="d-flex flex-column">
            <v-btn icon :disabled="index === 0" @click="moveUp()">
              <v-icon>mdi-arrow-up-bold</v-icon>
            </v-btn>
            <v-btn icon :disabled="last" @click="moveDown()">
              <v-icon>mdi-arrow-down-bold</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
