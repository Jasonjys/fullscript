import React, { useContext } from 'react'
import { Select } from 'antd';

import { AppContext } from '../contextProvider/AppContext'
const Option = Select.Option;

const FilterDropdown = () => {
  const { changeOrderedBy, orderedByOptions } = useContext(AppContext)

  return (
    <Select
      defaultValue={orderedByOptions[0]}
      placeholder="Ordered By"
      style={{marginLeft: "10px", width: 150 }}
    >
      {orderedByOptions.map(option => (
        <Option
          key={option}
          value={option}
          onClick={() => changeOrderedBy(option)}
        >
          {option}
        </Option>
      ))}
    </Select>
  )
}

export default FilterDropdown