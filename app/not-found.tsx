import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: 'ページが見つかりませんでした。',
};

export default function NotFound() {
  return (
    <div className="flex h-[75vh] flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-bold">404 Not Found</h1>
      <p>ページが見つかりませんでした</p>

      <Link href="/" className="btn-primary btn mt-3">
        <FontAwesomeIcon icon={faHome} className="h-4 w-4" />
        ホーム
      </Link>
    </div>
  );
}
