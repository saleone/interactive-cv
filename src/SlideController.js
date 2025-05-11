import { Children, useState, useEffect } from 'react';

export default function SlideController({children}) {
  const all_children = Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToNextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex < all_children.length - 1 ? prevIndex + 1 : prevIndex
    );
  };
  
  const goToPrevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Handle click navigation
  const handleClick = (e) => {
    const { clientX, target } = e;
    const { width } = target.getBoundingClientRect();
    
    if (clientX < width / 2) {
      goToPrevSlide();
    } else {
      goToNextSlide();
    }
  };
  
  return (
    <div 
      className="wrap w-screen h-screen cursor-pointer flex items-center justify-center" 
      onClick={handleClick}
    >
      <div key={currentIndex} className="w-full h-full flex items-center justify-center">
        {all_children[currentIndex]}
      </div>
    </div>
  );
};

