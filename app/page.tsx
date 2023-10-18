import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer';
import { allArticles } from 'contentlayer/generated';
import Link from '@/components/mdx/Link';
import { FaArrowRight } from 'react-icons/fa6';
import Image from 'next/image';
import ArticleList from '@/components/layouts/ArticleList';

const MAX_DISPLAY = 5;

export default async function Page() {
  const sortedPosts = sortPosts(allArticles);
  const posts = allCoreContent(sortedPosts);
  const displayPosts = posts.slice(0, MAX_DISPLAY);

  return (
    <>
      <div
        className="hero mb-7 rounded-2xl"
        style={{ backgroundImage: 'url(/static/background.webp)' }}
      >
        <div className="hero-content h-full w-full flex-col rounded-2xl py-20 backdrop-blur backdrop-brightness-50 md:flex-row">
          <Image
            src="/static/icon.webp"
            alt="icon"
            className="rounded-full"
            height={100}
            width={100}
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-semibold">Khsmty</h1>
            <p className="my-2 text-lg">よわよわプログラマー</p>
            <Link href="/profile" className="btn btn-primary btn-sm">
              プロフィール
              <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {!posts.length && 'No posts found.'}
      {posts.length > 0 && <ArticleList articles={displayPosts} />}

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/article"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
