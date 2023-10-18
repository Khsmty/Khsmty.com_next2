import TOCInline from 'pliny/ui/TOCInline';
import Pre from 'pliny/ui/Pre';
import type { MDXComponents } from 'mdx/types';
import Image from './Image';
import CustomLink from './Link';
import Callout from './Callout';

export const components: MDXComponents = {
  Image,
  TOCInline,
  Callout,
  // @ts-expect-error
  a: CustomLink,
  // @ts-expect-error
  pre: Pre,
};

// export { Callout };
