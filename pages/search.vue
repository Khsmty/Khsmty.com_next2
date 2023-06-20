<template>
  <v-row justify="center">
    <v-col cols="12" class="mt-3" style="max-width: 900px">
      <h1>記事検索</h1>
      <p>記事をキーワードで検索できます。</p>
    </v-col>

    <v-col>
      <v-text-field
        v-model="searchKeyword"
        label="検索キーワード"
        :append-inner-icon="mdiMagnify"
        :loading="isFormLoading"
        single-line
        hide-details
        @click:append-inner="doSearch"
        @keydown.enter="doSearch"
      />
    </v-col>

    <v-col v-if="articles.length" cols="12" style="max-width: 900px">
      <v-row>
        <article-card
          v-for="article in articles"
          :key="article.id"
          :to="`/article/${article.id}`"
          :emoji="article.emoji"
          :title="article.title"
          :date="article.publishedAt"
          :tags="article.tags"
        />
      </v-row>
    </v-col>
    <v-col v-else-if="isSearched">
      <v-alert type="info">記事が見つかりませんでした。</v-alert>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { mdiMagnify } from "@mdi/js";
import { Article } from "@/types/article";

const route = useRoute();
const currentPage = ref(Number(route.query.page) || 1);

const isSearched = ref(false);
const searchKeyword = ref("");
const isFormLoading = ref(false);
const articles = ref<Article[]>([]);

async function doSearch() {
  if (!searchKeyword.value) {
    alert("検索キーワードを入力してください。");
    return;
  }

  isFormLoading.value = true;

  const request = await useMicroCMSGetList<Article>({
    endpoint: "article",
    queries: {
      fields: "id,title,emoji,tags,publishedAt,updatedAt",
      orders: "-publishedAt",
      q: searchKeyword.value,
      limit: 10,
      offset: (currentPage.value - 1) * 10,
    },
  }).catch(() => {
    throw createError({ statusCode: 404 });
  });

  articles.value = request.data.value?.contents || [];

  isFormLoading.value = false;
}

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
