import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { VideoCarousel } from "./VideoCarousel";
import type { Video } from "../../types";

// Prevent real video playback in jsdom
jest.mock("../../hooks/useVideoPlayback", () => ({
  useVideoPlayback: () => ({
    videoRef: { current: null },
    isPlaying: false,
    togglePlay: jest.fn(),
  }),
}));

const mockVideos: Video[] = [
  { id: 1, title: "Video One", src: "https://example.com/1.mp4" },
  { id: 2, title: "Video Two", src: "https://example.com/2.mp4" },
  { id: 3, title: "Video Three", src: "https://example.com/3.mp4" },
  { id: 4, title: "Video Four", src: "https://example.com/4.mp4" },
  { id: 5, title: "Video Five", src: "https://example.com/5.mp4" },
];

describe("VideoCarousel", () => {
  it("renders the carousel title", () => {
    render(<VideoCarousel videos={mockVideos} title="My Carousel" />);
    expect(screen.getByText("My Carousel")).toBeInTheDocument();
  });

  it("uses the default title when none is provided", () => {
    render(<VideoCarousel videos={mockVideos} />);
    expect(screen.getByText("A day in the life")).toBeInTheDocument();
  });

  it("renders previous and next nav buttons", () => {
    render(<VideoCarousel videos={mockVideos} />);
    expect(screen.getByLabelText("Previous")).toBeInTheDocument();
    expect(screen.getByLabelText("Next")).toBeInTheDocument();
  });

  it("renders `visibleCount` video cards by default", () => {
    render(<VideoCarousel videos={mockVideos} visibleCount={4} />);
    // 4 cards, each rendered as an article
    expect(screen.getAllByRole("article")).toHaveLength(4);
  });

  it("navigates forward when the Next button is clicked", () => {
    render(<VideoCarousel videos={mockVideos} visibleCount={4} />);
    // Initially the first card shows "Video One"
    expect(screen.getByText("Video One")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Next"));

    // After navigate(+1), active card becomes "Video Two"
    expect(screen.getByText("Video Two")).toBeInTheDocument();
  });

  it("navigates backward when the Previous button is clicked", () => {
    render(<VideoCarousel videos={mockVideos} visibleCount={4} />);
    fireEvent.click(screen.getByLabelText("Previous"));
    // Wrap: active card becomes last video "Video Five"
    expect(screen.getByText("Video Five")).toBeInTheDocument();
  });

  it("wraps infinitely forward past the last item", () => {
    render(<VideoCarousel videos={mockVideos} visibleCount={4} />);
    // Click Next 5 times (full cycle)
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByLabelText("Next"));
    }
    // Should be back to "Video One" as active
    expect(screen.getByText("Video One")).toBeInTheDocument();
  });

  it("marks only the first visible card as active", () => {
    render(<VideoCarousel videos={mockVideos} visibleCount={4} />);
    const articles = screen.getAllByRole("article");
    // Only the first article should have aria-current="true"
    expect(articles[0]).toHaveAttribute("aria-current", "true");
    articles.slice(1).forEach((a) => {
      expect(a).not.toHaveAttribute("aria-current");
    });
  });

  it("navigates forward with ArrowRight keyboard event", () => {
    render(<VideoCarousel videos={mockVideos} visibleCount={4} />);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByText("Video Two")).toBeInTheDocument();
  });

  it("navigates backward with ArrowLeft keyboard event", () => {
    render(<VideoCarousel videos={mockVideos} visibleCount={4} />);
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByText("Video Five")).toBeInTheDocument();
  });
});