// components/ADMIN PAGE/AdminLayout.js
import React from 'react';
import AdminNav from '../AdminNav/AdminNav';

; // Adjust the path based on your folder structure

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminNav />
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
