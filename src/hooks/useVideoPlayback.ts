import { useState, useEffect, useRef } from "react";

interface UseVideoPlaybackOptions {
  isActive: boolean;
  isMuted: boolean;
}

interface UseVideoPlaybackReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  togglePlay: () => Promise<void>;
}

/**
 * Controls video playback for a single video element.
 * Auto-plays when `isActive` becomes true; pauses and resets otherwise.
 */
export function useVideoPlayback({
  isActive,
  isMuted,
}: UseVideoPlaybackOptions): UseVideoPlaybackReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play/pause based on active state
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (isActive) {
      el.play().catch(() => {
        // Autoplay may be blocked by the browser; silently ignore.
      });
      setIsPlaying(true);
    } else {
      el.pause();
      el.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive]);

  // Sync muted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = async () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      await el.play().catch(() => {
        // Autoplay may be blocked by the browser; silently ignore.
      });
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  return { videoRef, isPlaying, togglePlay };
}
