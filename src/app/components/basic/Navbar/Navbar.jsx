"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  const isHomeActive = !(
    pathname.includes("reward") || pathname.includes("mypage")
  );
  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.navItem}>
        <Image
          src="/home.svg"
          alt="Home Icon"
          width={25}
          height={25}
          className={
            isHomeActive ? styles.navItemIconActive : styles.navItemIcon
          } // 홈 아이콘 활성화 여부
        />
        <p
          className={
            isHomeActive ? styles.navItemTextActive : styles.navItemText
          }
        >
          홈
        </p>
      </Link>
      <Link href="/reward" className={styles.navItem}>
        <Image
          src="/coin.svg"
          alt="Coin Icon"
          width={25}
          height={25}
          className={
            pathname.includes("reward")
              ? styles.navItemIconActive // 활성화 상태 아이콘
              : styles.navItemIcon // 비활성화 상태 아이콘
          }
        />
        <p
          className={
            pathname.includes("reward")
              ? styles.navItemTextActive // 활성화 상태 텍스트
              : styles.navItemText // 비활성화 상태 텍스트
          }
        >
          리워드
        </p>
      </Link>
      <Link href="/mypage" className={styles.navItem}>
        <Image
          src="/user.svg"
          alt="User Icon"
          width={25}
          height={25}
          className={
            pathname.includes("mypage")
              ? styles.navItemIconActive // 활성화 상태 아이콘
              : styles.navItemIcon // 비활성화 상태 아이콘
          }
        />
        <p
          className={
            pathname.includes("mypage")
              ? styles.navItemTextActive // 활성화 상태 텍스트
              : styles.navItemText // 비활성화 상태 텍스트
          }
        >
          마이페이지
        </p>
      </Link>
    </div>
  );
}
