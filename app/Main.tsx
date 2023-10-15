import Link from '@/components/Link'
import { FaArrowRight } from 'react-icons/fa6'
import Image from 'next/image'
import ArticleList from '@/components/ArticleList'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const displayPosts = posts.slice(0, MAX_DISPLAY)

  return (
    <>
      <div
        className="grid w-full place-items-center bg-cover bg-[50%] mb-7 rounded-2xl"
        style={{ backgroundImage: 'url(/static/background.webp)' }}
      >
        <div className="z-0 flex items-center justify-center max-w-[80rem] gap-4 p-4 h-full w-full flex-col rounded-2xl py-20 backdrop-blur backdrop-brightness-50 md:flex-row text-[rgb(206,206,207)]">
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
            <Link
              href="/profile"
              className="focus:shadow-outline-blue inline-flex rounded-lg border border-transparent bg-blue-600 px-3 py-1.5 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500 items-center gap-2"
            >
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
  )
}
