<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
  >
    <v-card>
      <v-card-title v-if="this.title" class="text-h5">
        {{ this.title }}
      </v-card-title>
      <v-card-text v-if="this.bodyText">{{ this.bodyText }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            v-if="disagreeButtonText"
            color="secondary"
            text
            @click="disagree()"
        >
          {{ this.disagreeButtonText }}
        </v-btn>
        <v-btn
            v-if="agreeButtonText"
            color="primary"
            text
            @click="agree()"
        >
          {{ this.agreeButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteConfirmationDialog",
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    bodyText: {
      type: String,
      required: false
    },
    agreeButtonText: {
      type: String,
      required: false
    },
    disagreeButtonText: {
      type: String,
      required: false
    }
  },
  methods: {
    agree() {
      this.$emit("agree");
    },
    disagree() {
      this.$emit("disagree");
    }
  }
}
</script>

<style scoped>

</style>