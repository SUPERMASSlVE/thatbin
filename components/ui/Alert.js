import React from 'react';

export const Alert = ({ variant, children, ...props }) => {
  const variantStyles = {
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    success: 'bg-green-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div
      className={`rounded-md p-4 ${variantStyles[variant] || 'bg-gray-200 text-gray-800'}`}
      {...props}
    >
      {children}
    </div>
  );
};