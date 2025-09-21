"use client"

import React from 'react';

const ICON = require('../../../public/Bar.json');
import { Player } from '@lordicon/react';


export const Bar = React.memo(() => {
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
                updatesize(150)

            } else if (windowsize >= 2560) {
                updatesize(150)

              } else if (windowsize >= 1920) {
                updatesize(150)
              } else if (windowsize >= 1536) {
                    updatesize(150)
                } 
                else if (windowsize <= 1024) {
                    updatesize(150)
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

