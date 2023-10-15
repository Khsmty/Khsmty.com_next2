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
    <footer className="p-4 pb-6 mt-10 text-sm">
      <div className="flex justify-between items-center flex-col lg:flex-row gap-4 lg:gap-0">
        <div className="flex gap-4 items-center">
          <Image
            src="/static/icon.webp"
            alt="icon"
            className="rounded-full"
            width={30}
            height={30}
          />
          <p>©2020 Khsmty</p>
        </div>
        <div className="flex gap-4">
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
