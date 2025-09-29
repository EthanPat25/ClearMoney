"use client";

import React from "react";
import dynamic from "next/dynamic";
import ICON from "../../../public/Learn.json";

export const Learn = React.memo(() => {
  const [windowsize, updatewindowsize] = React.useState<number | null>(150);
  const [size, updatesize] = React.useState(150);

  const Player = dynamic(
    () => import("@lordicon/react").then((mod) => mod.Player),
    {
      ssr: false,
      loading: () => <div style={{ width: size, height: size }} />,
    }
  );

  const playerRef = React.useRef<any>(null);

  React.useEffect(() => {
    const handleResize = () => updatewindowsize(window.innerWidth);
    handleResize(); // set initial window size on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (windowsize === null) return;

    updatesize(150);
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

Learn.displayName = "Learn";
