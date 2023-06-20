import { MicroCMSListContent } from "microcms-js-sdk";
import { Tag } from "./tag";

export type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  emoji: string;
  tags: (MicroCMSListContent & Tag)[];
  publishedAt: string;
  updatedAt: string;
};
