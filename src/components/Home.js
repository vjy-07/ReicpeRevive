import React, { useState } from 'react';
import '../styles/Home.scss';
import { ImSpoonKnife } from 'react-icons/im';
import Tabs from './Tabs'; // Import Tabs here

const Home = () => {
  const [loader, setLoader] = useState(true);

  return (
    <div>
      <div className="home" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)` }}>
        <div className="home-content">
          <div className="logo-wrapper">
            <div className="logo">
              <ImSpoonKnife className='brand' />
            </div>
          </div>
          <div className="header-text">
            <h1>EatOverse</h1>
            <p>Discover, Create, and Share Your Culinary Adventures</p>
          </div>
        </div>
      </div>

      <div className="main">
        <Tabs setLoader={setLoader} />
        {loader && (
          <div className='loader'>
            <div className='spinner'></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
