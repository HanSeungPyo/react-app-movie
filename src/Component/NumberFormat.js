import React from 'react'

//숫자콤마 컴포넌트
const NumberFormat = ({value}) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export default NumberFormat