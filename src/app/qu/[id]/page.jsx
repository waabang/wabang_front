"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { useState, useEffect } from "react";
import SuccessModal from "../../components/basic/Success/Modal";
// 퀘스트
export default function Page() {
  const [text, setText] = useState("");
  const [isCorrect, setIsCorrect] = useState();
  const answer = "제이";
  const handleClick = () => {
    if (text.trim() === answer) {
      console.log("정답");
      setIsCorrect(true);
    } else {
      console.log("실패");
      setIsCorrect(false);
    }
  };
  useEffect(() => {
    if (isCorrect === false) {
      const timer = setTimeout(() => {
        setIsCorrect(null);
      }, 2000); // 원하는 시간(밀리초) 지정
      return () => clearTimeout(timer);
    }
  }, [isCorrect]);
  return (
    <div
      style={{
        display: "flex",
        height: "780px",
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
        src="/question.svg"
        alt="question"
        width={80}
        height={80}
        className={styles.Icon}
      />
      <h1 style={{ fontSize: "40px", zIndex: "1" }}>퀴즈</h1>
      <h3 style={{ marginTop: "50px", zIndex: "1", fontSize: "20px" }}>
        당신의 이름은 무엇인가요?
      </h3>
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        style={{
          border: "1px solid black",
          borderRadius: "5px",
          width: "65%",
          height: "40px",
          padding: "3px 15px",
          marginTop: "100px",
          marginBottom: "20px",
          zIndex: "1",
        }}
        placeholder="답을 입력해주세요"
      />
      {isCorrect === false && (
        <p style={{ color: "red", zIndex: "1", margin: "0", fontSize: "17px" }}>
          {" "}
          틀렸어요!
        </p>
      )}
      <div className={styles.buttonLink} onClick={handleClick}>
        <Image src="/button.png" alt="button" width={100} height={50} />
        <p className={styles.buttonText}>확인</p>
      </div>

      {isCorrect === true && (
        <div className={styles.overlay}>
          <SuccessModal />
        </div>
      )}
      {/*  {isCorrect === false && (
        <div className={styles.overlay}>
          <FailModal />
        </div>
      )} */}
    </div>
  );
}
