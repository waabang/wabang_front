"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { usePathname } from "next/navigation";
export default function FailModal({ onClose }) {
  const pathname = usePathname();
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
        src="/fail.png"
        alt="fail"
        width={60}
        height={60}
        className={styles.Icon}
      />
      {/* 텍스트 */}
      <h2 className={styles.modalText}>실패</h2>

      {/* 버튼 */}
      <div className={styles.buttonLink} onClick={onClose}>
        <Image src="/button.svg" alt="button" width={70} height={70} />
        <p className={styles.buttonText}>확인</p>
      </div>
    </div>
  );
}
