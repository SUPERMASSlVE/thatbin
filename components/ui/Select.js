import React from 'react';

export const Select = React.forwardRef(({ children, className, ...props }, ref) => (
  <select
    ref={ref}
    className={`px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
    {...props}
  >
    {children}
  </select>
));

Select.displayName = 'Select';