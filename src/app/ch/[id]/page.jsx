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
    <div>
      <h1>이름</h1>
      <h3>주소</h3>
      <p>퀘스트</p>
      <input />
    </div>
  );
}
