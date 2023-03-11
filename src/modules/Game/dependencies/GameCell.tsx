import React from 'react';
import { observer } from 'mobx-react';
import styles from '../styles.module.scss';

type GameCellProps = {
  value: number;
  bgColor: string,
};
function GameCell(props: GameCellProps) {
  const {
    value,
    bgColor,
  } = props;

  return (
    <div
      className={styles.game_cell}
      style={{
        backgroundColor: bgColor,
      }}
    >
      {value > 0 && (
        <span>{value}</span>
      )}
    </div>
  );
}

export default observer(GameCell);
