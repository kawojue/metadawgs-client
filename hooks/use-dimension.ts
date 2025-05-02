"use client";

import { useEffect, useMemo, useRef } from "react";

function useDimension() {
  const dimensionsRef = useRef({
    width: window?.innerWidth,
    height: window?.innerHeight,
  });

  const dimensions = useMemo(() => dimensionsRef.current, []);

  useEffect(() => {
    const handleResize = () => {
      dimensionsRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return dimensions;
}

export default useDimension;
