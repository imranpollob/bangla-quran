"use client";

interface TafsirButtonProps {
  onClick: () => void;
}

export default function TafsirButton({ onClick }: TafsirButtonProps) {
  return (
    <button
      className="bookmark-button"
      onClick={onClick}
      aria-label="Show tafsir"
      title="তাফসীর দেখুন"
    >
      তাফসীর
    </button>
  );
}
