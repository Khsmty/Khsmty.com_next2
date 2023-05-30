<template>
  <h1>Nuxt3 Jamstack Blogs</h1>
  <ul>
    <li v-for="blog in data?.contents" :key="blog.id">
      <NuxtLink :to="`/article/${blog.id}`">
        <!--<img
          :src="blog.eyecatch?.url"
          :width="blog.eyecatch?.width"
          :height="blog.eyecatch?.height"
          alt=""
        />-->
        <div>
          <div>
            {{ blog.tags?.map((tag) => tag.name).join(", ") }}
          </div>
          <div>
            {{ blog.title }}
          </div>
          <div>
            {{ blog.publishedAt ?? blog.createdAt }}
          </div>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Article } from "~/types/article";

const { data } = await useMicroCMSGetList<Article>({
  endpoint: "article",
});
</script>
