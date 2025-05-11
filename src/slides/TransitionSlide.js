import React, { useState, useEffect, useContext } from 'react';
import { SlideContext } from '../SlideController';

export default function TransitionSlide({ 
  colorClasses = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-black'], 
  settleTime = 1000,
  initialFlickerSpeed = 30,
}) {
  const [currentColorClass, setCurrentColorClass] = useState(colorClasses[0]);
  const [isFlickering, setIsFlickering] = useState(true);
  const { goToNextSlide } = useContext(SlideContext);
  
  useEffect(() => {
    if (!isFlickering) return;
    
    let timers = [];
    const startTime = Date.now();
    
    const flicker = () => {
      const elapsedTime = Date.now() - startTime;
      
      if (elapsedTime >= settleTime) {
        // Settle on the final color
        setCurrentColorClass(colorClasses[colorClasses.length - 1]);
        setIsFlickering(false);
        return;
      }
      
      // Calculate progress (0 to 1)
      const progress = elapsedTime / settleTime;
      
      // Progressively slow down the flickering
      // Start fast, end slow
      const flickerSpeed = initialFlickerSpeed + Math.floor(progress * 200);
      
      // As we progress, increase the probability of showing the final color
      const finalColorProbability = progress * progress; // Non-linear increase
      
      if (Math.random() < finalColorProbability) {
        // Show the final color with increasing probability
        setCurrentColorClass(colorClasses[colorClasses.length - 1]);
      } else {
        // Otherwise show a random color, weighted toward the end of the array as time progresses
        const weightedIndex = Math.min(
          colorClasses.length - 1,
          Math.floor(Math.random() * colorClasses.length * (1 + progress))
        );
        setCurrentColorClass(colorClasses[weightedIndex]);
      }
      
      const timer = setTimeout(flicker, flickerSpeed);
      timers.push(timer);
    };
    
    flicker();
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isFlickering, colorClasses, settleTime, initialFlickerSpeed, goToNextSlide]);
  
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent click from bubbling to SlideController
    
    // If still flickering, immediately stop and settle on final color
    if (isFlickering) {
      setIsFlickering(false);
      setCurrentColorClass(colorClasses[colorClasses.length - 1]);
    } else {
      goToNextSlide();
    }
  };
  
  // Add a separate effect to handle the transition to next slide
  useEffect(() => {
    // When flickering stops, advance to the next slide after a delay
    if (!isFlickering) {
      const timer = setTimeout(() => {
        goToNextSlide();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isFlickering, goToNextSlide]);
  
  // Combine the slide-content classes with the current color class
  const combinedClasses = `slide-content w-full h-full flex items-center justify-center transition-colors duration-75 ${currentColorClass}`;
  
  return (
    <div 
      className={combinedClasses}
      onClick={handleClick}
    />
  );
}
