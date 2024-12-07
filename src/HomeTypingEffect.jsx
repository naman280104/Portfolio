import { useEffect, useState, useRef } from 'react'

const HomeTypingEffect = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const cursorBlinkRef = useRef(null); // Ref to store cursor blink interval ID
  const fullText = "H.i, I'm Naman, a  Software Engineer who crafts innovative solutions. E.xplore my work and let's build something amazing together!";

  const myChunkslength = [3, 8, 9];
  useEffect(() => {
    let charIndex = 0;
    let wordIndex = 0;
    let Chunknumber = 0;
    const words = fullText.split(" ");
    const typingInterval = 50; // Adjust typing speed

    const typeChunk = () => {
      const chunkSize = myChunkslength[Chunknumber]; // Number of words to type at a time
      if (wordIndex < words.length) {
        Chunknumber++;
        const chunk = words.slice(wordIndex, wordIndex + chunkSize).join(" ") + " ";
        setDisplayedText(prev => prev + chunk.slice(0, charIndex));
        const interval = setInterval(() => {
          if (charIndex < chunk.length - 1) {
            setDisplayedText(prev => prev + chunk[charIndex]);
            charIndex++;
          } else {
            clearInterval(interval);
            wordIndex += chunkSize;
            charIndex = 0;
            setTimeout(typeChunk, 1000); // Delay before typing the next chunk
          }
        }, typingInterval);
      } else {
        setTypingComplete(true); // Set typing as complete
      }
    };

    typeChunk();

    return () => {
      clearInterval(cursorBlinkRef.current); // Clear cursor blinking interval on cleanup
    };
  }, [fullText]);

  useEffect(() => {
    const cursorBlinkInterval = 500; // Cursor blink interval

    if (typingComplete) {
      setIsCursorVisible(false); // Stop the cursor blinking when typing is complete
      if (cursorBlinkRef.current) {
        clearInterval(cursorBlinkRef.current); // Clear the cursor blinking interval
      }
    } else {
      cursorBlinkRef.current = setInterval(() => {
        setIsCursorVisible(prev => !prev);
      }, cursorBlinkInterval);
    }

    return () => {
      clearInterval(cursorBlinkRef.current); // Clear the cursor blinking interval on cleanup
    };
  }, [typingComplete]);

  return (
    <div className="typing-container">
      {displayedText}
      <span className={`cursor ${isCursorVisible ? 'visible' : 'hidden'}`}>|</span>
    </div>
  );
};


export default HomeTypingEffect;