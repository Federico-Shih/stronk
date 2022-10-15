<template>
  <v-card
    shaped
    class="community-profile-long align-end flex flex-row pt-2"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    :elevation="hover ? 5 : 2"
    :class="variants.boxSizes[variant]"
    :style="{ height: '100px' }"
    @click="$router.push(`/exercises/${id}`)"
  >
    <v-list-item>
      <v-list-item-content>
        <div class="d-flex flex-row">
          <div>
            <v-img
              :src="this.picture"
              :alt="this.picture"
              width="170"
              height="65"
              class="mr-4"
            />
          </div>

          <div style="max-width: 275px">
            <v-list-item-title
              class="font-weight-bold mb-2"
              style="text-overflow: ellipsis; overflow: hidden"
            >
              {{ this.exerciseName }}
            </v-list-item-title>
            <v-list-item-subtitle
              style="text-overflow: ellipsis; overflow: hidden"
            >
              {{ this.category }}
            </v-list-item-subtitle>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex align-items-end flex-column">
            <button @click.stop="deleteDialog = true">
              <v-icon
              ><!--mdi-dots-vertical-->
                mdi-close
              </v-icon
              >
            </button>
          </div>
        </div>
      </v-list-item-content>
    </v-list-item>
    <DeleteConfirmationDialog
      :dialog="deleteDialog"
      title="¿Está seguro que desea eliminar el ciclo?"
      body-text="Se eliminará de forma permanente junto con sus ejercicios."
      agree-button-text="Sí"
      disagree-button-text="No"
      v-on:agree="
        deleteDialog = false;
        deleteThisExercise();
      "
      v-on:disagree="deleteDialog = false"
    />
  </v-card>
</template>

<script>
import { mapActions } from "pinia";
import { useExerciseStore } from "@/stores/exercise";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog.vue";
export default {
  name: "ExerciseDepiction",
  components: {
    DeleteConfirmationDialog
  },
  props: {
    variant: String,
    exerciseName: String,
    category: String,
    picture: String,
    id: Number,
  },
  data() {
    return {
      hover: false,
      deleteDialog: false,
      variants: {
        boxSizes: {
          large: "community-profile-button-large",
          small: "community-profile-button-small",
        },
        fontSizes: {
          large: "community-profile-font-large",
          small: "community-profile-font-small",
        },
      },
    };
  },
  methods: {
    ...mapActions(useExerciseStore, ["deleteExercise"]),
    async deleteThisExercise() {
      await this.deleteExercise(this.id);
      this.$emit("refreshevent");
    },
  },
};
</script>
<style scoped>
.community-profile-button-large {
  width: 550px;
  height: 100px;
  margin: 10px 5px;
}
.community-profile-button-small {
  width: 400px;
  height: 75px;
  margin: 10px 5px;
}
.community-profile-font-large {
  font-size: 1.8em;
}
.community-profile-font-small {
  font-size: 1.2em;
}

.alignmentToTheRight {
  align-items: end;
  display: flex;
  flex-direction: column;
}
</style>
