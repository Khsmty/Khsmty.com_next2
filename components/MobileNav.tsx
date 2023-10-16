'use client'

import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { HiBars3, HiXMark } from 'react-icons/hi2'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <button aria-label="Toggle Menu" onClick={onToggleNav} className="sm:hidden">
        <HiBars3 className="w-8 h-8" />
      </button>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full transform opacity-95 dark:opacity-[0.98] bg-white duration-300 ease-in-out dark:bg-gray-950 !ml-0 ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end">
          <button
            className="mr-3 mt-4 h-10 w-10 flex justify-center items-center"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <HiXMark className="h-8 w-8" />
          </button>
        </div>
        <nav className="fixed mt-8 h-full">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12 py-4">
              <Link
                href={link.href}
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}

export default MobileNav
