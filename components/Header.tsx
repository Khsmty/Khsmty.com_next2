import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  return (
    <header>
      <div className="drawer">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar fixed top-0 z-40 w-full bg-base-200 drop-shadow-xl">
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
              <button className="btn-ghost btn-square btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5" />
              </button>
            </div>

            {/* PCメニュー */}
            <div className="hidden flex-none sm:block">
              <ul className="menu menu-horizontal">
                <li>
                  <a>Navbar Item 1</a>
                </li>
                <li>
                  <a>Navbar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Drawer */}
        <div className="drawer-side z-50">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <ul className="menu h-full w-80 bg-base-200 p-4">
            {/* Sidebar content */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
