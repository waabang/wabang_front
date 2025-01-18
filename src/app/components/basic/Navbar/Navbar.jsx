"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { useState } from "react";
export default function Navbar() {
  const [selected, setSelected] = useState(false);

  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.navItem}>
        <Image
          src="/home.svg"
          alt="Home Icon"
          width={25}
          height={25}
          className={styles.navItemIcon}
        />
        <p className={styles.navItemText}>홈</p>
      </Link>
      <Link href="/reward" className={styles.navItem}>
        <Image
          src="/coin.svg"
          alt="Coin Icon"
          width={25}
          height={25}
          className={styles.navItemIcon}
        />
        <p className={styles.navItemText}>리워드</p>
      </Link>
      <Link href="/mypage" className={styles.navItem}>
        <Image
          src="/user.svg"
          alt="User Icon"
          width={25}
          height={25}
          className={styles.navItemIcon}
        />
        <p className={styles.navItemText}>마이페이지</p>
      </Link>
    </div>
  );
}
