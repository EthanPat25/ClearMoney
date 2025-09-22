"use client";

import React from "react";
import { Player } from "@lordicon/react";
import ICON from "../../../public/TaxCalculator.json";

export const TaxCalculator = React.memo(() => {
  const [windowsize, updatewindowsize] = React.useState<number | null>(null);
  const [size, updatesize] = React.useState(200);
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
      updatesize(450);
    } else if (windowsize >= 2560) {
      updatesize(350);
    } else if (windowsize >= 1920) {
      updatesize(300);
    } else if (windowsize >= 1536) {
      updatesize(200);
    } else if (windowsize <= 1024) {
      updatesize(170);
    }
  }, [windowsize]);

  return <Player size={size} icon={ICON} ref={playerRef} />;
});

TaxCalculator.displayName = "TaxCalculator";
