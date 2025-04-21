import { writeFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import ScrapeCC from "./scrape-cc.js";
import ScrapeGPU from "./scrape-gpu.js";
import ScrapeCuda from "./scrape-cuda.js";

;(async () => {
    try {
      // process.argv[0] = node、[1] = スクリプト名、[2] 以降が引数
      const outDirName = process.argv[2] || null
  
      const ccs = await ScrapeCC()
      const gpus = await ScrapeGPU()
      const cudaDeps = await ScrapeCuda()
  
        if (outDirName === null) {
            console.log(JSON.stringify({ ccs, gpus, cudaDeps }, null, 2))
            return;
        } 
      const outDir = resolve(process.cwd(), outDirName)
      const gpuFilePath = resolve(outDir, 'gpus.json')
      const ccFilePath = resolve(outDir, 'ccs.json')
      const cudaFilePath = resolve(outDir, 'cudaDeps.json')
      mkdirSync(outDir, { recursive: true })
      writeFileSync(gpuFilePath, JSON.stringify(gpus, null, 2), 'utf-8')
      writeFileSync(ccFilePath, JSON.stringify(ccs, null, 2), 'utf-8')
      writeFileSync(cudaFilePath, JSON.stringify(cudaDeps, null, 2), 'utf-8')
    } catch (err) {
      console.error('Error scraping GPUs:', err)
      process.exit(1)
    }
  })()

