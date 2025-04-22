import { useCallback, useMemo, useState } from "react"
import { useEffect } from "react"
import "./App.css"
import FilterSortList from "./components/FilterSortList"
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
      .catch((error) => {
        console.error("Error fetching dependency data:", error)
      })
  }, [])

  const compatibleCudas = useMemo(() => {
    return dep
      .getCompatibleCudas(gpuName, driverVersion)
      .map(i => i.toString())
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
        <div className="p-4 max-w-md mx-auto">
          <ul className="space-y-2 ">
            {compatibleCudas.map((item) => (
              <li
                key={item.toString()}
                className={`p-2 border rounded cursor-pointer`}
              >
                {item.toString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

async function fetchDep(): Promise<DepResolver> {
  const response = await fetch("dependency.json")
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const data = await response.json()
  const dep: DepResolver = new DepResolver(
    data.gpus,
    data.ccDeps,
    data.cudaDeps,
  )
  console.log("Fetched dependency data:", dep)
  return dep
}

export default App
