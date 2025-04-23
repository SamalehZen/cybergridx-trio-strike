
import { useEffect, useRef } from 'react';

interface AudioManagerProps {
  isMuted: boolean;
  isWinning?: boolean;
}

const AudioManager = ({ isMuted, isWinning }: AudioManagerProps) => {
  const backgroundRef = useRef<HTMLAudioElement>(null);
  const victoryRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.volume = 0.3;
      if (isMuted) {
        backgroundRef.current.pause();
      } else {
        backgroundRef.current.play();
      }
    }
  }, [isMuted]);

  useEffect(() => {
    if (victoryRef.current && isWinning && !isMuted) {
      victoryRef.current.volume = 0.5;
      victoryRef.current.play();
    }
  }, [isWinning, isMuted]);

  return (
    <>
      <audio
        ref={backgroundRef}
        src="/background-music.mp3"
        loop
      />
      <audio
        ref={victoryRef}
        src="/victory-sound.mp3"
      />
    </>
  );
};

export default AudioManager;
