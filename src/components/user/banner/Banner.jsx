import React from 'react';
import LoginForm from '../../common/LoginForm';
import './Banner.css';


const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-image" />
      <div className="banner-container">
        <LoginForm />
      </div>
    </section>
  );
}

export default Banner;