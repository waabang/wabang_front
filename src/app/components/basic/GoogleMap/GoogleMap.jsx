'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './index.module.css';
import { locations } from './constants';
import Modal from '../Modal/Modal';

// 두 좌표 간의 거리를 미터 단위로 계산하는 헬퍼 함수 (Haversine 공식)
function calculateDistance(pos1, pos2) {
  const R = 6371000; // 지구 반지름 (미터)
  const toRad = angle => (angle * Math.PI) / 180;
  const deltaLat = toRad(pos2.lat - pos1.lat);
  const deltaLng = toRad(pos2.lng - pos1.lng);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRad(pos1.lat)) *
      Math.cos(toRad(pos2.lat)) *
      Math.sin(deltaLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function GoogleMap() {
  const [modalData, setModalData] = useState({ open: false, type: null });
  const currentLocationMarkerRef = useRef(null); // 내 위치 마커 저장
  const intervalIdRef = useRef(null); // setInterval의 id 저장
  const lastPositionRef = useRef(null); // 마지막 업데이트된 위치를 저장

  useEffect(() => {
    // Google Maps API 스크립트 URL (환경변수를 통해 API 키 전달)
    const GOOGLE_MAPS_SRC = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=places,marker&v=beta`;

    // Google Maps 초기화 함수
    function initMap() {
      // 초기 지도 설정 (예시 위치 지정)
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.12150192260742, lng: -100.45039367675781 },
        zoom: 17,
        mapId: 'DEMO_MAP_ID',
      });

      // 내 위치 업데이트 함수 (현재 위치 가져와서 적용)
      function updateCurrentLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              // 만약 이전 위치가 없거나, 현재 위치와의 변화 거리가 1m 이상인 경우에만 업데이트
              if (
                !lastPositionRef.current ||
                calculateDistance(lastPositionRef.current, pos) >= 1
              ) {
                console.log('현재 위치 업데이트:', pos);
                lastPositionRef.current = pos;

                // 지도 중심을 현재 위치로 업데이트
                map.setCenter(pos);

                // 내 위치 마커가 없으면 생성, 있으면 위치만 갱신
                if (!currentLocationMarkerRef.current) {
                  currentLocationMarkerRef.current = new google.maps.Marker({
                    map,
                    position: pos,
                    title: 'Your location',
                    // 필요하다면 custom icon 옵션 추가: icon: '/my-location-icon.png',
                  });
                } else {
                  currentLocationMarkerRef.current.setPosition(pos);
                }
              }
            },
            () => {
              handleLocationError(true, map.getCenter());
            },
            {
              enableHighAccuracy: true,
              maximumAge: 0,
            },
          );
        } else {
          handleLocationError(false, map.getCenter());
        }
      }

      // 위치 정보 오류 처리 함수
      function handleLocationError(browserHasGeolocation, pos) {
        const infoWindow = new google.maps.InfoWindow({
          position: pos,
        });
        infoWindow.setContent(
          browserHasGeolocation
            ? 'Error: The Geolocation service failed.'
            : "Error: Your browser doesn't support geolocation.",
        );
        infoWindow.open(map);
      }

      // 최초 내 위치 업데이트 (즉시 업데이트)
      updateCurrentLocation();

      // setInterval을 사용해 3초마다 현재 위치 업데이트
      intervalIdRef.current = setInterval(updateCurrentLocation, 3000);

      // locations 배열의 각 위치에 마커 추가
      locations.forEach(location => {
        const marker = new google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map,
          title: location.name,
          icon: location.type === 'box' ? '/chest.png' : '/question.png',
        });
        marker.addListener('click', () => {
          setModalData({ open: true, type: location.type });
        });
      });
    }

    // Google Maps API 스크립트 로드 및 초기화
    if (window.google && window.google.maps) {
      initMap();
    } else {
      // 스크립트가 아직 로드되지 않았다면 전역함수 window.initMap에 할당한 후 로드합니다.
      window.initMap = initMap;
      if (!document.querySelector(`script[src="${GOOGLE_MAPS_SRC}"]`)) {
        const script = document.createElement('script');
        script.src = GOOGLE_MAPS_SRC;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    }

    // cleanup: 컴포넌트 언마운트 시 위치 업데이트 인터벌 해제 및 전역 initMap 제거
    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
      delete window.initMap;
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <div id="map" style={{ height: '92vh', width: '100%' }}></div>
        {modalData.open && (
          <Modal
            type={modalData.type}
            onClose={() => setModalData({ ...modalData, open: false })}
          />
        )}
      </div>
    </div>
  );
}
