import { useCallback, useMemo, useState } from "react"
import { useEffect } from "react"
import "./App.css"
import FilterSortList from "./components/FilterSortList"
import HighlightSortList from "./components/HighlightSortList"
import { VersionInput, VersionInputValue } from "./components/VersionInput"
import DepResolver from "./models/DepResolver"
import DriverV from "./models/DriverV"

function App() {
  const [dep, setDep] = useState<DepResolver>(new DepResolver([], [], []))
  const [gpuName, setGpuName] = useState<string>("")
  const [driverVersion, setDriverVersion] = useState<DriverV>(new DriverV(0, 0, 0))

  useEffect(() => {
    fetchDep()
      .then((data) => {
        setDep(data)
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error("Error fetching dependency data:", error.message)
        } else {
          console.error("Error fetching dependency data:", error)
        }
      })
  }, [])

  const compatibleCudas = useMemo(() => {
    return dep.getCompatibleCudas(gpuName, driverVersion)
  }, [gpuName, driverVersion, dep])

  const handleGpuSelect = useCallback((item: string | null) => {
    setGpuName(item ?? "")
  }, [])

  const handleVersionChange = useCallback((item: VersionInputValue) => {
    setDriverVersion(new DriverV(item.major, item.minor, item.patch))
  }, [])

  return (
    <>
      <div className="grid md:grid-cols-3 gap-4 p-4">
        <FilterSortList items={dep.gpus.map((gpu) => gpu.name)} onSelect={handleGpuSelect} />
        <VersionInput onChange={handleVersionChange} />
        <HighlightSortList
          allItems={dep.cudaDeps.map((c) => c.cuda)}
          highlightItems={compatibleCudas}
        />
      </div>
    </>
  )
}

async function fetchDep(): Promise<DepResolver> {
  const response = await fetch("dependency.json")
  if (!response.ok) {
    console.error("Failed to fetch dependency data:", response.statusText)
    return new DepResolver([], [], [])
  }
  const data = await response.json() as DepResolver
  const dep: DepResolver = new DepResolver(
    data.gpus,
    data.ccDeps,
    data.cudaDeps,
  )
  console.log("Fetched dependency data:", dep)
  return dep
}

export default App
