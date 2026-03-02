import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { VideoControls } from "./VideoControls";

describe("VideoControls", () => {
  const defaultProps = {
    isPlaying: false,
    isMuted: true,
    onTogglePlay: jest.fn(),
    onToggleMute: jest.fn(),
  };

  it("shows Unmute button when muted", () => {
    render(<VideoControls {...defaultProps} isMuted={true} />);
    expect(screen.getByLabelText("Unmute")).toBeInTheDocument();
  });

  it("shows Mute button when unmuted", () => {
    render(<VideoControls {...defaultProps} isMuted={false} />);
    expect(screen.getByLabelText("Mute")).toBeInTheDocument();
  });

  it("shows Play button when paused", () => {
    render(<VideoControls {...defaultProps} isPlaying={false} />);
    expect(screen.getByLabelText("Play")).toBeInTheDocument();
  });

  it("shows Pause button when playing", () => {
    render(<VideoControls {...defaultProps} isPlaying={true} />);
    expect(screen.getByLabelText("Pause")).toBeInTheDocument();
  });

  it("calls onToggleMute when mute button is clicked", () => {
    const onToggleMute = jest.fn();
    render(<VideoControls {...defaultProps} onToggleMute={onToggleMute} />);
    fireEvent.click(screen.getByLabelText("Unmute"));
    expect(onToggleMute).toHaveBeenCalledTimes(1);
  });

  it("calls onTogglePlay when play button is clicked", () => {
    const onTogglePlay = jest.fn();
    render(<VideoControls {...defaultProps} onTogglePlay={onTogglePlay} />);
    fireEvent.click(screen.getByLabelText("Play"));
    expect(onTogglePlay).toHaveBeenCalledTimes(1);
  });
});