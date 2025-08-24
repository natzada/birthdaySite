import { useRef, useState, useEffect } from "react";

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
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", () =>
        setDuration(audioRef.current?.duration || 0)
      );
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-red-900/30 text-white p-4 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-6">
        <img
          src={albumCover}
          alt={`${trackTitle} - ${artistName}`}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
        />
        <div className="flex-1">
          <h2 className="text-sm sm:text-base font-semibold truncate">{trackTitle}</h2>
          <p className="text-xs sm:text-sm text-gray-400 truncate">{artistName}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="text-white hover:text-red-500 transition-colors"
          >
            {isPlaying ? (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>
        <div className="w-full mt-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            step="0.1"
            onChange={handleSeek}
            className="w-full h-1 bg-white/70 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <audio ref={audioRef} src={audioSrc} className="hidden" />
    </div>
  );
};

export default MusicPlayer;