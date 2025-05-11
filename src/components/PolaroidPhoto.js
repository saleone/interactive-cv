import React from 'react';

const ImageScale = 2.0

/**
 * PolaroidPhoto component
 * @param {Object} props
 * @param {string} props.imageUrl - URL of the image to display
 * @param {string} props.caption - Caption text to display below the image
 * @param {number} props.width - Width of the polaroid in pixels (default: 264px * ImageScale)
 */
const PolaroidPhoto = ({ imageUrl, caption, width = 264 * ImageScale }) => {
  // Calculate dimensions based on the 88:107 ratio
  const height = (width / 88) * 107;
  const imageSize = (width / 88) * 79;
  const margin = (width - imageSize) / 2;
  
  return (
    <div 
      className="relative bg-white dark:bg-black shadow-lg dark:shadow-white/20"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        padding: `${margin}px ${margin}px 0 ${margin}px`,
      }}
    >
      {/* Image container */}
      <div 
        className="overflow-hidden bg-black dark:bg-white"
        style={{
          width: `${imageSize}px`,
          height: `${imageSize}px`,
        }}
      >
        <img 
          src={imageUrl} 
          alt={caption || "Polaroid photo"} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Caption */}
      <div 
        className="mt-4 text-center px-2 text-black dark:text-white"
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontWeight: "700",
        }}
      >
        {caption}
      </div>
    </div>
  );
};

export default PolaroidPhoto;
