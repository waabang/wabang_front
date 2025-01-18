export interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'box' | 'question';
}

export const locations: Location[] = [
  {
    name: '건국대학교 상허기념도서관',
    address: '서울특별시 광진구 능동로 120',
    latitude: 37.540705,
    longitude: 127.073617,
    type: 'box',
  },
  {
    name: '건국대학교 새천년관',
    address: '서울특별시 광진구 능동로 120',
    latitude: 37.541123,
    longitude: 127.073456,
    type: 'box',
  },
  {
    name: '건국대학교 법학관',
    address: '서울특별시 광진구 능동로 120',
    latitude: 37.541789,
    longitude: 127.074321,
    type: 'box',
  },
  {
    name: '건국대학교 경영관',
    address: '서울특별시 광진구 능동로 120',
    latitude: 37.542345,
    longitude: 127.075678,
    type: 'box',
  },
  {
    name: '건국대학교 공학관',
    address: '서울특별시 광진구 능동로 120',
    latitude: 37.54321,
    longitude: 127.076543,
    type: 'box',
  },
  {
    name: '건국대학교 학생회관은 어디에 있나요?',
    address: '서울특별시 광진구 능동로 120',
    latitude: 37.544321,
    longitude: 127.077654,
    type: 'question',
  },
  {
    name: '건국대학교 예술관은 어디에 있나요?',
    address: '서울특별시 광진구 능동로 120',
    latitude: 37.545432,
    longitude: 127.078765,
    type: 'question',
  },
  {
    name: '건국대학교 체육관은 어디에 있나요?',
    address: '서울특별시 광진구 능동로 120',
    latitude: 37.546543,
    longitude: 127.079876,
    type: 'question',
  },
  {
    name: '건국대학교 산학협력관은 어디에 있나요?',
    address: '서울특별시 광진구 능동로 120',
    latitude: 37.547654,
    longitude: 127.080987,
    type: 'question',
  },
  {
    name: '건국대학교 기숙사는 어디에 있나요?',
    address: '서울특별시 광진구 능동로 120',
    latitude: 37.548765,
    longitude: 127.082098,
    type: 'question',
  },
];
