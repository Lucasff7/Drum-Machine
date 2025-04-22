import ReactDOM from 'react-dom/client'; 
import { useState, useEffect } from "react"; 
import './style.css';

function App() {
  const audio1 = [
    { keyCode: 1, keyLetter: 'Q', id: 'Heater-1', url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
    { keyCode: 2, keyLetter: "W", id: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
    { keyCode: 3, keyLetter: "E", id: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
    { keyCode: 4, keyLetter: "A", id: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
    { keyCode: 5, keyLetter: "S", id: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
    { keyCode: 6, keyLetter: "D", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
    { keyCode: 7, keyLetter: "Z", id: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
    { keyCode: 8, keyLetter: "X", id: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
    { keyCode: 9, keyLetter: "C", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
  ];

  const audio2 = [
    { keyCode: 10, keyLetter: "Q", id: "Chord-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },
    { keyCode: 11, keyLetter: "W", id: "Chord-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },
    { keyCode: 12, keyLetter: "E", id: "Chord-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },
    { keyCode: 13, keyLetter: "A", id: "Shaker", url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },
    { keyCode: 14, keyLetter: "S", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },
    { keyCode: 15, keyLetter: "D", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },
    { keyCode: 16, keyLetter: "Z", id: "Punchy-Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },
    { keyCode: 17, keyLetter: "X", id: "Side-Stick", url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },
    { keyCode: 18, keyLetter: "C", id: "Snare", url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" }
  ];

   const [isFirstSet, setIsFirstSet] = useState(true);
   const [displayText, setDisplayText] = useState('');
   const [volume, setVolume] = useState(0.5); 

  const currentAudio = isFirstSet ? audio1 : audio2;

  const playSound = (audio) => {
    const sound = document.getElementById(audio.keyLetter);
    if (sound) {
      sound.currentTime = 0;
      sound.volume = volume; 
      sound.play();
      setDisplayText(audio.id);
    }
  };

  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    const audio = currentAudio.find(a => a.keyLetter === key);
    if (audio) playSound(audio);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div id="drum-machine">
      <div id="display">{displayText}</div>

      <div id="volume-control">
        <label htmlFor="volume">Volume</label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>

      <div id="buttons">
        {currentAudio.map((audio) => (
          <button
            key={audio.keyCode}
            className="drum-pad"
            id={audio.id}
            onClick={() => playSound(audio)}
          >
            {audio.keyLetter}
            <audio
              className="clip"
              id={audio.keyLetter}
              src={audio.url}
            />
          </button>
        ))}
      </div>

      <button onClick={() => setIsFirstSet(prev => !prev)}>Change sounds</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));