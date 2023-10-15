'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  return <CommentsComponent commentsConfig={siteMetadata.comments!} slug={slug} />
}
