
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
      try {
        if (!isMuted) {
          const playPromise = bgAudio.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Auto-play was prevented, we'll need user interaction
              console.log("Auto-play prevented. Waiting for user interaction.");
            });
          }
        } else {
          bgAudio.pause();
        }
      } catch (error) {
        console.error("Audio playback error:", error);
      }
    }
  }, [isMuted]);

  useEffect(() => {
    const victoryAudio = victoryRef.current;
    if (victoryAudio && isWinning && !isMuted) {
      victoryAudio.volume = 0.5;
      try {
        const playPromise = victoryAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            console.log("Victory sound auto-play prevented.");
          });
        }
      } catch (error) {
        console.error("Victory sound playback error:", error);
      }
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
