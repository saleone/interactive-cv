import { useState, useEffect, useRef, useContext } from 'react';
import { SlideContext } from '../SlideController';

export default function MatrixTerminalSlide({ 
  careerTexts, 
  terminalUser = "sasa@demo.savic.one",
  streamingMessage = "streaming...",
  readyMessage = "ready",
  endMessage = "end of transmission"
}) {
  const { goToNextSlide } = useContext(SlideContext);
  const [textState, setTextState] = useState({
    currentIndex: 0,
    displayedText: '',
    isTyping: false,
    isDone: false
  });
  const [matrixChars, setMatrixChars] = useState([]);
  const containerRef = useRef(null);

  // Matrix rain effect setup
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const charSize = 20; // approximate size of a character
    const columns = Math.floor(width / charSize);
    
    // Create initial matrix characters
    const initialChars = [];
    for (let i = 0; i < columns * 10; i++) {
      initialChars.push({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height) - height, // Start above the screen
        speed: 1 + Math.random() * 3,
        char: getRandomChar(),
        opacity: Math.random(),
      });
    }
    
    setMatrixChars(initialChars);
    
    // Animation frame for matrix effect
    let animationId;
    let lastTime = 0;
    
    const animate = (time) => {
      if (time - lastTime > 50) { // Update every 50ms
        lastTime = time;
        setMatrixChars(prevChars => 
          prevChars.map(char => ({
            ...char,
            y: char.y + char.speed,
            char: Math.random() > 0.9 ? getRandomChar() : char.char,
            // Reset if it goes off screen
            ...(char.y > height ? {
              y: -charSize,
              x: Math.floor(Math.random() * width),
              speed: 1 + Math.random() * 3,
            } : {})
          }))
        );
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Initialize typing on component mount
  useEffect(() => {
    // Start the first text after a short delay
    const initialTimer = setTimeout(() => {
      startTypingAnimation(0);
    }, 800);
    
    // Clean up all timers on unmount
    return () => {
      clearTimeout(initialTimer);
      if (window.typingTimers) {
        window.typingTimers.forEach(timer => clearTimeout(timer));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Function to start typing animation for a specific text index
  const startTypingAnimation = (textIndex) => {
    if (textIndex >= careerTexts.length) {
      setTextState(prev => ({
        ...prev,
        isDone: true,
        isTyping: false
      }));
      return;
    }
    
    const currentText = careerTexts[textIndex];
    
    // Clear any existing timers to prevent double animations
    if (window.typingTimers) {
      window.typingTimers.forEach(timer => clearTimeout(timer));
    }
    window.typingTimers = [];
    
    // Reset state for new text
    setTextState({
      currentIndex: textIndex,
      displayedText: '',
      isTyping: true,
      isDone: false
    });
    
    // Type each character with individual timeouts
    let timers = [];
    for (let i = 0; i < currentText.length; i++) {
      const timer = setTimeout(() => {
        setTextState(prev => ({
          ...prev,
          displayedText: currentText.substring(0, i + 1)
        }));
        
        // If this is the last character
        if (i === currentText.length - 1) {
          // Typing complete
          setTimeout(() => {
            setTextState(prev => ({
              ...prev,
              isTyping: false
            }));
            
            // No auto-advance to next text - require user interaction
          }, 100);
        }
      }, 50 * i);
      
      timers.push(timer);
    }
    
    // Store timers globally so they can be cleared if needed
    window.typingTimers = timers;
  };

  // Random Matrix-style character generator
  function getRandomChar() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%&^*!@#';
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Handle click to advance to next text
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent click from bubbling to SlideController
    
    const { isTyping, currentIndex, isDone } = textState;
    
    // Clear any existing timers
    if (window.typingTimers) {
      window.typingTimers.forEach(timer => clearTimeout(timer));
    }
    
    if (!isTyping && !isDone) {
      // Skip waiting and go to next text
      startTypingAnimation(currentIndex + 1);
    } else if (isDone) {
      goToNextSlide();
    } else if (isTyping) {
      // If currently typing, complete the current text immediately
      const fullText = careerTexts[currentIndex];
      setTextState(prev => ({
        ...prev,
        displayedText: fullText,
        isTyping: false
      }));
    }
  };

  return (
    <div 
      className="relative w-full h-full bg-black text-green-500 font-mono overflow-hidden cursor-pointer slide-content"
      onClick={handleClick}
      ref={containerRef}
    >
      {/* Matrix falling characters */}
      {matrixChars.map((char, index) => (
        <div
          key={index}
          className="absolute text-sm"
          style={{
            left: `${char.x}px`,
            top: `${char.y}px`,
            opacity: char.opacity,
            textShadow: '0 0 8px rgba(0, 255, 0, 0.8)',
          }}
        >
          {char.char}
        </div>
      ))}
      
      {/* Terminal text display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black bg-opacity-70 p-8 rounded-lg border border-green-500 shadow-lg shadow-green-500/20 max-w-3xl w-3/4">
          <div className="flex items-center mb-4 border-b border-green-500 pb-2">
            <div className="text-xs text-green-400">{terminalUser}</div>
          </div>
          
          <div className="text-xl min-h-[20rem]">
            {textState.displayedText}
            <span className={`inline-block w-3 h-5 bg-green-500 ml-1 ${textState.isTyping ? 'animate-pulse' : 'opacity-0'}`}></span>
          </div>
          
          {/* Fixed height message area to prevent layout shifts */}
          <div className="h-8 mt-4 text-sm text-gray-400">
            {textState.isTyping && (
              <span>{streamingMessage}</span>
            )}
            
            {!textState.isTyping && !textState.isDone && (
              <span>{readyMessage}</span>
            )}
            
            {textState.isDone && (
              <span>{endMessage}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
