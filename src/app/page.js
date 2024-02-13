'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [display, setDisplay] = useState('none');

  const click = () => {
    if(display === 'none') {
      setDisplay('flex');
    } else {
      setDisplay('none');
    }
  }

  const initialFormData = {
    username: '',
    phone_no: '',
    email: '',
    message: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const queryParams = new URLSearchParams(formData);
      const response = await fetch(`http://192.168.29.134:1015/querry?${queryParams}`, {
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
      <div className={styles.dropdown} style={{ display: `${display}` }}>
        <ul>
          <li className={styles.liEle}><a href="#home">Home</a></li>
          <li className={styles.liEle}><Link href="/about">About</Link></li>
          <li className={styles.liEle}><a href="#services">Services</a></li>
          <li className={styles.liEle}><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <nav className={styles.nav}>
        <Image className={styles.logo}
        src="/logo.png"
        alt=""
        width={236}
        height={236}
        />
        <ul className={styles.nav_link}>
          <li className={styles.li_ele}><a href="#home">Home</a></li>
          <li className={styles.li_ele}><Link href="/about">About</Link></li>
          <li className={styles.li_ele}><Link href="/medicines">Explore</Link></li>
          <li className={styles.li_ele}><a href="#contact">Contact</a></li>
        </ul>
        <Image className={styles.menu}
        src="/burger-menu.svg"
        alt=""
        width={40}
        height={40}
        onClick={click}
        />
      </nav>

      <div className={styles.home} id="home">
        <div className={styles.overlay}>
        <h1 className={`${styles.h1} ${styles.home_h}`}>Realize <br /> a Better You</h1>
        <p className={styles.para}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
        <Link href="/medicines"><button className={styles.btn}>Explore <Image src="/forward.svg" alt="" width={24} height={24} /></button></Link>
        </div>
      </div>

      <div className={styles.services} id="services">
        <h1 className={styles.h1} style={{ color: '#000', width: '80%' }}>Our Services</h1>
        <div className={styles.container}>
          <Link href="/medicines">
          <div className={styles.div}>
            <div className={styles.img_container}>
            <Image className={styles.tab}
            src="/pic1.png"
            alt=""
            width={360}
            height={300}
            />
            </div>
            <p className={styles.p}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
          </div>
          </Link>
          <div className={styles.div}>
          <div className={styles.img_container}>
            <Image className={styles.tab}
            src="/pateint.png"
            alt=""
            width={360}
            height={300}
            />
            </div>
            <p className={styles.p}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
          </div>
        </div>
      </div>

      <div className={styles.contact} id="contact">
        <h1 className={styles.h1} style={{ color: '#000' }}>Connect with us</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
  <div className={styles.form_group}>
    <input className={`${styles.input} ${styles.w_50}`} type="text" id="fullName" name="username" value={formData.username} onChange={handleChange} placeholder="Your Full Name" />
    <input className={`${styles.input} ${styles.w_50}`} type="tel" id="phoneNumber" name="phone_no" value={formData.phone_no} onChange={handleChange} placeholder="Your Phone Number" />
  </div>
  <div className={styles.form_group}>
    <input className={styles.input} type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email Address" />
  </div>
  <div className={styles.form_group}>
    <textarea className={`${styles.input} ${styles.textarea}`} id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your Message"></textarea>
  </div>
  <button type="submit" className={styles.button}>Submit</button>
    </form>

      </div>

      <div className={styles.footer}>
        
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.35231277325!2d88.26495090163961!3d22.53540637448262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1707709006917!5m2!1sen!2sin"
        style={{ width:"365px", height:"350px", border:"0", allowfullscreen:"" }} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        <ul>
          <li className={styles.liEle} style={{ color: '#ffff' }}><a href="#home">Home</a></li>
          <li className={styles.liEle} style={{ color: '#ffff' }}><a href="#about">About</a></li>
          <li className={styles.liEle} style={{ color: '#ffff' }}><a href="#services">Services</a></li>
          <li className={styles.liEle} style={{ color: '#ffff' }}><a href="#contact">Contact</a></li>
        </ul>

        <ul className={styles.ul}>
          <li className={styles.li} style={{ color: '#ffff' }}>Address:</li>
          <li className={styles.li} style={{ color: '#ffff' }}>Suite 360 124 Haley Way, New Jewellside, HI 31096</li>
          <li className={styles.li} style={{ color: '#ffff' }}>Tele:</li>
          <li className={styles.li} style={{ color: '#ffff' }}>0123-456-789</li>
          <li className={styles.li} style={{ color: '#ffff' }}><Link href="/login"><button className={styles.admin_login}>Admin Login</button></Link></li>
        </ul>

      </div>

    </main>
  );
}
