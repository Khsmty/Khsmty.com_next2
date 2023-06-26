import Link from 'next/link';
import { LIMIT } from '@/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

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
      <Link
        href={`${basePath}/p/${current !== 1 ? current - 1 : current}`}
        className={'btn' + (current === 1 ? ' btn-disabled' : '')}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>

      <div className="join mx-2">
        {pages.map((p) => (
          <Link
            key={p}
            href={`${basePath}/p/${p}` + (q ? `?q=${q}` : '')}
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
        href={`${basePath}/p/${
          current !== pages.length ? current + 1 : pages.length
        }`}
        className={'btn' + (current === pages.length ? ' btn-disabled' : '')}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Link>
    </div>
  );
}
