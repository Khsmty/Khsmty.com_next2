/*
 * This source is an edited of https://github.com/zenn-dev/zenn-editor/blob/b41955d4572e3eee41245dc07b436d9498765c47/packages/zenn-markdown-html/src/utils/prismjs-components-loader.ts
 * Copyright © 2020-Present zenn.dev
 */

import Prism from 'prismjs';
import components from 'prismjs/components';
// @ts-ignore
import getLoader from 'prismjs/dependencies';

const loadedLanguages = new Set<string>();

/**
 * PrismJSのloadLanguagesをwebpackに対応させるために自前で実装
 * @source https://github.com/PrismJS/prism/blob/2815f699970eb8387d741e3ac886845ce5439afb/components/index.js
 */
export default function loadLanguages(languages: string | string[]) {
  if (languages === undefined) {
    languages = Object.keys(components.languages).filter((l) => l != 'meta');
  } else if (!Array.isArray(languages)) {
    languages = [languages];
  }

  // the user might have loaded languages via some other way or used `prism.js` which already includes some
  // we don't need to validate the ids because `getLoader` will ignore invalid ones
  // @ts-ignore
  const loaded = [...loadedLanguages, ...Object.keys(Prism.languages)];

  getLoader(components, languages, loaded).load((lang: string) => {
    if (!(lang in components.languages)) {
      if (!loadLanguages.silent) {
        console.warn('Language does not exist: ' + lang);
      }
      return;
    }

    try {
      require(`prismjs/components/prism-${lang}`);
    } catch (e) {
      console.error(e);
    }

    loadedLanguages.add(lang);
  });
}

/**
 * Set this to `true` to prevent all warning messages `loadLanguages` logs.
 */
loadLanguages.silent = false;
