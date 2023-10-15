import TagListItem from './TagListItem'

type Props = {
  tags?: string[]
  noLink?: boolean
}

export default function TagList({ tags, noLink = false }: Props) {
  if (!tags) {
    return null
  }

  return (
    <div className="m-0 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TagListItem key={tag} text={tag} noLink={noLink} />
      ))}
    </div>
  )
}
