import CompCap from "./CompCap.js"
class Gpu {
  name: string
  cc: CompCap
  constructor(name: string, cc: CompCap) {
    this.name = name
    this.cc = cc
  }
  toString() {
    return `${this.name} (Compute Capability: ${this.cc.toString()})`
  }
}
export default Gpu
