import React, { useCallback, useEffect, useRef, useState } from "react"

interface VersionInputValue {
  major: number
  minor: number
  patch: number
}

interface VersionInputProps {
  title: string
  defaultValue?: VersionInputValue
  onChange?: (value: VersionInputValue) => void
}

function VersionInput(
  { title, defaultValue, onChange }: VersionInputProps,
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

  const handleKeyDown = useCallback((
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
  }, [])

  const handleChange = useCallback(
    (field: keyof VersionInputValue) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      const num = raw === "" ? 0 : parseInt(raw.replace(/\D/g, ""), 10)
      setVersion(prev => ({ ...prev, [field]: isNaN(num) ? 0 : num }))
    },
    [setVersion],
  )

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="p-4 text-lg font-semibold">
        {title}
      </div>
      <InputCell
        ref={majorRef}
        value={version.major}
        onChange={handleChange("major")}
        onKeyDown={(e) => {
          handleKeyDown(e, minorRef)
        }}
      />
      <span className="select-none font-bold">.</span>
      <InputCell
        ref={minorRef}
        value={version.minor}
        onChange={handleChange("minor")}
        onKeyDown={(e) => {
          handleKeyDown(e, patchRef)
        }}
      />
      <span className="select-none font-bold">.</span>
      <InputCell
        ref={patchRef}
        value={version.patch}
        onChange={handleChange("patch")}
        onKeyDown={(e) => {
          handleKeyDown(e, majorRef)
        }}
      />
    </div>
  )
}

interface InputCellProps {
  ref: React.RefObject<HTMLInputElement | null>
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
function InputCell({ ref, value, onChange, onKeyDown }: InputCellProps) {
  return (
    <input
      ref={ref}
      type="text"
      inputMode="numeric"
      pattern="\\d*"
      className="w-16 text-center p-2 border rounded focus:outline-none focus:ring-0 focus:border-indigo-300"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="0"
    />
  )
}

export { VersionInput }
export type { VersionInputValue }
