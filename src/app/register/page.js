'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';

export default function Home() {
  const initialFormData = {
    username: '',
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const queryParams = new URLSearchParams(formData);
      const response = await fetch(`http://192.168.29.134:1015/register?${queryParams}`, {
        method: 'POST',
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
      <form className={styles.myform} onSubmit={handleSubmit}>
        <label>
            Admin Name:
            <input type="text" name="username" className={styles.input} value={formData.username} onChange={handleChange}></input>
        </label>
        <label>
            Email:
            <input type="email" name="email" className={styles.input} value={formData.email} onChange={handleChange}></input>
        </label>
        <label>
            Password:
            <input type="password" name="password" className={styles.input} value={formData.password} onChange={handleChange}></input>
        </label>
        <button className={styles.submit}>Submit</button>
      </form>
    </main>
  );
}