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
          :href="contact.href"
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
    description: "@khsmty",
    logo: "discord.svg",
    href: "https://discord.com/users/723052392911863858",
  },
  {
    title: "Twitter",
    description: "@Khsmty",
    logo: "twitter.svg",
    href: "https://twitter.com/Khsmty",
  },
  {
    title: "GitHub",
    description: "@Khsmty",
    logo: "github.svg",
    href: "https://github.com/Khsmty",
  },
  {
    title: "Misskey",
    description: "@Khsmty@misskey.io",
    logo: "misskey.webp",
    href: "https://misskey.io/@Khsmty",
  },
  {
    title: "メール",
    description: "me@Khsmty.com",
    logo: "gmail.svg",
    href: "mailto:me@khsmty.com",
  },
];

useSeoMeta({
  title: "連絡先",
  description: "Khsmtyの連絡先のリストです。",
});
</script>
