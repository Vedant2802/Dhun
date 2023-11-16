import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import styles from "./ControlSeconds.module.scss";

import RegionsPlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/regions.esm.js";
import TimelinePlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js";

interface WaveformProps {
  trackId: string;
}
const ControlSeconds = () => {
  const [loop, setLoop] = useState<boolean>(false);
  const [activeRegion, setActiveRegion] = useState<WaveSurfer.Region | null>(
    null
  );
  const track = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

  useEffect(() => {
    if (!track) {
      console.error("Track element not found.");
      return;
    }

    const waveformParams = {
      container: "#waveform",
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3",
    };

    const waveform = WaveSurfer.create(waveformParams);
    const wsRegions = waveform.registerPlugin(RegionsPlugin.create());
    waveform.registerPlugin(TimelinePlugin.create());
    // Give regions a random color when they are created
    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const randomColor = () =>
      `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

    waveform.on("ready", () => {
      wsRegions.addRegion({
        start: 0,
        end: 5,
        content: "Track 1",
        color: "#5b5b5b",
        drag: false,
        resize: true,
      });
      wsRegions.addRegion({
        start: 6,
        end: 10,
        content: "Track 2",
        color: "#5b5b5b",
        minLength: 1,
        maxLength: 10,
      });
      wsRegions.addRegion({
        start: 11,
        end: 16,
        content: "Track 3",
        color: "#5b5b5b",
        resize: true,
      });
      wsRegions.addRegion({
        start: 17,
        end: 22,
        content: "Track 4",
        color: "#5b5b5b",
      });
      wsRegions.addRegion({
        start: 23,
        end: 30,
        content: "Track 5",
        color: "#5b5b5b",
      });
    });
    wsRegions.enableDragSelection({
      color: "rgba(255, 0, 0, 0.1)",
    });

    wsRegions.on("region-updated", (region: any) => {
      console.log("Updated region", region);
    });

    let activeRegion: null = null;
    wsRegions.on("region-in", (region: any) => {
      activeRegion = region;
    });
    wsRegions.on("region-out", (region: any) => {
      if (activeRegion === region) {
        if (loop) {
          region.play();
        } else {
          activeRegion = null;
        }
      }
    });

    wsRegions.on(
      "region-clicked",
      (
        region: {
          play: () => void;
          setOptions: (arg0: { color: string }) => void;
        },
        e: { stopPropagation: () => void }
      ) => {
        e.stopPropagation(); // prevent triggering a click on the waveform
        const activeRegion = region;
        region.play();
        region.setOptions({ color: randomColor() });
      }
    );
    // Reset the active region when the user clicks anywhere in the waveform
    waveform.on("interaction", () => {
      const activeRegion = null;
    });
    // Cleanup function to destroy the waveform when the component unmounts
    return () => waveform.destroy();
  }, [trackId]);

  return (
    <div>
      <div id="waveform" className={styles.waveformContainer} />
    </div>
  );
};

export default ControlSeconds;
