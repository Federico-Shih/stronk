<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
  >
  <v-card
      color="primary"
      dark
      v-if="dialogState === 'loading'"
      class="py-2"
  >
    <v-card-text>
      {{ this.loadingText }}
      <v-progress-linear
          stream
          buffer-value="0"
          color="white"
          class="mt-2"
      ></v-progress-linear>
    </v-card-text>
  </v-card>
  <v-card v-if="dialogState === 'notFound'">
    <v-card-title>{{ this.notFoundText }}</v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          text
          @click="okNotFound()"
      >
        {{ this.okNotFoundButtonText }}
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LoadingFetchDialog",
  props: {
    dialogState: {
      type: String,
      required: true
    },
    loadingText:{
      type: String,
      required: true
    },
    notFoundText:{
      type: String,
      required: true
    },
    okNotFoundButtonText: {
      type: String,
      required: true
    },
  },
  computed: {
    dialog: {
      get() {
        return this.dialogState === 'loading' || this.dialogState === 'notFound';
      },
      set(value) {
        if (value === false) {
          this.$emit('oknotfound');
        }
      }
    }
  },
  methods: {
    okNotFound() {
      this.$emit("oknotfound");
    },
  }
}
</script>

<style scoped>

</style>