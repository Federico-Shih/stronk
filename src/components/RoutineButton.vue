<template>
  <v-card
      v-if="!newBluePrint"
    class="rounded-lg"
    :class="variants.boxSizes[variant]"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    :elevation="hover ? 5 : 0"
  >
    <router-link :to="`/routines/${routineId}`">
      <v-img :src="images[category][routineId % 2]" :alt="title" class="routine-button-image rounded-lg">
        <div class="fill-height bottom-gradient rounded-lg d-flex flex-column justify-end">
          <v-card-title
            class="routine-button-text"
            :class="variants.fontSizes[variant]"
          >{{ title }}
          </v-card-title>
        </div>
      </v-img>
    </router-link>
  </v-card>
  <v-card
      v-else
      class="rounded-lg"
      color="transparent"
      :class="variants.boxSizes[variant]"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      :elevation="hover ? 1 : 0"
  >
    <router-link :to="`/routines/create`" class="no-decoration">
        <div class="fill-height rounded-lg d-flex flex-column justify-center blueprint" :style="{
          background: $vuetify.theme.themes[theme].contbacksecondary,
        }">
          <v-icon size="80">mdi-plus-circle</v-icon>
          <h2 class="text-center font-weight-bold">Nueva Rutina</h2>
        </div>
    </router-link>
  </v-card>
</template>

<script>

import abs01 from '@/assets/routine_images/abs01.jpg'
import abs02 from '@/assets/routine_images/abs02.jpg'
import arms01 from '@/assets/routine_images/arms01.jpg'
import arms02 from '@/assets/routine_images/arms02.jpg'
import back01 from '@/assets/routine_images/back01.jpg'
import back02 from '@/assets/routine_images/back02.jpg'
import chest01 from '@/assets/routine_images/chest01.jpg'
import chest02 from '@/assets/routine_images/chest02.jpg'
import fullbody01 from '@/assets/routine_images/fullbody01.jpg'
import fullbody02 from '@/assets/routine_images/fullbody02.jpg'
import leg01 from '@/assets/routine_images/leg01.jpg'
import leg02 from '@/assets/routine_images/leg02.jpg'

export default {
  name: "RoutineButton",
  props: {
    variant: String,
    newBluePrint: false,
    title: String,
    routineId: Number,
    category: Number,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
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
      images: {
        5: [abs01, abs02],
        6: [arms01, arms02],
        3: [back01, back02],
        2: [chest01, chest02],
        1: [fullbody01, fullbody02],
        4: [leg01, leg02],
      }
    };
  },
};
</script>

<style scoped>

.no-decoration {
  text-decoration: none;
  color: inherit;
}

.blueprint {
  border: 2px dashed;
}

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
  width: 300px;
  height: 230px;
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
  text-decoration: none;
}

.bottom-gradient {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    transparent 72px
  );
}
</style>
