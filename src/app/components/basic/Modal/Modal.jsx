import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
export default function Modal({ type }) {
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

      {/* 텍스트 */}
      <p className={styles.modalText}>
        You got level 12! Take your reward, hero!
      </p>

      {type === "chest" ? (
        // 상자(chest) 이미지
        <Image
          src="/chest.svg"
          alt="chest"
          width={60}
          height={60}
          className={styles.chestIcon}
        />
      ) : (
        // 물음표(question) 이미지
        <Image
          src="/question.svg"
          alt="question"
          width={60}
          height={60}
          className={styles.chestIcon}
        />
      )}

      {/* 버튼 */}
      <Link href="/" className={styles.buttonLink}>
        <Image src="/button.svg" alt="button" width={70} height={70} />
        <p className={styles.buttonText}>Open!</p>
      </Link>
    </div>
  );
}
