import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';

export default function about() {
    return (
        <main className={styles.main}>
      <nav className={styles.nav}>
        <Image className={styles.logo}
        src="/logo.png"
        alt=""
        width={236}
        height={236}
        />
        <ul className={styles.nav_link}>
          <li className={styles.li_ele}><Link href="/">Go back</Link></li>
        </ul>
      </nav>
      <div className={styles.about} id="about">
        <div className={styles.left}>
        <h1 className={styles.h1} style={{ color: '#000' }}>About Us</h1>
        <p className={styles.para} style={{ color: '#000', width: '85%', textAlign: 'center' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
        </div>
        <div className={styles.right}></div>
      </div>
        </main>
    );
}