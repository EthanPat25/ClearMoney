"use client";

import React from "react";

import ICON from "../../../public/Learn.json";
import { Player } from "@lordicon/react";

export const Learn = React.memo(() => {
  // Component code
  const [windowsize, updatewindowsize] = React.useState<number | null>(null);
  const [size, updatesize] = React.useState(150);
  const playerRef = React.useRef<React.ElementRef<typeof Player>>(null);

  React.useEffect(() => {
    const handleResize = () => updatewindowsize(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  React.useEffect(() => {
    if (windowsize === null) return;

    if (windowsize >= 3200) {
      updatesize(150);
    } else if (windowsize >= 2560) {
      updatesize(150);
    } else if (windowsize >= 1920) {
      updatesize(150);
    } else if (windowsize >= 1536) {
      updatesize(150);
    } else if (windowsize <= 1024) {
      updatesize(150);
    }
  }, [windowsize]);

  return <Player size={size} icon={ICON} ref={playerRef} />;
});

Learn.displayName = "Learn";
