<template>
  <v-row justify="center">
    <v-col cols="12" class="mt-3" style="max-width: 900px">
      <h1>連絡先</h1>
      <p>Khsmty の連絡先のリストです。一番反応が早いのは Discord かも</p>
    </v-col>

    <v-col cols="12" style="max-width: 900px">
      <v-row>
        <article-card
          v-for="contact in contacts"
          :key="contact.title"
          :to="contact.to"
          :img="`/img/service/${contact.logo}`"
          :title="contact.title"
          :description="contact.description"
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const contacts = [
  {
    title: "Discord",
    description: "Khsmty#2222",
    logo: "discord.svg",
    to: "https://discord.com/users/852596596899575306",
  },
];

useSeoMeta({
  title: "連絡先",
  description: "Khsmtyの連絡先のリストです。",
});
</script>
