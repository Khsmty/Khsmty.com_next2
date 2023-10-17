import { AlgoliaButton } from 'pliny/search/AlgoliaButton';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export default function SearchButton() {
  return (
    <AlgoliaButton className="btn btn-square btn-ghost px-3">
      <FaMagnifyingGlass className="m-auto h-4 w-4" />
    </AlgoliaButton>
  );
}
