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
  return (
    <div className="flex flex-col sm:flex-row items-center bg-red-900 bg-opacity-30 p-3 rounded-lg w-full max-w-full sm:max-w-2xl mb-5 shadow-md">
      <img
        src={albumCover}
        alt="Capa do Álbum"
        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md mb-3 sm:mb-0 sm:mr-4"
      />
      <div className="flex-grow text-white text-center sm:text-left">
        <p className="text-sm sm:text-lg font-bold">{trackTitle}</p>
        <p className="text-xs sm:text-sm text-gray-400">{artistName}</p>
      </div>
      <audio controls className="w-full sm:w-52 h-8 mt-3 sm:mt-0">
        <source src={audioSrc} type="audio/mp3" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
    </div>
  );
};

export default MusicPlayer;