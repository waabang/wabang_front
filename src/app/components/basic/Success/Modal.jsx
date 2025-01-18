import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
export default function SuccessModal({ type }) {
  return (
    <div className={styles.modalContainer}>
      {/* 배경 이미지 */}
      <Image
        src="/modalBackground.png"
        alt="modal"
        width={260}
        height={260}
        className={styles.modalBackground}
      />
      <Image
        src="/bitcoin.png"
        alt="coin"
        width={60}
        height={60}
        className={styles.Icon}
      />
      {/* 텍스트 */}
      <h2 className={styles.modalText}>성공!</h2>

      {/* 버튼 */}
      <Link href="/" className={styles.buttonLink}>
        <Image src="/button.svg" alt="button" width={70} height={70} />
        <p className={styles.buttonText}>확인</p>
      </Link>
    </div>
  );
}
