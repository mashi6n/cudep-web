import { useState } from "react"
import { useEffect } from "react"
import "./App.css"
import FilterSortList from "./components/FilterSortList"
import DepResolver from "./models/DepResolver"

function App() {
  const [dep, setDep] = useState<DepResolver>(new DepResolver([], [], []))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDep()
      .then((data) => {
        setLoading(false)
        setDep(data)
      })
      .catch((error) => {
        console.error("Error fetching dependency data:", error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div>
        {loading ? <p>Loading...</p> : <FilterSortList items={dep.gpus.map((gpu) => gpu.name)} />}
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
