'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';

export default function Home() {

  const initialFormData = {
    productname: '',
    description: '',
    filename: '',
    type: '',
    quantity: '',
    price: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: name === 'filename' ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataObj = new FormData();
      formDataObj.append('productname', formData.productname);
      formDataObj.append('description', formData.description);
      formDataObj.append('filename', formData.filename);
      formDataObj.append('type', formData.type);
      formDataObj.append('quantity', formData.quantity);
      formDataObj.append('price', formData.price);
  
      const response = await fetch('http://192.168.29.134:1015/upload', {
        method: 'POST',
        body: formDataObj,
      });
  
      if (response.ok) {
        console.log('Entry submitted successfully!');
        setFormData(initialFormData);
      } else {
        console.error('Failed to submit entry:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error submitting entry:', error);
    }
  }; 

  return (
    <main className={styles.main}>
      <form className={styles.myform}>
        <label>
            Product Name:
            <input type="text" name="productname" onChange={handleChange} className={styles.input}></input>
        </label>
        <label>
            Description:
            <textarea name="description" onChange={handleChange} className={`${styles.input} ${styles.textarea}`}></textarea>
        </label>
        <label>
            Upload Image:
            <input type="file" name="filename" onChange={handleChange} style={{ width: '100%', margin: '14px 0px' }}></input>
        </label>
        <label>
            Type:
            <input type="text" name="type" onChange={handleChange} className={styles.input}></input>
        </label>
        <label>
            Quantity:
            <input type="text" name="quantity" onChange={handleChange} className={styles.input}></input>
        </label>
        <label>
            Price:
            <input type="text" name="price" onChange={handleChange} className={styles.input}></input>
        </label>
        <button className={styles.submit} onClick={handleSubmit}>Submit</button>
      </form>
    </main>
  );
}