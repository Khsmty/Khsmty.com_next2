import { CoreContent } from 'pliny/utils/contentlayer'
import ArticleListItem from './ArticleListItem'
import { Article } from 'contentlayer/generated'

type Props = {
  articles?: CoreContent<Article>[]
}

export default function ArticleList({ articles }: Props) {
  if (!articles || articles.length === 0) {
    return <p>記事がありません。</p>
  }

  return (
    <div className="flex flex-wrap justify-between">
      {articles.map((article) => (
        <ArticleListItem key={article.slug} article={article} />
      ))}
    </div>
  )
}
