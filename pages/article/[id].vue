<template>
  <v-row justify="center" class="mt-4">
    <v-col cols="12" class="text-center">
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
        <span class="d-flex align-center">
          <v-icon :icon="mdiCalendar" class="mr-1" />
          {{ article.publishedAt }}
        </span>
        <span
          v-if="article.publishedAt !== article.updatedAt"
          class="d-flex align-center ml-3"
        >
          <v-icon :icon="mdiUpdate" class="mr-1" />
          {{ article.updatedAt }}
        </span>
      </div>
    </v-col>

    <v-col cols="12" class="pt-0" style="max-width: 800px">
      <!-- 目次 -->
      <v-row v-if="toc.length > 1" justify="center" class="mt-0 mb-3">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <v-card class="pa-2" elevation="0">
            <span class="d-flex align-center ml-2 mt-2">
              <v-icon
                :icon="mdiFormatListBulleted"
                class="mr-1"
                style="font-size: 1.1rem"
              />
              <span style="font-size: 1.1rem">目次</span>
            </span>

            <v-list class="pt-2 pb-1">
              <v-list-item
                v-for="item in toc"
                :key="item.id"
                :href="`#${item.id}`"
                density="compact"
                rounded
                :style="
                  'min-height: 32px; margin-left: ' +
                  (item.name === 'h2'
                    ? 0
                    : item.name === 'h3'
                    ? 8
                    : item.name === 'h4'
                    ? 16
                    : 24) +
                  'px'
                "
              >
                <v-list-item-title class="d-flex">
                  <span class="mr-2" style="color: grey">
                    {{ item.num }}
                  </span>
                  <span>
                    {{ item.text }}
                  </span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <!-- 本文 -->
      <div class="article-content" v-html="article.content" />
    </v-col>

    <v-col cols="12" class="text-center mt-3">
      <span style="font-size: 1.3rem">Share<br /></span>
      <v-btn
        v-for="service in share"
        :key="service.name"
        target="_blank"
        icon
        variant="text"
        class="my-1"
        @click="shareURL(service.url)"
      >
        <img
          :src="`/img/service/${service.img}`"
          :style="`height: ${
            service.img.split('.')[1] === 'svg' ? 1.5 : 1.8
          }rem; width: auto`"
        />
      </v-btn>
      <v-btn
        title="URL をコピー"
        icon
        variant="text"
        class="my-1"
        @click="copyURL"
      >
        <v-icon :icon="mdiContentCopy" />
      </v-btn>
    </v-col>

    <v-col cols="12" class="text-center pt-1">
      <span style="font-size: 1.3rem">Comments</span>

      <div class="mt-2">
        <giscus
          id="comments"
          repo="Khsmty/Khsmty.com"
          repoId="R_kgDOJpMqKA"
          category="コメント"
          categoryId="DIC_kwDOJpMqKM4CXK78"
          mapping="pathname"
          strict="1"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="top"
          theme="dark"
          lang="ja"
          loading="lazy"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {
  mdiTag,
  mdiCalendar,
  mdiUpdate,
  mdiContentCopy,
  mdiFormatListBulleted,
} from "@mdi/js";
import { Article } from "~/types/article";
import { formatDate } from "~/scripts/util";
import { load } from "cheerio";
import hljs, { HighlightResult } from "highlight.js";
import Giscus from "@giscus/vue";

import "highlight.js/styles/atom-one-dark.css";
import "~/assets/article.scss";

const share = [
  {
    name: "Twitter",
    img: "twitter.svg",
    url: "https://twitter.com/intent/tweet?url=",
  },
  {
    name: "Facebook",
    img: "facebook.webp",
    url: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    name: "LINE",
    img: "line.webp",
    url: "https://social-plugins.line.me/lineit/share?url=",
  },
];

function copyURL() {
  navigator.clipboard.writeText(location.href);
}
function shareURL(url: string) {
  window.open(url + encodeURIComponent(location.href));
}

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

const headings = $("h2, h3, h4, h5").toArray();
const toc = headings.map((data) => ({
  text: data.children
    // @ts-expect-error
    .map((child) => (child.data ? child.data : child.children[0].data))
    .join(""),
  id: data.attribs.id,
  name: data.name,
  num: "0",
}));

// toc に番号を振る
let h2 = 0,
  h3 = 0,
  h4 = 0,
  h5 = 0;
for (let i = 0; i < toc.length; i++) {
  if (toc[i].name === "h2") {
    h2++;
    h3 = 0;
    h4 = 0;
    h5 = 0;
    toc[i].num = `${h2}.`;
  } else if (toc[i].name === "h3") {
    h3++;
    h4 = 0;
    h5 = 0;
    toc[i].num = `${h2}.${h3}.`;
  } else if (toc[i].name === "h4") {
    h4++;
    h5 = 0;
    toc[i].num = `${h2}.${h3}.${h4}.`;
  } else if (toc[i].name === "h5") {
    h5++;
    toc[i].num = `${h2}.${h3}.${h4}.${h5}.`;
  }
}

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
  font-family: var(--monospace-font-family);
  position: absolute;
  background-color: #121314;
  border-radius: 6px 0 0 0;
  padding: 2px 5px 3px 7px;
}
.article-content > div[data-filename] > pre {
  padding-top: 32px;
}

#comments::part(iframe) {
  max-width: 640px;
  margin: auto;
  display: flex;
}
</style>
