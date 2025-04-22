import { useMemo, useState } from "react"

interface FilterSortListProps {
  items: string[]
  onSelect?: (item: string | null) => void
}

export default function FilterSortList({ items, onSelect }: FilterSortListProps) {
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
    console.log("Sorted Items:", _sortedItems)
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
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul className="space-y-2">
        {sortedItems.map((item) => (
          <li
            key={item}
            className={`p-2 border rounded cursor-pointer ${
              selected === item ? "border-blue-300 bg-indigo-600" : ""
            }`}
            onClick={() => handleSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
