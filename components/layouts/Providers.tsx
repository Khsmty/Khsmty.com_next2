import React from 'react';
import ThemeProvider from './ThemeProvider';
import { AlgoliaSearchProvider } from 'pliny/search/Algolia';

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      <AlgoliaSearchProvider
        algoliaConfig={{
          appId: 'OZ3EZL97TA',
          apiKey: 'fe707591c3ac98c3da6f645d3e5e5010',
          indexName: 'content',
          placeholder: 'サイト内を検索',
        }}
      >
        {children}
      </AlgoliaSearchProvider>
    </ThemeProvider>
  );
}
