import React, { useEffect, useRef, useState } from "react"

interface VersionInputValue {
  major: number
  minor: number
  patch: number
}

interface VersionInputProps {
  defaultValue?: VersionInputValue
  onChange?: (value: VersionInputValue) => void
}

function VersionInput(
  { defaultValue, onChange }: VersionInputProps,
) {
  const [version, setVersion] = useState<VersionInputValue>(
    defaultValue ?? { major: 0, minor: 0, patch: 0 } as VersionInputValue,
  )
  const majorRef = useRef<HTMLInputElement>(null)
  const minorRef = useRef<HTMLInputElement>(null)
  const patchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onChange?.(version)
  }, [version, onChange])

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef?: React.RefObject<HTMLInputElement | null>,
  ) => {
    if (e.key === "." || e.key === "Tab") {
      e.preventDefault()
      nextRef?.current?.focus()
    }
    if (e.key === "Enter") {
      e.preventDefault()
      // unfocus the current input:
      e.currentTarget.blur()
    }
  }

  const handleChange =
    (field: keyof VersionInputValue) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      const num = raw === "" ? 0 : parseInt(raw.replace(/\D/g, ""), 10)
      setVersion(prev => ({ ...prev, [field]: isNaN(num) ? 0 : num }))
    }

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        ref={majorRef}
        type="text"
        inputMode="numeric"
        pattern="\\d*"
        className="w-16 text-center p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        value={version.major}
        onChange={handleChange("major")}
        onKeyDown={(e) => {
          handleKeyDown(e, minorRef)
        }}
        placeholder="0"
      />
      <span className="select-none font-bold">.</span>
      <input
        ref={minorRef}
        type="text"
        inputMode="numeric"
        pattern="\\d*"
        className="w-16 text-center p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        value={version.minor}
        onChange={handleChange("minor")}
        onKeyDown={(e) => {
          handleKeyDown(e, patchRef)
        }}
        placeholder="0"
      />
      <span className="select-none font-bold">.</span>
      <input
        ref={patchRef}
        type="text"
        inputMode="numeric"
        pattern="\\d*"
        className="w-16 text-center p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        value={version.patch}
        onChange={handleChange("patch")}
        onKeyDown={(e) => {
          handleKeyDown(e, majorRef)
        }}
        placeholder="0"
      />
    </div>
  )
}

export { VersionInput }
export type { VersionInputValue }
