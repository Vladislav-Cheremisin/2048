import React from 'react';
import { observer } from 'mobx-react';
import gameStore from './GameStore';
import styles from './styles.module.scss';
import { GameCellData } from './types';
import GameCell from './dependencies/GameCell';

function GameField() {
  const cellsData: GameCellData[] = gameStore.getCellsData();

  const createCellsElements = (renderData: GameCellData[]): JSX.Element[] => {
    const result: JSX.Element[] = [];

    renderData.forEach((data: GameCellData): void => {
      result.push(<GameCell key={data.id} />);
    });

    return result;
  };

  return (
    <div className={styles.game_field}>
      { ...createCellsElements(cellsData) }
    </div>
  );
}
export default observer(GameField);
