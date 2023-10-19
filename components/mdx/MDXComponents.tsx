import TOCInline from 'pliny/ui/TOCInline';
import Pre from 'pliny/ui/Pre';
import type { MDXComponents } from 'mdx/types';
import Image from './Image';
import CustomLink from './Link';
import Callout from './Callout';
import Details from './Details';

export const components: MDXComponents = {
  TOCInline,
  Callout,
  Details,
  // @ts-expect-error
  a: CustomLink,
  // @ts-expect-error
  pre: Pre,
  // @ts-expect-error
  img: Image,
};
