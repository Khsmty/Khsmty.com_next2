import { format, utcToZonedTime } from 'date-fns-tz'
import emoji from 'react-easy-emoji'

export const formatDate = (date: string) => {
  const utcDate = new Date(date)
  const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo')
  return format(jstDate, 'yyyy/MM/dd')
}

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
  })
}
