import { JSDOM } from "jsdom"
import CompCap from "../src/models/CompCap.js"
import Gpu from "../src/models/Gpu.js"

async function ScrapeGPU(): Promise<Gpu[]> {
  const gpus: Gpu[] = []
  const seenGpus = new Set<string>()

  const url = "https://developer.nvidia.com/cuda-gpus"
  const dom = await JSDOM.fromURL(url)
  const doc = dom.window.document

  const { Node } = dom.window
  const TEXT_NODE = Node.TEXT_NODE
  const ELEMENT_NODE = Node.ELEMENT_NODE

  function isElement(node: Node): node is Element {
    return node.nodeType === ELEMENT_NODE
  }

  // get text content of an element and its children, handling <br> tags as '\n'
  function getText(element: Element): string {
    let text = ""
    if (element.nodeType === TEXT_NODE) {
      text = element.textContent ?? ""
    }
    for (const child of element.childNodes) {
      if (child.nodeType === TEXT_NODE) {
        text += child.textContent ?? ""
      } else if (isElement(child)) {
        if (child.tagName === "BR") {
          text += "\n"
        } else {
          text += getText(child)
        }
      }
    }
    return text
  }

  const tableBody = doc.querySelector("#isy0j > tbody")
  if (tableBody === null) {
    console.error("Table body not found")
    return gpus
  }

  const trs = tableBody.querySelectorAll("tr")
  trs.forEach((tr) => {
    for (const gpu of parseRow(tr, getText)) {
      if (!seenGpus.has(gpu.name)) {
        seenGpus.add(gpu.name)
        gpus.push(gpu)
      }
    }
  })

  return gpus
}

function parseRow(row: Element, getText: (elm: Element) => string): Gpu[] {
  const cells = row.querySelectorAll("td")
  if (cells.length < 2) {
    console.error("Row does not have enough cells")
    return []
  }

  const cc = cells[0].textContent?.trim() ?? ""

  const gpuNamesText = getText(cells[1]) + " " + getText(cells[2]) + getText(cells[3])
  if (gpuNamesText === "") {
    console.error("GPU name not found")
    return []
  }

  return gpuNamesText.split("\n").map((name) => {
    return new Gpu(name.trim(), CompCap.fromString(cc))
  })
}

export default ScrapeGPU
