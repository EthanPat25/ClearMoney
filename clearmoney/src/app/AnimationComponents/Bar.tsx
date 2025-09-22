"use client";

import React from "react";
import { Player } from "@lordicon/react";

import ICON from "../../../public/Bar.json";

export const Bar = React.memo(() => {
  // Component code
  const [windowsize, updatewindowsize] = React.useState(window.innerWidth);
  const [size, updatesize] = React.useState(200);
  const playerRef = React.useRef<React.ElementRef<typeof Player>>(null);

  const resize = () => {
    updatewindowsize(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  React.useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  React.useEffect(() => {
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

Bar.displayName = "Bar";
