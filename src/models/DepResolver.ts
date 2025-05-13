import CompCapDep from "./CompCapDep.js"
import CudaDep from "./CudaDep.js"
import CudaV from "./CudaV.js"
import DriverV from "./DriverV.js"
import Gpu from "./Gpu.js"

class DepResolver {
  gpus: Gpu[]
  ccDeps: CompCapDep[]
  cudaDeps: CudaDep[]

  constructor(gpus: Gpu[], ccDeps: CompCapDep[], cudaDeps: CudaDep[]) {
    this.gpus = gpus.map(g => new Gpu(g.name, g.cc))
    this.ccDeps = ccDeps.map(dep =>
      new CompCapDep(dep.cc, dep.minSupportedCuda, dep.maxSupportedCuda)
    )
    this.cudaDeps = cudaDeps.map(dep =>
      new CudaDep(dep.cuda, dep.minLinuxDriver, dep.minWindowsDriver)
    )
  }

  getCompatibleCudas(gpuName: string, driverV: DriverV): CudaV[] {
    const gpu = this.gpus.find(g => g.name === gpuName)
    if (!gpu) {
      console.warn(`GPU ${gpuName} not found`)
      return []
    }
    console.log(gpu.toString())
    let ccDep = this.ccDeps.find(dep => dep.cc.toString() === gpu.cc.toString())
    if (!ccDep) {
      const ccArr = this.ccDeps.map(dep => dep.cc.toInt()).filter(cc => (cc <= gpu.cc.toInt()))
      const maxIndex = ccArr.indexOf(Math.max(...ccArr))
      console.log("ccArr", ccArr)
      console.log("maxIndex", maxIndex)
      ccDep = this.ccDeps[maxIndex]
      console.warn(`Compute Capability ${gpu.cc.toString()} not found`)
      console.warn(`Using Compute Capability ${ccDep.cc.toString()} instead`)
    }
    console.log(ccDep.toString())
    let compatibleCudaDeps = this.cudaDeps.filter(dep =>
      ccDep.minSupportedCuda.isLessThanOrEqualTo(dep.cuda)
      && dep.cuda.isLessThanOrEqualTo(ccDep.maxSupportedCuda)
    )
    compatibleCudaDeps = compatibleCudaDeps.filter(dep =>
      dep.minLinuxDriver.isLessThanOrEqualTo(driverV)
    )
    return compatibleCudaDeps.map(dep => dep.cuda)
  }
}

export default DepResolver
