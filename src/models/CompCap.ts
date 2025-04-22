class CompCap {
  major: number
  minor: number
  fromString(str: string): CompCap {
    const parts = str.split(".").map(Number)
    return new CompCap(parts[0], parts[1] || 0)
  }
  constructor(major: number, minor: number) {
    this.major = major
    this.minor = minor
  }
  toString() {
    return `${this.major}.${this.minor}`
  }
}

export default CompCap
