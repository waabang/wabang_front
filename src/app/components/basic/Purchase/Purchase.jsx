"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
export default function PurchaseModal({ onClose }) {
  const [text, setText] = useState("");
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
      <h2 className={styles.modalText}>구매 성공!</h2>

      {/* 버튼 */}
      <div className={styles.buttonLink} onClick={onClose}>
        <Image src="/button.svg" alt="button" width={70} height={70} />
        <p className={styles.buttonText}>확인</p>
      </div>
    </div>
  );
}
