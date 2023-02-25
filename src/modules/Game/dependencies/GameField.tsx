import React from 'react';
import { observer } from 'mobx-react';
import GameCell from './GameCell';
import GameStore from '../GameStore';
import styles from '../styles.module.scss';
import { GameCellData } from '../types';

type GameFieldProps = {
  rowSize: number,
  cellData: GameCellData[],
};

function GameField({ rowSize, cellData }: GameFieldProps) {
  return (
    <div
      className={styles.game}
      style={{
        gridTemplateRows: `repeat(${rowSize}, 1fr)`,
        gridTemplateColumns: `repeat(${rowSize}, 1fr)`,
      }}
    >
      {
        cellData.map((data) => (
          <GameCell
            value={data.value}
            row={data.row}
            column={data.column}
            bgColor={GameStore.getColor(data.value)}
            key={data.id}
          />
        ))
      }
    </div>
  );
}

export default observer(GameField);
