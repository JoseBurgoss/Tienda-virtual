import * as Route from '@/constants/routes';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { pathname } = useLocation();

  const visibleOnlyPath = [
    Route.HOME,
    Route.SHOP
  ];

  return !visibleOnlyPath.includes(pathname) ? null : (
    <footer className="footer">
      <div className="footer-col-1">
        <strong>
        </strong>
      </div>
      <div className="footer-col-3">
        <strong>
        </strong>
      </div>
    </footer>
  );
};

export default Footer;
