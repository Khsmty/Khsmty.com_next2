import { Tag } from '@/libs/microcms';
import TagListItem from './TagListItem';

type Props = {
  tags?: Tag[];
  small?: boolean;
};

export default function TagList({ tags, small = false }: Props) {
  if (!tags) {
    return null;
  }
  return (
    <ul className="m-0 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag.id}>
          <TagListItem tag={tag} small={small} />
        </li>
      ))}
    </ul>
  );
}
