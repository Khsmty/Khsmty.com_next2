import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import cheerio from 'cheerio';
import { highlight } from '@/libs/highlight';
import emoji from 'react-easy-emoji';

export const formatDate = (date: string) => {
  const utcDate = new Date(date);
  const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
  return format(jstDate, 'yyyy/MM/dd');
};

export const formatRichText = (richText: string) => {
  const $ = cheerio.load(richText);

  $('pre code').each((_, elm) => {
    const attr = $(elm).attr('class') || '';
    let lang = attr.replace('language-', '');
    let hasDiff = false;
    if (lang.startsWith('diff-')) {
      hasDiff = true;
      lang = lang.replace('diff-', '');
    }

    const result = highlight($(elm).text(), lang, hasDiff);
    $(elm).html(result);
  });

  const headings = $('h1, h2, h3, h4, h5').toArray();
  const toc = headings.map((data) => ({
    // @ts-expect-error
    text: data.children
      // @ts-expect-error
      .map((child) => (child.data ? child.data : child.children[0].data))
      .join(''),
    // @ts-expect-error
    id: data.attribs.id,
    // @ts-expect-error
    name: data.name.replace('h1', 'h2'),
    num: '0',
  }));

  // toc に番号を振る
  let h2 = 0,
    h3 = 0,
    h4 = 0,
    h5 = 0;
  for (let i = 0; i < toc.length; i++) {
    if (toc[i].name === 'h2') {
      h2++;
      h3 = 0;
      h4 = 0;
      h5 = 0;
      toc[i].num = `${h2}.`;
    } else if (toc[i].name === 'h3') {
      h3++;
      h4 = 0;
      h5 = 0;
      toc[i].num = `${h2}.${h3}.`;
    } else if (toc[i].name === 'h4') {
      h4++;
      h5 = 0;
      toc[i].num = `${h2}.${h3}.${h4}.`;
    } else if (toc[i].name === 'h5') {
      h5++;
      toc[i].num = `${h2}.${h3}.${h4}.${h5}.`;
    }
  }

  return { html: $.html(), toc };
};

export const twemoji = (input: string, size: number) => {
  return emoji(input, {
    baseUrl: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg',
    ext: '.svg',
    size: '',
    props: {
      style: {
        width: `${size}px`,
        height: `${size}px`,
        margin: '0px 0.05em 0px 0.1em',
        verticalAlign: '-0.1em',
      },
    },
  });
};
