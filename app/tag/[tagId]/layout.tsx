import { getTag } from '@/libs/microcms';
import TagListItem from '@/components/TagListItem';

type Props = {
  children: React.ReactNode;
  params: {
    tagId: string;
  };
};

export default async function TagsLayout({ children, params }: Props) {
  const tag = await getTag(params.tagId);

  return (
    <div>
      <p className="mb-2">
        <TagListItem tag={tag} noLink />
        の記事一覧
      </p>
      <div>{children}</div>
    </div>
  );
}
