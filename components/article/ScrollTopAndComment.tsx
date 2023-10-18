'use client';

import { useEffect, useState } from 'react';
import { FaArrowUp, FaComments } from 'react-icons/fa6';

export default function ScrollTopAndComment() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true);
      else setShow(false);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 });
  };
  const handleScrollToComment = () => {
    document.getElementById('comments')?.scrollIntoView();
  };
  return (
    <div
      className={`fixed bottom-8 right-8 flex-col gap-3 ${
        show ? 'flex' : 'hidden'
      }`}
    >
      <button
        aria-label="コメント欄までスクロール"
        onClick={handleScrollToComment}
        className="rounded-full bg-neutral-content p-2 text-gray-500"
      >
        <FaComments className="h-5 w-5" />
      </button>
      <button
        aria-label="一番上までスクロール"
        onClick={handleScrollTop}
        className="rounded-full bg-neutral-content p-2 text-gray-500"
      >
        <FaArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
