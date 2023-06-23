import { Metadata } from 'next';
import { getDetail } from '@/libs/microcms';
import Article from '@/components/Article';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faShare } from '@fortawesome/free-solid-svg-icons';
import {
  faLine,
  faTwitter,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getDetail(params.slug);

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
    },
  };
}

export default async function Page({ params }: Props) {
  const data = await getDetail(params.slug);

  const shares = [
    {
      icon: faTwitter,
      color: '#1d9bf0',
      url: 'https://twitter.com/intent/tweet?url={url}&text={title}&via=@Khsmty',
    },
    {
      icon: faFacebook,
      color: '#1877f2',
      url: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    },
    {
      icon: faLine,
      color: '#06c655',
      url: 'https://social-plugins.line.me/lineit/share?url={url}&text={title}',
    },
  ];

  return (
    <>
      <Article data={data} />

      <div className="mb-14 mt-8 flex flex-col items-center gap-2">
        <span className="flex items-center text-xl font-semibold">
          <FontAwesomeIcon icon={faShare} className="mr-2 h-4 w-4" />
          共有
        </span>

        <div className="flex gap-2">
          {shares.map((share) => (
            <a
              key={share.icon.iconName}
              href={share.url
                .replace(
                  '{url}',
                  encodeURIComponent(
                    process.env.BASE_URL + `/article/${data.id}`
                  )
                )
                .replace('{title}', encodeURIComponent(data.title))}
              className="btn-circle btn"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={share.icon}
                className="h-6 w-6"
                style={{ color: share.color }}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
