import React from 'react';
import {
  FaCircleCheck,
  FaCircleExclamation,
  FaCircleInfo,
  FaTriangleExclamation,
} from 'react-icons/fa6';

interface Props {
  type?: 'info' | 'warning' | 'danger' | 'success';
  children: React.ReactNode;
}

const variants = {
  info: {
    icon: FaCircleInfo,
    color: '#3b82f6',
  },
  warning: {
    icon: FaTriangleExclamation,
    color: '#d97706',
  },
  danger: {
    icon: FaCircleExclamation,
    color: '#ef4444',
  },
  success: {
    icon: FaCircleCheck,
    color: '#16a34a',
  },
};

export default function Callout({ type = 'info', children }: Props) {
  const { icon: Icon, color } = variants[type];

  return (
    <div className="mb-4 flex rounded-lg border">
      <div
        className="flex w-14 items-center justify-end rounded-l-lg border-r text-gray-50"
        style={{ backgroundColor: color }}
      >
        <Icon className="mr-3 h-6 w-6" />
      </div>
      <div className="mt-4 w-full px-6 leading-7">{children}</div>
    </div>
  );
}
