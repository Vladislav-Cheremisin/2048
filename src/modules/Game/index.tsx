import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import GameStore from './GameStore';
import GameField from './dependencies/GameField';
import GameScore from './dependencies/GameScore';

function Game() {
  const store = useMemo(() => new GameStore(), []);

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
  }, []);

  return (
    <>
      <GameField
        rowSize={store.getRowSize()}
        cellData={store.getCellData()}
        makeMove={store.makeMove}
      />
      <GameScore score={store.getScore()} />
    </>
  );
}

export default observer(Game);
