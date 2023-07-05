import { getPageDetail } from '@/libs/microcms';
import Article from '@/components/Article';
import { Metadata } from 'next';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPageDetail(params.slug);

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function Page({ params }: Props) {
  const data = await getPageDetail(params.slug);

  return <Article data={data} slug={params.slug} page />;
}
