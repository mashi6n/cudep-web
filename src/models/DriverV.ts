class DriverV {
  major: number
  minor: number
  patch: number
  constructor(major: number, minor: number, patch: number) {
    this.major = major
    this.minor = minor
    this.patch = patch
  }

  static fromString(str: string) {
    const parts = str.split(".").map(Number)
    return new DriverV(parts[0], parts[1] || 0, parts[2] || 0)
  }

  toString() {
    return `${this.major.toString().padStart(3, "0")}.${this.minor.toString().padStart(3, "0")}.${
      this.patch.toString().padStart(3, "0")
    }`
  }

  isLessThanOrEqualTo(other: DriverV): boolean {
    const selfV = this.major * 1000000 + this.minor * 1000 + this.patch
    const otherV = other.major * 1000000 + other.minor * 1000 + other.patch
    return selfV <= otherV
  }
}

export default DriverV
