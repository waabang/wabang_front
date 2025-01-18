import styles from './page.module.css';
import GoogleMap from './components/basic/GoogleMap/GoogleMap';

export default function Home() {
  return (
    <div className={styles.page}>
      <GoogleMap />
    </div>
  );
}
