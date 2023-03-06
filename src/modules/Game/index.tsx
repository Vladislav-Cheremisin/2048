import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import GameStore from './GameStore';
import GameField from './dependencies/GameField';
import GameScore from './dependencies/GameScore';

function Game() {
  const store = useMemo(() => new GameStore(), []);
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
      store.makeMove('right');
    }

    if (xDiff > yDiff && xCoords > newXCoords) {
      store.makeMove('left');
    }

    if (yDiff > xDiff && newYCoords > yCoords) {
      store.makeMove('down');
    }

    if (yDiff > xDiff && yCoords > newYCoords) {
      store.makeMove('up');
    }
  };

  /**
   * Слушатель для event keydown.
   * @param keyCode event.code.
   */
  const onKeyDown = (keyCode: string) => {
    if (keyCode === 'ArrowRight') {
      store.makeMove('right');
    }

    if (keyCode === 'ArrowLeft') {
      store.makeMove('left');
    }

    if (keyCode === 'ArrowDown') {
      store.makeMove('down');
    }

    if (keyCode === 'ArrowUp') {
      store.makeMove('up');
    }
  };

  useEffect(() => {
    store.startGame();

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      onKeyDown(event.code);
    });

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
  }, []);

  return (
    <>
      <GameField
        rowSize={store.getRowSize()}
        cellData={store.getCellData()}
      />
      <GameScore score={store.getScore()} />
    </>
  );
}

export default observer(Game);
