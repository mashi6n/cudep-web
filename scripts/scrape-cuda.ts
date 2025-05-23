import { JSDOM } from "jsdom"
import CudaDep from "../src/models/CudaDep.js"
import CudaV from "../src/models/CudaV.js"
import DriverV from "../src/models/DriverV.js"

async function ScrapeCuda(): Promise<CudaDep[]> {
  console.log("Scraping CUDA data...")
  const cudaDeps: CudaDep[] = []
  const seenCuda = new Set<string>()

  const url = "https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html"
  const dom = await JSDOM.fromURL(url)
  const doc = dom.window.document
  const table = doc.getElementById("id7")
  if (!table) {
    throw new Error("Scraping Cuda: Table not found")
  }

  const cap = table.querySelector("caption")
  if (
    !(cap?.textContent?.includes("CUDA Toolkit and Corresponding Driver Versions"))
  ) {
    throw new Error("Scraping Cuda: Table caption not found or does not match")
  }

  const rows = table.querySelectorAll("tbody tr")
  rows.forEach((row) => {
    const cudaDep = parseRow(row)
    if (cudaDep && !seenCuda.has(cudaDep.cuda.toString())) {
      cudaDeps.push(cudaDep)
      seenCuda.add(cudaDep.cuda.toString())
    }
  })

  if (cudaDeps.length === 0) {
    throw new Error("Scraping Cuda: No data found")
  }
  return cudaDeps
}

function parseRow(row: Element): CudaDep | null {
  const cells = row.querySelectorAll("td")
  let cuda = cells[0].textContent?.trim() ?? ""
  let minLinuxDriver = cells[1].textContent?.trim() ?? ""
  let minWindowsDriver = cells[2].textContent?.trim() ?? ""
  if (cuda === "") {
    return null
  }
  const verStr = /CUDA\s+(\d+\.\d+)/.exec(cuda)
  if (!verStr) {
    return null
  }
  cuda = (verStr.length > 1) ? String(verStr[1]) : "0.0"
  minLinuxDriver = minLinuxDriver.replace(">=", "").trim()
  minWindowsDriver = minWindowsDriver.replace(">=", "").trim()
  return new CudaDep(
    CudaV.fromString(cuda),
    DriverV.fromString(minLinuxDriver),
    DriverV.fromString(minWindowsDriver),
  )
}
export default ScrapeCuda
