import React from 'react';

interface Props {
  title: string;
  open?: boolean;
  children: React.ReactNode;
}

export default function Callout({ title, open = false, children }: Props) {
  return (
    <details className="rounded-lg border" open={open}>
      <summary className="px-3 py-2 text-lg font-semibold">{title}</summary>
      <div className="border-t px-4 pt-4">{children}</div>
    </details>
  );
}
