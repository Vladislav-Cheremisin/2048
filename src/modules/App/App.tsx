import React from 'react';
import GameField from '../GameField/GameField';
import styles from './styles.module.scss';

function App() {
  return (
    <div className={styles.wrapper}>
      <GameField />
    </div>
  );
}

export default App;
