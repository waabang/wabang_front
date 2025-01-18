'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import { tabData } from './constants';

function Reward() {
  // 기본 활성 탭은 '쇼핑'
  const [activeTab, setActiveTab] = useState('쇼핑');

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.title}>리워드</div>
          <div className={styles.rewardContainer}>
            <Image src="/coin.svg" width={25} height={25} alt="coin" />
            <div className={styles.reward}>119</div>
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
          <div key={item.id} className={styles.item}>
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
    </div>
  );
}

export default Reward;
