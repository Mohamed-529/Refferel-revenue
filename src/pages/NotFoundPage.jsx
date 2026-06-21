import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    
    <div style={{ textAlign: 'center', marginTop: '150px', fontFamily: 'sans-serif' }}>
      
   
      <h1 style={{ color: 'red', fontSize: '50px', margin: '0' }}>
        404
      </h1>

      
      <h2>Page Not Found</h2>

      

     
      <Link 
        to="/" 
        style={{
          backgroundColor: 'blue',
          color: 'white',
          textDecoration: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          display: 'inline-block'
        }}
      >
        Back to dashboard
      </Link>

    </div>
  );
}

export default NotFound;
