class DriverV {
    major: number;
    minor: number;
    patch: number;
    constructor(str: string) {
        const parts = str.split('.').map(Number);
        this.major = parts[0];
        this.minor = parts[1] || 0;
        this.patch = parts[2] || 0;
    }

    toString() {
        return `${this.major.toString().padStart(3, '0')}.${this.minor.toString().padStart(3, '0')}.${this.patch.toString().padStart(3, '0')}`;
    }
}

export default DriverV;
