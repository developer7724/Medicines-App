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
  const [transform, setTransform] = useState('translateX(-100%)');
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundProducts, setFoundProducts] = useState([]);

  const handleSearch = () => {
    const productsFound = data.filter((product) =>
      product.Product_Name.toLowerCase().includes(searchQuery.toLowerCase())
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
      const response = await fetch('http://192.168.29.134:1015/searchall');
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
      {/* Other components and elements... */}
      <Link className={styles.back} href="/admin">Go back</Link>
      <div className={styles.container}>
        <h1 className={styles.header}>Product Information</h1>
        <div className={styles.searchContainer} style={{ float: 'right', margin: '16px 0px' }}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search by Product Name"
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
              <th className={`${styles.th}`}>Image</th>
              <th className={`${styles.th}`}>Price</th>
              <th className={`${styles.th}`}>Product Description</th>
              <th className={`${styles.th}`}>Product Name</th>
              <th className={`${styles.th}`}>Quantity</th>
              <th className={`${styles.th}`}>Type</th>
            </tr>
          </thead>
          <tbody>
            {renderData.map((product, index) => (
              <tr key={index} className={styles.tr}>
                <td className={`${styles.td}`}>
                    <MyComponent
                        imageUrl={product.Image_file}
                    />
                </td>
                <td className={`${styles.td}`}>{product.Price}</td>
                <td className={`${styles.td}`}>{product.Product_Description}</td>
                <td className={`${styles.td}`}>{product.Product_Name}</td>
                <td className={`${styles.td}`}>{product.Quantity}</td>
                <td className={`${styles.td}`}>{product.Type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
