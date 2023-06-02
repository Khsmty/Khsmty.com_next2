<template>
  <v-row justify="center">
    <v-col cols="12" class="mt-3" style="max-width: 900px">
      <h1>記事一覧</h1>
      <p>Khsmty が書いた記事の一覧です。</p>
    </v-col>

    <v-col cols="12" style="max-width: 900px">
      <v-row>
        <v-col
          v-for="article in data?.contents"
          :key="article.id"
          cols="12"
          sm="6"
        >
          <v-card class="article-card" :to="`/article/${article.id}`" ripple>
            <span class="eyecatch-emoji">{{ article.emoji }}</span>
            {{ article.title }}
          </v-card>
        </v-col>
      </v-row>
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
  padding: 0.7rem;

  .eyecatch-emoji {
    font-size: 2.5rem;
    background-color: #4a4b4e;
    margin-right: 1rem;
    border-radius: 7px;
    padding: 0.2rem 0.3rem;
  }
}
</style>
