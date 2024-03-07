import React from 'react';

const Spinner = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#ffff' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          border: '8px solid #3498db',
          borderTop: '8px solid #ffffff',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite',
          marginBottom: '10px', 
        }}></div>
        <p>Loading...</p>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner; // Exporting Spinner component
