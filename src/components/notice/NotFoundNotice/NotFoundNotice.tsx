import styles from './NotFoundNotice.module.css';

function NotFoundNotice() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.description}>공고 목록이 존재하지 않아요.</p>
    </div>
  );
}

export default NotFoundNotice;
