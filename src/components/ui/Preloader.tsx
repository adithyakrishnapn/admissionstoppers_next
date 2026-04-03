"use client";

import { useEffect, useState } from "react";
import LoadingSplash from "@/components/ui/LoadingSplash";

const MIN_VISIBLE_MS = 1100;
const FADE_MS = 250;

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const hideTimer = window.setTimeout(() => {
      setIsFading(true);
    }, MIN_VISIBLE_MS);

    const unmountTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, MIN_VISIBLE_MS + FADE_MS);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(unmountTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`transition-opacity duration-[250ms] ${isFading ? "opacity-0" : "opacity-100"}`}
      aria-busy="true"
      aria-live="polite"
    >
      <LoadingSplash subtitle="Loading..." />
    </div>
  );
}
