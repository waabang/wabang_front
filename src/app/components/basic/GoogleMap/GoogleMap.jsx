"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { locations } from "./constants";
import Modal from "../Modal/Modal";
import Searchbar from "../SearchBar/SearchBar";

export default function GoogleMap() {
  // 모달 상태: open 상태와 모달 타입 저장
  const [modalData, setModalData] = useState({ open: false, type: null });

  useEffect(() => {
    // Google Maps API 스크립트 추가
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=maps,marker&v=beta`;
    script.async = true;
    document.head.appendChild(script);

    // 전역 콜백 함수 선언
    window.initMap = function () {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.12150192260742, lng: -100.45039367675781 },
        zoom: 17,
        mapId: "DEMO_MAP_ID",
        mapTypeControl: false, // Remove "지도/위성" buttons
        fullscreenControl: false,
      });

      // 사용자의 현재 위치 표시 (geolocation)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            map.setCenter(pos);
            new google.maps.marker.AdvancedMarkerView({
              map,
              position: pos,
              title: "Your location",
            });
          },
          () => {
            handleLocationError(true, map.getCenter());
          }
        );
      } else {
        handleLocationError(false, map.getCenter());
      }

      // locations 배열의 각 위치에 마커 추가
      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map,
          title: location.name,
          icon: location.type === "box" ? "/chest.png" : "/question.png",
        });

        // 마커 클릭 시 해당 타입의 모달 열기
        marker.addListener("click", () => {
          setModalData({ open: true, type: location.type });
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
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(document.getElementById("map"));
    }

    // 컴포넌트 언마운트 시 스크립트 정리
    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <div id="map" style={{ height: "92vh", width: "100%" }}></div>
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
