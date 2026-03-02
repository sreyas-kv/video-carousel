import { VideoCarousel } from "./components/VideoCarousel/VideoCarousel";
import { VIDEOS } from "./constants/videos";

function App() {

  return (
    <div>
      <VideoCarousel videos={VIDEOS} />
    </div>
  )
}

export default App
