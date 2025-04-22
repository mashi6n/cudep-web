import CompCapDep from "./CompCapDep.js"
import CudaDep from "./CudaDep.js"
import Gpu from "./Gpu.js"

class DepResolver {
  gpus: Gpu[]
  ccDeps: CompCapDep[]
  cudaDeps: CudaDep[]
  constructor(gpus: Gpu[], ccDeps: CompCapDep[], cudaDeps: CudaDep[]) {
    this.gpus = gpus
    this.ccDeps = ccDeps
    this.cudaDeps = cudaDeps
  }
}

export default DepResolver
