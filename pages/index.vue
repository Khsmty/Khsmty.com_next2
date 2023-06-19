<template>
  <v-parallax src="/img/background.webp" height="500" class="top-image mb-8">
    <v-row>
      <v-col cols="12" class="profile">
        <v-avatar size="130">
          <v-img src="/img/icon.webp" alt="Khsmtyのアイコン" />
        </v-avatar>
        <span class="ml-5">
          <h1 style="font-size: 3rem">Khsmty</h1>
          <p style="font-size: 1.3rem">くそざこプログラマー</p>
        </span>
      </v-col>
    </v-row>
  </v-parallax>

  <v-row justify="center">
    <v-col cols="12" sm="8">
      <h2 class="header">
        自己紹介
        <span class="eng">Introduction</span>
      </h2>
      <p>自称くそざこプログラマーな Khsmty です。</p>
      <p>
        小学生の頃から Web
        制作には興味があり、簡単なビルダーなどを使ってページを作っていました。
      </p>
      <p>
        プログラミングに初めて触れたのは中学1年の時で、最初は JavaScript
        を使って Discord の Bot を作ったりしていました。
      </p>
      <p>
        今は TypeScript や Vue.js、Rust (勉強中) を使い、Bot
        やちょっとしたツール、Web サイトなどを作っています。
      </p>
      <p>デザインはへたくそです。英語も勉強中です。</p>
    </v-col>
    <v-col cols="12" sm="8">
      <h2 class="header">
        スキル
        <span class="eng">Skills</span>
      </h2>
      <v-row
        v-for="skill in skills"
        :key="skill.name"
        align="center"
        class="mt-0"
      >
        <v-col cols="3" class="text-right">
          {{ skill.name }}
        </v-col>
        <v-col cols="9">
          <v-progress-linear
            :model-value="skill.progress"
            height="20px"
            color="primary"
            rounded
          >
            {{ skill.progress }}%
          </v-progress-linear>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="8" class="mt-2">
      <h2 class="header">
        書いた記事
        <span class="eng">Articles</span>
      </h2>
      <v-row justify="center">
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
      <v-row class="mt-0">
        <v-col cols="12" class="text-center">
          <v-btn
            :append-icon="mdiArrowRight"
            to="/articles"
            color="primary"
            nuxt
            rounded
          >
            すべて見る
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="8" class="mt-2">
      <h2 class="header">
        作ったもの
        <span class="eng">Works</span>
      </h2>
      <p>準備中</p>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { mdiArrowRight } from "@mdi/js";
import { Article } from "~/types/article";

const skills = [
  { name: "TypeScript", progress: 70 },
  { name: "JavaScript", progress: 80 },
  { name: "HTML", progress: 85 },
  { name: "CSS", progress: 60 },
  { name: "Flutter", progress: 30 },
  { name: "Rust", progress: 10 },
];

const { data } = await useMicroCMSGetList<Article>({
  endpoint: "article",
  queries: {
    fields: "id,title,emoji,tags,publishedAt,updatedAt",
    limit: 4,
    orders: "-publishedAt",
  },
}).catch(() => {
  throw createError({ statusCode: 404 });
});

useSeoMeta({
  description: "Khsmtyのウェブサイト",
});
</script>

<style lang="scss">
.top-image {
  border-radius: 10px;
}
.top-image > img {
  filter: blur(5px);
}
.top-image > .v-responsive__content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
@media (width < 768px) {
  .profile {
    flex-direction: column;
  }
  .profile > span {
    text-align: center;
    margin-left: 0 !important;
  }
}

.header {
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.3rem;
  margin-bottom: 0.7rem;

  .eng {
    font-size: 1rem;
    color: #666;
  }
}
</style>
