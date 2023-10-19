import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer';
import { allArticles } from 'contentlayer/generated';
import Link from '@/components/mdx/Link';
import { FaArrowRight } from 'react-icons/fa6';
import Image from 'next/image';
import ArticleList from '@/components/layouts/ArticleList';

export default async function Page() {
  const sortedPosts = sortPosts(allArticles);
  const posts = allCoreContent(sortedPosts);
  const displayPosts = posts.slice(0, 6);

  return (
    <>
      <div
        className="hero mb-7 rounded-2xl"
        style={{ backgroundImage: 'url(/static/images/background.webp)' }}
      >
        <div className="hero-content h-full w-full flex-col rounded-2xl py-20 backdrop-blur backdrop-brightness-50 md:flex-row">
          <Image
            src="/static/images/icon.webp"
            alt="icon"
            className="rounded-full"
            height={100}
            width={100}
          />
          <div className="text-center text-gray-100 md:text-left">
            <h1 className="text-4xl font-semibold">Khsmty</h1>
            <p className="my-2 text-lg">よわよわプログラマー</p>
            <Link href="/profile" className="btn btn-primary btn-sm">
              プロフィール
              <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-5 flex justify-center text-2xl">新着記事</div>

      <ArticleList articles={displayPosts} />

      <div className="flex justify-center">
        <Link
          href="/article"
          className="btn btn-primary btn-md"
          aria-label="すべての記事を見る"
        >
          すべての記事を見る
          <FaArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
