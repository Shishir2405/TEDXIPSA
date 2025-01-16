import React, { useEffect, useState, useRef } from "react";
import { cn } from "../../lib/utils";

export const ShootingStars = ({
  minSpeed = 0.65,
  maxSpeed = 1.75,

  starColor = "#FFFFFF",
  trailColor = "#FFFFFF0a",
  starWidth = 10,
  starHeight = 2,
  className,
}) => {
  const [stars, setStars] = useState([]);
  const svgRef = useRef(null);
  const animationRef = useRef(null);

  // Create new stars
  useEffect(() => {
    const createStar = () => {
      // Randomly choose between top edge and right edge
      const spawnFromRight = Math.random() > 0.5;

      let x, y;
      if (spawnFromRight) {
        x = window.innerWidth;
        y = Math.random() * (window.innerHeight * 0.7);
      } else {
        x = Math.random() * window.innerWidth;
        y = 0;
      }

      const angle = 135;
      const newStar = {
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };
      
      setStars(prevStars => [...prevStars, newStar]);

      // Random delay between 4000ms (4s) and 8000ms (8s) for next star
      const nextDelay = Math.random() * (1000 - 500) + 3000;
      setTimeout(createStar, nextDelay);
    };

    // Create initial star
    createStar();

    return () => {};
  }, [minSpeed, maxSpeed]);

  // Move all stars
  useEffect(() => {
    const moveStars = () => {
      setStars(prevStars => 
        prevStars.map(star => {
          const newX = star.x + (star.speed * Math.cos((star.angle * Math.PI) / 180));
          const newY = star.y + (star.speed * Math.sin((star.angle * Math.PI) / 180));
          const newDistance = star.distance + star.speed;
          const newScale = 1 + newDistance / 200;

          return {
            ...star,
            x: newX,
            y: newY,
            distance: newDistance,
            scale: newScale,
          };
        })
      );
    };

    const animate = () => {
      moveStars();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); 

  return (
    <svg ref={svgRef} className={cn("w-full h-full absolute inset-0", className)}>
      {stars.map(star => (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      ))}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
};
