import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClueInput from './components/ClueInput';
import Loading from './components/Loading';
import './App.css';

import { Container } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";

const API_URL = 'https://interviewing.venteur.co/api/wordle';

interface WordleRequestItem {
  word: string;
  clue: string;
}

const App: React.FC = () => {
  const [suggestion, setSuggestion] = useState<string>('');
  const [clues, setClues] = useState<WordleRequestItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameOverMessage, setGameOverMessage] = useState<string>('');

  useEffect(() => {
    fetchInitialSuggestion();
  }, []);

  const fetchInitialSuggestion = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(API_URL, []);
      setSuggestion(response.data.guess);
    } catch (err) {
      setError('Failed to fetch initial suggestion.');
    }
    setLoading(false);
  };

  const handleClueSubmit = async (newClue: string) => {
    setLoading(true);
    setError('');
    try {
      const newClueItem = { word: suggestion, clue: newClue };
      const response = await axios.post(API_URL, [...clues, newClueItem]);
      setSuggestion(response.data.guess);
      setClues([...clues, newClueItem]);
      if (newClue.toLowerCase() === 'ggggg') {
        setGameOver(true);
        setGameOverMessage("Congratulations! You've solved the Wordle.");
      }

      if (clues.length > 7) {
        setGameOver(true);
        setGameOverMessage("You didn't solve the Wordle.");
      }

    } catch (err) {
      setError('Failed to fetch next word to guess.');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Header />
        <div className="wordle-solver-app">
          {loading ? (
            <Loading />
          ) : (
            <>
              {gameOver ? (
                <h2>{gameOverMessage}</h2>
              ) : (
                <>
                  <div>Word to Guess: <strong>{suggestion}</strong></div>
                  <ClueInput onSubmit={handleClueSubmit} disabled={loading} />
                </>
              )}
            </>
          )}
          {error && <p className="error">{error}</p>}
        </div>

      </Container>
    </Layout>
  );
};

export default App;