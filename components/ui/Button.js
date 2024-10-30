import React from 'react';

export const Button = React.forwardRef(({ children, ...props }, ref) => (
  <button
    ref={ref}
    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors"
    {...props}
  >
    {children}
  </button>
));

Button.displayName = 'Button';