import React from 'react';

export const Option = ({ children, ...props }) => (
  <option {...props}>{children}</option>
);