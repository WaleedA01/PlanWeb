"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComboboxProps {
  value?: string
  onValueChange?: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function Combobox({ value, onValueChange, options, placeholder = "Select...", className, disabled }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const filtered = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  )

  const selectedLabel = options.find((opt) => opt.value === value)?.label || ""

  React.useEffect(() => {
    if (!open) setSearch("")
  }, [open])

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          placeholder={placeholder}
          value={open ? search : selectedLabel}
          onChange={(e) => {
            setSearch(e.target.value)
            if (!open) setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          disabled={disabled}
        />
        <ChevronDown
          className="absolute right-3 top-3 h-4 w-4 opacity-50 cursor-pointer"
          onClick={() => {
            setOpen(!open)
            inputRef.current?.focus()
          }}
        />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-[100] mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          <div className="max-h-60 overflow-auto p-1">
            {filtered.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                  value === option.value && "bg-accent"
                )}
                onMouseDown={(e) => {
                  e.preventDefault()
                  onValueChange?.(option.value)
                  setOpen(false)
                }}
              >
                {value === option.value && (
                  <Check className="mr-2 h-4 w-4" />
                )}
                <span className={cn(value !== option.value && "ml-6")}>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
