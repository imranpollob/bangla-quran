"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ayahTextScale";
const MIN_SCALE = 0.85;
const MAX_SCALE = 1.5;
const STEP = 0.05;

function clamp(value: number) {
  return Math.max(MIN_SCALE, Math.min(MAX_SCALE, value));
}

function applyScale(value: number) {
  const next = clamp(value);
  document.documentElement.style.setProperty("--ayah-scale", next.toFixed(2));
  window.localStorage.setItem(STORAGE_KEY, next.toFixed(2));
  return next;
}

export default function AyahTextSizeControls() {
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const current = getComputedStyle(document.documentElement).getPropertyValue(
      "--ayah-scale"
    );
    const initial = stored ? parseFloat(stored) : parseFloat(current) || 1;
    setScale(clamp(initial));
  }, []);

  const handleDecrease = () => {
    if (scale === null) return;
    setScale(applyScale(scale - STEP));
  };

  const handleIncrease = () => {
    if (scale === null) return;
    setScale(applyScale(scale + STEP));
  };

  return (
    <div className="grid-actions">
      <button
        type="button"
        className="toggle"
        onClick={handleDecrease}
        aria-label="Decrease ayah text size"
      >
        A-
      </button>
      <button
        type="button"
        className="toggle"
        onClick={handleIncrease}
        aria-label="Increase ayah text size"
      >
        A+
      </button>
    </div>
  );
}
