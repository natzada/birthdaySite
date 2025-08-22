import { useState, useEffect } from "react";
import MusicPlayer from "./MusicPlayer.tsx";
import Carousel from "./Carousel.tsx";
import Countdown from "./Countdown.tsx";
import TextArea from "./Textarea.tsx";
import Loader from "./Loader.tsx";

const Content: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAssets = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s de atraso
      setIsLoading(false);
    };
    loadAssets();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-black-red p-4 sm:p-6">
      <MusicPlayer
        trackTitle="Aliança"
        artistName="Tribalistas"
        albumCover="/assets/image/capa.jpeg"
        audioSrc="/assets/audio/Aliança-Tribalistas.mp3"
      />
      <Carousel />
      <Countdown />
      <TextArea />
    </div>
  );
};

export default Content;
