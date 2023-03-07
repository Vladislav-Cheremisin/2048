import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { GameCellData, MoveDirections } from './types';

class GameStore {
  // Размер игрового поля по умолчанию.
  private static DEFAULT_ROW_SIZE = 4;

  private readonly rowSize: number;

  private readonly gameSize: number;

  private cellData: GameCellData[];

  private score: number;

  constructor() {
    this.rowSize = GameStore.DEFAULT_ROW_SIZE;
    this.gameSize = this.rowSize ** 2;
    this.cellData = [];
    this.score = 0;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /**
   * Получить максимальную длинну строки/столбца игрового поля.
   */
  public getRowSize(): number {
    return this.rowSize;
  }

  /**
   * Получить данные ячеек.
   */
  public getCellData(): GameCellData[] {
    return this.cellData;
  }

  /**
   * Получить пустые ячейки.
   * @private
   */
  private getEmptyCells() {
    return this.cellData.filter((cell) => cell.value === 0);
  }

  /**
   * Получить текущий счёт.
   */
  public getScore() {
    return this.score;
  }

  /**
   * Обновить текущий счёт.
   * @private
   */
  private updateScore() {
    this.score = this.cellData.reduce((acc: number, data: GameCellData) => acc + data.value, 0);
  }

  /**
   * Закончить игру, если нет возможностей для хода.
   * @private
   */
  private endGame() {
    const emptyCells = this.getEmptyCells();

    if (!emptyCells.length) {
      let isGameOver = true;

      this.cellData.forEach((data, index) => {
        if (
          ((index + 1) % this.rowSize !== 0
          && data.value === this.cellData[index + 1].value)
          || (index < (this.gameSize - this.rowSize)
          && data.value === this.cellData[index + this.rowSize].value)
        ) {
          isGameOver = false;
        }
      });

      if (isGameOver) {
        setTimeout(() => {
          const newCellData = this.createCellData();
          localStorage.setItem('GameCellData', JSON.stringify(newCellData));

          alert(`Game Over. Your score is ${this.score}`);

          this.cellData = newCellData;
          this.fillEmptyCell();
        }, 0);
      }
    }
  }

  /**
   * Сохранить данные ячеек в local storage.
   */
  private saveCellData(): void {
    localStorage.setItem('GameCellData', JSON.stringify(this.cellData));
  }

  /**
   * Заполнить одну из пустых ячеек (проставить value 2).
   */
  private fillEmptyCell(): void {
    const emptyCells = this.getEmptyCells();

    if (emptyCells.length) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);

      emptyCells[randomIndex].value = 2;

      this.updateScore();
      this.saveCellData();
    }
  }

  /**
   * Произвести ход.
   * @param direction Направление сдвига (left/right/up/down).
   * @param row Номер сдивгаемой row или column (служебный аргумент для рекурсии внутри функции).
   * @param needNewCell Нужно ли создать новую ячейку с значением 2.
   * (служебный аргумент, станет true в ходе рекурсии, если на поле произошли изменения).
   */
  public makeMove(
    direction: MoveDirections,
    row: number = 1,
    needNewCell = false,
  ): void {
    const startIndex = direction === 'left' || direction === 'right'
      ? this.rowSize * (row - 1)
      : row - 1;

    const endIndex = direction === 'left' || direction === 'right'
      ? (this.rowSize * row) - 1
      : startIndex + (this.rowSize * (this.rowSize - 1));

    const cycleIncrement = direction === 'left' || direction === 'right'
      ? 1
      : this.rowSize;

    const rowData: number[] = [];
    let somethingChanged = needNewCell;

    for (
      let i = direction === 'up' || direction === 'left'
        ? startIndex
        : endIndex;
      direction === 'up' || direction === 'left'
        ? i <= endIndex
        : i >= startIndex;
      direction === 'up' || direction === 'left'
        ? i += cycleIncrement
        : i -= cycleIncrement
    ) {
      if (this.cellData[i].value) {
        rowData.push(this.cellData[i].value);
      }
    }

    if (rowData.length) {
      for (
        let i = direction === 'up' || direction === 'left'
          ? startIndex
          : endIndex;
        direction === 'up' || direction === 'left'
          ? i <= endIndex
          : i >= startIndex;
        direction === 'up' || direction === 'left'
          ? i += cycleIncrement
          : i -= cycleIncrement
      ) {
        const prevValue = this.cellData[i].value;

        if (!rowData.length) {
          this.cellData[i].value = 0;
        }

        if (rowData[0] === rowData[1]) {
          rowData.shift();
          rowData[0] *= 2;
        }

        const valueToPush = rowData.shift();

        if (valueToPush) {
          this.cellData[i].value = valueToPush;
        }

        if (this.cellData[i].value !== prevValue) {
          somethingChanged = true;
        }
      }
    }

    if (row !== this.rowSize) {
      this.makeMove(direction, row + 1, somethingChanged);
    }

    if (row === this.rowSize && somethingChanged) {
      this.fillEmptyCell();
      this.endGame();
    }
  }

  /**
   * Создать данные ячеек.
   * @private
   */
  private createCellData(): GameCellData[] {
    const cellData: GameCellData[] = [];
    let column = 1;
    let row = 1;

    for (let i = 1; i <= this.gameSize; i += 1) {
      cellData.push({
        id: uuid(),
        value: 0,
        row,
        column,
      });

      column += 1;

      if (i % this.rowSize === 0) {
        column = 1;
        row += 1;
      }
    }

    return cellData;
  }

  /**
   * Получить данные ячеек из local storage.
   * Если данных нет - инициализируем их.
   */
  private loadCellData():GameCellData[] {
    const localData = localStorage.getItem('GameCellData');

    return localData ? JSON.parse((localData)) : this.createCellData();
  }

  /**
   * Начать игру.
   */
  public startGame() {
    this.cellData = this.loadCellData();

    this.updateScore();

    if (this.score === 0) {
      this.fillEmptyCell();
    }
  }

  /**
   * Определить background-color для ячейки в зависимости от её value.
   * @param value значение ячейки.
   */
  static getColor(value: number): string {
    switch (value) {
      case 0:
        return '#313131';
      case 2:
        return '#148F77';
      case 4:
        return '#117A65';
      case 8:
        return '#1E8449';
      case 16:
        return '#239B56';
      case 32:
        return '#B7950B';
      case 64:
        return '#B9770E';
      case 128:
        return '#AF601A';
      case 256:
        return '#A04000';
      case 512:
        return '#CB4335';
      case 1024:
        return '#B03A2E';
      case 2048:
        return '#ab3226';
      default:
        return '#c03528';
    }
  }
}

export default GameStore;
