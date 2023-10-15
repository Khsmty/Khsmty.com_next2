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
      className="whitespace-nowrap rounded-lg bg-gray-300 px-2 py-1 text-sm"
    >
      {text.split(' ').join('-')}
    </Element>
  )
}

export default Tag
