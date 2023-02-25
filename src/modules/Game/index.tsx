import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import GameStore from './GameStore';
import GameField from './dependencies/GameField';
import GameScore from './dependencies/GameScore';

function Game() {
  const store = useMemo(() => new GameStore(), []);

  useEffect(() => {
    store.fillEmptyCell();

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      store.moveOnKey(event.code);
    });
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
