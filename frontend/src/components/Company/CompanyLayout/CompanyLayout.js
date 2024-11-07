// components/ADMIN PAGE/AdminLayout.js
import React from 'react';
import CompanyNavbar from '../Navbar/CompanyNavbar';
; // Adjust the path based on your folder structure

const CompanyLayout = ({ children }) => {
  return (
    <div>
      <CompanyNavbar />
      <main>{children}</main>
    </div>
  );
};

export default CompanyLayout;
