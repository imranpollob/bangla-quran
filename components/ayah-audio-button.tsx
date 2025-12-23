"use client";

interface Props {
  label: string;
  isActive: boolean;
  isPlaying: boolean;
  onToggle: () => void;
}

export default function AyahAudioButton({
  label,
  isActive,
  isPlaying,
  onToggle
}: Props) {
  const playing = isActive && isPlaying;

  return (
    <button
      type="button"
      className={`ayah-audio-button ${playing ? "playing" : ""}`}
      onClick={onToggle}
      aria-label={`${label} ${playing ? "pause" : "play"}`}
      aria-pressed={playing}
    >
      <span className="ayah-audio-icon" aria-hidden="true" />
    </button>
  );
}
