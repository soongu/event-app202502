import styles from './ProgressBar.module.scss';

const ProgressBar = () => {
  return (
    <div className={styles.progressBar}>
      <div className={styles.progress} />
    </div>
  );
};

export default ProgressBar;
