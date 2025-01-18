import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { locations } from "../GoogleMap/constants";

export default function Modal({ type, onClose }) {
  const location = locations.find((loc) => loc.type === type);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src="/modalBackground.png"
          alt="modal background"
          width={260}
          height={260}
          className={styles.modalBackground}
        />
        <div className={styles.randMarkText}>{location.address}</div>
        <div className={styles.modalTitle}>{location.name}</div>
        <div className={styles.modalText}>
          {type === "box" ? (
            <div>
              상자를 찾았어요! <br /> 열어보고 보상을 받으세요
            </div>
          ) : (
            <div>
              물음표를 찾았어요! <br /> 열어보고 보상을 받으세요
            </div>
          )}
        </div>
        {/* 마커의 타입에 따른 아이콘 표시 */}
        {type === "box" ? (
          <Image
            src="/chest.svg"
            alt="chest"
            width={120}
            height={120}
            className={styles.chestIcon}
          />
        ) : (
          <Image
            src="/question.svg"
            alt="question"
            width={120}
            height={120}
            className={styles.chestIcon}
          />
        )}
        {/* 버튼 */}
        <Link
          href={type === "box" ? `/ch/${location.id}` : `/qu/${location.id}`}
          className={styles.buttonLink}
        >
          <Image src="/button.svg" alt="button" width={115} height={35} />
          <p className={styles.buttonText}>열기!</p>
        </Link>
      </div>
    </div>
  );
}
