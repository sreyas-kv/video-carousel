import "@testing-library/jest-dom";
import React from "react";
import { act } from "react";
import { render, screen } from "@testing-library/react";
import { useVideoPlayback } from "./useVideoPlayback";

const mockPlay = jest.fn().mockResolvedValue(undefined);
const mockPause = jest.fn();

let capturedApi: ReturnType<typeof useVideoPlayback> | null = null;

function TestWrapper({ isActive }: { isActive: boolean }) {
  const api = useVideoPlayback({ isActive, isMuted: true });
  capturedApi = api;
  return <video ref={api.videoRef} data-testid="video" />;
}

beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    writable: true,
    value: mockPlay,
  });
  Object.defineProperty(HTMLMediaElement.prototype, "pause", {
    configurable: true,
    writable: true,
    value: mockPause,
  });
  Object.defineProperty(HTMLMediaElement.prototype, "paused", {
    configurable: true,
    get: () => true,
  });
});

beforeEach(() => {
  mockPlay.mockClear();
  mockPause.mockClear();
  capturedApi = null;
  Object.defineProperty(HTMLMediaElement.prototype, "paused", {
    configurable: true,
    get: () => true,
  });
});

describe("useVideoPlayback", () => {
  it("returns a videoRef, isPlaying=false and togglePlay initially", () => {
    render(<TestWrapper isActive={false} />);
    expect(capturedApi?.videoRef).toBeDefined();
    expect(capturedApi?.isPlaying).toBe(false);
    expect(typeof capturedApi?.togglePlay).toBe("function");
  });

  it("sets isPlaying=true and calls play() when becoming active", async () => {
    const { rerender } = render(<TestWrapper isActive={false} />);
    expect(screen.getByTestId("video")).toBeInTheDocument();

    rerender(<TestWrapper isActive={true} />);
    await act(async () => {});

    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it("calls pause() and sets isPlaying=false when becoming inactive", async () => {
    const { rerender } = render(<TestWrapper isActive={true} />);
    await act(async () => {});

    rerender(<TestWrapper isActive={false} />);

    expect(mockPause).toHaveBeenCalled();
  });

  it("togglePlay pauses a playing video", async () => {
    render(<TestWrapper isActive={true} />);
    await act(async () => {});

    Object.defineProperty(HTMLMediaElement.prototype, "paused", {
      configurable: true,
      get: () => false,
    });

    await act(async () => {
      await capturedApi!.togglePlay();
    });

    expect(mockPause).toHaveBeenCalled();
    expect(capturedApi?.isPlaying).toBe(false);
  });

  it("togglePlay plays a paused video", async () => {
    render(<TestWrapper isActive={false} />);

    Object.defineProperty(HTMLMediaElement.prototype, "paused", {
      configurable: true,
      get: () => true,
    });

    await act(async () => {
      await capturedApi!.togglePlay();
    });

    expect(mockPlay).toHaveBeenCalled();
    expect(capturedApi?.isPlaying).toBe(true);
  });
});
