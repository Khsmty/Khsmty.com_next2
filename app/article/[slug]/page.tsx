import { getDetail } from '@/libs/microcms';
import Article from '@/components/Article';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faB, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import {
  faLine,
  faTwitter,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import CopyBtn from '@/components/CopyBtn';
import GiscusComponent from '@/components/Giscus';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

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
    {
      icon: faB,
      color: '#00a4de',
      url: 'https://b.hatena.ne.jp/add?mode=confirm&url={url}&title={title}',
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

        <div className="flex">
          {shares.map((share) => (
            <a
              key={share.icon.iconName}
              href={share.url
                .replace(
                  '{url}',
                  encodeURIComponent(
                    process.env.NEXT_PUBLIC_BASE_URL + `/article/${data.id}`
                  )
                )
                .replace('{title}', encodeURIComponent(data.title))}
              className="btn-ghost btn-circle btn"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={share.icon}
                className="h-6 w-6"
                style={{ color: share.color }}
              />
            </a>
          ))}
          <CopyBtn path={data.id} />
        </div>

        <span className="mt-3 flex items-center text-xl font-semibold">
          <FontAwesomeIcon icon={faComment} className="mr-2 h-4 w-4" />
          コメント
        </span>

        <div className="w-full">
          <GiscusComponent />
        </div>
      </div>
    </>
  );
}
