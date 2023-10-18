'use client';

import Link from '../mdx/Link';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import Image from 'next/image';
import { FaBars, FaHouse, FaFeather, FaUser, FaTag } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [drawerOpen]);

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }

  const links = [
    {
      icon: FaHouse,
      name: 'ホーム',
      to: '/',
    },
    {
      icon: FaFeather,
      name: '記事一覧',
      to: '/article',
    },
    {
      icon: FaTag,
      name: 'タグ一覧',
      to: '/tag',
    },
    {
      icon: FaUser,
      name: 'プロフィール',
      to: '/profile',
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
              <label htmlFor="drawer" className="btn btn-square btn-ghost">
                <FaBars className="h-5 w-5" />
              </label>
            </div>

            {/* サイトタイトル */}
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost text-xl normal-case">
                <Image
                  src="/static/icon.webp"
                  alt="icon"
                  className="rounded-full"
                  width={40}
                  height={40}
                />
                <span className="text-2xl">Khsmties</span>
              </Link>
            </div>

            {/* スマホ検索ボタン */}
            <div className="flex-none sm:hidden">
              <SearchButton />
              <ThemeSwitch />
            </div>

            {/* PCメニュー */}
            <div className="hidden flex-none sm:block">
              {links.map((link) => (
                <Link
                  href={link.to}
                  key={link.name}
                  className="btn btn-ghost px-3"
                >
                  <link.icon className="h-4 w-4" />
                  <span className="text-base font-normal">{link.name}</span>
                </Link>
              ))}

              <SearchButton />
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <div className="drawer-side z-50">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="drawer" className="drawer-overlay" />
        <ul className="menu menu-lg h-full w-80 overflow-hidden bg-base-200 p-4 pt-10 !text-2xl">
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.to} className="py-4">
                <link.icon className="mr-1 h-5 w-5" />
                <span className="font-normal">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
