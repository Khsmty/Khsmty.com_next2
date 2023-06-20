<template>
  <v-row justify="center">
    <v-col cols="12" class="mt-3" style="max-width: 900px">
      <h1>記事一覧</h1>
      <p>Khsmty が書いた記事の一覧です。</p>
    </v-col>

    <v-col cols="12" style="max-width: 900px">
      <v-row>
        <article-card
          v-for="article in articles"
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
        v-model="currentPage"
        :length="paginationLength"
        @update:model-value="getData"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Article } from "~/types/article";

const { query } = useRoute();
const router = useRouter();

const currentPage = ref(Number(query.page) || 1);
const articles = ref<Article[]>([]);
const paginationLength = ref(1);

onMounted(async () => {
  if (query.page) {
    currentPage.value = Number(query.page);
  }

  await getData();
});

async function getData() {
  const request = await useMicroCMSGetList<Article>({
    endpoint: "article",
    queries: {
      fields: "id,title,emoji,tags,publishedAt,updatedAt",
      orders: "-publishedAt",
      limit: 10,
      offset: (currentPage.value - 1) * 10,
    },
  }).catch(() => {
    throw createError({ statusCode: 404 });
  });

  articles.value = request.data.value?.contents || [];
  paginationLength.value = Math.ceil(
    (request.data.value?.totalCount || 0) / 10
  );

  if (currentPage.value !== 1) {
    router.push({ query: { page: currentPage.value } });
  } else {
    router.push({ query: {} });
  }
}

useSeoMeta({
  title: "記事一覧",
  description: "Khsmtyが書いた記事の一覧です。",
});
</script>
