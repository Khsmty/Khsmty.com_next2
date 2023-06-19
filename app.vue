<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="#1976d2" :height="4" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Khsmty` : "Khsmty";
  },
});
</script>
