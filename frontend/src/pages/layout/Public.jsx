import React from 'react';
import Navbar from '@components/navbar/Navbar';
import LeftBar from '@components/leftBar/LeftBar';
import { Outlet } from 'react-router-dom';
import RightBar from '@components/rightBar/RightBar';


const Public = () => {
 
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex"}}>
        <LeftBar />
        <div style={{ flex: 6}}>
        <Outlet />
        </div>
        <RightBar />
      </div>
    </div>

  )
};

export default Public