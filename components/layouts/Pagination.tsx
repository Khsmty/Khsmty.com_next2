import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

type Props = {
  totalCount: number;
  current?: number;
  basePath?: string;
};

export default function Pagination({
  totalCount,
  current = 1,
  basePath = '',
}: Props) {
  const pages = Array.from({ length: Math.ceil(totalCount / 10) }).map(
    (_, i) => i + 1,
  );

  return (
    <div className="mt-4 flex items-center justify-center">
      <Link
        href={`${basePath}/page/${current !== 1 ? current - 1 : current}`}
        className={'btn' + (current === 1 ? ' btn-disabled' : '')}
      >
        <FaChevronLeft />
      </Link>

      <div className="join mx-2">
        {pages.map((p) => (
          <Link
            key={p}
            href={`${basePath}/page/${p}`}
            className={
              'btn' +
              (pages.length > 1 ? ' join-item' : '') +
              (current === p ? ' btn-primary btn-active' : '')
            }
          >
            {p}
          </Link>
        ))}
      </div>

      <Link
        href={`${basePath}/page/${
          current !== pages.length ? current + 1 : pages.length
        }`}
        className={'btn' + (current === pages.length ? ' btn-disabled' : '')}
      >
        <FaChevronRight />
      </Link>
    </div>
  );
}
