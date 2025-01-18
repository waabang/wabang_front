'use client';

import styles from './index.module.css';
import { useEffect } from 'react';
import { locations } from './constants';

export default function GoogleMap() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=maps,marker&v=beta`;
    script.async = true;
    document.head.appendChild(script);

    // 전역의 initMap 콜백 함수 선언
    window.initMap = function () {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.12150192260742, lng: -100.45039367675781 },
        zoom: 17,
        mapId: 'DEMO_MAP_ID',
      });

      // 사용자 위치 가져오기 (geolocation)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

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
        new google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map,
          title: location.name,
          icon: location.type === 'box' ? '/chest.png' : 'question.png',
        });
      });
    };

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
      infoWindow.open(document.getElementById('map'));
    }

    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <div id="map" style={{ height: '100vh', width: '100%' }}></div>
      </div>
    </div>
  );
}
