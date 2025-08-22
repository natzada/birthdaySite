import { useState } from "react";

// Array de mídias (fotos e vídeos)
const media = Array.from({ length: 10 }, (_, i) => ({
  src: i % 2 === 0 
    ? `/assets/images/photo-${i + 1}.jpg` 
    : `/assets/videos/video-${Math.floor(i / 2) + 1}.mp4`, // Alterna entre fotos e vídeos
  alt: i % 2 === 0 ? `Foto ${i + 1}` : `Vídeo ${Math.floor(i / 2) + 1}`,
  type: i % 2 === 0 ? "image" : "video", // Define o tipo de mídia
}));

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[350px] sm:h-[400px] overflow-hidden mb-5">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 300}px)` }}
      >
        {media.map((item, index) => (
          <div key={index} className="w-full max-w-[280px] sm:max-w-[320px] h-[350px] sm:h-[400px] flex-shrink-0">
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={item.src}
                controls
                muted
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded text-sm sm:text-base"
        onClick={handlePrev}
      >
        ❮
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded text-sm sm:text-base"
        onClick={handleNext}
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;