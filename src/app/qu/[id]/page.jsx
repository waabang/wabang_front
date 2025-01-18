'use client';
import Image from 'next/image';
import styles from './index.module.css';
import { useState, useEffect } from 'react';
import SuccessModal from '../../components/basic/Success/Modal';
import FailModal from '../../components/basic/Fail/Modal';
// 퀘스트
export default function Page() {
  const [text, setText] = useState('');
  const [isCorrect, setIsCorrect] = useState();
  const answer = '31호';
  const handleClick = () => {
    if (text.trim() === answer) {
      console.log('정답');
      setIsCorrect(true);
    } else {
      console.log('실패');
      setIsCorrect(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '93vh',
        maxWidth: '800px',
        margin: '0 auto',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#DCC7AF',
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
      <h1 style={{ fontSize: '40px', zIndex: '1' }}>퀴즈</h1>
      <h3 style={{ marginTop: '0px', zIndex: '1', fontSize: '20px' }}>
        🤔 첨성대는 대한민국 국보 제 몇 호일까요?
      </h3>
      <input
        onChange={e => setText(e.target.value)}
        value={text}
        style={{
          border: '1px solid black',
          borderRadius: '5px',
          width: '65%',
          height: '40px',
          padding: '3px 15px',
          marginTop: '10px',
          marginBottom: '20px',
          zIndex: '1',
        }}
        placeholder="답을 입력해주세요"
      />

      <div className={styles.buttonLink} onClick={handleClick}>
        <Image src="/button.png" alt="button" width={100} height={50} />
        <p className={styles.buttonText}>확인</p>
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
