import { getList } from '@/libs/microcms';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  description: 'Khsmtyのブログです。',
};

export default async function Page() {
  const data = await getList();
  return (
    <>
      <div
        className="hero mb-7 rounded-2xl"
        style={{ backgroundImage: 'url(/img/background.webp)' }}
      >
        <div className="hero-content h-full w-full flex-col rounded-2xl py-20 text-neutral-content backdrop-blur backdrop-brightness-50 md:flex-row">
          <Image src="/img/icon_r.webp" alt="icon" height={100} width={100} />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-semibold">Khsmty</h1>
            <p className="my-2 text-lg">よわよわプログラマー</p>
            <Link href="/profile" className="btn-primary btn-sm btn">
              プロフィール
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} />
    </>
  );
}
