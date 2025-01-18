'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './index.module.css';
import { locations } from './constants';
import Modal from '../Modal/Modal';
import Searchbar from '../SearchBar/SearchBar';

let googleMapsPromise;

function loadGoogleMaps(apiKey) {
  if (!googleMapsPromise) {
    googleMapsPromise = new Promise((resolve, reject) => {
      window.initMap = function () {
        resolve(window.google.maps);
      };

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=maps,marker&v=beta`;
      script.async = true;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return googleMapsPromise;
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
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
  const [modalData, setModalData] = useState({ open: false, type: null });
  const mapRef = useRef(null);
  const userCoordinatesRef = useRef(null);

  const handleCenterOnUser = () => {
    if (mapRef.current && userCoordinatesRef.current) {
      mapRef.current.setCenter(userCoordinatesRef.current);
      mapRef.current.setZoom(16);
    } else {
      alert('사용자 위치를 확인 중입니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleLocationChange = ({ latitude, longitude }) => {
    if (mapRef.current) {
      mapRef.current.setCenter({ lat: latitude, lng: longitude });
      mapRef.current.setZoom(14);
      console.log(`지도 중심 변경: 위도 ${latitude}, 경도 ${longitude}`);
    }
  };

  useEffect(() => {
    loadGoogleMaps(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
      .then(maps => {
        const mapElement = document.getElementById('map');
        const allowedBounds = new maps.LatLngBounds(
          new maps.LatLng(33.0, 124.0),
          new maps.LatLng(39.0, 132.0),
        );

        const map = new maps.Map(mapElement, {
          center: { lat: 37.5665, lng: 126.978 },
          zoom: 17,
          mapId: 'DEMO_MAP_ID',
          mapTypeControl: false,
          fullscreenControl: false,
          restriction: {
            latLngBounds: allowedBounds,
            strictBounds: true,
          },
        });
        mapRef.current = map;

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              userCoordinatesRef.current = pos;
              map.setCenter(pos);
              new google.maps.marker.AdvancedMarkerView({
                map,
                position: pos,
                title: 'Your location',
              });
            },
            () => {
              console.log('위치 정보 가져오기 실패');
            },
          );
        }
      })
      .catch(err => {
        console.error('Google Maps API 로딩 실패', err);
      });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <div id="map" style={{ height: '92vh', width: '100%' }}></div>
        <button
          onClick={handleCenterOnUser}
          style={{
            position: 'absolute',
            top: '70px',
            left: '20px',
            padding: '10px 20px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          현재 위치로 이동
        </button>
        {modalData.open && (
          <Modal
            type={modalData.type}
            onClose={() => setModalData({ ...modalData, open: false })}
          />
        )}
        <Searchbar onLocationChange={handleLocationChange} />
      </div>
    </div>
  );
}
