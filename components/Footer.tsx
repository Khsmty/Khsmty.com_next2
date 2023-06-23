import Image from 'next/image';
import Link from 'next/link';

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
  ];

  return (
    <footer className="footer items-center bg-base-200 p-4 text-neutral-content">
      <div className="grid-flow-col items-center">
        <Image src="/img/icon_r.webp" alt="icon" width={30} height={30} />
        <p>©2020 Khsmty</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        {links.map((link) => (
          <Link href={link.to} key={link.name}>
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
