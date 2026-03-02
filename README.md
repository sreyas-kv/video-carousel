# Video Carousel

A React video carousel component that displays looping video cards with auto-play, mute/unmute, and keyboard navigation.

## Features

- **Infinite carousel** — Navigate with prev/next buttons or arrow keys; wraps around at the ends
- **Auto-play** — Active (first visible) video autoplays when it becomes visible; others pause and reset
- **Playback controls** — Play/pause and mute/unmute for the active video
- **Accessibility** — ARIA labels, keyboard navigation (Arrow Left/Right), and semantic HTML
- **Configurable** — Custom title, visible count, and video list

## Tech Stack

- **React 18** — UI components
- **TypeScript** — Typed components and utilities
- **Vite** — Build tool and dev server
- **Jest + Testing Library** — Unit and component tests
- **CSS Modules** — Scoped styles

## Project Structure
```text
src/
├── components/
│   ├── VideoCarousel/      # Main carousel container
│   ├── VideoCard/          # Single video card with playback
│   ├── VideoControls/      # Play/pause and mute buttons
│   └── NavButton/          # Prev/next navigation
├── hooks/
│   ├── useCarousel.ts      # Carousel state and navigation
│   └── useVideoPlayback.ts # Video play/pause and mute logic
├── utils/
│   └── carousel.ts         # circularMod, getVisibleIndices
├── constants/
│   └── videos.ts           # Video data and asset imports
├── types/
│   └── index.ts            # Video, NavigationDirection
├── App.tsx                 # Main entry point
├── main.tsx                # React DOM mounting
└── index.css               # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server at http://localhost:5173.

### Build

```bash
npm run build
```

Outputs to `dist/`.

### Testing

```bash
npm test          # Run tests with coverage
npm run test:watch  # Run tests in watch mode
```

## Usage

### Basic

```tsx
import { VideoCarousel } from "./components/VideoCarousel/VideoCarousel";
import { VIDEOS } from "./constants/videos";

function App() {
  return <VideoCarousel videos={VIDEOS} />;
}
```

### With Options

```tsx
<VideoCarousel
  videos={VIDEOS}
  title="My Videos"
  visibleCount={6}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| videos | Video[] | required | List of video objects (id, title, src) |
| title | string | "A day in the life" | Section heading |
| visibleCount | number | 8 | Number of cards shown in the carousel |

### Video Type

```ts
interface Video {
  id: number;
  title: string;
  src: string;  // URL to video file (e.g. .mp4)
}
```

### Keyboard Controls

- **←** — Previous video
- **→** — Next video
