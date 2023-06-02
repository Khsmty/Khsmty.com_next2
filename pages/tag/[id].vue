<template>
  <v-row justify="center">
    <v-col cols="12" class="mt-3" style="max-width: 900px">
      <h1>「{{ tag?.name }}」タグの記事一覧</h1>
      <p>「{{ tag?.name }}」タグが付いた記事の一覧です。</p>
    </v-col>

    <v-col cols="12" style="max-width: 900px">
      <v-row>
        <article-card
          v-for="article in data?.contents"
          :key="article.id"
          :to="`/article/${article.id}`"
          :emoji="article.emoji"
          :title="article.title"
          :tags="article.tags"
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Article } from "~/types/article";
import { Tag } from "~/types/tag";

const { params } = useRoute();
if ((Array.isArray(params.id) ? params.id[0] : params.id).match(/\W/)) {
  throw createError({ statusCode: 404 });
}

const { data: tag } = await useMicroCMSGetListDetail<Tag>({
  endpoint: "tag",
  contentId: Array.isArray(params.id) ? params.id[0] : params.id,
}).catch(() => {
  throw createError({ statusCode: 404 });
});

if (!tag.value) {
  throw createError({ statusCode: 404 });
}

const { data } = await useMicroCMSGetList<Article>({
  endpoint: "article",
  queries: {
    fields: "id,title,emoji,tags,publishedAt,updatedAt",
    filters: `tags[contains]${
      Array.isArray(params.id) ? params.id[0] : params.id
    }`,
    orders: "-publishedAt",
  },
}).catch(() => {
  throw createError({ statusCode: 404 });
});

useSeoMeta({
  title: `「${tag.value.name}」タグの記事一覧`,
  description: `「${tag.value.name}」タグが付いた記事の一覧です。`,
});
</script>
