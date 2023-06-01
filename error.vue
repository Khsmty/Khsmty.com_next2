<template>
  <NuxtLayout>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>404 Not Found</h1>
        <p>お探しのページは見つかりませんでした。</p>
      </v-col>
    </v-row>
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "404 Not Found",
  description: "お探しのページは見つかりませんでした。",
});
</script>
