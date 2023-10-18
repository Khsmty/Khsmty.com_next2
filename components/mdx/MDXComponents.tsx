import TOCInline from 'pliny/ui/TOCInline';
import Pre from 'pliny/ui/Pre';
import type { MDXComponents } from 'mdx/types';
import Image from './Image';
import CustomLink from './Link';

export const components: MDXComponents = {
  Image,
  TOCInline,
  // @ts-expect-error
  a: CustomLink,
  // @ts-expect-error
  pre: Pre,
};
