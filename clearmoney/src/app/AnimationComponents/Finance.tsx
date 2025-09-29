"use client";

import React from "react";
import dynamic from "next/dynamic";
import ICON from "../../../public/Finance.json";

export const Finance = React.memo(() => {
  const [windowsize, updatewindowsize] = React.useState<number | null>(null);
  const [size, updatesize] = React.useState(150);

  const Player: any = dynamic(
    () => import("@lordicon/react").then((mod) => mod.Player),
    { ssr: false }
  );

  const playerRef = React.useRef<any>(null);

  React.useEffect(() => {
    const handleResize = () => updatewindowsize(window.innerWidth);
    handleResize(); // set initial window size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  return (
    <div>
      <Player
        size={size}
        icon={ICON}
        ref={(instance: any) => {
          if (instance) {
            playerRef.current = instance;
            playerRef.current.playFromBeginning?.();
          }
        }}
      />
    </div>
  );
});

Finance.displayName = "Finance";
