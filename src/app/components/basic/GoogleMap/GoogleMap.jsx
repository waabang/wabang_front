'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './index.module.css';
import { locations } from './constants';
import Modal from '../Modal/Modal';
import Searchbar from '../SearchBar/SearchBar';

// googleMapsPromise: 전역 변수로 Google Maps API 로딩을 위한 Promise를 저장합니다.
let googleMapsPromise;

/**
 * Google Maps API 스크립트를 한 번만 로드하기 위한 헬퍼 함수.
 * 이미 로드 중이거나 로드되었다면 기존 Promise를 반환합니다.
 */
function loadGoogleMaps(apiKey) {
  if (!googleMapsPromise) {
    googleMapsPromise = new Promise((resolve, reject) => {
      // 전역 콜백 함수로 API 로딩 완료 시 resolve 호출
      window.initMap = function () {
        resolve(window.google.maps);
      };

      // 스크립트 엘리먼트 생성 및 추가
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=maps,marker&v=beta`;
      script.async = true;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return googleMapsPromise;
}

/**
 * 위도, 경도를 받아 두 지점 사이의 거리를 킬로미터 단위로 반환하는 함수 (Haversine 공식 이용)
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // 지구 반지름 (킬로미터)
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default function GoogleMap() {
  // 모달 상태: open 상태와 모달 타입 저장
  const [modalData, setModalData] = useState({ open: false, type: null });

  // 맵 인스턴스와 사용자 위치를 useRef로 저장
  const mapRef = useRef(null);
  const userCoordinatesRef = useRef(null);

  // 현재 위치로 이동하는 핸들러 함수
  const handleCenterOnUser = () => {
    if (mapRef.current && userCoordinatesRef.current) {
      mapRef.current.setCenter(userCoordinatesRef.current);
    } else {
      alert('사용자 위치를 확인 중입니다. 잠시 후 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    // Google Maps API를 로드한 후 맵 초기화
    loadGoogleMaps(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
      .then(maps => {
        const mapElement = document.getElementById('map');
        // 대한민국 범위로 제한하기 위한 LatLngBounds 생성
        const allowedBounds = new maps.LatLngBounds(
          new maps.LatLng(33.0, 124.0), // 남서쪽 모서리
          new maps.LatLng(39.0, 132.0), // 북동쪽 모서리
        );

        const map = new maps.Map(mapElement, {
          center: { lat: 37.5665, lng: 126.978 }, // 서울 중심
          zoom: 17,
          mapId: 'DEMO_MAP_ID',
          mapTypeControl: false, // "지도/위성" 버튼 제거
          fullscreenControl: false,
          // 지도 이동 범위를 대한민국으로 제한
          restriction: {
            latLngBounds: allowedBounds,
            strictBounds: true,
          },
        });
        // 맵 인스턴스를 저장
        mapRef.current = map;

        // 위치 정보 오류 처리 함수 (맵 생성 이후 내부에서 사용)
        function handleLocationError(browserHasGeolocation, pos) {
          const infoWindow = new google.maps.InfoWindow({
            position: pos,
          });
          infoWindow.setContent(
            browserHasGeolocation
              ? 'Error: The Geolocation service failed.'
              : "Error: Your browser doesn't support geolocation.",
          );
          infoWindow.open(mapElement);
        }

        // 사용자의 현재 위치 표시 (geolocation)
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              // 사용자 현재 위치를 저장
              userCoordinatesRef.current = pos;

              // 맵 중심 변경 및 현재 위치에 마커 추가
              map.setCenter(pos);
              new google.maps.marker.AdvancedMarkerView({
                map,
                position: pos,
                title: 'Your location',
              });
            },
            () => {
              handleLocationError(true, map.getCenter());
            },
          );
        } else {
          handleLocationError(false, map.getCenter());
        }

        // locations 배열의 각 위치에 마커 추가
        locations.forEach(location => {
          const marker = new google.maps.Marker({
            position: { lat: location.latitude, lng: location.longitude },
            map,
            title: location.name,
            icon: location.type === 'box' ? '/chest.png' : '/question.png',
          });

          // 마커 클릭 시 현재 위치와의 거리를 계산하여 1km 이하일 때만 모달 열기
          marker.addListener('click', () => {
            if (!userCoordinatesRef.current) {
              alert('현재 위치를 확인 중입니다. 잠시 후 다시 시도해주세요.');
              return;
            }
            const distance = calculateDistance(
              userCoordinatesRef.current.lat,
              userCoordinatesRef.current.lng,
              location.latitude,
              location.longitude,
            );
            if (distance <= 1) {
              // 1km 이내이면 모달 열기
              setModalData({ open: true, type: location.type });
            } else {
              // 1km 초과이면 접근 불가 alert
              alert('현재 위치로부터 1km 이내의 위치만 접근 가능합니다.');
            }
          });
        });
      })
      .catch(err => {
        console.error('Google Maps API 로딩 실패', err);
      });

    // cleanup에서는 스크립트를 제거하지 않습니다.
    // (스크립트는 한 번만 로드되어 여러 컴포넌트 전환 시 재사용)
    return () => {
      delete window.initMap;
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        {/* 맵이 렌더링될 div (스타일로 높이 및 너비 지정) */}
        <div id="map" style={{ height: '92vh', width: '100%' }}></div>
        {/* 현재 위치로 이동하는 버튼 */}
        <button
          onClick={handleCenterOnUser}
          style={{
            position: 'absolute',
            top: '70px',
            left: '20px',
            zIndex: 1000,
            padding: '10px 20px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          현재 위치로 이동
        </button>
        {/* 모달 열림 상태에 따라 모달 렌더링 */}
        {modalData.open && (
          <Modal
            type={modalData.type}
            onClose={() => setModalData({ ...modalData, open: false })}
          />
        )}
        <Searchbar />
      </div>
    </div>
  );
}
