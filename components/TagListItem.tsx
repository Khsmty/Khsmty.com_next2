import Link from 'next/link';
import { Tag } from '@/libs/microcms';

type Props = {
  tag: Tag;
  small?: boolean;
};

export default function TagListItem({ tag, small = true }: Props) {
  return (
    <Link
      href={`/tag/${tag.id}`}
      className={
        'whitespace-nowrap rounded-lg px-2 py-1 text-sm ' +
        (!small ? 'bg-base-200' : 'bg-base-100')
      }
    >
      {tag.name}
    </Link>
  );
}
