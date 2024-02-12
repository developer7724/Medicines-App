'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import _debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';

function MyComponent({ imageUrl }) {
    return (
      <div>
        <img className={styles.img}
          src={imageUrl}
          alt="Description of the image"
        />
      </div>
    );
  }

export default function Home() {
const router = useRouter();
const [data, setData] = useState([]);
const [display, setDisplay] = useState('none');
const [content, setContent] = useState({});

const getData = async () => {
    try {
        const response = await fetch('http://192.168.29.134:1015/searchall');
        const result = await response.json();
        setData(result);
        console.log(result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

useEffect(() => {
    getDataDebounced();
    return () => getDataDebounced.cancel(); // Cancel the debounce on unmount
}, [router.asPath]);

const getDataDebounced = _debounce(getData, 300);

const handleCardClick = (medicine) => {
    setDisplay('flex');
    setContent(medicine);
}

  return (
    <main className={styles.main}>
        <div className={styles.popup} style={{ display: `${display}` }}>
            <Image className={styles.cross}
            src="/cross.svg"
            alt=""
            width={18}
            height={18}
            onClick={() => setDisplay('none')}
            />
            <div className={styles.section}>
                <div className={styles.left}>
                    <MyComponent className={styles.image} style={{ width: '20px', height: '20px' }}
                    imageUrl={content.Image_file}
                    />
                </div>
                <div className={styles.right}>
                    <h3 className={styles.product_name}>{content.Product_Name}</h3>
                    <h3 className={styles.prod_type}>Type: {content.Type}</h3>
                    <h3 className={styles.prod_description}>{content.Product_Description}</h3>
                    <h3 className={styles.prod_quantity}>Quantity: {content.Quantity}</h3>
                    <h3 className={styles.prod_price}>Rs. {content.Price}</h3>
                </div>
            </div>
        </div>
        <nav className={styles.nav}>
            <Link href="/">
                <Image className={styles.back}
                src="/arrow-left.svg"
                alt=""
                width={34}
                height={34}
                />
            </Link>
            <Image className={styles.logo} style={{ transform: 'translateY(-5px)' }}
            src="/logo.png"
            alt=""
            width={236}
            height={236}
            />
        </nav>
      <div className={styles.bg}>
        <h1 className={styles.heading}>medicines</h1>
        <div className={styles.container}>
        {data.map((medicine, index) => (
            <div key={index} className={styles.card} onClick={() => handleCardClick(medicine)}>
              <MyComponent
              imageUrl={medicine.Image_file}
              />
              <p className={styles.name}>{medicine.Product_Name}</p>
              <p className={styles.type}>{medicine.Type}</p>
              <p className={styles.price}>Rs. {medicine.Price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
    
  );
}


