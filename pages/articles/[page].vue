<template>
  <v-row justify="center">
    <v-col cols="12" class="mt-3" style="max-width: 900px">
      <h1>記事一覧</h1>
      <p>Khsmty が書いた記事の一覧です。</p>
    </v-col>

    <v-col cols="12" style="max-width: 900px">
      <v-row>
        <article-card
          v-for="article in data?.contents"
          :key="article.id"
          :to="`/article/${article.id}`"
          :emoji="article.emoji"
          :title="article.title"
          :date="article.publishedAt"
          :tags="article.tags"
        />
      </v-row>
    </v-col>

    <v-col cols="12" class="mt-3">
      <v-pagination
        :length="paginationLength"
        @prev="togglePage('prev')"
        @next="togglePage('next')"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Article } from "~/types/article";

const { params } = useRoute();

const { data } = await useMicroCMSGetList<Article>({
  endpoint: "article",
  queries: {
    fields: "id,title,emoji,tags,publishedAt,updatedAt",
    orders: "-publishedAt",
    limit: 10,
    offset: (Number(params.page) - 1) * 10,
  },
}).catch(() => {
  throw createError({ statusCode: 404 });
});

const paginationLength = String(Math.ceil((data.value?.totalCount || 0) / 10));

function togglePage(type: "prev" | "next") {
  const currentPage = Number(params.page);
  const nextPage = type === "prev" ? currentPage - 1 : currentPage + 1;
  navigateTo(`/articles/${nextPage}`);
}

useSeoMeta({
  title: "記事一覧",
  description: "Khsmtyが書いた記事の一覧です。",
});
</script>
