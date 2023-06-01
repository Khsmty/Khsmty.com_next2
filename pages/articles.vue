<template>
  <h1>記事一覧</h1>
  <p class="mb-5">Khsmty が書いた記事の一覧です。</p>

  <v-row>
    <v-col v-for="article in data?.contents" :key="article.id" cols="6">
      <v-card class="article-card" :to="`/article/${article.id}`">
        <span class="eyecatch-emoji">{{ article.emoji }}</span>
        {{ article.title }}
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Article } from "~/types/article";

const { data } = await useMicroCMSGetList<Article>({
  endpoint: "article",
  queries: { fields: "id,title,emoji,publishedAt,updatedAt" },
});

useSeoMeta({
  title: "記事一覧",
  description: "Khsmtyが書いた記事の一覧です。",
});
</script>

<style lang="scss" scoped>
.article-card {
  display: flex;
  align-items: center;
  font-size: larger;

  .eyecatch-emoji {
    height: 100%;
    font-size: 2.5rem;
    background-color: #4a4b4e;
    margin-right: 1rem;
  }
}
</style>
