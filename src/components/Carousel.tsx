import { useState, useEffect } from "react";

// Importação dos assets (ajuste os caminhos conforme necessário)
import photo1 from "../assets/image/photo-1.jpeg";
import video1 from "../assets/videos/video-1.mp4";
import video2 from "../assets/videos/video-2.mp4";
import photo2 from "../assets/image/photo-2.jpeg";
import video3 from "../assets/videos/video-3.mp4";
import photo3 from "../assets/image/photo-3.jpeg";
import video4 from "../assets/videos/video-4.mp4";
import photo4 from "../assets/image/photo-4.jpeg";
import photo5 from "../assets/image/photo-5.jpeg";
import photo6 from "../assets/image/photo-6.jpeg";

const media = [
  { src: photo1, alt: "Foto 1", type: "image" },
  { src: photo2, alt: "Foto 2", type: "image" },
  { src: video1, alt: "Vídeo 1", type: "video" },
  { src: photo3, alt: "Foto 3", type: "image" },
  { src: video2, alt: "Vídeo 2", type: "video" },
  { src: photo4, alt: "Foto 4", type: "image" },
  { src: video3, alt: "Vídeo 3", type: "video" },
  { src: photo5, alt: "Foto 5", type: "image" },
  { src: video4, alt: "Vídeo 4", type: "video" },
  { src: photo6, alt: "Foto 6", type: "image" },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video, index) => {
      if (index === currentIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[350px] sm:h-[400px] overflow-hidden mb-5">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {media.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-[280px] sm:max-w-[320px] h-[350px] sm:h-[400px] flex-shrink-0"
          >
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