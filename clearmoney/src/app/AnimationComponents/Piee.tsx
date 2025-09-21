"use client"

import React from 'react';
import dynamic from 'next/dynamic';

const ICON = require('../../../public/Pie.json');
import { Player } from '@lordicon/react';


export const Piee = React.memo(() => {
    // Component code
    const [windowsize, updatewindowsize] = React.useState(window.innerWidth);
      const [size,updatesize] = React.useState(200)  
  const playerRef = React.useRef<any>(null);


        const resize = () => {
            updatewindowsize(window.innerWidth);
        }
    
            React.useEffect(() => {
                window.addEventListener('resize', resize)
                return () => (
                    window.removeEventListener('resize', resize)
                );
        
            },[])
            React.useEffect(() => {
              playerRef.current?.playFromBeginning();
          }, [])
        
            React.useEffect(() => {
              if (windowsize >= 3200) {
                updatesize(450)

            } else if (windowsize >= 2560) {
                updatesize(350)

              } else if (windowsize >= 1920) {
                updatesize(300)
              } else if (windowsize >= 1536) {
                    updatesize(250)
                } 
                else if (windowsize <= 1024) {
                    updatesize(170)
                } 
            },[windowsize])

    return (
        <Player 
            size={size}
            icon={ ICON }
            ref={playerRef}
        />
    );
});

