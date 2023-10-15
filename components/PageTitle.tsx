import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
      {children}
    </h1>
  )
}
