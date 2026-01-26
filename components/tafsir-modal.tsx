"use client";

import { useEffect, useRef } from "react";
import { toBnDigits } from "@/lib/format";

interface TafsirModalProps {
  isOpen: boolean;
  onClose: () => void;
  suraName: string;
  ayahNumber: string;
  tafsirText: string;
}

export default function TafsirModal({
  isOpen,
  onClose,
  suraName,
  ayahNumber,
  tafsirText,
}: TafsirModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && e.target === modalRef.current) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="tafsir-modal-overlay" ref={modalRef}>
      <div className="tafsir-modal">
        <div className="tafsir-modal-header">
          <h2>
            {suraName} - আয়াত {toBnDigits(ayahNumber)}
          </h2>
          <button
            className="tafsir-modal-close"
            onClick={onClose}
            aria-label="Close tafsir"
          >
            ✕
          </button>
        </div>
        <div
          className="tafsir-modal-content"
          dangerouslySetInnerHTML={{ __html: tafsirText }}
        />
      </div>
    </div>
  );
}
