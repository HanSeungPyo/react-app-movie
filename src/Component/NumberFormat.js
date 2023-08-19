import React from 'react';

// 숫자 콤마 컴포넌트
const NumberFormat = ({ value }) => {
  return value.toLocaleString(); 
};

export default NumberFormat;