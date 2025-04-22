import { JSDOM } from "jsdom"
import CompCap from "../src/models/CompCap.js"
import Gpu from "../src/models/Gpu.js"

async function ScrapeGPU(): Promise<Gpu[]> {
  const gpus: Gpu[] = []

  const url = "https://developer.nvidia.com/cuda-gpus"
  const dom = await JSDOM.fromURL(url)
  const doc = dom.window.document
  const trs = doc.querySelectorAll("tr")
  trs.forEach((tr) => {
    const gpu = parseRow(tr)
    if (gpu) {
      gpus.push(gpu)
    }
  })
  return gpus
}

function parseRow(row: Element): Gpu | null {
  const cells = row.querySelectorAll("td")
  if (cells.length < 2) {
    return null
  }
  const gpuName = cells[0].textContent?.trim() ?? ""
  const cc = cells[1].textContent?.trim() ?? ""
  return new Gpu(gpuName.trim(), new CompCap(cc))
}
export default ScrapeGPU
