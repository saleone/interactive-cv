import { useState, useEffect, useRef, useContext } from 'react';
import PolaroidPhoto from '../components/PolaroidPhoto';
import { SlideContext } from '../SlideController';

export default function AlbumSlide() {
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
  
  // Photo data without positioning information
  const photos = [
    {
      id: 1,
      imageUrl: "https://picsum.photos/seed/nature/300/300",
      caption: "Summer vacation 2023",
      width: 264,
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/seed/beach/300/300",
      caption: "Beach memories",
      width: 220,
    },
    {
      id: 3,
      imageUrl: "https://picsum.photos/seed/mountain/300/300",
      caption: "Mountain trip",
      width: 176,
    },
    {
      id: 4,
      imageUrl: "https://picsum.photos/seed/city/300/300",
      caption: "City exploration",
      width: 240,
    },
    {
      id: 5,
      imageUrl: "https://picsum.photos/seed/sunset/300/300",
      caption: "Sunset at the lake",
      width: 200,
    },
    {
      id: 6,
      imageUrl: "https://picsum.photos/seed/friends/300/300",
      caption: "Friends gathering",
      width: 250,
    },
    {
      id: 7,
      imageUrl: "https://picsum.photos/seed/food/300/300",
      caption: "Delicious dinner",
      width: 190,
    }
  ];

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
      
      {visiblePhotos.length === 0 && (
        <div className="absolute text-center text-xl opacity-50">
          Click to start the photo album
        </div>
      )}
      
      {isComplete && visiblePhotos.length === photos.length && (
        <div className="absolute bottom-10 text-center text-xl opacity-50">
          Click to continue
        </div>
      )}
    </div>
  );
}
