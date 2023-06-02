<template>
  <v-row justify="center" class="mt-4">
    <v-col cols="12" class="text-center">
      <twemoji :emoji="article.emoji" size="60px" />
      <h1 class="mt-4">
        {{ article.title }}
      </h1>
      <div class="metadata mt-0">
        <!-- タグ一覧 -->
        <v-icon icon="mdi-tag" />&nbsp;
        <v-chip-group v-if="article.tags" class="mr-3">
          <v-chip
            v-for="tag in article.tags"
            :key="tag.id"
            :to="`/tag/${tag.id}`"
          >
            {{ tag.name }}
          </v-chip>
        </v-chip-group>

        <!-- 更新日など -->
        <v-icon icon="mdi-calendar" />
        {{ article.publishedAt }}
        &nbsp;<span
          v-if="article.publishedAt !== article.updatedAt"
          class="ml-3"
        >
          <v-icon icon="mdi-update" />
          {{ article.updatedAt }}
        </span>
      </div>
    </v-col>
  </v-row>

  <div v-html="article.content"></div>
</template>

<script setup lang="ts">
import { Article } from "~/types/article";
import { formatDate } from "~/scripts/util";
import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { format } from "path";

const { params } = useRoute();
if ((Array.isArray(params.id) ? params.id[0] : params.id).match(/\W/)) {
  throw createError({ statusCode: 404 });
}

const { data } = await useMicroCMSGetListDetail<Article>({
  endpoint: "article",
  contentId: Array.isArray(params.id) ? params.id[0] : params.id,
}).catch(() => {
  throw createError({ statusCode: 404 });
});

if (!data.value) {
  throw createError({ statusCode: 404 });
}

const $ = load(data.value.content);
$("pre code").each((_, elm) => {
  const result = hljs.highlightAuto($(elm).text());
  $(elm).html(result.value);
  $(elm).addClass("hljs");
});

const article = {
  ...data.value,
  content: $.html(),
  publishedAt: formatDate(data.value.publishedAt || ""),
  updatedAt: formatDate(data.value.updatedAt),
};

useSeoMeta({
  title: data.value.title,
  description: data.value.description,
});
</script>

<style lang="scss">
.metadata {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a1a1a1;
  margin-top: 0.5rem;
}
</style>
