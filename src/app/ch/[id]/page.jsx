"use client";
import Image from "next/image";
import styles from "./index.module.css";
import SuccessModal from "../../components/basic/Success/Modal";
import { useState, useEffect, useRef } from "react";

export default function Page() {
  const imgRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // 사진이 일치하는 지 검사
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      console.log(preview);
    }
  };
  const handleDivClick = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "93vh",
        maxWidth: "800px",
        margin: "0 auto",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        backgroundColor: "#DCC7AF",
      }}
    >
      <Image
        src="/modalBackground.png"
        alt="modal"
        width={260}
        height={260}
        className={styles.modalBackground}
      />
      <Image
        src="/chest.svg"
        alt="chest"
        width={80}
        height={80}
        className={styles.Icon}
      />
      <h1 style={{ fontSize: "40px", zIndex: "1", marginTop: "5px" }}>
        퀘스트
      </h1>
      <p style={{ zIndex: "1", fontSize: "18px", margin: "0" }}>
        경복궁 사진을 찍어주세요
      </p>
      <div
        style={{
          border: "1px solid black",
          width: "270px",
          height: "270px",
          zIndex: "1",
          marginTop: "30px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "2px solid gray",
        }}
        onClick={handleDivClick}
      >
        <Image
          src="/dog.jpg"
          alt="Example"
          width={270}
          height={270}
          style={{ objectFit: "cover" }}
        />
      </div>

      <input
        ref={imgRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className={styles.buttonLink} onClick={handleDivClick}>
        <Image src="/button.png" alt="button" width={130} height={60} />
        <p className={styles.buttonText}>인증하기</p>
      </div>

      {isCorrect === true && (
        <div className={styles.overlay}>
          <SuccessModal />
        </div>
      )}
      {isCorrect === false && (
        <div className={styles.overlay}>
          <FailModal onClose={() => setIsCorrect(undefined)} />
        </div>
      )}
    </div>
  );
}
