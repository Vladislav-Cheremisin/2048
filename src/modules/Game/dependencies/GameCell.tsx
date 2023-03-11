import React from 'react';
import { observer } from 'mobx-react';
import styles from '../styles.module.scss';
import GameItem from './GameItem';

type GameCellProps = {
  value: number;
};
function GameCell({ value }: GameCellProps) {
  return (
    <div className={styles.game_cell}>
      <GameItem
        value={value}
      />
    </div>
  );
}

export default observer(GameCell);
