<template>
  <v-row justify="center" class="mt-4">
    <v-col cols="12" class="text-center mb-5">
      <twemoji :emoji="article.emoji" size="70px" />
      <h1 class="mt-5">
        {{ article.title }}
      </h1>
      <div class="metadata mt-2">
        <!-- タグ一覧 -->
        <div v-if="article.tags.length" class="d-flex align-center">
          <v-icon :icon="mdiTag" />&nbsp;
          <v-chip-group class="mr-3 py-0">
            <v-chip
              v-for="tag in article.tags"
              :key="tag.id"
              class="my-0"
              :to="`/tag/${tag.id}`"
            >
              {{ tag.name }}
            </v-chip>
          </v-chip-group>
        </div>

        <!-- 更新日など -->
        <span>
          <v-icon :icon="mdiCalendar" />
          {{ article.publishedAt }}
        </span>
        <span v-if="article.publishedAt !== article.updatedAt" class="ml-3">
          <v-icon :icon="mdiUpdate" />
          {{ article.updatedAt }}
        </span>
      </div>
    </v-col>

    <v-col cols="12" style="max-width: 800px">
      <div class="article-content" v-html="article.content" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { mdiTag, mdiCalendar, mdiUpdate } from "@mdi/js";
import { Article } from "~/types/article";
import { formatDate } from "~/scripts/util";
import { load } from "cheerio";
import hljs, { HighlightResult } from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "~/assets/article.scss";

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
  const language = $(elm).attr("class") || "";
  let result: HighlightResult;

  if (!language) {
    result = hljs.highlightAuto($(elm).text());
  } else {
    result = hljs.highlight($(elm).text(), {
      language: language.replace("language-", ""),
    });
  }
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  color: #a1a1a1;
}

.article-content > div[data-filename]::before {
  content: attr(data-filename);
  font-size: 0.8rem;
  font-family: "0xProto", monospace;
  position: absolute;
  background-color: #121314;
  border-radius: 6px 0 0 0;
  padding: 2px 5px 3px 7px;
}
.article-content > div[data-filename] > pre {
  padding-top: 32px;
}
</style>
