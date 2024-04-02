import { useState, useEffect } from 'react';
import './dashboard.scss';
import Keyboard from '../keyboard/Keyboard';

/*
  api.json data structure

  data: [
    {
      id: number,
      category: 'string',
      question: 'string with qustion',
      answer: 'string with answer',
    },
    {
      id: number,
      category: 'string',
      question: 'string with qustion',
      answer: 'string with answer',
    },
  ]
*/

const Dashboard = ({ data }) => {
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [keyboardEnabled, setKeyboardEnabled] = useState(true);
  const [answerLetters, setAnswerLetters] = useState([]);

  useEffect(() => {
    if(data && data.answer) {
      setRevealedLetters(Array(data.answer.length).fill(false));
      setAnswerLetters(data.answer.split(''));
    }
  }, [data])
  
  const answerString = () => {
    return answerLetters.map((element, index) => {
      return (
        <p key={index}>
          <span className='answer-letters'>
            {revealedLetters[index] ? element.toLocaleUpperCase() : '_'}
          </span>
        </p>
      );
    });
  };

  const handleLetterClick = (letter) => {
    if(!keyboardEnabled) return;

    const isLetterInAnswer = answerLetters.includes(letter);
    if(!isLetterInAnswer) {
      setFailedAttempts(failedAttempts + 1);

      //if(failedAttempts >= 5) {
        setKeyboardEnabled(true);
      //}
    }

    const newRevealedLetters = answerLetters.map((el, index) => {
      return el === letter || revealedLetters[index];
    });
    setRevealedLetters(newRevealedLetters);
  }
  
  return (
    <div>
        {<h1>{data?.question || 'Loading...'}</h1>}
        <div className='answer-container'>
          {data && (answerString(data.answer))}
        </div>
        {keyboardEnabled && data && (
          <Keyboard onKeyboardClick={handleLetterClick} />
        )}
        <p>Failed attempts: {failedAttempts} / 6</p>
      
    </div>
  )
}

export default Dashboard;