import { makeAutoObservable } from 'mobx';
import { GameCellData } from './types';
import CELLS_COUNT from '../App/constants';

class GameStore {
  private cellsData: GameCellData[];

  constructor() {
    this.cellsData = [];
    makeAutoObservable(this);
  }

  initCellsData(cellsCount: number): void {
    for (let i = 0; i < cellsCount; i += 1) {
      const cellData: GameCellData = {
        id: i,
        value: 0,
        color: 'rgba(22, 22, 23, 0.64)',
      };

      this.cellsData.push(cellData);
    }
  }

  getCellsData(): GameCellData[] {
    return this.cellsData;
  }
}

const gameStore = new GameStore();

gameStore.initCellsData(CELLS_COUNT);
export default gameStore;
