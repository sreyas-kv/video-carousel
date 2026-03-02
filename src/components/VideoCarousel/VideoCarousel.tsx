import React, { useCallback, useState } from "react";
import type { Video } from "../../types";
import { useCarousel } from "../../hooks/useCarousel";
import { VideoCard } from "../VideoCard/VideoCard";
import { NavButton } from "../NavButton/NavButton";
import styles from "./VideoCarousel.module.css";


const DEFAULT_VISIBLE_COUNT = 8;
const DEFAULT_SECTION_TITLE = "A day in the life";

interface VideoCarouselProps {
  videos: Video[];
  title?: string;
  visibleCount?: number;
}

export const VideoCarousel: React.FC<VideoCarouselProps> = ({
  videos,
  title = DEFAULT_SECTION_TITLE,
  visibleCount = DEFAULT_VISIBLE_COUNT,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  
  const { visibleIndices, navigate } = useCarousel({
    total: videos.length,
    visibleCount,
  });

  const toggleMute = () => setIsMuted((prev) => !prev);
  const handlePrev = useCallback(() => navigate(-1), [navigate]);
  const handleNext = useCallback(() => navigate(1), [navigate]);

  return (
    <section className={styles.section} aria-label={title}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.navButtons} role="group" aria-label="Carousel navigation">
          <NavButton direction="prev" onClick={handlePrev} />
          <NavButton direction="next" onClick={handleNext} />
        </div>
      </div>

      <div
        className={styles.track}
        role="list"
        aria-label="Video carousel items"
      >
        {visibleIndices.map((videoIndex, position) => {
          const video = videos[videoIndex];
          if (!video) return null;

          return (
            <VideoCard
              key={`${video.id}-${position}`}
              video={video}
              isActive={position === 0}
              isMuted={isMuted}
              onToggleMute={toggleMute}
            />
          );
        })}
      </div>
    </section>
  );
};