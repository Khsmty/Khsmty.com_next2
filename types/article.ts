import { MicroCMSListContent } from "microcms-js-sdk";
import { Tag } from "./tag";

export type Article = {
  title: string;
  description: string;
  content: string;
  emoji: string;
  tags: (MicroCMSListContent & Tag)[];
};
