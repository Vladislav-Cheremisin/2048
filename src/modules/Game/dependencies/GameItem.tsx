import React from 'react';
import { observer } from 'mobx-react';
import styles from '../styles.module.scss';

type GameItemProps = {
  value: number;
};
function GameItem({ value }: GameItemProps) {
  /**
   * Определить background-color для ячейки в зависимости от её value.
   * @param currentValue текущее значение ячейки.
   */
  const getColor = (currentValue: number): string => {
    switch (currentValue) {
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
  };

  return (
    <div
      className={styles.game_item}
      style={{
        backgroundColor: getColor(value),
      }}
    >
      <span>{ value }</span>
    </div>
  );
}

export default observer(GameItem);
