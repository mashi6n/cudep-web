import CompCap  from "./CompCap.js";
import CudaV from "./CudaV.js";

class CompCapDep {
    /// Compute Capability depends on CUDA version
    cc: CompCap;
    minSupportedCuda: CudaV;
    maxSupportedCuda: CudaV;
    constructor(cc: CompCap, min: CudaV, max: CudaV) {
        this.cc = cc;
        this.minSupportedCuda = min;
        this.maxSupportedCuda = max;
    }
    toString() {
        return `Compute Capability ${this.cc.toString()} is supported by CUDA >=${this.minSupportedCuda.toString()}, <=${this.maxSupportedCuda.toString()}`;
    }
}

export default CompCapDep;
