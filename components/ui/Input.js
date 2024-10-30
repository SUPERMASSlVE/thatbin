import React from 'react';

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
    {...props}
  />
));

Input.displayName = 'Input';