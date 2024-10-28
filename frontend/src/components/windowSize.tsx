import React, { useEffect, useState } from 'react';

const WindowDimensions: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set up the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white text-center py-2">
      <p>Width: {dimensions.width}px, Height: {dimensions.height}px</p>
    </div>
  );
};

export default WindowDimensions;
