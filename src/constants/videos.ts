import type { Video } from "../types";

import oneUrl from "../assets/videos/one.mp4";
import twoUrl from "../assets/videos/two.mp4";
import threeUrl from "../assets/videos/three.mp4";
import fourUrl from "../assets/videos/four.mp4";
import fiveUrl from "../assets/videos/five.mp4";
import sixUrl from "../assets/videos/six.mp4";
import sevenUrl from "../assets/videos/seven.mp4";


/**
 * Video data for the carousel.
 */
export const VIDEOS: Video[] = [
  {
    id: 1,
    title: "Whispers of Ipsum",
    src: oneUrl,
  },
  {
    id: 2,
    title: "Forest of Lorem Ipsum",
    src: twoUrl,
  },
  {
    id: 3,
    title: "Lorem Ipsum in the Wilderness",
    src: threeUrl,
  },
  {
    id: 4,
    title: "The Ipsum Tide",
    src: fourUrl,
  },
  {
    id: 5,
    title: "Nullam dictum felis",
    src: fiveUrl,
  },
  {
    id: 6,
    title: "Integer tincidunt.",
    src: sixUrl,
  },
  {
    id: 7,
    title: "Quisque rutrum",
    src: sevenUrl,
  },
];
