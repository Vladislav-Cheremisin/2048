import React from 'react';
import { observer } from 'mobx-react';
import styles from '../styles.module.scss';

type GameCellProps = {
  value: number;
  row: number,
  column: number,
  bgColor: string,
};
function GameCell(props: GameCellProps) {
  const {
    value,
    row,
    column,
    bgColor,
  } = props;

  return (
    <div
      className={styles.game_cell}
      style={{
        gridRow: row,
        gridColumn: column,
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
