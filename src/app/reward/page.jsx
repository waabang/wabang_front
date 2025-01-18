'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from './index.module.css';
import { tabData } from './constants';
import PurchaseModal from '../components/basic/Purchase/Purchase';

function Reward() {
  // 기본 활성 탭은 '쇼핑'
  const [activeTab, setActiveTab] = useState('쇼핑');
  const [isCorrect, setIsCorrect] = useState(null);
  const [userPoints, setUserPoints] = useState(0); // 사용자 포인트 상태

  useEffect(() => {
    // API 호출
    const fetchUserPoints = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/points`,
        );
        console.log('API 응답:', response.data);
        setUserPoints(response.data.payload.totalPoint); // 적절한 데이터 키 확인 후 업데이트
      } catch (error) {
        console.error('API 호출 실패:', error);
      }
    };

    fetchUserPoints();
  }, []);

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  const handleItemClick = () => {
    setIsCorrect(true);
    console.log(isCorrect);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.title}>리워드</div>
          <div className={styles.rewardContainer}>
            <Image src="/coin.svg" width={25} height={25} alt="coin" />
            <div className={styles.reward}>{userPoints}</div>
          </div>
        </div>

        <div className={styles.tContainer}>
          <div className={styles.tabContainer}>
            {Object.keys(tabData).map((tab, index) => (
              <div
                key={index}
                className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.content_list}>
        {tabData[activeTab].map(item => (
          <div key={item.id} className={styles.item} onClick={handleItemClick}>
            <div className={styles.thumbnail}>
              <Image
                src={item.thumbnail}
                width={50}
                height={50}
                alt="thumbnail"
              />
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {isCorrect === true && (
        <div className={styles.overlay}>
          <PurchaseModal onClose={() => setIsCorrect(undefined)} />
        </div>
      )}
    </div>
  );
}

export default Reward;
