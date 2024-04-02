import React, { useState, useEffect } from 'react';
import { neon } from '@neondatabase/serverless';
import './App.css';
import Dashboard from './dashboard/Dashboard';
import Modal from './modal/Modal';
import Quiz from './quiz/Quiz';
// import Keyboard from './keyboard/Keyboard';

const App = () => {
  // let [answer, setAnswer] = useState('');
  // let [question, setQuestion] = useState('');
  let [data, setData] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(null);

  const handleQuestionChange = (newQuestion) => {
    setCurrentQuestion(newQuestion);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sql = neon('postgresql://kovalskaya.anastasiya:OUTu8Bm6ZfJb@ep-lively-violet-a2vco8om.eu-central-1.aws.neon.tech/random_quotes?sslmode=require');
        const dataDB = await sql('SELECT * FROM questions');
        setData(dataDB);
        
      } catch(error) {
        throw new Error(`Error: ${error}`);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Modal>
        <Quiz data={data} onQuestionChange={handleQuestionChange}></Quiz>
      </Modal>
      <Dashboard data={currentQuestion} />
    </>
  )
}

export default App;
