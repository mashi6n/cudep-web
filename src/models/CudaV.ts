class CudaV {
  major: number
  minor: number

  constructor(str: string) {
    const parts = str.split(".").map(Number)
    this.major = parts[0]
    this.minor = parts[1] || 0
  }
  toString() {
    return `${this.major}.${this.minor}`
  }
}

export default CudaV
