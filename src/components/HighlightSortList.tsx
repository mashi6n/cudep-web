import CudaV from "../models/CudaV"
type T = CudaV
interface HighlightSortListProps {
  title: string
  allItems: T[]
  highlightItems: T[]
}

export default function HighlightSortList(
  { title, allItems, highlightItems }: HighlightSortListProps,
) {
  const highlightSet = new Set(highlightItems)
  const allSorteditems = [...allItems].sort((a, b) => b.isLessThanOrEqualTo(a) ? -1 : 1)

  return (
    <div className="p-4 max-w-md mx-auto flex flex-col h-full min-h-0">
      <div className="p-4 text-lg font-semibold flex-none">
        {title}
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(3rem,1fr))] content-start gap-2 flex-1 overflow-y-auto min-h-0">
        {allSorteditems.map((item) => {
          if (highlightSet.has(item)) {
            return (
              <li
                key={item.toString()}
                className={`p-2 text-indigo-300 font-bold`}
              >
                {item.toString()}
              </li>
            )
          }
          return (
            <li
              key={item.toString()}
              className={`p-2  border-b-gray-500 text-gray-500`}
            >
              {item.toString()}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
