import React from "react";
import type { Video } from "../../types";
import { useVideoPlayback } from "../../hooks/useVideoPlayback";
import { VideoControls } from "../VideoControls/VideoControls";
import styles from "./VideoCard.module.css";

interface VideoCardProps {
  video: Video;
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isActive,
  isMuted,
  onToggleMute,
}) => {
  const { videoRef, isPlaying, togglePlay } = useVideoPlayback({
    isActive,
    isMuted,
  });

  return (
    <article
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      aria-label={video.title}
      aria-current={isActive ? "true" : undefined}
    >
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          src={video.src}
          className={styles.video}
          loop
          muted={isMuted}
          playsInline
          tabIndex={isActive ? 0 : -1}
          aria-label={`Video: ${video.title}`}
        />
        {isActive && (
          <VideoControls
            isPlaying={isPlaying}
            isMuted={isMuted}
            onTogglePlay={togglePlay}
            onToggleMute={onToggleMute}
          />
        )}
      </div>
      <p className={styles.title}>{video.title}</p>
    </article>
  );
};