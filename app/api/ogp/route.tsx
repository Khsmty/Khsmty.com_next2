import { Article, Page, allArticles, allPages } from 'contentlayer/generated';
import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const type = params.get('type');
  const slug = params.get('slug');

  if (!type || !slug) {
    return new Response('type and slug are required', { status: 400 });
  }

  let post: Article | Page;
  if (type === 'article') {
    const article = allArticles.find((p) => p.slug === slug);
    if (!article) {
      return new Response('article not found', { status: 404 });
    }

    post = article;
  } else {
    const page = allPages.find((p) => p.slug === slug);
    if (!page) {
      return new Response('page not found', { status: 404 });
    }

    post = page;
  }

  const title = post.title;
  const emoji = post.emoji;

  return new ImageResponse(
    (
      <div tw="flex w-full h-full items-center justify-center bg-green-200">
        <div tw="w-[95%] h-11/12 flex bg-white rounded-3xl shadow-md relative">
          <div tw="w-50 flex">
            <div tw="flex items-center justify-center ml-auto mr-4 mt-14 bg-gray-100 w-35 h-35 rounded-3xl">
              <span tw="text-[6.5rem]">{emoji}</span>
            </div>
          </div>
          <div tw="pt-14 text-7xl pl-7 pr-10 font-semibold">{title}</div>

          <div tw="absolute bottom-7 right-10 text-6xl flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img
              src="https://khsmty.vercel.app/static/icon.png"
              tw="rounded-full mr-3"
              width={55}
              height={55}
            />
            Khsmties
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
