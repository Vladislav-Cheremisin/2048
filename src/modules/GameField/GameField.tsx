import React from 'react';
import styles from './styles.module.scss';
import GameCell from './dependencies/GameCell';

function GameField() {
  return (
    <div className={styles.game_field}>
      <GameCell />
      <GameCell />
      <GameCell />
      <GameCell />
      <GameCell />
      <GameCell />
      <GameCell />
      <GameCell />
      <GameCell />
      <GameCell />
      <GameCell />
      <GameCell />
      <GameCell />
      <GameCell />
      <GameCell />
      <GameCell />
    </div>
  );
}
export default GameField;
