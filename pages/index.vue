<template>
  <v-parallax src="/img/background.webp" height="400" class="top-image">
    <v-row>
      <v-col cols="12" class="profile">
        <v-avatar size="130">
          <v-img src="/img/icon.webp" />
        </v-avatar>
        <span class="ml-5">
          <h1 style="font-size: 3rem">Khsmty</h1>
          <p style="font-size: 1.3rem">くそざこプログラマー</p>
        </span>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script setup lang="ts">
useSeoMeta({
  description: "Khsmtyのウェブサイト",
});
</script>

<style>
.top-image {
  border-radius: 10px;
}
.top-image > img {
  filter: blur(5px);
}
.top-image > .v-responsive__content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
