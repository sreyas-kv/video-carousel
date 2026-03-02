import React from 'react';
import styles from './VideoControls.module.css';
import pause from '../../assets/pause.svg';
import mute from '../../assets/mute.svg'
import unMute from '../../assets/unmute.svg'
import play from '../../assets/play.svg'

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

const MuteIcon = () => (
  <img src={mute} alt="Mute" width={20} height={20} />
);

const UnmuteIcon = () => (
  <img src={unMute} alt="Volume" width={20} height={20} />
);

const PauseIcon = () => (
  <img src={pause} alt="Pause" width={20} height={20} />
);

const PlayIcon = () => (
  <img src={play} alt="Play" width={20} height={20} />
);

export const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}) => (
  <div className={styles.controls}>
    <button
      className={styles.controlButton}
      onClick={onToggleMute}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? <MuteIcon /> : <UnmuteIcon />}
    </button>
    <button
      className={styles.controlButton}
      onClick={onTogglePlay}
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  </div>
);