import React from 'react';

export const Card = ({ children, className, ...props }) => (
  <div
    className={`bg-white rounded-lg shadow-md ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className, ...props }) => (
  <div
    className={`px-6 py-4 border-b ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);

export const CardBody = ({ children, className, ...props }) => (
  <div
    className={`px-6 py-4 ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);

export const CardFooter = ({ children, className, ...props }) => (
  <div
    className={`px-6 py-4 border-t ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);