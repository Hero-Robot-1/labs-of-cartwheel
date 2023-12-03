import React from 'react';
import SettingSection from './index';
import { useState ,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn,isLoggedIn, setRenderApp }) => {
  
  const location = useLocation();
  
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // Check if the current URL path includes "/create-form"
    if (location.pathname.includes('/create-form')) {
      // If the URL contains the specified path, update the state to render the app
      setRenderApp(true);
    }

  }, [location.pathname]);

  const handleRenderApp = () => {
    if (clickCount < 3 ) {
      setClickCount(clickCount + 1);
      if (clickCount === 2) {
        setRenderApp(true);
      }
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '100vw', // Full width of the viewport
        height: '100vh', // Full height of the viewport
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF9EF', // Replace with your desired color
      }}
    >
      <button
        onClick={handleRenderApp}
        style={{
          position: 'absolute',
          top: '10px', // Adjust the vertical position
          left: '10px', // Adjust the horizontal position
          margin: 0,
          color: 'blue', // Text color
          fontFamily: 'Arial, sans-serif', // Font family
          fontSize: '24px', // Font size
        }}
      >
        Cartwheel Club
      </button>
      <div
      
      style={{
        position: 'relative',
        width: '349px',
        height: '379px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      {/* Image */}
      <img
        src={`${process.env.PUBLIC_URL}/assets/login.png`}
        alt="Login Background"
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // zIndex: -1,
        }}
      />
    
      {/* Setting Section */}

      <SettingSection setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
    </div>
    </div>
  );
};

export default LoginPage;
