'use client'

import { useState } from 'react';
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://192.168.29.134:1015/login?username=${username}&password=${password}`
      );

      if (response.ok) {
        console.log("Login successful");
        router.push('/admin');
      } else {
        setError('Invalid username or password');
      }
    }catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.myform}>
        <label>
            Admin Name:
            <input type="text" name="username" value={username} className={styles.input} onChange={handleChange}></input>
        </label>
        <label>
            Password:
            <input type="password" name="password" value={password} className={styles.input} onChange={handleChange}></input>
        </label>
        <button className={styles.submit} onClick={handleSubmit}>Submit</button>
      </form>
    </main>
  );
}