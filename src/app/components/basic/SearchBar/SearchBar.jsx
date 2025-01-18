'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Searchbar({ onLocationChange }) {
  const [text, setText] = useState('');

  const handleSearch = () => {
    if (text === '경주시') {
      // 경주시의 위도와 경도
      const latitude = 35.8562;
      const longitude = 129.2247;

      console.log(`경주시로 이동: 위도 ${latitude}, 경도 ${longitude}`);

      // 부모 컴포넌트에 위치 변경 전달
      onLocationChange({ latitude, longitude });
    } else {
      console.log('경주시를 입력하지 않았습니다.');
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      style={{
        zIndex: '1',
        position: 'absolute',
        top: '12px',
        left: '21px',
        width: '90%',
        height: '50px',
      }}
    >
      <Image
        src="/search.svg"
        alt="search"
        width={26}
        height={26}
        style={{ position: 'absolute', top: '11px', left: '10px' }}
      />
      <input
        onChange={e => setText(e.target.value)}
        value={text}
        onKeyPress={handleKeyPress}
        style={{
          width: '100%',
          height: '100%',
          padding: '10px 45px',
          borderRadius: '10px',
          boxSizing: 'border-box',
        }}
        placeholder="지역을 검색해보세요"
      />
    </div>
  );
}
