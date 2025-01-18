import Image from 'next/image';
import styles from './index.module.css';
import { resultData } from './constants';

export default function Mypage() {
  const summary = resultData[0];
  const list = resultData.slice(1);

  return (
    <div className={styles.container}>
      <div className={styles.mypage_title}>와방 성과</div>
      <div className={styles.mypage_content}>
        <div className={styles.mypage_block}>
          <div className={styles.mypage_result}>{summary.region}</div>
          <div className={styles.mypage_text}>지역</div>
        </div>
        <div className={styles.hr}></div>
        <div className={styles.mypage_block}>
          <div className={styles.mypage_result}>{summary.success}</div>
          <div className={styles.mypage_text}>성공</div>
        </div>
        <div className={styles.hr}></div>
        <div className={styles.mypage_block}>
          <div className={styles.mypage_result}>{summary.fail}</div>
          <div className={styles.mypage_text}>실패</div>
        </div>
      </div>
      <div>
        <div className={styles.mypage_list_container}>
          {list.map((item, index) => (
            <div key={index} className={styles.mypage_list}>
              <div className={styles.mypage_list_thumbnail}>
                <Image
                  src={item.thumbnail}
                  width={100}
                  height={100}
                  alt="thumbnail"
                />
              </div>
              <div className={styles.mypage_list_text_container}>
                <div className={styles.mypage_list_title}>{item.name}</div>
                <div className={styles.mypage_address}>{item.address}</div>
                <div className={styles.mypage_list_result}>
                  <div className={styles.mypage_list_text}>성공</div>
                  <Image
                    src={'/chest.svg'}
                    width={30}
                    height={30}
                    alt="thumbnail"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
