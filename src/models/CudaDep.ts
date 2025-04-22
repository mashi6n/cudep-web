import CudaV from "./CudaV.js"
import DriverV from "./DriverV.js"

class CudaDep {
  /// CUDA version depends on driver version
  cuda: CudaV
  minLinuxDriver: DriverV
  minWindowsDriver: DriverV

  constructor(cuda: CudaV, minLinuxDriver: DriverV, minWindowsDriver: DriverV) {
    this.cuda = new CudaV(cuda.major, cuda.minor)
    this.minLinuxDriver = new DriverV(
      minLinuxDriver.major,
      minLinuxDriver.minor,
      minLinuxDriver.patch,
    )
    this.minWindowsDriver = new DriverV(
      minWindowsDriver.major,
      minWindowsDriver.minor,
      minWindowsDriver.patch,
    )
  }

  toString() {
    return `CUDA ${this.cuda.toString()} requires driver >=${this.minLinuxDriver.toString()} (Linux), >=${this.minWindowsDriver.toString()} (Windows)`
  }
}

export default CudaDep
