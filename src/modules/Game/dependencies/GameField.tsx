import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import GameCell from './GameCell';
import GameStore from '../GameStore';
import styles from '../styles.module.scss';
import { GameCellData, MoveDirections } from '../types';

type GameFieldProps = {
  rowSize: number,
  cellData: GameCellData[],
  makeMove(direction: MoveDirections): void,
};

function GameField({ rowSize, cellData, makeMove }: GameFieldProps) {
  const gameField = useRef<HTMLDivElement>(null);
  let xCoords = 0;
  let yCoords = 0;

  /**
   * Слушатель для pointerdown.
   */
  const onPointerDown = (event: PointerEvent) => {
    xCoords = event.x;
    yCoords = event.y;
  };

  /**
   * Слушатель для pointerup.
   */
  const onPointerUp = (event: PointerEvent) => {
    const newXCoords = event.x;
    const newYCoords = event.y;
    let xDiff;
    let yDiff;

    if (newXCoords > xCoords) {
      xDiff = newXCoords - xCoords;
    } else {
      xDiff = xCoords - newXCoords;
    }

    if (newYCoords > yCoords) {
      yDiff = newYCoords - yCoords;
    } else {
      yDiff = yCoords - newYCoords;
    }

    if (xDiff > yDiff && newXCoords > xCoords) {
      makeMove('right');
    }

    if (xDiff > yDiff && xCoords > newXCoords) {
      makeMove('left');
    }

    if (yDiff > xDiff && newYCoords > yCoords) {
      makeMove('down');
    }

    if (yDiff > xDiff && yCoords > newYCoords) {
      makeMove('up');
    }
  };

  useEffect(() => {
    if (gameField.current) {
      gameField.current.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointerup', onPointerUp);
    }
  }, []);

  return (
    <div
      ref={gameField}
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
            bgColor={GameStore.getColor(data.value)}
            key={data.id}
          />
        ))
      }
    </div>
  );
}

export default observer(GameField);
