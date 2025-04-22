import { useState } from "react"
import { useEffect } from "react"
import "./App.css"
import DepResolver from "./models/DepResolver"

function App() {
  const [dep, setDep] = useState<DepResolver | null>(null)
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
        {loading ? <p>Loading...</p> : <p>{dep ? JSON.stringify(dep) : "No data available"}</p>}
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
  return dep
}

export default App
