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
    const ccDep = this.ccDeps.find(dep => dep.cc.toString() === gpu.cc.toString())
    if (!ccDep) {
      console.warn(`Compute Capability ${gpu.cc.toString()} not found`)
      return []
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
