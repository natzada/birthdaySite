import { useState, useEffect } from "react";
import MusicPlayer from "./MusicPlayer.tsx";
import Carousel from "./Carousel.tsx";
import Countdown from "./Countdown.tsx";
import TextArea from "./Textarea.tsx";
import Loader from "./Loader.tsx";

// Importação dos assets para pré-carregamento
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
import albumCover from "../assets/image/capa.jpeg";
import audioSrc from "../assets/audio/Aliança-Tribalistas.mp3"; // Importe o áudio

const Content: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        // Lista de vídeos e fotos do carrossel
        const mediaUrls = [
          { src: photo1, type: "image" },
          { src: video1, type: "video" },
          { src: video2, type: "video" },
          { src: photo2, type: "image" },
          { src: video3, type: "video" },
          { src: photo3, type: "image" },
          { src: video4, type: "video" },
          { src: photo4, type: "image" },
          { src: photo5, type: "image" },
          { src: photo6, type: "image" },
        ];
        const audio = new Audio(audioSrc);
        const img = new Image();
        img.src = albumCover;

        const mediaPromises = mediaUrls.map(({ src, type }) => {
          if (type === "video") {
            return new Promise((resolve, reject) => {
              const video = document.createElement("video");
              video.src = src;
              video.addEventListener("loadeddata", resolve);
              video.addEventListener("error", () =>
                reject(new Error(`Erro ao carregar vídeo`))
              );
            });
          } else {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.addEventListener("load", resolve);
              img.addEventListener("error", () =>
                reject(new Error(`Erro ao carregar imagem`))
              );
            });
          }
        });

        await Promise.all([
          new Promise((resolve, reject) => {
            audio.addEventListener("loadeddata", resolve);
            audio.addEventListener("error", () =>
              reject(new Error("Erro ao carregar áudio"))
            );
          }),
          new Promise((resolve, reject) => {
            img.addEventListener("load", resolve);
            img.addEventListener("error", () =>
              reject(new Error("Erro ao carregar imagem da capa"))
            );
          }),
          ...mediaPromises,
        ]);
        setIsLoading(false);
      } catch (err) {
        console.error("Erro ao carregar assets:", err);
        setError("Falha ao carregar áudio, imagem ou mídia do carrossel.");
        setIsLoading(false);
      }
    };
    loadAssets();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-red-950 p-4 sm:p-6">
      <MusicPlayer
        trackTitle="Aliança"
        artistName="Tribalistas"
        albumCover={albumCover}
        audioSrc={audioSrc}
      />
      <Carousel />
      <Countdown />
      <TextArea />
    </div>
  );
};

export default Content;