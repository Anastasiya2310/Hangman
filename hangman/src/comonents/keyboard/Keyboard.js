import './keyboard.scss';
import React, { useEffect, useMemo } from 'react';

const Keyboard = ({ onKeyboardClick }) => {
  let charCodes = useMemo(() => ({
    a: 'KeyA',
    b: 'KeyB',
    c: 'KeyC',
    d: 'KeyD',
    e: 'KeyE',
    f: 'KeyF',
    g: 'KeyG',
    h: 'KeyH',
    i: 'KeyI',
    j: 'KeyJ',
    k: 'KeyK',
    l: 'KeyL',
    m: 'KeyM',
    n: 'KeyN',
    o: 'KeyO',
    p: 'KeyP',
    q: 'KeyQ',
    r: 'KeyR',
    s: 'KeyS',
    t: 'KeyT',
    u: 'KeyU',
    v: 'KeyV',
    w: 'KeyW',
    x: 'KeyX',
    y: 'KeyY',
    z: 'KeyZ',
  }),[]);

  const handleLetterClick = (letter) => {
    onKeyboardClick(letter);
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const letter = Object.keys(charCodes).find((key) => charCodes[key] === event.code)?.toLowerCase();
      if(letter) {
        onKeyboardClick(letter);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [onKeyboardClick, charCodes]);

  const createButtons = (alphabet) => {
    let letters = [];
    for(let char in alphabet){
      letters.push(<button className='keyboard-letter' key={char} onClick={() => handleLetterClick(char)}>{char.toLocaleUpperCase()}</button>);
    }
    return letters;
  }

  return (
    <div className='keyboard-container'>
      <div className='keyborad-letters'>
        {createButtons(charCodes)}
      </div>
    </div>
  )
}

export default Keyboard;