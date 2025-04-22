import { mkdirSync, writeFileSync } from "fs"
import { resolve } from "path"
import DepResolver from "../src/models/DepResolver.js"
import ScrapeCC from "./scrape-cc.js"
import ScrapeCuda from "./scrape-cuda.js"
import ScrapeGPU from "./scrape-gpu.js"
;(async () => {
  try {
    const outDirName = process.argv[2] || null

    const gpus = await ScrapeGPU()
    const ccDeps = await ScrapeCC()
    const cudaDeps = await ScrapeCuda()
    const dep = new DepResolver(
      gpus,
      ccDeps,
      cudaDeps,
    )

    if (outDirName === null) {
      console.log(JSON.stringify(dep, null, 2))
      return
    }
    const outDir = resolve(process.cwd(), outDirName)
    const outFilePath = resolve(outDir, "dependency.json")
    mkdirSync(outDir, { recursive: true })
    writeFileSync(outFilePath, JSON.stringify(dep, null, 2), "utf-8")
  } catch (err) {
    console.error("Error scraping GPUs:", err)
    process.exit(1)
  }
})()
