'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faEnvelope,
  faHome,
  faMagnifyingGlass,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Nav() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname, searchParams]);

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }

  const links = [
    {
      icon: faHome,
      name: 'ホーム',
      to: '/',
    },
    {
      icon: faMagnifyingGlass,
      name: '検索',
      to: '/search',
    },
    {
      icon: faUser,
      name: 'プロフィール',
      to: '/profile',
    },
    {
      icon: faEnvelope,
      name: '連絡先',
      to: '/contacts',
    },
  ];

  return (
    <header className="drawer">
      <input
        id="drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="fixed top-0 z-40 w-full bg-base-200 drop-shadow-xl">
          <div className="navbar mx-auto max-w-5xl">
            <div className="flex-none sm:hidden">
              <label htmlFor="drawer" className="btn-ghost btn-square btn">
                <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
              </label>
            </div>

            {/* サイトタイトル */}
            <div className="flex-1">
              <Link href="/" className="btn-ghost btn text-xl normal-case">
                <Image
                  src="/img/icon_r.webp"
                  alt="icon"
                  width={40}
                  height={40}
                />
                <span className="text-2xl">Khsmty</span>
              </Link>
            </div>

            {/* スマホ検索ボタン */}
            <div className="flex-none sm:hidden">
              <Link href="/search" className="btn-ghost btn-square btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5" />
              </Link>
            </div>

            {/* PCメニュー */}
            <div className="hidden flex-none sm:block">
              {links.map((link) => (
                <Link
                  href={link.to}
                  key={link.name}
                  className="btn-ghost btn px-3"
                >
                  <FontAwesomeIcon icon={link.icon} className="h-4 w-4" />
                  <span className="text-base font-normal">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <div className="drawer-side z-50">
        <label htmlFor="drawer" className="drawer-overlay"></label>
        <ul className="menu menu-lg h-full w-60 bg-base-200 p-4">
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.to}>
                <FontAwesomeIcon icon={link.icon} className="h-4 w-4" />
                <span className="text-base font-normal">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
