import { FaArrowsRotate, FaCalendarDays } from 'react-icons/fa6';
import { formatDate } from 'scripts/utils';

type Props = {
  date: string;
  small?: boolean;
  type?: 'published' | 'updated';
};

export default function PublishedDate({
  date,
  small = false,
  type = 'published',
}: Props) {
  const Icon = type === 'published' ? FaCalendarDays : FaArrowsRotate;

  return (
    <span
      className={
        'flex items-center text-gray-500 ' + (!small ? 'text-base' : 'text-sm')
      }
    >
      <Icon className="mr-1 h-3 w-3" />
      {formatDate(date)}
    </span>
  );
}
