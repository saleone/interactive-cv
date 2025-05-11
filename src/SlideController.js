import { Children, useState, useEffect, createContext } from 'react';

// Create a context to share navigation functions with slides
export const SlideContext = createContext({
  goToNextSlide: () => {},
  goToPrevSlide: () => {},
  currentIndex: 0,
  totalSlides: 0
});

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
    // Don't handle clicks if the event was already handled by a child component
    if (e.target.closest('.slide-content')) {
      return;
    }
    
    const { clientX, target } = e;
    const { width } = target.getBoundingClientRect();
    
    if (clientX < width / 2) {
      goToPrevSlide();
    } else {
      goToNextSlide();
    }
  };
  
  // Context value
  const contextValue = {
    goToNextSlide,
    goToPrevSlide,
    currentIndex,
    totalSlides: all_children.length
  };
  
  return (
    <SlideContext.Provider value={contextValue}>
      <div 
        className="wrap w-screen h-screen cursor-pointer flex items-center justify-center" 
        onClick={handleClick}
      >
        <div key={currentIndex} className="w-full h-full flex items-center justify-center slide-content">
          {all_children[currentIndex]}
        </div>
      </div>
    </SlideContext.Provider>
  );
};

