import { formatDate } from '@/libs/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

type Props = {
  date: string;
  small?: boolean;
};

export default function PublishedDate({ date, small = false }: Props) {
  return (
    <span
      className={
        'flex items-center text-gray-500 ' + (!small ? 'text-base' : 'text-sm')
      }
    >
      <FontAwesomeIcon icon={faCalendarDays} className="mr-1 h-3 w-3" />
      {formatDate(date)}
    </span>
  );
}
