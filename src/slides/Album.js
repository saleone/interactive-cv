import { useState, useEffect, useRef, useContext } from 'react';
import PolaroidPhoto from '../components/PolaroidPhoto';
import { SlideContext } from '../SlideController';

export default function AlbumSlide({ photos }) {
  const { goToNextSlide } = useContext(SlideContext);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef(null);
  
  // Function to generate random position and rotation for a photo
  const generatePhotoPosition = () => {
    return {
      rotation: Math.random() * 40 - 20, // -20 to +20 degrees
      xOffset: Math.random() * 80 - 40,  // -40 to +40 pixels
      yOffset: Math.random() * 60 - 30,  // -30 to +30 pixels
    };
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent click from bubbling to SlideController
    
    if (visiblePhotos.length < photos.length) {
      const nextPhotoIndex = visiblePhotos.length;
      const nextPhoto = {
        ...photos[nextPhotoIndex],
        ...generatePhotoPosition()
      };
      setVisiblePhotos(prev => [...prev, nextPhoto]);
    } else if (isComplete) {
      goToNextSlide();
    }
  };

  useEffect(() => {
    // Mark as complete after the last photo has finished animating
    if (visiblePhotos.length === photos.length) {
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, 1500); // Wait for animation to complete
      
      return () => clearTimeout(timer);
    }
  }, [visiblePhotos, photos.length]);

  return (
    <div 
      className="bg-white relative w-full h-full flex items-center justify-center cursor-pointer slide-content"
      onClick={handleClick}
      ref={containerRef}
    >
      <div className="relative w-[600px] h-[600px]">
        {visiblePhotos.map((photo, index) => (
          <div
            key={photo.id}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              zIndex: index,
              transform: `translate(calc(-50% + ${photo.xOffset}px), calc(-50% + ${photo.yOffset}px)) rotate(${photo.rotation}deg)`,
            }}
          >
            <div className="animate-fall-and-spin">
              <PolaroidPhoto 
                imageUrl={photo.imageUrl}
                caption={photo.caption}
                width={photo.width}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
