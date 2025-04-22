import { useState } from "react"
import { useEffect } from "react"
import "./App.css"
import FilterSortList from "./components/FilterSortList"
import {VersionInputValue, VersionInput} from "./components/VersionInput"
import DepResolver from "./models/DepResolver"

function App() {
  const [dep, setDep] = useState<DepResolver>(new DepResolver([], [], []))

  useEffect(() => {
    fetchDep()
      .then((data) => {
        setDep(data)
      })
      .catch((error) => {
        console.error("Error fetching dependency data:", error)
      })
  }, [])
  const handleGpuSelect = (item: string | null) => {
    console.log("選択された項目:", item)
  }
  const handleVersionChange = (item: VersionInputValue) => {
    console.log("Version changed:", item.major, item.minor, item.patch)
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 p-4">
        <FilterSortList items={dep.gpus.map((gpu) => gpu.name)} onSelect={handleGpuSelect} />
        <VersionInput onChange={handleVersionChange} />
      </div>
    </>
  )
}

async function fetchDep(): Promise<DepResolver> {
  const response = await fetch("dependency.json")
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const dep: DepResolver = await response.json()
  console.log("Fetched dependency data:", dep)
  return dep
}

export default App
