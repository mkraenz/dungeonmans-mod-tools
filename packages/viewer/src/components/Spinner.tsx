import { FC } from 'react';
import styles from './spinner.module.css';

type Props = {
  enabled: boolean;
};

const Spinner: FC<Props> = ({ enabled }) => {
  if (!enabled) return null;
  return (
    <div className={styles.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
