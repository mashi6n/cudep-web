import { useMemo, useState } from "react"

interface FilterSortListProps {
  title: string
  items: string[]
  onSelect?: (item: string | null) => void
}

export default function FilterSortList({ title, items, onSelect }: FilterSortListProps) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<string | null>(null)
  const sortedItems = useMemo(() => {
    const lowerQuery = query.toLowerCase()
    const matches: { item: string; index: number }[] = []
    const nonMatches: string[] = []

    items.forEach((item) => {
      const idx = item.toLowerCase().indexOf(lowerQuery)
      if (lowerQuery && idx !== -1) {
        matches.push({ item, index: idx })
      } else {
        nonMatches.push(item)
      }
    })

    matches.sort((a, b) => a.index - b.index)

    const _sortedItems = [...matches.map((m) => m.item), ...nonMatches]
    return _sortedItems
  }, [items, query])

  const handleSelect = (item: string) => {
    if (item === selected) {
      setSelected(null)
      onSelect?.(null)
      return
    }
    setSelected(item)
    onSelect?.(item)
  }

  return (
    <div className="p-4 max-w-md mx-auto flex flex-col h-full min-h-0">
      <div className="p-4 text-lg font-semibold flex-none">
        {title}
      </div>
      <input
        type="text"
        className="w-full p-2 mb-4 border-b flex-none focus:outline-none focus:ring-0 focus:border-b-indigo-300"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />

      <ul className="rounded border divide-y divide-gray-500 flex-1 overflow-y-auto min-h-0">
        {sortedItems.map((item) => (
          <li
            key={item}
            className={`p-3 cursor-pointer hover:brightness-120 ${
              selected === item ? "border-indigo-300 bg-indigo-900" : ""
            }`}
            onClick={() => {
              handleSelect(item)
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
