import CudaV from "../models/CudaV"
type T = CudaV
interface HighlightSortListProps {
  allItems: T[]
  highlightItems: T[]
}

export default function HighlightSortList({ allItems, highlightItems }: HighlightSortListProps) {
  const highlightSet = new Set(highlightItems)
  const highlightSortedItems = [...highlightItems].sort((a, b) => b.isLessThanOrEqualTo(a) ? -1 : 1)
  const allSorteditems = [...allItems].sort((a, b) => b.isLessThanOrEqualTo(a) ? -1 : 1)

  return (
    <div className="p-4 max-w-md mx-auto">
      <ul className="space-y-2 ">
        {highlightSortedItems.map((item) => (
          <li
            key={item.toString()}
            className={`p-2 border rounded`}
          >
            {item.toString()}
          </li>
        ))}
        {allSorteditems.map((item) => {
          if (highlightSet.has(item)) {
            return null
          }
          return (
            <li
              key={item.toString()}
              className={`p-2 border rounded border-b-gray-500 text-gray-500`}
            >
              {item.toString()}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
