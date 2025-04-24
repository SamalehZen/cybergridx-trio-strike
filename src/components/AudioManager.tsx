
import { useEffect, useRef } from 'react';

interface AudioManagerProps {
  isMuted: boolean;
  isWinning?: boolean;
}

const AudioManager = ({ isMuted, isWinning }: AudioManagerProps) => {
  const backgroundRef = useRef<HTMLAudioElement>(null);
  const victoryRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const bgAudio = backgroundRef.current;
    if (bgAudio) {
      bgAudio.volume = 0.3;
      
      // This ensures audio playback is attempted after user interaction
      const handleUserInteraction = () => {
        if (!isMuted && bgAudio.paused) {
          bgAudio.play().catch(error => {
            console.log("Background audio playback error:", error);
          });
        }
        
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
      
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
      
      if (isMuted && !bgAudio.paused) {
        bgAudio.pause();
      } else if (!isMuted && bgAudio.paused) {
        bgAudio.play().catch(error => {
          console.log("Background audio playback error:", error);
        });
      }
      
      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
    }
  }, [isMuted]);

  useEffect(() => {
    const victoryAudio = victoryRef.current;
    if (victoryAudio && isWinning && !isMuted) {
      victoryAudio.volume = 0.5;
      victoryAudio.currentTime = 0; // Reset to start
      
      victoryAudio.play().catch(error => {
        console.log("Victory sound playback error:", error);
      });
    }
  }, [isWinning, isMuted]);

  return (
    <>
      <audio
        ref={backgroundRef}
        src="/background-music.mp3"
        loop
        preload="auto"
      />
      <audio
        ref={victoryRef}
        src="/victory-sound.mp3"
        preload="auto"
      />
    </>
  );
};

export default AudioManager;
