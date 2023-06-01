<template>
  <v-app>
    <!-- drawer -->
    <v-navigation-drawer v-if="windowWidth < 768" v-model="state.drawer" app>
      <v-list nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
          nuxt
        />
      </v-list>
    </v-navigation-drawer>

    <!-- navbar -->
    <v-app-bar>
      <v-app-bar-nav-icon
        v-if="windowWidth < 768"
        @click="state.drawer = !state.drawer"
      />
      <div v-else class="ml-4" />

      <v-toolbar-title class="toolbar-title" @click="$router.push('/')">
        <v-avatar class="mr-2">
          <v-img src="/img/icon.webp" />
        </v-avatar>
        Khsmty
      </v-toolbar-title>

      <template v-slot:append>
        <div v-if="windowWidth >= 768">
          <v-btn
            v-for="(item, i) in navItems"
            :key="i"
            :to="item.to"
            :prepend-icon="item.icon"
            nuxt
          >
            {{ item.title }}
          </v-btn>
        </div>
      </template>
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

let windowWidth = ref(0);
function syncWindowWidth() {
  windowWidth.value = window.innerWidth;
  state.drawer = false;
}
onMounted(() => {
  syncWindowWidth();
  window.addEventListener("resize", syncWindowWidth);
});

const navItems = [
  { title: "ホーム", icon: "mdi-home", to: "/" },
  { title: "投稿一覧", icon: "mdi-text-box-multiple", to: "/articles" },
  { title: "連絡先", icon: "mdi-email", to: "/contacts" },
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
