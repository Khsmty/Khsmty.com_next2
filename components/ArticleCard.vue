<template>
  <v-col cols="12" sm="6">
    <v-card class="article-card" :to="props.to" ripple>
      <div class="eyecatch-emoji">
        <twemoji :emoji="props.emoji" size="40px" />
      </div>
      <div>
        <v-chip-group v-if="props.tags.length" class="ml-auto">
          <v-chip
            v-for="tag in (props.tags as Tag[])"
            :key="tag.id"
            :to="`/tag/${tag.id}`"
            density="compact"
            class="mt-0 mb-2"
          >
            {{ tag.name }}
          </v-chip>
        </v-chip-group>

        <span>{{ props.title }}</span>
      </div>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import { Tag } from "~/types/tag";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
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
  font-size: larger;
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
}
</style>
