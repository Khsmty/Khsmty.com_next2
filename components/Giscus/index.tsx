'use client';

import Giscus from '@giscus/react';

import styles from './index.module.scss';

export default function GiscusComponent() {
  return (
    <Giscus
      id={styles.comments}
      repo="Khsmty/Khsmty.com"
      repoId="R_kgDOJpMqKA"
      category="コメント"
      categoryId="DIC_kwDOJpMqKM4CXK78"
      mapping="pathname"
      strict="1"
      reactionsEnabled="0"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="ja"
      loading="lazy"
    />
  );
}
