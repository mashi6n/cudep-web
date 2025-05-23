class CompCap {
  major: number
  minor: number
  static fromString(str: string): CompCap {
    const parts = str.split(".").map(Number)
    return new CompCap(parts[0], parts[1] || 0)
  }
  constructor(major: number, minor: number) {
    this.major = major
    this.minor = minor
  }
  toString() {
    return `${this.major.toString()}.${this.minor.toString()}`
  }
  toInt() {
    return this.major * 100 + this.minor
  }
}

export default CompCap
