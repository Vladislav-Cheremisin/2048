import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import GameStore from './GameStore';
import GameField from './dependencies/GameField';

function Game() {
  const store = new GameStore();

  useEffect(() => {
    store.fillEmptyCell();

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      store.moveOnKey(event.code);
    });
  }, []);

  return (
    <GameField
      rowSize={store.getRowSize()}
      cellData={store.getCellData()}
    />
  );
}

export default observer(Game);
