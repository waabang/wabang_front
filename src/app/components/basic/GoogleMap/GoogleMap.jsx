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

export default function GoogleMap() {
  const [modalData, setModalData] = useState({ open: false, type: null });
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);

  const handleCenterOnUser = () => {
    if (mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          mapRef.current.setCenter(userPos);
          mapRef.current.setZoom(16);

          if (userMarkerRef.current) {
            userMarkerRef.current.setPosition(userPos);
          } else {
            userMarkerRef.current = new google.maps.Marker({
              position: userPos,
              map: mapRef.current,
              title: 'Your Location',
            });
          }
        },
        () => {
          alert('현재 위치를 가져올 수 없습니다.');
        },
      );
    }
  };

  const handleLocationChange = ({ latitude, longitude }) => {
    if (mapRef.current) {
      mapRef.current.setCenter({ lat: latitude, lng: longitude });
      mapRef.current.setZoom(16);
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

        locations.slice(0, 10).forEach(location => {
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
      })
      .catch(err => {
        console.error('Google Maps API 로딩 실패', err);
      });

    return () => {
      delete window.initMap;
    };
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
