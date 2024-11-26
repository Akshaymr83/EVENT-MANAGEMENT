// components/ADMIN PAGE/AdminLayout.js
import React from 'react';
import Top from '../NAVBAR/Nav';

; // Adjust the path based on your folder structure

const UserLayout = ({ children }) => {
  return (
    <div>
      <Top />
      <main>{children}</main>
    </div>
  );
};

export default UserLayout;
