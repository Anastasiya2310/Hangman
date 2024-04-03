import './keyboard.scss';
import React, { useEffect, useMemo, useState } from 'react';

const Keyboard = ({ onKeyboardClick }) => {
  //const [pressedKey, setPressedKey] = useState(null);
  const [disabledKeys, setDisabledKeys] = useState([]);

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
    setDisabledKeys([...disabledKeys, letter]);
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const letter = Object.keys(charCodes).find((key) => charCodes[key] === event.code)?.toLowerCase();
      //setPressedKey(event.key);
      if(letter && !disabledKeys.includes(letter)) {
        onKeyboardClick(letter);
        setDisabledKeys([...disabledKeys, letter]);
      }
    }

    // const handleKeyUp = (event) => {
    //   setPressedKey(null);
    // }

    window.addEventListener('keydown', handleKeyDown);
    //window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      //window.removeEventListener('keyup', handleKeyUp);
    }
  }, [onKeyboardClick, charCodes, disabledKeys]);

  const createButtons = (alphabet) => {
    let letters = [];
    for(let char in alphabet){
      letters.push(<button disabled={disabledKeys.includes(char) ? 'disabled' : null} className={disabledKeys.includes(char) ? 'disabled keyboard-letter' : 'keyboard-letter'} key={char} onClick={() => handleLetterClick(char)}>{char.toLocaleUpperCase()}</button>);
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