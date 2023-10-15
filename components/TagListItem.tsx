import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
  noLink?: boolean
}

const Tag = ({ text, noLink }: Props) => {
  const Element = noLink ? 'p' : Link

  return (
    <Element
      href={`/tag/${slug(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text.split(' ').join('-')}
    </Element>
  )
}

export default Tag
