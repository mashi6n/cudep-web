class CudaV {
  major: number
  minor: number

  constructor(major: number, minor: number) {
    this.major = major
    this.minor = minor
  }

  static fromString(str: string) {
    const parts = str.split(".").map(Number)
    return new CudaV(parts[0], parts[1] || 0)
  }

  toString() {
    return `${this.major}.${this.minor}`
  }

  isLessThanOrEqualTo(other: CudaV): boolean {
    const selfV = this.major * 100 + this.minor
    const otherV = other.major * 100 + other.minor
    return selfV <= otherV
  }
}

export default CudaV
