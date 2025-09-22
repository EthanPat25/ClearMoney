"use client";

import React from "react";
import dynamic from "next/dynamic";
import ICON from "../../../public/Dental.json";

type sizeProps = {
  initialSize: number;
};

export const Dental = React.memo(({ initialSize }: sizeProps) => {
  const [windowsize, updatewindowsize] = React.useState<number | null>(null);
  const [size, updatesize] = React.useState(initialSize);

  // ✅ Use dynamic import to avoid SSR issues
  const Player: any = dynamic(
    () => import("@lordicon/react").then((mod) => mod.Player),
    { ssr: false }
  );

  const playerRef = React.useRef<any>(null);

  React.useEffect(() => {
    const handleResize = () => updatewindowsize(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      updatesize(250);
    } else if (windowsize <= 1024) {
      updatesize(170);
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

Dental.displayName = "Dental";
