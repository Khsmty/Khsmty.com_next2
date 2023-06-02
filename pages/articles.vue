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
            <div class="eyecatch-emoji">
              <twemoji :emoji="article.emoji" size="40px" />
            </div>
            <span>{{ article.title }}</span>
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
  queries: {
    fields: "id,title,emoji,publishedAt,updatedAt",
    orders: "-publishedAt",
  },
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: #4a4b4e;
    margin-right: 1rem;
    border-radius: 7px;
    flex-shrink: 0;
  }
}
</style>
