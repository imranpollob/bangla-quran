"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  src?: string;
  label: string;
}

export default function AyahAudioButton({ src, label }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [src]);

  if (!src) {
    return null;
  }

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      const active = (window as { __activeAyahAudio?: HTMLAudioElement })
        .__activeAyahAudio;
      if (active && active !== audio) {
        active.pause();
      }
      (window as { __activeAyahAudio?: HTMLAudioElement }).__activeAyahAudio =
        audio;
      try {
        await audio.play();
      } catch (e) {
        // Ignore autoplay restrictions or play errors
      }
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <button
        type="button"
        className={`ayah-audio-button ${isPlaying ? "playing" : ""}`}
        onClick={toggle}
        aria-label={`${label} ${isPlaying ? "pause" : "play"}`}
        aria-pressed={isPlaying}
      >
        <span className="ayah-audio-icon" aria-hidden="true" />
      </button>
      <audio ref={audioRef} src={src} preload="none" />
    </>
  );
}
