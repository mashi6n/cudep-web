import { JSDOM } from "jsdom"
import CompCap from "../src/models/CompCap.js"
import CompCapDep from "../src/models/CompCapDep.js"
import CudaV from "../src/models/CudaV.js"

async function ScrapeCC(): Promise<CompCapDep[]> {
  const ccDeps: CompCapDep[] = []

  const url = "https://docs.nvidia.com/datacenter/tesla/drivers/index.html"
  const dom = await JSDOM.fromURL(url)
  const doc = dom.window.document
  const table = doc.getElementById("cuda-and-architecture-matrix-table")
  if (table === null) {
    throw new Error("Scraping CC: Table not found")
  }

  const cap = table.querySelector("caption")
  if (!(cap?.textContent?.includes("CUDA and Architecture Matrix"))) {
    throw new Error("Scraping CC: Table caption not found or does not match")
  }
  const rows = table.querySelectorAll("tbody tr")
  rows.forEach((row) => {
    const ccDepsRow = parseRow(row)
    ccDeps.push(...ccDepsRow)
  })

  if (ccDeps.length === 0) {
    throw new Error("Scraping CC: No data found")
  }
  return ccDeps
}

function parseRow(row: Element): CompCapDep[] {
  const cells = row.querySelectorAll("td")
  const ccs = Array.from(cells[1].querySelectorAll("p"), p => p.textContent?.trim() ?? "")
  const minCudas = Array.from(cells[2].querySelectorAll("p"), p => p.textContent?.trim() ?? "")
  const maxCudas = Array.from(cells[3].querySelectorAll("p"), p => p.textContent?.trim() ?? "")

  const maxLen = Math.max(ccs.length, minCudas.length, maxCudas.length)
  const ccDeps: CompCapDep[] = []
  for (let i = 0; i < maxLen; i++) {
    const cc = ccs[Math.min(i, ccs.length - 1)]
    let minCuda = minCudas[Math.min(i, minCudas.length - 1)]
    minCuda = minCuda.replace("CUDA", "").trim()
    if (minCuda.split(" ").length > 1) {
      minCuda = minCuda.split(" ")[0].trim()
    }
    let maxCuda = maxCudas[Math.min(i, maxCudas.length - 1)]
    maxCuda = maxCuda.replace("CUDA", "").replace("x", "999").replace("Ongoing", "999.999").trim()
    ccDeps.push(
      new CompCapDep(CompCap.fromString(cc), CudaV.fromString(minCuda), CudaV.fromString(maxCuda)),
    )
  }
  return ccDeps
}
export default ScrapeCC
