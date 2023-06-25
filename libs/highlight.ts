/*
 * This source is an edited of https://github.com/zenn-dev/zenn-editor/blob/b41955d4572e3eee41245dc07b436d9498765c47/packages/zenn-markdown-html/src/utils/highlight.ts
 * Copyright © 2020-Present zenn.dev
 */

import Prism, { Grammar } from 'prismjs';
import { escapeHtml } from 'markdown-it/lib/common/utils';
import loadLanguages from './prism-component-loader';
import { enableDiffHighlight } from './highlight-diff';

// diffプラグインを有効化
enableDiffHighlight();

function loadPrismGrammer(lang?: string): Grammar | undefined {
  if (!lang) return undefined;
  let langObject = Prism.languages[lang];
  if (langObject === undefined) {
    loadLanguages([lang]);
    langObject = Prism.languages[lang];
  }
  return langObject;
}

function highlightContent({
  text,
  prismGrammer,
  langName,
  hasDiff,
}: {
  text: string;
  prismGrammer?: Grammar;
  langName?: string;
  hasDiff: boolean;
}): string {
  if (prismGrammer && langName) {
    if (hasDiff)
      return Prism.highlight(text, Prism.languages.diff, `diff-${langName}`);

    return Prism.highlight(text, prismGrammer, langName);
  }

  if (hasDiff) return Prism.highlight(text, Prism.languages.diff, 'diff');
  return escapeHtml(text);
}

export function highlight(
  text: string,
  langName: string,
  hasDiff: boolean
): string {
  const prismGrammer = loadPrismGrammer(langName);
  return highlightContent({ text, prismGrammer, langName, hasDiff });
}
