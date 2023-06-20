<template>
  <v-row justify="center">
    <v-col cols="12" class="mt-3" style="max-width: 900px">
      <h1>記事検索</h1>
      <p>記事をキーワードで検索できます。</p>
    </v-col>

    <v-col cols="12" style="max-width: 900px">
      <v-text-field
        v-model="searchKeyword"
        label="検索キーワード"
        :append-inner-icon="mdiMagnify"
        :loading="isFormLoading"
        single-line
        hide-details
        @click:append-inner="doSearch"
        @keydown.enter="doSearch"
      />
    </v-col>

    <v-col v-if="articles.length" cols="12" style="max-width: 900px">
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

        <v-col cols="12" class="mt-3">
          <v-pagination
            v-model="currentPage"
            :length="paginationLength"
            @update:model-value="doSearch"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col v-else-if="isSearched" cols="12" style="max-width: 900px">
      <v-alert type="info">記事が見つかりませんでした。</v-alert>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { mdiMagnify } from "@mdi/js";
import { Article } from "@/types/article";

const { query } = useRoute();
const router = useRouter();

const currentPage = ref(Number(query.page) || 1);
const articles = ref<Article[]>([]);
const isSearched = ref(false);
const searchKeyword = ref("");
const isFormLoading = ref(false);
const paginationLength = ref(1);

onMounted(async () => {
  if (query.page) {
    currentPage.value = Number(query.page);
  }

  if (query.q) {
    searchKeyword.value = String(query.q);
    await doSearch();
  }
});

async function doSearch() {
  if (!searchKeyword.value) {
    alert("検索キーワードを入力してください。");
    return;
  }

  isFormLoading.value = true;

  const request = await useMicroCMSGetList<Article>({
    endpoint: "article",
    queries: {
      fields: "id,title,emoji,tags,publishedAt,updatedAt",
      orders: "-publishedAt",
      q: searchKeyword.value,
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

  isFormLoading.value = false;
  isSearched.value = true;

  router.push({
    query: {
      ...query,
      q: searchKeyword.value,
      page: currentPage.value !== 1 ? currentPage.value : undefined,
    },
  });

  useSeoMeta({
    title: `「${searchKeyword.value}」の検索結果`,
    description: `「${searchKeyword.value}」の記事検索結果です。`,
  });
}

useSeoMeta({
  title: "記事検索",
  description: "記事をキーワードで検索できます。",
});
</script>
