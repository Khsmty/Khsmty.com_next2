import { KBarButton } from 'pliny/search/KBarButton'
import { AlgoliaButton } from 'pliny/search/AlgoliaButton'
import { HiMagnifyingGlass } from 'react-icons/hi2'

const SearchButton = () => {
  return (
    <AlgoliaButton>
      <HiMagnifyingGlass className="text-gray-900 dark:text-gray-100 h-6 w-6" />
    </AlgoliaButton>
  )
}

export default SearchButton
