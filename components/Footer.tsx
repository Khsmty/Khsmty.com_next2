import Link from './Link'
import Image from 'next/image'

export default function Footer() {
  const links = [
    {
      name: 'ホーム',
      to: '/',
    },
    {
      name: 'プライバシーポリシー',
      to: '/privacy',
    },
  ]

  return (
    <footer className="items-center bg-base-200 p-4 text-neutral-content">
      <div className="footer mx-auto max-w-4xl gap-y-3">
        <div className="grid-flow-col items-center">
          <Image
            src="/static/icon.webp"
            alt="icon"
            className="rounded-full"
            width={30}
            height={30}
          />
          <p>©2020 Khsmty</p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          {links.map((link) => (
            <Link href={link.to} key={link.name}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
