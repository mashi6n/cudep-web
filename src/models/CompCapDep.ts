import CompCap from "./CompCap.js"
import CudaV from "./CudaV.js"

class CompCapDep {
  /// Compute Capability depends on CUDA version
  cc: CompCap
  minSupportedCuda: CudaV
  maxSupportedCuda: CudaV

  constructor(cc: CompCap, min: CudaV, max: CudaV) {
    this.cc = new CompCap(cc.major, cc.minor)
    this.minSupportedCuda = new CudaV(min.major, min.minor)
    this.maxSupportedCuda = new CudaV(max.major, max.minor)
  }

  toString() {
    return `Compute Capability ${this.cc.toString()} is supported by CUDA >=${this.minSupportedCuda.toString()}, <=${this.maxSupportedCuda.toString()}`
  }
}

export default CompCapDep
