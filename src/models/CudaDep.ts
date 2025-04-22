import CudaV from "./CudaV.js"
import DriverV from "./DriverV.js"

class CudaDep {
  /// CUDA version depends on driver version
  cuda: CudaV
  minLinuxDriver: DriverV
  minWindowsDriver: DriverV
  constructor(cuda: CudaV, minLinuxDriver: DriverV, minWindowsDriver: DriverV) {
    this.cuda = cuda
    this.minLinuxDriver = minLinuxDriver
    this.minWindowsDriver = minWindowsDriver
  }
  toString() {
    return `CUDA ${this.cuda.toString()} requires driver >=${this.minLinuxDriver.toString()} (Linux), >=${this.minWindowsDriver.toString()} (Windows)`
  }
}

export default CudaDep
