<template>
  <v-col cols="12" sm="6">
    <v-card class="article-card" :to="props.to" :href="props.href" ripple>
      <div class="eyecatch-emoji">
        <twemoji v-if="props.emoji" :emoji="props.emoji" size="40px" />
        <v-img
          v-else-if="props.img"
          :src="props.img"
          width="30px"
          height="30px"
        />
      </div>
      <div style="line-height: 1.2">
        <v-chip-group v-if="props.tags.length" class="ml-auto">
          <v-chip
            v-for="tag in (props.tags as Tag[])"
            :key="tag.id"
            :to="`/tag/${tag.id}`"
            density="compact"
            class="mt-0 mb-1"
          >
            {{ tag.name }}
          </v-chip>
        </v-chip-group>

        <span class="card-title">{{ props.title }}</span>
        <span v-if="props.description" class="card-description">
          <br />
          {{ props.description }}
        </span>
      </div>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import { Tag } from "~/types/tag";

const props = defineProps({
  to: {
    type: String,
    required: false,
  },
  href: {
    type: String,
    required: false,
  },
  emoji: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  tags: {
    type: Array,
    required: false,
    default: () => [],
  },
});
</script>

<style lang="scss">
.article-card {
  display: flex;
  align-items: center;
  padding: 0.7rem;

  .eyecatch-emoji {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: #4a4b4e;
    margin-right: 1rem;
    border-radius: 7px;
    flex-shrink: 0;
  }
  .card-title {
    font-size: larger;
  }
  .card-description {
    font-size: 0.9rem;
    color: #a0a0a0;
  }
}
</style>
