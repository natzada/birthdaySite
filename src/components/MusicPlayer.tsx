import { useRef, useState } from "react";

interface MusicPlayerProps {
  trackTitle: string;
  artistName: string;
  albumCover: string;
  audioSrc: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  trackTitle,
  artistName,
  albumCover,
  audioSrc,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((err) => setError("Erro ao reproduzir o áudio: " + err.message));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg mb-6 w-full max-w-md">
      <img
        src={albumCover}
        alt={`${trackTitle} - ${artistName}`}
        className="w-32 h-32 object-cover rounded-md mb-4"
      />
      <div className="text-center text-white">
        <h2 className="text-lg font-bold">{trackTitle}</h2>
        <p className="text-sm">{artistName}</p>
      </div>
      <audio ref={audioRef} src={audioSrc} />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        onClick={togglePlay}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        {isPlaying ? "Pausar" : "Tocar"}
      </button>
    </div>
  );
};

export default MusicPlayer;