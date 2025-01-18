'use client';

import { useEffect, useState } from 'react';
import GoogleMap from './components/basic/GoogleMap/GoogleMap';

export default function Home() {
  const [showLoading, setShowLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const lastShownTime = localStorage.getItem('lastLoadingTime');
    const currentTime = new Date().getTime();

    // 20분 = 20 * 60 * 1000 ms
    if (
      !lastShownTime ||
      currentTime - parseInt(lastShownTime, 10) > 20 * 60 * 1000
    ) {
      setShowLoading(true);

      // 저장 현재 시간
      localStorage.setItem('lastLoadingTime', currentTime);

      setTimeout(() => {
        setFadeOut(true);

        // fade-out 애니메이션이 끝난 후 로딩 화면 숨기기
        setTimeout(() => {
          setShowLoading(false);
          window.location.reload();
        }, 1000); // fade-out 애니메이션 지속 시간 (1초)
      }, 2500); // 로딩 화면 표시 시간
    }
  }, []);

  return (
    <div>
      {showLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backgroundColor: 'rgb(255, 255, 255)',
            opacity: fadeOut ? 0 : 1, // fade-out 효과
            transition: 'opacity 1s ease', // 애니메이션 속성
          }}
        >
          <div
            style={{
              maxWidth: '800px',
              width: '100%',
              margin: '0 auto',
            }}
          >
            <img
              src="start.png"
              alt="Loading"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover', // 이미지를 화면에 꽉 채우기
              }}
            />
          </div>
        </div>
      )}
      {!showLoading && <GoogleMap />}
    </div>
  );
}
