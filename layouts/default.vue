<template>
  <v-app>
    <!-- drawer -->
    <v-navigation-drawer v-model="state.drawer" app>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="item in drawerItems"
            :key="item.title"
            :to="item.to"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- navbar -->
    <v-app-bar>
      <v-app-bar-nav-icon @click="state.drawer = !state.drawer" />

      <v-toolbar-title class="toolbar-title" @click="$router.push('/')">
        <v-avatar class="mr-2">
          <v-img src="/img/icon.webp" />
        </v-avatar>
        Khsmty
      </v-toolbar-title>
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

const drawerItems = [
  { title: "Home", icon: "mdi-home", to: "/" },
  { title: "About", icon: "mdi-information", to: "/about" },
  { title: "Contact", icon: "mdi-email", to: "/contact" },
];
</script>

<style lang="scss">
.toolbar-title > div {
  cursor: pointer;
  align-items: center;
  display: flex;
  font-size: 1.5rem;
}
</style>
