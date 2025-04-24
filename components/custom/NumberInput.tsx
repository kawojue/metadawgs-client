"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  minValue?: number;
  maxValue?: number;
  className?: string;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onChange,
      minValue = 0,
      maxValue = Number.MAX_SAFE_INTEGER,
      className = "",
      onBlur: externalOnBlur,
      disabled,
      placeholder = "0",
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (
        newValue === "" ||
        /^\d+$/.test(newValue) ||
        /^\d*\.\d*$/.test(newValue)
      ) {
        const numValue = parseFloat(newValue);

        if (newValue === "" || isNaN(numValue)) {
          onChange(newValue);
        } else if (numValue >= minValue && numValue <= maxValue) {
          onChange(newValue);
        } else if (newValue.endsWith(".")) {
          onChange(newValue);
        }
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (externalOnBlur) {
        externalOnBlur(e);
      }

      // Validate value on blur
      if (value === "" || value === ".") {
        onChange(minValue.toString());
        return;
      }

      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        onChange(minValue.toString());
        return;
      }

      if (numValue < minValue) {
        onChange(minValue.toString());
      } else if (numValue > maxValue) {
        onChange(maxValue.toString());
      } else {
        // Format to a reasonable number of decimal places
        onChange(parseFloat(numValue.toFixed(9)).toString());
      }
    };

    return (
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "h-[52px] font-semibold text-lg border border-[#9C9C9C] rounded-full w-full p-4 bg-white",
          className
        )}
        aria-label="Number input"
        {...props}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
