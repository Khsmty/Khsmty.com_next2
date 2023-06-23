import { Tag } from '@/libs/microcms';
import TagListItem from './TagListItem';

type Props = {
  tags?: Tag[];
  noLink?: boolean;
};

export default function TagList({ tags, noLink = false }: Props) {
  if (!tags) {
    return null;
  }

  return (
    <div className="m-0 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TagListItem key={tag.id} tag={tag} noLink={noLink} />
      ))}
    </div>
  );
}
