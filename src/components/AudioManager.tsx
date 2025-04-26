
import { useEffect, useRef } from 'react';

interface AudioManagerProps {
  isMuted: boolean;
  isWinning?: boolean;
}

const AudioManager = ({ isMuted, isWinning }: AudioManagerProps) => {
  const backgroundRef = useRef<HTMLAudioElement>(null);
  const victoryRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const backgroundAudio = backgroundRef.current;
    if (!backgroundAudio) return;

    backgroundAudio.volume = 0.3;

    // Function to handle user interaction and play the audio
    const playAudioAfterInteraction = () => {
      if (!isMuted && backgroundAudio.paused) {
        backgroundAudio
          .play()
          .catch((error) =>
            console.error("Background audio playback error:", error),
          );
      }
      // Remove the event listeners after they've been used
      document.removeEventListener("click", playAudioAfterInteraction);
      document.removeEventListener("keydown", playAudioAfterInteraction);
    };

    // Add event listeners to capture user interaction
    document.addEventListener("click", playAudioAfterInteraction);
    document.addEventListener("keydown", playAudioAfterInteraction);

    // Handle muting and unmuting
    if (isMuted && !backgroundAudio.paused) {
      backgroundAudio.pause();
    } else if (!isMuted && backgroundAudio.paused) {
      backgroundAudio.play().catch((error) => {
        console.log("Background audio playback error:", error);
      });
    }

    // Cleanup function to remove the event listeners on component unmount
    return () => {
      document.removeEventListener("click", playAudioAfterInteraction);
      document.removeEventListener("keydown", playAudioAfterInteraction);
    };
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
