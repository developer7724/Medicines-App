'use client';

// Import necessary modules and components
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import _debounce from 'lodash/debounce';

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

// Define the component
export default function Home() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundProducts, setFoundProducts] = useState([]);

  const handleSearch = () => {
    const productsFound = data.filter((product) =>
      product.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFoundProducts(productsFound);
  };
  
  // Other state variables...

  useEffect(() => {
    getDataDebounced();
    return () => getDataDebounced.cancel(); // Cancel the debounce on unmount
  }, [router.asPath]);

  const getDataDebounced = _debounce(getData, 300);

  // Other functions...

  async function getData() {
    try {
      const response = await fetch('http://192.168.29.134:1015/getallquerry');
      const result = await response.json();
      console.log(result);

      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Other functions...

  const renderData = foundProducts.length > 0 ? foundProducts : data;

  return (
    <main className={styles.main}>
        <nav className={styles.nav}>
            <ul>
                <Link href="/admin"><li className={styles.li}>Product</li></Link>
                <Link href="/query"><li className={styles.li}>Queries</li></Link>
            </ul>
            <Image className={styles.logo} style={{ transform: 'translateY(-5px)' }}
            src="/logo.png"
            alt=""
            width={236}
            height={236}
            />
        </nav>
      {/* Other components and elements... */}
      <div className={styles.container} style={{ marginTop: '204px' }}>
        <h1 className={styles.header}>Query Information</h1>
        <div className={styles.searchContainer} style={{ float: 'right', margin: '16px 0px' }}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search by username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr className={`${styles.headerRow} ${styles.tr}`}>
              <th className={`${styles.th}`}>Username</th>
              <th className={`${styles.th}`}>Phone Number</th>
              <th className={`${styles.th}`}>Email</th>
              <th className={`${styles.th}`}>Message</th>
            </tr>
          </thead>
          <tbody>
            {renderData.map((product, index) => (
              <tr key={index} className={styles.tr}>
                <td className={`${styles.td}`}>{product.username}</td>
                <td className={`${styles.td}`}>{product.phone_no}</td>
                <td className={`${styles.td}`}>{product.email}</td>
                <td className={`${styles.td}`}>{product.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
