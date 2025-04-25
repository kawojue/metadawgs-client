"use client";

import { EyeClosedIcon, EyeIcon } from "lucide-react";
import React, { InputHTMLAttributes, useState } from "react";

interface PropType extends InputHTMLAttributes<HTMLInputElement> {
  showEye?: boolean;
}

function PasswordInput(props: PropType) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function toggleShowPassword() {
    setShowPassword((x) => !x);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-white p-2"
      >
        {showPassword && <EyeIcon />}
        {!showPassword && <EyeClosedIcon />}
      </button>
      <input {...props} maxLength={24} />
    </div>
  );
}

export default PasswordInput;
