'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

type Props = {
  path: string;
};

export default function CopyBtn({ path }: Props) {
  return (
    <button
      className="btn-ghost btn-circle btn"
      onClick={() => {
        navigator.clipboard.writeText(
          process.env.NEXT_PUBLIC_BASE_URL + `/article/${path}`
        );
      }}
    >
      <FontAwesomeIcon icon={faClipboard} size="xl" className="h-6 w-6" />
    </button>
  );
}
