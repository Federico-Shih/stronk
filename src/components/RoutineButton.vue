<template>
  <v-card
    class="rounded-lg"
    :class="variants.boxSizes[variant]"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    :elevation="hover ? 5 : 0"
  >
    <router-link :to="`/routines/${routineId}`">
      <v-img :src="image" :alt="title" class="routine-button-image">
        <div class="fill-height bottom-gradient d-flex flex-column justify-end">
          <v-card-title
            class="routine-button-text"
            :class="variants.fontSizes[variant]"
          >{{ title }}
          </v-card-title>
        </div>
      </v-img>
    </router-link>
  </v-card>
</template>

<script>
export default {
  name: "RoutineButton",
  props: {
    variant: String,
    title: String,
    image: String,
    routineId: Number,
  },
  data() {
    return {
      hover: false,
      variants: {
        boxSizes: {
          small: "routine-button-small",
          long: "routine-button-long",
          large: "routine-button-large",
        },
        fontSizes: {
          small: "text-small",
          long: "text-medium",
          large: "text-large",
        },
      },
    };
  },
};
</script>

<style scoped>
.routine-button-small {
  width: 230px;
  height: 200px;
  margin: 10px 5px;
}

.routine-button-long {
  width: 400px;
  height: 200px;
  margin: 10px 5px;
}

.routine-button-large {
  width: 400px;
  height: 300px;
  margin: 10px 5px;
}

.routine-button-image {
  height: 100%;
  width: 100%;
}

.text-small {
  font-size: 0.8em;
}

.text-medium {
  font-size: 1em;
}

.text-large {
  font-size: 1.2em;
}

.routine-button-text {
  padding: 0.5em 1em;
  color: white;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  white-space: nowrap;
}

.bottom-gradient {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    transparent 72px
  );
}
</style>
