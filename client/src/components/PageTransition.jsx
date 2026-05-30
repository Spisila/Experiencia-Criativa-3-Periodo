import React from 'react';

export const PageTransition = ({ children }) => {
  return (
    <div className="page-fade-in">
      {children}
    </div>
  );
};