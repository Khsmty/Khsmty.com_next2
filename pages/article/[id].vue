<template>
  <article v-if="data">
    <h1>
      {{ data.title }}
    </h1>
    <!-- <img
      :src="data.eyecatch?.url"
      :width="data.eyecatch?.width"
      :height="data.eyecatch?.height"
      alt=""
    /> -->
    <div>
      <div>
        {{ data.tags?.map((tag) => tag.name).join(", ") }}
      </div>
      <div>
        {{ data.publishedAt ?? data.createdAt }}
      </div>
    </div>
    <div v-html="data.content"></div>
  </article>
</template>

<script setup lang="ts">
import { Article } from "~/types/article";

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

useSeoMeta({
  title: data.value.title,
  description: data.value.description,
});
</script>
