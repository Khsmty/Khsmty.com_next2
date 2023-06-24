import Link from 'next/link';
import { LIMIT } from '@/constants';

type Props = {
  totalCount: number;
  current?: number;
  basePath?: string;
  q?: string;
};

export default function Pagination({
  totalCount,
  current = 1,
  basePath = '',
  q,
}: Props) {
  const pages = Array.from({ length: Math.ceil(totalCount / LIMIT) }).map(
    (_, i) => i + 1
  );

  return (
    <div className="mb-10 mt-4 flex items-center justify-center">
      <div className="join">
        {pages.map((p) => (
          <Link
            key={p}
            href={`${basePath}/p/${p}` + (q ? `?q=${q}` : '')}
            className={
              'btn' +
              (pages.length > 1 ? ' join-item' : '') +
              (current === p ? ' btn-active' : '')
            }
          >
            {p}
          </Link>
        ))}
      </div>
    </div>
  );
}
