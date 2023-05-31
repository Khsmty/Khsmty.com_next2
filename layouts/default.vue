<template>
  <v-app>
    <!-- navbar -->
    <v-app-bar scroll-behavior="hide">
      <v-app-bar-nav-icon @click="state.drawer = !state.drawer" />
      <v-toolbar-title>Khsmty</v-toolbar-title>
      <!-- <v-spacer />
      <v-btn>Logout</v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import state from "~/scripts/state";
</script>
