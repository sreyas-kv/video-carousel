import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { VideoCard } from "./VideoCard";
import type { Video } from "../../types";

jest.mock("../../hooks/useVideoPlayback", () => ({
  useVideoPlayback: () => ({
    videoRef: { current: null },
    isPlaying: false,
    togglePlay: jest.fn(),
  }),
}));

const mockVideo: Video = {
  id: 1,
  title: "Test Video",
  src: "https://example.com/video.mp4",
};

describe("VideoCard", () => {
  const defaultProps = {
    video: mockVideo,
    isActive: false,
    isMuted: true,
    onToggleMute: jest.fn(),
  };

  it("renders the video title", () => {
    render(<VideoCard {...defaultProps} />);
    expect(screen.getByText("Test Video")).toBeInTheDocument();
  });

  it("renders a video element with the correct src", () => {
    render(<VideoCard {...defaultProps} />);
    const videoEl = screen.getByLabelText("Video: Test Video");
    expect(videoEl).toHaveAttribute("src", mockVideo.src);
  });

  it("does NOT render controls when inactive", () => {
    render(<VideoCard {...defaultProps} isActive={false} />);
    expect(screen.queryByLabelText("Mute")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Unmute")).not.toBeInTheDocument();
  });

  it("renders controls when active", () => {
    render(<VideoCard {...defaultProps} isActive={true} />);
    // isMuted=true → shows Unmute button
    expect(screen.getByLabelText("Unmute")).toBeInTheDocument();
    expect(screen.getByLabelText("Play")).toBeInTheDocument();
  });

  it("calls onToggleMute when the mute button is clicked", () => {
    const onToggleMute = jest.fn();
    render(<VideoCard {...defaultProps} isActive={true} onToggleMute={onToggleMute} />);
    fireEvent.click(screen.getByLabelText("Unmute"));
    expect(onToggleMute).toHaveBeenCalledTimes(1);
  });

  it("applies active aria-current when active", () => {
    render(<VideoCard {...defaultProps} isActive={true} />);
    expect(screen.getByRole("article")).toHaveAttribute("aria-current", "true");
  });

  it("does not apply aria-current when inactive", () => {
    render(<VideoCard {...defaultProps} isActive={false} />);
    expect(screen.getByRole("article")).not.toHaveAttribute("aria-current");
  });
});