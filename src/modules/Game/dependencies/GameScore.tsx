import React from 'react';
import { observer } from 'mobx-react';
import styles from '../styles.module.scss';

type GameScoreProps = {
  score: number;
};
function GameScore({ score }: GameScoreProps) {
  return (
    <span className={styles.score}>
      Score:
      {score}
    </span>
  );
}

export default observer(GameScore);
