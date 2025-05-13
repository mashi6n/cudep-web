import { mkdirSync, writeFileSync } from "fs"
import { resolve } from "path"
import DepResolver from "../src/models/DepResolver.js"
import ScrapeCC from "./scrape-cc.js"
import ScrapeCuda from "./scrape-cuda.js"
import ScrapeGPU from "./scrape-gpu.js"
;(async () => {
  const outDirName = process.argv[2] || null

  const data = await Promise.all([ScrapeGPU(), ScrapeCC(), ScrapeCuda()])
  const dep = new DepResolver(
    data[0],
    data[1],
    data[2],
  )

  if (outDirName === null) {
    console.log(JSON.stringify(dep, null, 2))
    return
  }
  const outDir = resolve(process.cwd(), outDirName)
  const outFilePath = resolve(outDir, "dependency.json")

  console.log(`Writing dependency data to ${outFilePath}`)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(outFilePath, JSON.stringify(dep, null, 2), "utf-8")
})().catch((err: unknown) => {
  console.error("Error caused during scraping:", err)
  process.exit(1)
})
