import Link from 'next/link';
import { Tag } from '@/libs/microcms';

type Props = {
  tag: Tag;
  noLink?: boolean;
};

export default function TagListItem({ tag, noLink = false }: Props) {
  if (!noLink) {
    return (
      <Link
        href={`/tag/${tag.id}`}
        className="whitespace-nowrap rounded-lg bg-base-200 px-2 py-1 text-sm"
      >
        {tag.name}
      </Link>
    );
  } else {
    return (
      <span className="whitespace-nowrap rounded-lg bg-base-100 px-2 py-1 text-xs">
        {tag.name}
      </span>
    );
  }
}
